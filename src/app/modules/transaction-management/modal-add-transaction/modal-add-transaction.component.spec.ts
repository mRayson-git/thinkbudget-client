import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalAddTransactionComponent } from './modal-add-transaction.component';

describe('ModalAddTransactionComponent', () => {
  let component: ModalAddTransactionComponent;
  let fixture: ComponentFixture<ModalAddTransactionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalAddTransactionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalAddTransactionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
