import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MytopicComponent } from './mytopic.component';

describe('MytopicComponent', () => {
  let component: MytopicComponent;
  let fixture: ComponentFixture<MytopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MytopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MytopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
