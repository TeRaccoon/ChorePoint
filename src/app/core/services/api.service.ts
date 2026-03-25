import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  async processGet(query: string): Promise<any> {
    const url = new URL('https://localhost:7087/api/' + query);
    return await lastValueFrom(this.http.get(url.toString()));
  }

  async processPost(query: string, body: any): Promise<any> {
    const url = new URL('https://localhost:7087/api/' + query);
    return await lastValueFrom(this.http.post(url.toString(), body));
  }
}
