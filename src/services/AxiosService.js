import AuthService from "./AuthService";

class AxiosService {
  /*----------------------------------------------------------------------------------------------------*/

  constructor() {
    this.Auth = new AuthService();
  }

  /*----------------------------------------------------------------------------------------------------*/

  get(urlBase, parameters, headers = {}) {
    return this.Auth.doRequest(urlBase, "GET", parameters, headers, null);
  }

  /*----------------------------------------------------------------------------------------------------*/

  post(urlBase, parameters, headers = {}) {
    return this.Auth.doRequest(urlBase, "POST", parameters, headers, null);
  }

  /*----------------------------------------------------------------------------------------------------*/

  delete(urlBase, parameters, headers = {}) {
    return this.Auth.doRequest(urlBase, "DELETE", parameters, headers, null);
  }

  /* ----------------------------------------------------------------------------------------------------*/

  put(urlBase, parameters, headers = {}) {
    return this.Auth.doRequest(urlBase, "PUT", parameters, headers, null);
  }

  /*----------------------------------------------------------------------------------------------------*/
}

export default AxiosService;