import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CrudUiComponent } from './gadget-tracer-log-crud.componant';

describe('CrudUiComponent', () => {
  let component: CrudUiComponent;
  let fixture: ComponentFixture<CrudUiComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CrudUiComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CrudUiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
