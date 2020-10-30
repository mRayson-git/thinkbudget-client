import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecordComponent } from './modal-record.component';

describe('ModalRecordComponent', () => {
  let component: ModalRecordComponent;
  let fixture: ComponentFixture<ModalRecordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRecordComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
