/* eslint-disable camelcase */
import axios from 'axios';
import * as Network from 'expo-network';
import { Buffer } from "buffer";
import * as Payment from "./paymentTypes";
import Config from '../../config';
import { generateSignature, parseResponse, APSStatusCodes } from "./utils";
import { getLanguage } from 'app/i18n';
import { createOrder } from '../../services/api/order/orderService';


const getIp = async () => {
  let ip;
  try {
    const res = await fetch('https://api.ipify.org?format=json');
    const resJson = await res.json() as { ip: string };
    ip = resJson.ip;
  } catch(e) {
    const localIp = await Network.getIpAddressAsync();
    ip = localIp;
  }
  return ip;
};
const getToken: Payment.GetToken = async (params) => {
  let response;
  const language = getLanguage();
  const reqData = {
    service_command: 'TOKENIZATION',
    access_code: Config.APS_DATA.access_code,
    merchant_identifier: Config.APS_DATA.merchant_identifier,
    language,
    ...params,
  };
  const signature = await generateSignature(reqData);
  const payload: Payment.GetTokenPayload = {
    ...reqData,
    signature,
  };

  try {
    response = await axios({
      url: Config.APS_TOKENIZATION_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=utf-8'
      },
      data: { ...payload },
    });
    const resData = parseResponse(response.data) as Payment.GetTokenResponse;

    if (!resData.status || resData.status !== '18') {
      console.log(APSStatusCodes[resData.status][language]);
      return { kind: "bad-data", error: resData.response_message };
    }

    return { kind: "ok", data: resData };
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      console.tron.error?.(`Bad data: ${e.message}\n${response?.data}`, e.stack)
    }
    return { kind: "bad-data", error: (e as Error).message || 'General error'  }
  }
}

const makePayment: Payment.MakePayment = async (params) => {
  let response;
  const language = getLanguage();
  const reqData = {
    command: 'PURCHASE',
    access_code: Config.APS_DATA.access_code,
    merchant_identifier: Config.APS_DATA.merchant_identifier,
    language,
    ...params,
  };
  const signature = await generateSignature(reqData);
  const payload: Payment.MakePaymentPayload = {
    ...reqData,
    signature,
  };

  try {
    const response = await fetch(Config.APS_PAYMENT_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify(payload),
    })
    const responseData = await response.json();

    if (!responseData.status || responseData.status !== '14') {
      console.log(APSStatusCodes[responseData.status][language]);
      return { kind: "bad-data", error: responseData.response_message };
    }
    return { kind: "ok", data: responseData };
  } catch (e) {
    if (__DEV__ && e instanceof Error) {
      // @ts-ignore
      console.tron.error?.(`Bad data: ${e.message}\n${response?.data}`, e.stack)
    }
    return { kind: "bad-data", error: (e as Error).message || 'General error'  }
  }
}

export const submitPayment: Payment.SubmitAPSPayment = async (params) => {
  const {
    expiry_date,
    card_number,
    card_security_code,
    amount,
    customer_email,
    card_holder_name,
    userId,
    productId,
  } = params;
  const currency = __DEV__ ? 'USD' : 'AED';
  const customer_ip = await getIp();

  const paymentRes = await createOrder({
    userId,
    productId,
  });
  if (paymentRes.kind !== 'ok') {
    return {
      kind: 'bad-data',
      error: 'Order creation error',
    };
  }
  const merchant_reference = paymentRes.data.id.toString();


  const tokenRes = await getToken({
    merchant_reference,
    expiry_date,
    card_number,
    card_security_code,
    card_holder_name,
  });

  if (tokenRes.kind !== 'ok') {
    return tokenRes;
  }

  const description = {
    order_id: merchant_reference,
    user_id: userId.toString(),
  };
  const descriptionParams: URLSearchParams = new URLSearchParams(description);
  const order_description = Buffer.from(descriptionParams.toString()).toString('base64').replaceAll('=', '#'); // APS doesn't accept '=' symbol

  const paymentResponse = await makePayment({
    amount,
    currency,
    customer_email,
    customer_ip,
    customer_name: card_holder_name,
    token_name: tokenRes.data.token_name,
    merchant_reference,
    order_description,
  });
  return paymentResponse;
}
