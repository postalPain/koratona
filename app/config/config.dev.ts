/**
 * These are configuration settings for the dev environment.
 *
 * Do not include API secrets in this file or anywhere in your JS.
 *
 * https://reactnative.dev/docs/security#storing-sensitive-info
 */
export default {
  BASE_API_URL: "https://dev-be.koratona.stryber.io/api/",
  PRIVACY_POLICIES_URL: "https://www.koratona.com/privacy-policy",
  TERMS_AND_CONDITIONS_URL: "https://www.koratona.com/terms-and-conditions",
  APS_DATA: {
    access_code: "BZulFMQjtW6b6GSF2fKj",
    merchant_identifier: "nOqvxuQg",
    sha_req: "96kv8KjHFv7EzheQmadmdx@*",
  },
  APS_TOKENIZATION_URL: "https://sbcheckout.PayFort.com/FortAPI/paymentPage",
  APS_PAYMENT_URL: "https://sbpaymentservices.payfort.com/FortAPI/paymentApi",
  APS_3DS_SUCCESS_URL: "https://static.koratona.stryber.io/paymentSuccess.html",
}
