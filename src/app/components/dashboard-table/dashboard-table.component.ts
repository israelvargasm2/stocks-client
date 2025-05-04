import { Component, Input, OnChanges, SimpleChanges, ViewChild } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { StockUnderAnalysis } from '../../core/stocks-under-analysis/stock-under-analysis';

@Component({
  selector: 'app-dashboard-table',
  imports: [
    MatTableModule
  ],
  templateUrl: './dashboard-table.component.html',
  styleUrl: './dashboard-table.component.css'
})
export class DashboardTableComponent implements OnChanges {
  @Input("stocksUnderAnalysis") stocksUnderAnalysis: StockUnderAnalysis[] = [];
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource = new MatTableDataSource(this.stocksUnderAnalysis);
  columns: string[] = [];

  constructor() { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["stocksUnderAnalysis"]) {
      this.stocksUnderAnalysis = changes["stocksUnderAnalysis"].currentValue;
      this.updateDataSource();
    }
  }

  updateDataSource() {
    const stockUnderAnalysis: StockUnderAnalysis = {
      id: 0,
      name: "",
      quantity: 0,
      mount: 0,
      price: 0,
      capitalGain: 0,
      capitalGainPercentage: 0
    };
    this.columns = Object.keys(stockUnderAnalysis);
    this.columns = this.columns.filter(item => !["id"].includes(item));
    this.dataSource = new MatTableDataSource(this.stocksUnderAnalysis);
    this.dataSource.paginator = this.paginator as MatPaginator;
  }

  getColumDisplayName(column: string) {
    switch (column) {
      case "name":
        return "Nombre";
      case "quantity":
        return "Numero de titulos";
      case "mount":
        return "Monto invertido";
      case "price":
        return "Precio en mercado";
      case "capitalGain":
        return "Plusvalia";
      case "capitalGainPercentage":
        return "Porcentaje en plusvalia";
      default:
        return column;
    }
  }

  setClassToCapitalGain(capitalGain: number) {
    if (capitalGain > 0) {
      return "capitalGainPlus";
    } else if (capitalGain < 0) {
      return "capitalGainMinus";
    } else {
      return "capitalGainZero";
    }
  }

  setClassToCapitalGainPercentage(capitalGain: number) {
    if (capitalGain > 0) {
      return "capitalGainPercentagePlus";
    } else if (capitalGain < 0) {
      return "capitalGainPercentageMinus";
    } else {
      return "capitalGainPercentageZero";
    }
  }
}
