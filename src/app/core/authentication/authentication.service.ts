import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { Router } from '@angular/router';

declare const google: any;

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private readonly httpClient = inject(HttpClient);
  private readonly router = inject(Router);
  private loggedIn = new BehaviorSubject<boolean>(this.hasToken());

  login(username: string, password: string) {
    return this.httpClient.post<{ access_token: string; user: string; }>(`${environment.projectApi}/authentication`, { username, password })
      .pipe(
        tap({
          next: (res) => {
            localStorage.setItem("token", res.access_token);
            localStorage.setItem("user", res.user);
            this.loggedIn.next(true);
          }
        })
      );
  }

  initializeLoginButton(callback: (jwt: string) => void) {
    google.accounts.id.initialize({
      client_id: environment.googleClientId,
      callback: (response: any) => {
        const credential = response.credential; // <-- JWT de Google
        callback(credential);
      },
    });

    google.accounts.id.renderButton(document.getElementById('google-btn'), {
      theme: 'outline',
      size: 'large',
    });
  }

  sendTokenToBackend(googleJwt: string) {
    return this.httpClient.post<{ access_token: string; user: any; }>(`${environment.projectApi}/auth/google`, { token: googleJwt })
      .pipe(
        tap({
          next: (res) => {
            localStorage.setItem("token", res.access_token);
            localStorage.setItem("userId", res.user.id);
            localStorage.setItem("email", res.user.email);
            localStorage.setItem('photo', res.user.picture);
            this.loggedIn.next(true);
          }
        })
      );;
  }

  logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
    localStorage.removeItem('photo');
    this.loggedIn.next(false);
    this.router.navigate(["/login"]);
  }

  isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  private hasToken(): boolean {
    return !!localStorage.getItem('token');
  }
}
