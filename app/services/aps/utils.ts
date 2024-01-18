import * as Crypto from "expo-crypto";
import Config from "../../config";

const escapeKeys = [
  'card_security_code',
  'card_number',
  'expiry_date',
  'card_holder_name',
  'remember_me',
];
export const generateSignature = async (props: Record<string, any>): Promise<string> => {
  const paramKeys = Object.keys(props).filter(key => !escapeKeys.includes(key)).sort();
  const paramsString = paramKeys.reduce((prevString, key) => (
    `${prevString}${key}=${props[key]}`
  ), '');
  const hash = await Crypto.digestStringAsync(
    Crypto.CryptoDigestAlgorithm.SHA256,
    `${Config.APS_DATA.sha_req}${paramsString}${Config.APS_DATA.sha_req}`
  );

  return hash;
};


export const parseResponse = (res: string) => {
  const matchedParams = res.match(/(?:var returnUrlParams = )(\{.*?\})/);
  const errorMatchedParams = res.match(/(?:var resposneBo =)(\{.*?\})/);
  return matchedParams
    ? JSON.parse(matchedParams[1])
    : errorMatchedParams
      ? JSON.parse(errorMatchedParams[1])
      : {};
};

export { APSStatusCodes } from './statusCodes';
