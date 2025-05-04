import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogContent, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-delete-stock-dialog',
  imports: [
    MatDialogContent,
    MatButtonModule,
  ],
  templateUrl: './delete-stock-dialog.component.html',
  styleUrl: './delete-stock-dialog.component.css'
})
export class DeleteStockDialogComponent {
  readonly matDialogRef = inject(MatDialogRef<DeleteStockDialogComponent>);

  closeDialog() {
    this.matDialogRef.close();
  }

  confirmDelete() {
    this.matDialogRef.close(true);
  }
}
