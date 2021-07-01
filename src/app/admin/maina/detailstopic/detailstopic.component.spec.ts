import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailstopicComponent } from './detailstopic.component';

describe('DetailstopicComponent', () => {
  let component: DetailstopicComponent;
  let fixture: ComponentFixture<DetailstopicComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DetailstopicComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DetailstopicComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
