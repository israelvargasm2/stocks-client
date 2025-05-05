import { Component, OnInit } from '@angular/core';
import { Stock } from '../../core/stocks/stock';
import { StockService } from '../../core/stocks/stock.service';
import { forkJoin } from 'rxjs';
import { StockFromApiService } from '../../core/stocks-from-api/stock-from-api.service';
import { StockFromApi } from '../../core/stocks-from-api/stock-from-api';
import { StockUnderAnalysis } from '../../core/stocks-under-analysis/stock-under-analysis';
import { DashboardTableComponent } from '../dashboard-table/dashboard-table.component';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardTableComponent,
    ProgressSpinnerComponent
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  stocks: Stock[] = [];
  stocksFromApi: StockFromApi[] = [];
  stocksUnderAnalysis: StockUnderAnalysis[] = [];
  showProgressSpinner: boolean = false;

  constructor(
    private readonly stockService: StockService,
    private readonly stocksFromApiService: StockFromApiService
  ) { }

  ngOnInit(): void {
    this.showProgressSpinner = true;
    forkJoin({
      stocks: this.stockService.getAllStocks()
    }).pipe().subscribe({
      next: (responses) => {
        this.stocks = responses.stocks;
        const symbols = this.stocks.map(item => item.name);
        this.getStocksFromApi(symbols);
      }, error: (err) => {

      }
    });
  }

  getStocksFromApi(symbols: string[]) {
    this.stocksFromApiService.getStocksFromApi(symbols).subscribe({
      next: (res) => {
        this.stocksFromApi = res;
        this.buildStocksUnderAnalysis();
      }
    });
  }

  buildStocksUnderAnalysis() {
    this.stocksUnderAnalysis = [];
    for (let stock of this.stocks) {
      const price = this.stocksFromApi.find(item => item.symbol === stock.name)?.price as number;
      const totalPrice = stock.quantity * price;
      this.stocksUnderAnalysis.push({
        id: stock.id,
        name: stock.name,
        quantity: stock.quantity,
        mount: stock.mount,
        price,
        capitalGain: parseFloat((totalPrice - stock.mount).toFixed(2)),
        capitalGainPercentage: parseFloat((((totalPrice - stock.mount) * 100) / stock.mount).toFixed(2))
      });
    }
    this.showProgressSpinner = false;
  }
}
