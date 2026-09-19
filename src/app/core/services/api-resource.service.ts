import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { Observable, map } from 'rxjs';
import { API_BASE_URL } from '../config/api.config';

@Injectable({ providedIn: 'root' })
export class ApiResourceService {
  private readonly http = inject(HttpClient);

  list<T>(resource: string): Observable<T[]> {
    return this.http.get<T[] | { content?: T[] }>(`${API_BASE_URL}/${resource}`).pipe(
      map((response) => Array.isArray(response) ? response : response.content ?? [])
    );
  }

  fetch<T>(resource: string): Observable<T> {
    return this.http.get<T>(`${API_BASE_URL}/${resource}`);
  }

  get<T>(resource: string, id: number | string): Observable<T> {
    return this.http.get<T>(`${API_BASE_URL}/${resource}/${id}`);
  }

  create<T>(resource: string, payload: Partial<T>): Observable<T> {
    return this.http.post<T>(`${API_BASE_URL}/${resource}`, payload);
  }

  update<T>(resource: string, id: number | string, payload: Partial<T>): Observable<T> {
    return this.http.put<T>(`${API_BASE_URL}/${resource}/${id}`, payload);
  }

  delete(resource: string, id: number | string): Observable<void> {
    return this.http.delete<void>(`${API_BASE_URL}/${resource}/${id}`);
  }
}
