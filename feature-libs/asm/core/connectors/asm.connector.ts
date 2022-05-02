import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  CustomerSearchOptions,
  CustomerSearchPage,
} from '../models/asm.models';
import { CustomerListsPage } from '@spartacus/asm/root';
import { AsmAdapter } from './asm.adapter';

@Injectable({
  providedIn: 'root',
})
export class AsmConnector {
  constructor(protected asmAdapter: AsmAdapter) {}

  customerSearch(
    options: CustomerSearchOptions
  ): Observable<CustomerSearchPage> {
    return this.asmAdapter.customerSearch(options);
  }

  customerLists(): Observable<CustomerListsPage> {
    return this.asmAdapter.customerLists();
  }
}
