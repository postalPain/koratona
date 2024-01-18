/* eslint-disable camelcase */
import axios from 'axios';
import * as Crypto from "expo-crypto";
import * as Network from 'expo-network';
import { Buffer } from "buffer";
import * as Payment from "./paymentTypes";
import Config from '../../config';
import { generateSignature, parseResponse, APSStatusCodes } from "./utils";
import { getLanguage } from 'app/i18n';

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
    const response = await axios({
      url: Config.APS_PAYMENT_URL,
      method: 'POST',
      headers: {
        'Content-Type': 'application/json; charset=utf-8'
      },
      data: { ...payload },
    });
    if (!response.data.status || response.data.status !== '14') {
      console.log(APSStatusCodes[response.data.status][language]);
      return { kind: "bad-data", error: response.data.response_message };
    }
    return { kind: "ok", data: response.data };
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
  } = params;
  const customer_ip = await Network.getIpAddressAsync();
  const currency = __DEV__ ? 'USD' : 'AED';
  const merchant_reference = Crypto.randomUUID();

  const tokenRes = await getToken({
    merchant_reference,
    expiry_date,
    card_number,
    card_security_code,
  });

  if (tokenRes.kind !== 'ok') {
    return tokenRes;
  }

  const description = {
    order_id: merchant_reference,
    user_id: '5892476872204d7aa4310b960f3b8c40',
  };
  const descriptionParams: URLSearchParams = new URLSearchParams(description);
  const paymentResponse = await makePayment({
    amount,
    currency,
    customer_email,
    customer_ip,
    token_name: tokenRes.data.token_name,
    merchant_reference,
    order_description: Buffer.from(descriptionParams.toString()).toString('base64').replace('=', '#'), // APS doesn't accept '=' symbol
  });
  return paymentResponse;
}
