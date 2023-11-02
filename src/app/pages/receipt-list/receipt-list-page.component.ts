import { ChangeDetectionStrategy, Component } from '@angular/core';
import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs';
import { GridOptions, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';

import { ReceiptService } from '@shared/receipt/services';
import { Receipt } from '@shared/receipt/models';
import { MatDialog } from '@angular/material/dialog';
import { ReceiptEditDialogComponent } from '@shared/dialogs/components';

@Component({
  selector: 'app-receipt-list',
  templateUrl: './receipt-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [ReceiptService],
})
export class ReceiptListPageComponent {
  collection$: Observable<Receipt[]> = this.receiptService.getAll();

  constructor(
    private receiptService: ReceiptService,
    private datePipe: DatePipe,
    private dialog: MatDialog,
  ) { }

  gridOptions: GridOptions = {
    onGridReady: (event: GridReadyEvent) => this.onGridReady(event),
    onRowClicked: (event: RowClickedEvent) => this.openReceiptEditDialog(event.data.id),
    pagination: true,
    paginationPageSize: 25,
    suppressMovableColumns: true,
    defaultColDef: {sortable: true, resizable: false},
    rowModelType: 'clientSide',
    suppressRowClickSelection: true,
    columnDefs: [
      {colId: "Name_colId", headerName: "Receipt Name", field: 'name'},
      {colId: "Difficulty_colId", headerName: "Difficulty", field: 'difficulty'},
      {colId: "Price_colId", headerName: "Duration", valueGetter: (params) => params.data.duration},
      {colId: "Price_at_colId", headerName: "Products cost", field: 'price',},
      {colId: "Photo_by_colId", headerName: "Photo", field: 'photo'},
      {
        colId: "Created_by_colId",
        headerName: "Created At",
        valueGetter: (params) => this.datePipe.transform(params.data.createdAt)
      },
      {colId: "Created_at_colId", headerName: "Created By", field: 'createdBy'},
    ],
  }

  private onGridReady(event: GridReadyEvent) {
    event.api.sizeColumnsToFit();
  }

  private openReceiptEditDialog(id: string): void {
    this.dialog.closeAll();
    this.dialog.open(ReceiptEditDialogComponent, {data: {id}})
  }
}
