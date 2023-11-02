import { ChangeDetectionStrategy, Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { BehaviorSubject, filter, finalize, Observable, of, take, tap, } from 'rxjs';
import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';

import { Receipt } from '@shared/receipt/models';
import { MenuService } from '@shared/menu/services';
import { ReceiptService } from '@shared/receipt/services';

@UntilDestroy()
@Component({
  selector: 'app-receipt-edit-dialog',
  templateUrl: './receipt-edit-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [MenuService, ReceiptService],
})
export class ReceiptEditDialogComponent implements OnInit {
  loading$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  receipt$: Observable<Receipt | null> = this.data?.id ? this.receiptService.getById(this.data.id) : of(null)

  isReadOnly!: boolean;
  receiptForm: FormGroup = this.formBuilder.group({
    name: [{value: '', disabled: this.isReadOnly}, Validators.required],
    quantity: [{value: '', disabled: this.isReadOnly}, Validators.required],
    duration: [{value: '', disabled: this.isReadOnly}, Validators.required],
    difficulty: [{value: '', disabled: this.isReadOnly}, Validators.required],
    price: [{value: '', disabled: this.isReadOnly}, Validators.required],
    photo: [{value: null, disabled: this.isReadOnly}, Validators.required],
  });

  private selectedPhoto!: File;
  private photoChanged!: boolean;

  constructor(
    @Inject(MAT_DIALOG_DATA) private data: { id: string },
    private dialogRef: MatDialogRef<ReceiptEditDialogComponent>,
    private receiptService: ReceiptService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.loadReceipt();
  }

  submitDialog(): void {
    const saveAction = this.data.id ? this.receiptService.save(this.receiptForm.value) : this.receiptService.update(this.receiptForm.value);

    this.loading$.next(true)

    if (this.photoChanged) {
      this.receiptService.savePhoto(this.selectedPhoto)
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

  private loadReceipt(): void {
    this.loading$.next(true);
    this.receipt$
      .pipe(
        take(1),
        filter(Boolean),
        tap((receipt: Receipt) => this.setFormData(receipt)),
        finalize(() => this.loading$.next(false)),
        untilDestroyed(this),
      )
      .subscribe()
  }

  private setFormData(receipt: Receipt): void {
    this.receiptForm.patchValue(receipt);
  }

  onFileSelected(event: Event) {
    this.selectedPhoto = (event.target as HTMLInputElement).files![0];
    this.photoChanged = true;
  }
}
