import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActiveWorkComponent } from './active-work.component';

describe('ActiveWorkComponent', () => {
  let component: ActiveWorkComponent;
  let fixture: ComponentFixture<ActiveWorkComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ActiveWorkComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ActiveWorkComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
