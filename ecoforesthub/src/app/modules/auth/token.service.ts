import { Injectable } from '@angular/core';
import { getCookie, removeCookie, setCookie } from 'typescript-cookie';

@Injectable({
  providedIn: 'root',
})
export class TokenService {
  constructor() {}
  saveToken(token: string) {
    setCookie('accessToken', token, { expires: 3, path: '/' });
  }
  getToken() {
    const accessToken = getCookie('accessToken');
    return accessToken;
  }

  removeToken() {
    removeCookie('accessToken');
  }
}
