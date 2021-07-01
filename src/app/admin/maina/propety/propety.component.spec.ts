import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PropetyComponent } from './propety.component';

describe('PropetyComponent', () => {
  let component: PropetyComponent;
  let fixture: ComponentFixture<PropetyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PropetyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PropetyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
