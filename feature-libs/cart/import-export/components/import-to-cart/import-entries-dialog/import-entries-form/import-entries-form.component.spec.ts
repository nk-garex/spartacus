import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  ProductImportInfo,
  ProductImportStatus,
  ProductsData,
  ImportExportConfig,
  defaultImportExportConfig,
} from '@spartacus/cart/import-export/core';
import { I18nTestingModule, LanguageService } from '@spartacus/core';
import {
  FileUploadModule,
  FormErrorsModule,
  LaunchDialogService,
  FilesFormValidators,
  ImportCsvFileService,
} from '@spartacus/storefront';
import { Observable, of } from 'rxjs';
import { ImportToCartService } from '../../import-to-cart.service';
import { ImportEntriesFormComponent } from './import-entries-form.component';

const mockLoadFileData: string[][] = [
  ['693923', '1', 'mockProduct1', '$4.00'],
  ['232133', '2', 'mockProduct2', '$5.00'],
];

const mockCsvString =
  'Sku,Quantity,Name,Price\n693923,1,mockProduct1,$4.00\n232133,2,"mockProduct2",$5.00';

const mockFile: File = new File([mockCsvString], 'mockFile.csv', {
  type: 'text/csv',
});

const mockProducts: ProductsData = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const mockLoadProduct: ProductImportInfo = {
  productCode: '123456',
  statusCode: ProductImportStatus.SUCCESS,
};

class MockLaunchDialogService implements Partial<LaunchDialogService> {
  closeDialog(_reason: string): void {}
}

class MockImportToCartService implements Partial<ImportToCartService> {
  loadProductsToCart = () => of(mockLoadProduct);
  isDataParsableToProducts = () => true;
  csvDataToProduct = () => mockProducts;
}

class MockImportCsvFileService implements Partial<ImportCsvFileService> {
  loadFile = () => of(mockLoadFileData);
  validateFile = () => of(null);
}

class MockLanguageService {
  getActive(): Observable<string> {
    return of('en-US');
  }
}

describe('ImportEntriesFormComponent', () => {
  let component: ImportEntriesFormComponent;
  let fixture: ComponentFixture<ImportEntriesFormComponent>;
  let launchDialogService: LaunchDialogService;
  let importToCartService: ImportToCartService;
  let filesFormValidators: FilesFormValidators;
  let importCsvService: ImportCsvFileService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        FormErrorsModule,
        FileUploadModule,
        FormsModule,
        ReactiveFormsModule,
        I18nTestingModule,
      ],
      declarations: [ImportEntriesFormComponent],
      providers: [
        { provide: LaunchDialogService, useClass: MockLaunchDialogService },
        { provide: ImportToCartService, useClass: MockImportToCartService },
        { provide: ImportCsvFileService, useClass: MockImportCsvFileService },
        { provide: LanguageService, useClass: MockLanguageService },
        { provide: ImportExportConfig, useValue: defaultImportExportConfig },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(ImportEntriesFormComponent);
    component = fixture.componentInstance;

    launchDialogService = TestBed.inject(LaunchDialogService);
    importToCartService = TestBed.inject(ImportToCartService);
    filesFormValidators = TestBed.inject(FilesFormValidators);
    importCsvService = TestBed.inject(ImportCsvFileService);

    spyOn(importToCartService, 'loadProductsToCart').and.callThrough();
    spyOn(importCsvService, 'validateFile').and.callThrough();
    spyOn(filesFormValidators, 'maxSize').and.callThrough();
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should get the file Validity', () => {
    expect(component.componentData.fileValidity).toEqual(
      defaultImportExportConfig.cartImportExport.import.fileValidity
    );
  });

  it('should close dialog on close method', () => {
    const mockCloseReason = 'Close Import Products Dialog';
    spyOn(launchDialogService, 'closeDialog');
    component.close(mockCloseReason);

    expect(launchDialogService.closeDialog).toHaveBeenCalledWith(
      mockCloseReason
    );
  });

  it('should build the form', () => {
    expect(component.form?.get('file')?.value).toBeDefined();
  });

  it('should validate maximum size and parsable file while building form', () => {
    expect(filesFormValidators.maxSize).toHaveBeenCalled();
  });

  it('should trigger submit event when save method is called', () => {
    component.form.get('file')?.setValue([mockFile]);
    const mockSubmitData = {
      products: mockProducts,
    };
    spyOn(component.submitEvent, 'emit');
    component.save();

    expect(component.submitEvent.emit).toHaveBeenCalledWith(mockSubmitData);
  });
});
