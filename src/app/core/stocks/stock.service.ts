import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from './stock';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  constructor(
    private readonly httpClient: HttpClient
  ) { }

  getAllStocks() {
    return this.httpClient.get<Stock[]>(`${environment.projectApi}/stocks`);
  }

  getStock(id: number) {
    return this.httpClient.get<Stock>(`${environment.projectApi}/stocks/${id}`);
  }

  createStock(stock: Stock) {
    return this.httpClient.post<Stock>(`${environment.projectApi}/stocks`, stock);
  }

  editStock(id: number, stock: Stock) {
    return this.httpClient.put(`${environment.projectApi}/stocks/${id}`, stock);
  }

  deleteStock(id: number) {
    return this.httpClient.delete(`${environment.projectApi}/stocks/${id}`);
  }
}
