import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVideoListComponent } from './header-video-list.component';

describe('HeaderVideoListComponent', () => {
  let component: HeaderVideoListComponent;
  let fixture: ComponentFixture<HeaderVideoListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ HeaderVideoListComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HeaderVideoListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
