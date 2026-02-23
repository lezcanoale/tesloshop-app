import { HttpClient } from '@angular/common/http';
import { computed, inject, Injectable, signal } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { AuthResponse } from '@auth/interfaces/auth-response.interface';
import { User } from '@auth/interfaces/user.interface';
import { BASE_URL } from '@products/services/products.service';
import { catchError, map, Observable, of, tap } from 'rxjs';

type AuthStatus = 'checking' | 'authenticated' | 'not-authenticated';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private _authStatus = signal<AuthStatus>('checking');
  private _user = signal<User | null>(null);
  private _token = signal<string | null>(localStorage.getItem('token'));

  private http = inject(HttpClient);

  checkStatusResource = rxResource({
    stream: () => {
      return this.checkStatus();
    },
  });

  authStatus = computed<AuthStatus>(() => {
    if (this._authStatus() == 'checking') {
      return 'checking';
    }

    if (this._user()) {
      return 'authenticated';
    }

    return 'not-authenticated';
  });

  //Las computed properties sirven para solo lectura, para que no se modifiquen los valores privados
  user = computed<User | null>(() => this._user());
  token = computed(this._token);
  isAdmin = computed(() => this._user()?.roles.includes('admin') ?? false);
  login(email: string, password: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${BASE_URL}/auth/login`, {
        email,
        password,
      })
      .pipe(
        map((resp) => {
          return this.handleAuthSuccess(resp);
        }),
        catchError((error) => {
          return this.handleAuthError();
        }),
      );
  }
  register(email: string, password: string, fullName: string): Observable<boolean> {
    return this.http
      .post<AuthResponse>(`${BASE_URL}/auth/register`, {
        email,
        password,
        fullName,
      })
      .pipe(
        map((resp) => {
          return this.handleAuthSuccess(resp);
        }),
        catchError((error) => {
          return this.handleAuthError();
        }),
      );
  }

  checkStatus(): Observable<boolean> {
    const token = localStorage.getItem('token');
    if (!token) {
      this.logout();
      return of(false);
    }
    return this.http
      .get<AuthResponse>(`${BASE_URL}/auth/check-status`, {
        // headers: {
        //   Authorization: `Bearer ${token}`,
        // },
      })
      .pipe(
        map((resp) => {
          return this.handleAuthSuccess(resp);
        }),
        catchError((error) => {
          return this.handleAuthError();
        }),
      );
  }

  logout() {
    this._authStatus.set('not-authenticated');
    this._user.set(null);
    this._token.set(null);
    // localStorage.removeItem('token');
  }

  private handleAuthSuccess({ user, token }: AuthResponse) {
    this._user.set(user);
    this._authStatus.set('authenticated');
    this._token.set(token);
    localStorage.setItem('token', token);
    return true;
  }

  private handleAuthError() {
    this.logout();
    return of(false);
  }
}
