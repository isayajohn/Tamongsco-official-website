import { HttpClient } from '@angular/common/http';
import { Injectable, inject, signal } from '@angular/core';
import { Observable, catchError, map, of, tap } from 'rxjs';

import { environment } from '../../environments/environment';

export interface AuthUser {
  id: number;
  username: string;
  email: string;
  isSuperuser: boolean;
}

export interface DashboardSummary {
  counts: {
    posts: number;
    services: number;
    faqs: number;
    submissions: number;
    unhandledSubmissions: number;
    subscriptions: number;
    users: number;
    editableSections: number;
  };
  recentSubmissions: {
    name: string;
    email: string;
    subject: string;
    createdAt: string;
    isHandled: boolean;
  }[];
}

export interface DashboardField {
  name: string;
  label: string;
  type: 'text' | 'textarea' | 'number' | 'boolean' | 'json';
}

export interface DashboardResource {
  label: string;
  singleton?: boolean;
  readOnly?: boolean;
  fields: DashboardField[];
  items: Record<string, any>[];
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly http = inject(HttpClient);
  readonly user = signal<AuthUser | null>(null);

  login(username: string, password: string): Observable<AuthUser> {
    return this.http
      .post<{ user: AuthUser }>(
        `${environment.apiBaseUrl}/auth/login/`,
        { username, password },
        { withCredentials: true },
      )
      .pipe(
        map((response) => response.user),
        tap((user) => this.user.set(user)),
      );
  }

  logout(): Observable<void> {
    return this.http
      .post(`${environment.apiBaseUrl}/auth/logout/`, {}, { withCredentials: true })
      .pipe(
        tap(() => this.user.set(null)),
        map(() => undefined),
      );
  }

  loadCurrentUser(): Observable<AuthUser | null> {
    return this.http
      .get<{ user: AuthUser | null }>(`${environment.apiBaseUrl}/auth/me/`, {
        withCredentials: true,
      })
      .pipe(
        map((response) => response.user),
        tap((user) => this.user.set(user)),
        catchError(() => {
          this.user.set(null);
          return of(null);
        }),
      );
  }

  getDashboardSummary(): Observable<DashboardSummary> {
    return this.http.get<DashboardSummary>(`${environment.apiBaseUrl}/dashboard/summary/`, {
      withCredentials: true,
    });
  }

  getDashboardResources(): Observable<{ resources: Record<string, DashboardResource> }> {
    return this.http.get<{ resources: Record<string, DashboardResource> }>(
      `${environment.apiBaseUrl}/dashboard/resources/`,
      { withCredentials: true },
    );
  }

  saveDashboardResource(resourceKey: string, item: Record<string, any>) {
    const id = item['id'];
    const url = id
      ? `${environment.apiBaseUrl}/dashboard/resources/${resourceKey}/${id}/`
      : `${environment.apiBaseUrl}/dashboard/resources/${resourceKey}/`;
    return this.http.post<{ item: Record<string, any> }>(url, item, { withCredentials: true });
  }

  deleteDashboardResource(resourceKey: string, itemId: number) {
    return this.http.delete(`${environment.apiBaseUrl}/dashboard/resources/${resourceKey}/${itemId}/`, {
      withCredentials: true,
    });
  }
}
