import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroruComponent } from './erroru.component';

describe('ErroruComponent', () => {
  let component: ErroruComponent;
  let fixture: ComponentFixture<ErroruComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroruComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroruComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
