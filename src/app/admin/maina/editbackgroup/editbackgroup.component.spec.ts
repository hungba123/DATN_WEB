import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditbackgroupComponent } from './editbackgroup.component';

describe('EditbackgroupComponent', () => {
  let component: EditbackgroupComponent;
  let fixture: ComponentFixture<EditbackgroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditbackgroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditbackgroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
