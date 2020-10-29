import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParserCreatorComponent } from './parser-creator.component';

describe('ParserCreatorComponent', () => {
  let component: ParserCreatorComponent;
  let fixture: ComponentFixture<ParserCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParserCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParserCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
