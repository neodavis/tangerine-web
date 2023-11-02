import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';

import { Observable } from 'rxjs';
import { GridOptions, GridReadyEvent, RowClickedEvent } from 'ag-grid-community';

import { MenuService } from '@shared/menu/services';
import { Menu } from '@shared/menu/models';
import { Receipt } from '@shared/receipt/models';
import { MenuEditDialogComponent } from '@shared/dialogs/components';

@Component({
  templateUrl: './menu-list-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuService],
})
export class MenuListPageComponent {
  collection$: Observable<Menu[]> = this.menuService.getAll();

  constructor(
    private menuService: MenuService,
    private dialog: MatDialog,
    private datePipe: DatePipe,
    private router: Router,
  ) { }

  gridOptions: GridOptions = {
    onGridReady: (event: GridReadyEvent) => this.onGridReady(event),
    onRowClicked: (event: RowClickedEvent) => this.openMenuEditDialog(event.data.id),
    pagination: true,
    paginationPageSize: 25,
    rowSelection: 'multiple',
    defaultColDef: {sortable: true, resizable: false},
    rowModelType: 'clientSide',
    suppressRowClickSelection: true,
    columnDefs: [
      {colId: "Name_colId", headerName: "Menu Name", valueGetter: (params) => params.data.name,},
      {colId: "Quantity_colId", headerName: "Items quantity", valueGetter: (params) => params.data.receipts.length},
      {
        colId: "Price_colId",
        headerName: "Average price",
        valueGetter: (params) => params.data.receipts.reduce((acc: number, item: Receipt) => acc += item.price, 0)
      },
      {
        colId: "Created_at_colId",
        headerName: "Created At",
        valueGetter: (params) => this.datePipe.transform(new Date(params.data.createdAt))
      },
      {colId: "Created_by_colId", headerName: "Created By", field: 'createdBy'},
    ],
  }

  private onGridReady(event: GridReadyEvent) {
    event.api.sizeColumnsToFit();
  }

  private openMenuEditDialog(id: string): void {
    this.dialog.closeAll();
    this.dialog.open(MenuEditDialogComponent, {data: {id}})
  }
}
