import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GadgetTracerDeleteSelectDialogComponent } from './gadget-tracer-delete-select-dialog.component';

describe('GadgetUserDeleteSelectDialogComponent', () => {
  let component: GadgetTracerDeleteSelectDialogComponent;
  let fixture: ComponentFixture<GadgetTracerDeleteSelectDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GadgetTracerDeleteSelectDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GadgetTracerDeleteSelectDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
