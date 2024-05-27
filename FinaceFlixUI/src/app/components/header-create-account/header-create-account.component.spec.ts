import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCreateAccountComponent } from './header-create-account.component';

describe('HeaderCreateAccountComponent', () => {
  let component: HeaderCreateAccountComponent;
  let fixture: ComponentFixture<HeaderCreateAccountComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderCreateAccountComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderCreateAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
