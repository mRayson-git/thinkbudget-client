import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategorySetterComponent } from './category-setter.component';

describe('CategorySetterComponent', () => {
  let component: CategorySetterComponent;
  let fixture: ComponentFixture<CategorySetterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategorySetterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategorySetterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
