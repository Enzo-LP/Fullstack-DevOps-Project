import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UserType } from '../models/user-type.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class UserTypeService {
  private api = 'http://localhost:8080/api/user-types';

  constructor(private http: HttpClient) {}

  getAll(): Observable<UserType[]> {
    return this.http.get<UserType[]>(this.api);
  }

  create(type: UserType): Observable<UserType> {
    return this.http.post<UserType>(this.api, type);
  }

  update(id: number, type: UserType): Observable<UserType> {
    return this.http.put<UserType>(`${this.api}/${id}`, type);
  }

  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api}/${id}`);
  }
}
