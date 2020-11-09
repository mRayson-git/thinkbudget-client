import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalRecentlyAddedComponent } from './modal-recently-added.component';

describe('ModalRecentlyAddedComponent', () => {
  let component: ModalRecentlyAddedComponent;
  let fixture: ComponentFixture<ModalRecentlyAddedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalRecentlyAddedComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ModalRecentlyAddedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
