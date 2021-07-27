import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit,
} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { of, Subscription } from 'rxjs';
import { finalize, switchMap, take, tap } from 'rxjs/operators';
import {
  ImportExportConfig,
  InvalidFileInfo,
  ImportService,
  FileValidity,
} from '@spartacus/cart/import-export/core';
import {
  FocusConfig,
  ICON_TYPE,
  LaunchDialogService,
} from '@spartacus/storefront';
import { ImportToCartService } from '../import-to-cart.service';

@Component({
  selector: 'cx-import-entries-dialog',
  templateUrl: './import-entries-dialog.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ImportEntriesDialogComponent implements OnInit, OnDestroy {
  iconTypes = ICON_TYPE;
  form: FormGroup = this.build();
  focusConfig: FocusConfig = {
    trap: true,
    block: true,
    autofocus: 'button',
    focusOnEscape: true,
  };
  fileValidity: FileValidity;
  descriptionMaxLength: number = 250;
  nameMaxLength: number = 50;
  loadedFile: string[][] | null;
  fileError: InvalidFileInfo = {};
  subscription = new Subscription();

  get descriptionsCharacterLeft(): number {
    return (
      this.descriptionMaxLength -
      (this.form.get('description')?.value?.length || 0)
    );
  }

  constructor(
    protected launchDialogService: LaunchDialogService,
    protected importExportConfig: ImportExportConfig,
    protected importToCartService: ImportToCartService,
    protected importService: ImportService
  ) {}

  ngOnInit() {
    this.launchDialogService.data$
      .pipe(take(1))
      .subscribe((fileValidity: FileValidity) => {
        this.fileValidity = fileValidity;
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  close(reason: string): void {
    this.launchDialogService.closeDialog(reason);
  }

  loadFile(file: File, form: FormGroup) {
    this.fileError = {};
    of(file)
      .pipe(
        tap((fileData: File) => {
          this.validateMaxSize(fileData);
        }),
        switchMap((fileData) => this.importService.loadFile(fileData)),
        tap((data: string[][]) => {
          this.validateEmpty(data);
          this.validateParsable(data);
        }),
        finalize(() => {
          form.get('file')?.updateValueAndValidity();
        })
      )
      .subscribe(
        (data: string[][]) => {
          this.loadedFile = data;
        },
        () => {
          this.loadedFile = null;
        }
      );
  }

  importProducts(): void {
    if (this.loadedFile) {
      this.subscription.add(
        this.importToCartService
          .loadProductsToCart(this.loadedFile, {
            name: this.form.get('name')?.value,
            description: this.form.get('description')?.value,
          })
          .subscribe((data) => console.log(data))
      );
    }
  }

  protected build(): FormGroup {
    const form = new FormGroup({});
    form.setControl(
      'file',
      new FormControl('', [Validators.required, () => this.fileError])
    );
    form.setControl(
      'name',
      new FormControl('', [
        Validators.required,
        Validators.maxLength(this.nameMaxLength),
      ])
    );
    form.setControl(
      'description',
      new FormControl('', [Validators.maxLength(this.descriptionMaxLength)])
    );
    return form;
  }

  protected validateMaxSize(file: File) {
    if (
      this.fileValidity?.maxSize &&
      file.size / 1000000 > this.fileValidity?.maxSize
    ) {
      this.fileError.tooLarge = true;
      throw Error();
    }
  }

  protected validateEmpty(data: string[][]) {
    if (data.toString().length === 0) {
      this.fileError.empty = true;
      throw Error();
    }
  }

  protected validateParsable(data: string[][]) {
    if (!this.importToCartService.isDataParsable(data)) {
      this.fileError.notParsable = true;
      throw Error();
    }
  }
}
