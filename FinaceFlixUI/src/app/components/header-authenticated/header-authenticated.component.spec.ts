import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAuthenticatedComponent } from './header-authenticated.component';

describe('HeaderAuthenticatedComponent', () => {
  let component: HeaderAuthenticatedComponent;
  let fixture: ComponentFixture<HeaderAuthenticatedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderAuthenticatedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderAuthenticatedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
