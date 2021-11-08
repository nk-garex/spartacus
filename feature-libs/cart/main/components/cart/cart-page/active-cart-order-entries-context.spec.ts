import { TestBed } from '@angular/core/testing';
import { Action, ActionsSubject } from '@ngrx/store';
import {
  ActiveCartFacade,
  OrderEntry,
  ProductData,
} from '@spartacus/cart/main/root';
import { of, Subject } from 'rxjs';
import { ActiveCartOrderEntriesContext } from './active-cart-order-entries-context';
import createSpy = jasmine.createSpy;

const mockActionsSubject = new Subject<Action>();

const mockCartId = '00004546';

const mockProductData: ProductData[] = [
  { productCode: '693923', quantity: 1 },
  { productCode: '232133', quantity: 2 },
];

const mockEntries: OrderEntry[] = [
  {
    quantity: 1,
    product: { name: 'mockProduct', code: 'mockCode' },
  },
];

class MockActiveCartFacade implements Partial<ActiveCartFacade> {
  addEntries = createSpy().and.callThrough();
  getEntries = createSpy().and.returnValue(of(mockEntries));
  getActiveCartId = createSpy().and.returnValue(of(mockCartId));
}

describe('ActiveCartOrderEntriesContext', () => {
  let service: ActiveCartOrderEntriesContext;
  let activeCartFacade: ActiveCartFacade;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        { useValue: mockActionsSubject, provide: ActionsSubject },
        { useClass: MockActiveCartFacade, provide: ActiveCartFacade },
      ],
    });
    service = TestBed.inject(ActiveCartOrderEntriesContext);
    activeCartFacade = TestBed.inject(ActiveCartFacade);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  describe('addEntries', () => {
    it('addEntries for active cart', () => {
      service.addEntries(mockProductData).subscribe().unsubscribe();

      expect(activeCartFacade.addEntries).toHaveBeenCalledWith([
        { product: { code: '693923' }, quantity: 1 },
        { product: { code: '232133' }, quantity: 2 },
      ]);
      expect(activeCartFacade.getActiveCartId).toHaveBeenCalledWith();
    });
  });

  describe('getEntries', () => {
    it('getEntries from active cart', () => {
      let entries: OrderEntry[];
      service
        .getEntries()
        .subscribe((result) => {
          entries = result;
        })
        .unsubscribe();

      expect(activeCartFacade.getEntries).toHaveBeenCalledWith();
      expect(entries).toEqual(mockEntries);
    });
  });
});
