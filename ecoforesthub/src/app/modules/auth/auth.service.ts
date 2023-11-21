import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { AuthUser, IsAvailable } from './interfaces/authUser-interfaces';
import { TokenService } from './token.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://localhost:5000'; // Reemplaza con la URL de tu backend

  constructor(private http: HttpClient, private tokenService: TokenService) {}

  login(email: string, password: string): Observable<any> {
    const body = { email, password };
    return this.http.post<AuthUser>(`${this.apiUrl}/login`, body).pipe(
      tap((response) => {
        this.tokenService.saveToken(response.token);
      })
    );
  }
  register(name: string, email: string, password: string) {
    const body = { name, email, password };
    return this.http.post(`${this.apiUrl}/register`, body);
  }
  isAvailable(email: string) {
    const body = { email };
    return this.http.post<IsAvailable>(`${this.apiUrl}/is-avaible`, body);
  }
  logout() {
    this.tokenService.removeToken();
  }
}
