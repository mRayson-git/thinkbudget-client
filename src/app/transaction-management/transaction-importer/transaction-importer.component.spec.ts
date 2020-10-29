import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransactionImporterComponent } from './transaction-importer.component';

describe('TransactionImporterComponent', () => {
  let component: TransactionImporterComponent;
  let fixture: ComponentFixture<TransactionImporterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransactionImporterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransactionImporterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
