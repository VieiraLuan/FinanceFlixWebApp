import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GenericBackButtonComponent } from './generic-back-button.component';

describe('GenericBackButtonComponent', () => {
  let component: GenericBackButtonComponent;
  let fixture: ComponentFixture<GenericBackButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GenericBackButtonComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GenericBackButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
