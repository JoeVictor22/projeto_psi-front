import decode from "jwt-decode";
import { Properties} from "../config"
import axios from "axios";

import Cookies from 'js-cookie';


class AuthService {
  /*----------------------------------------------------------------------------------------------------*/

  constructor(domain) {
    this.domain = domain || Properties.domain;
    this.fetch = this.fetch.bind(this);
    this.login = this.login.bind(this);
    this.user = null;
  }

  /*----------------------------------------------------------------------------------------------------*/


  login(username, password) {

    return this.fetch(`${this.domain}/login`, {
          method: "post",
          email: username,
          senha: password,

    }).then((res) => {

      if (!res.data.error) {        
        this.setToken(res.data.access_token);
        this.setRefreshToken(res.data.refresh_token);

      }
      return Promise.resolve(res);
    });
  }

  /*----------------------------------------------------------------------------------------------------*/

  loggedIn() {
    const token = this.getToken();
    if (!!!token) {
      return false;
    }

    if (this.isTokenExpired(token)) {
      const rfToken = this.getRefreshToken();

      if (this.isTokenExpired(rfToken)) {
        this.logout();
        return false;
      }
    }

    return true;
  }

  /*----------------------------------------------------------------------------------------------------*/

  isTokenExpired(token) {
    try {
      const decoded = decode(token);
		
      return decoded.exp < Date.now() / 1000;

    } catch (err) {
      return false;
    }
  }

  /*----------------------------------------------------------------------------------------------------*/

  doRequest(url, method, data, headers, responseType = null) {
    if (this.loggedIn()) {
      const token = this.getToken();

      if (this.isTokenExpired(token)) {
        let self = this;

        return this.axiosHandler({
          url: `${this.domain}/refresh`,
          method: "POST",
          headers: {
            Authorization: self.getAuthorizationRefreshHeader(),
            ...headers,
          },
        }).then((res) => {
          if (res.status === 200) {
            self.setToken(res.data.access_token);

            let request = {
              url: `${self.domain}/${url}`,
              method: method,
              responseType: responseType,
              headers: {
                Authorization: self.getAuthorizationHeader(),
                ...headers,
              },
            };

            if (method === "GET") {
              request = {
                ...request,
                params: data,
              };
            } else {
              request = {
                ...request,
                data: data,
              };
            }

            return this.axiosHandler(request);
          }
        });
      } else {
        let request = {
          url: `${this.domain}/${url}`,
          method: method,
          responseType: responseType,
          headers: {
            Authorization: this.getAuthorizationHeader(),
          },
        };

        if (method === "GET") {
          request = {
            ...request,
            params: data,
          };
        } else {
          request = {
            ...request,
            data: data,
          };
        }

        return this.axiosHandler(request);
      }
    } else {
      this.logout();
    }
  }

  /*----------------------------------------------------------------------------------------------------*/
  axiosHandler(request) {
    return axios(request)
    .then(this._checkStatus)
    .catch((error) => {
	// in case of error, this is the data persisted to the client

      let res = {
        'error': true,
        'data': {
          'error': true,
          ...error?.response?.data
              }
         }
      return res;
    });
  }
    /*----------------------------------------------------------------------------------------------------*/

  _checkStatus(response) {
	    if (response.status >= 200 && response.status < 300) {
		return response;
	    }else {
	      var error = new Error(response.statusText);
	      error.response = response;
	      
	      throw error;
		}
	  }

  /*----------------------------------------------------------------------------------------------------*/

  setToken(idToken) {
    Cookies.set('id_token', idToken);
  }

  /*----------------------------------------------------------------------------------------------------*/

  getToken() {
    return Cookies.get('id_token');
  }

  /*----------------------------------------------------------------------------------------------------*/

  setRefreshToken(idToken) {
    Cookies.set('id_refresh_token', idToken);
  }

  /*----------------------------------------------------------------------------------------------------*/

  getRefreshToken() {
    return Cookies.get('id_refresh_token');
  }

  /*----------------------------------------------------------------------------------------------------*/

  logout() {
    Cookies.remove('id_token');
    Cookies.remove("id_refresh_token");

    window.location.reload();
  }
  /*----------------------------------------------------------------------------------------------------*/

  setUser(data) {
    this.user = data;
  }

  /*----------------------------------------------------------------------------------------------------*/

  getUser() {
    return {
      logged: this.loggedIn(),
      token: Cookies.get('id_token'),
      refreshToken: Cookies.get('id_refresh_token'),
    };
  }

  /*----------------------------------------------------------------------------------------------------*/

  getAuthorizationHeader() {
    return "Bearer " + this.getToken();
  }

  /*----------------------------------------------------------------------------------------------------*/

  getAuthorizationRefreshHeader() {
    return "Bearer " + this.getRefreshToken();
  }

  /*----------------------------------------------------------------------------------------------------*/

  fetch(url, options) {
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json",
    };

    if (this.loggedIn()) {
      headers["Authorization"] = this.getAuthorizationHeader();
    }
    
    const request = {
	    url:url,
	    method:"post",
	    data:options
    }

    return this.axiosHandler(request)
  }

  /*----------------------------------------------------------------------------------------------------*/

 
}

export default AuthService;