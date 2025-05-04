import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { Stock } from '../../core/stocks/stock';
import { MatDialog } from '@angular/material/dialog';
import { RouterLink } from '@angular/router';
import { DeleteStockDialogComponent } from '../delete-stock-dialog/delete-stock-dialog.component';

@Component({
  selector: 'app-stocks-table',
  imports: [
    MatTableModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
  ],
  templateUrl: './stocks-table.component.html',
  styleUrl: './stocks-table.component.css'
})
export class StocksTableComponent implements OnChanges {
  @Input("stocks") stocks: Stock[] = [];
  @Output("deleteStock") deleteStock = new EventEmitter<number>();
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  dataSource = new MatTableDataSource(this.stocks);
  columns: string[] = [];

  constructor(
    private readonly matDialog: MatDialog,
  ) { }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["stocks"]) {
      this.stocks = changes["stocks"].currentValue;
      this.updateDataSource();
    }
  }

  updateDataSource() {
    const stock: Stock = {
      id: 0,
      name: "",
      quantity: 0,
      mount: 0
    };
    this.columns = Object.keys(stock);
    this.columns.push("actions")
    this.dataSource = new MatTableDataSource(this.stocks);
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
      case "actions":
        return "Acciones";
      default:
        return column;
    }
  }

  openDeleteStockDialog(id: number) {
    const dialog = this.matDialog.open(DeleteStockDialogComponent);
    dialog.afterClosed().subscribe({
      next: (res) => {
        if (res) {
          this.deleteStock.emit(id);
        }
      }
    });
  }
}
