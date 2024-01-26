/**
 * This file contains the types for the payment service
 **/

export type APSApiProblem = {
  kind: 'bad-data';
  error: string;
}

export type GetTokenPayload = {
  service_command: string;
  access_code: string;
  merchant_identifier: string;
  merchant_reference: string;
  language: string;
  expiry_date: string;
  card_number: string;
  card_security_code: string;
  signature: string;
};
export type GetTokenParams = Omit<
  GetTokenPayload,
  'service_command'|
  'access_code' |
  'merchant_identifier' |
  'language' |
  'signature'
>;
export type GetTokenResponse = {
  service_command: string;
  access_code: string;
  merchant_identifier: string;
  merchant_reference: string;
  language: string;
  expiry_date: string;
  card_number: string;
  signature: string;
  token_name: string;
  response_message: string;
  status: string;
  card_bin: string;
  response_code: string;
}
export type GetToken = (
  params: GetTokenParams,
) => Promise<{ kind: "ok"; data: GetTokenResponse } | APSApiProblem>

export type MakePaymentPayload = {
  command: string;
  access_code: string;
  merchant_identifier: string;
  merchant_reference: string;
  amount: number;
  currency: string;
  language: string;
  customer_email: string;
  customer_ip: string;
  token_name: string;
  order_description?: string;
  return_url: string;
  signature: string;
};
export type MakePaymentParams = Omit<
  MakePaymentPayload,
  'command' |
  'access_code' |
  'merchant_identifier' |
  'language' |
  'return_url' |
  'signature'
>;
export type MakePaymentResponse = {
  command: string;
  access_code: string;
  merchant_identifier: string;
  merchant_reference: string;
  amount: string;
  currency: string;
  language: string;
  customer_email: string;
  customer_ip: string;
  token_name: string;
  signature: string;
  fort_id: string;
  payment_option: string;
  eci: string;
  order_description: string;
  authorization_code: string;
  response_message: string;
  response_code: string;
  customer_name: string;
  expiry_date: string;
  card_number: string;
  status: string;
  card_holder_name: string;
  '3ds_url'?: string;
  phone_number: string;
}
export type MakePayment = (
  params: MakePaymentParams,
) => Promise<{ kind: "ok"; data: MakePaymentResponse } | APSApiProblem>


export type APSSubmitPaymentParams = {
  expiry_date: string;
  card_number: string;
  card_security_code: string;
  amount: number;
  customer_email: string;
  userId: string;
  productId: number;
};
export type SubmitAPSPaymentResponse = MakePaymentResponse;
export type SubmitAPSPayment = (
  params: APSSubmitPaymentParams,
) => Promise<{ kind: "ok"; data: SubmitAPSPaymentResponse } | APSApiProblem>
