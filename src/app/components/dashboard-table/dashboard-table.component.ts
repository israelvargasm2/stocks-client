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
      totalPrice: 0,
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
      case "totalPrice":
        return "Precio total en mercado";
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
      return "green-text";
    } else if (capitalGain < 0) {
      return "red-text";
    } else {
      return "gray-text";
    }
  }

  setClassToCapitalGainPercentage(capitalGain: number) {
    if (capitalGain > 0) {
      return "green-box";
    } else if (capitalGain < 0) {
      return "red-box";
    } else {
      return "gray-box";
    }
  }
}
