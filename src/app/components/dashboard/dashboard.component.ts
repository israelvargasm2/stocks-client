import { Component, inject, OnInit } from '@angular/core';
import { Stock } from '../../core/stocks/stock';
import { StockService } from '../../core/stocks/stock.service';
import { forkJoin } from 'rxjs';
import { StockFromApiService } from '../../core/stocks-from-api/stock-from-api.service';
import { StockFromApi } from '../../core/stocks-from-api/stock-from-api';
import { StockUnderAnalysis } from '../../core/stocks-under-analysis/stock-under-analysis';
import { DashboardTableComponent } from '../dashboard-table/dashboard-table.component';
import { ProgressSpinnerComponent } from '../progress-spinner/progress-spinner.component';
import { MatCardModule } from '@angular/material/card';
import { HeaderService } from '../header/header.service';

@Component({
  selector: 'app-dashboard',
  imports: [
    DashboardTableComponent,
    ProgressSpinnerComponent,
    MatCardModule,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {
  private readonly headerService = inject(HeaderService);

  stocks: Stock[] = [];
  stocksFromApi: StockFromApi[] = [];
  stocksUnderAnalysis: StockUnderAnalysis[] = [];
  showProgressSpinner: boolean = false;
  totalCapitalGain: number = 0;
  totalCapitalGainPercentage: number = 0;
  totalMount: number = 0;

  constructor(
    private readonly stockService: StockService,
    private readonly stocksFromApiService: StockFromApiService
  ) { }

  ngOnInit(): void {
    this.headerService.show = true;
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
        totalPrice: parseFloat(totalPrice.toFixed(2)),
        capitalGain: parseFloat((totalPrice - stock.mount).toFixed(2)),
        capitalGainPercentage: parseFloat((((totalPrice - stock.mount) * 100) / stock.mount).toFixed(2))
      });
    }
    this.getTotalCapitalGain();
    this.getTotalCapitalGainPercentage();
    this.getTotalMount();
    this.showProgressSpinner = false;
  }

  getTotalCapitalGain() {
    this.totalCapitalGain = parseFloat(this.stocksUnderAnalysis.map(item => item.capitalGain).reduce((acc, curr) => acc + curr, 0).toFixed(2));
  }

  getTotalCapitalGainPercentage() {
    this.totalCapitalGainPercentage = parseFloat((this.totalCapitalGain / this.stocksUnderAnalysis.map(item => item.totalPrice).reduce((acc, curr) => acc + curr, 0) * 100).toFixed(2));
  }

  getTotalMount() {
    this.totalMount = parseFloat(this.stocksUnderAnalysis.map(item => item.mount).reduce((acc, curr) => acc + curr, 0).toFixed(2));
  }
}
