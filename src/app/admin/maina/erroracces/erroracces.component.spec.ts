import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroraccesComponent } from './erroracces.component';

describe('ErroraccesComponent', () => {
  let component: ErroraccesComponent;
  let fixture: ComponentFixture<ErroraccesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ErroraccesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ErroraccesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
