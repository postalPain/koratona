/**
 * This Api class lets you define an API endpoint and methods to request
 * data and process it.
 *
 * See the [Backend API Integration](https://github.com/infinitered/ignite/blob/master/docs/Backend-API-Integration.md)
 * documentation for more details.
 */
import { ApisauceInstance, create } from "apisauce"
import { RootStore } from "app/models"
import Config from "../../config"
import type { ApiConfig } from "./api.types"
import { showModalMessage } from "app/utils/showModal"
import { translate } from "../../i18n"

/**
 * Configuring the apisauce instance.
 */
export const DEFAULT_API_CONFIG: ApiConfig = {
  url: Config.BASE_API_URL,
  timeout: 10000,
}

/**
 * Manages all requests to the API. You can use this class to build out
 * various requests that you need to call from your backend API.
 */
export class Api {
  apisauce: ApisauceInstance
  config: ApiConfig
  store: RootStore | null
  /**
   * Set up our API instance. Keep this lightweight!
   */
  constructor(config: ApiConfig = DEFAULT_API_CONFIG) {
    this.store = null
    this.config = config
    this.apisauce = create({
      baseURL: this.config.url,

      timeout: this.config.timeout,
      headers: {
        Accept: "application/json",
      },
    })

    this.apisauce.addRequestTransform((request) => {
      if (request.headers) {
        request.headers["Accept-Language"] = this.store?.authUserStore.user.lang
      }
    })

    // Add response interceptor to handle 401 errors
    this.apisauce.addResponseTransform((response) => {
      if (
        response.problem === "SERVER_ERROR" ||
        response.problem === "TIMEOUT_ERROR" ||
        response.problem === "CONNECTION_ERROR"
      ) {
        showModalMessage({
          icon: "exclamation",
          title: translate("modals.serverError.title"),
          description: translate("modals.serverError.description"),
        })
      }
      if (response.problem === "NETWORK_ERROR") {
        showModalMessage({
          icon: "offline",
          title: translate("modals.offline.title"),
          description: translate("modals.offline.description"),
        })
      }
    })
  }
}

// Singleton instance of the API for convenience
export const api = new Api()
