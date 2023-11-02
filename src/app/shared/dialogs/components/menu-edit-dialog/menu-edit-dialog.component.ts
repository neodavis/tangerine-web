import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormArray, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, finalize, map, Observable, of, startWith, switchMap, take, tap, withLatestFrom } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Menu } from '@shared/menu/models';
import { Receipt } from '@shared/receipt/models';
import { MenuService } from '@shared/menu/services';
import { ReceiptService } from '@shared/receipt/services';

@UntilDestroy()
@Component({
  selector: 'app-menu-edit-dialog',
  templateUrl: './menu-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuService, ReceiptService],
})
export class MenuEditDialogComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  menu$: Observable<Menu | null> = this.data?.id ? this.menuService.getById(this.data.id) : of(null);
  receipts$: Observable<Receipt[]> = this.receiptService.getAll();
  receiptOptions$: Observable<Receipt[]> = this.receipts$;

  menuForm: FormGroup = this.formBuilder.group({
    name: ['', Validators.required],
    receipt: '',
    receipts: this.formBuilder.array([] as Receipt[]),
  })

  private selectedPhoto!: File;
  private photoChanged!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private dialogRef: MatDialogRef<MenuEditDialogComponent>,
    private formBuilder: FormBuilder,
    private menuService: MenuService,
    private receiptService: ReceiptService,
  ) { }

  ngOnInit(): void {
    this.loadMenu();
    this.loadReceiptOptions();
  }

  submitDialog(): void {
    const saveAction = this.data.id ? this.menuService.save(this.menuForm.value) : this.menuService.update(this.menuForm.value);

    this.loading$.next(true)

    if (this.photoChanged) {
      this.menuService.savePhoto(this.selectedPhoto)
        .pipe(untilDestroyed(this))
        .subscribe();
    }

    saveAction
      .pipe(
        tap(() => this.closeDialog()),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe();
  }

  closeDialog(): void {
    this.dialogRef.close();
  }

  get receiptsControl() {
    return this.menuForm.controls['receipts'] as FormArray<FormControl<Receipt>>;
  }

  private loadMenu(): void {
    this.loading$.next(true);
    this.menu$
      .pipe(
        take(1),
        tap((menu: Menu | null) => {
          this.setName(menu?.name ?? '');
          this.setReceipts(menu?.receipts ?? []);
          this.observeAddReceiptControlChange();
        }),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe()
  }

  private setName(name: string): void {
    this.menuForm.controls['name'].setValue(name);
  }

  private setReceipts(receipts: Receipt[]): void {
    const receiptFormGroups: FormGroup[] = receipts.map(receipt => this.formBuilder.group(receipt));
    const receiptFormArray: FormArray = this.formBuilder.array(receiptFormGroups);

    this.menuForm.setControl('receipts', receiptFormArray);
  }

  private observeAddReceiptControlChange() {
    this.menuForm.controls['receipt'].valueChanges
      .pipe(
        switchMap((id: string) => this.receipts$
          .pipe(
            map((receipts: Receipt[]) => receipts.find(receipt => receipt.id === id)!),
            tap((receipt: Receipt) => {
              this.addReceipt(receipt);
            })
          ))
      )
      .subscribe()
  }

  private addReceipt(receipt: Receipt) {
    const receiptControl: FormControl = this.formBuilder.control(receipt);
    this.receiptsControl.push(receiptControl);

    this.menuForm.controls['receipt'].reset('', {emitEvent: false});
  }

  private loadReceiptOptions() {
    this.receiptOptions$ = this.receiptsControl.valueChanges
      .pipe(
        startWith(this.receiptsControl.value),
        withLatestFrom(this.receipts$),
        map(([selectedReceipts, receipts]) => {

          return receipts.filter(item => !selectedReceipts.some(receipt => receipt.id === item.id));
        })
      )
  }

  onFileSelected(event: Event) {
    this.selectedPhoto = (event.target as HTMLInputElement).files![0];
    this.photoChanged = true;
  }
}
