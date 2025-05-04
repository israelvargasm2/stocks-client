import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StockFromApi } from './stock-from-api';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockFromApiService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getStocksFromApi(symbols: string[]) {
    const symbol = symbols;
    return this.httpClient.get<StockFromApi[]>(`${environment.projectApi}/stocks-from-api`, {
      params: new HttpParams({
        fromObject: { symbol }
      }),
    });
  }
}
