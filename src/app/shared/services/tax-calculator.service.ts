import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TaxCalculatorService {
  constructor(private http: HttpClient) {}

  getTypes() {
    return this.http.get<string[]>(`${environment.taxUrl}/api/calc/types`);
  }

  getTaxes(sum: string, type: string) {
    return this.http.get(
      `${environment.taxUrl}/api/calc/taxes?salary=${sum}&taxType=${type}`
    );
  }
}
