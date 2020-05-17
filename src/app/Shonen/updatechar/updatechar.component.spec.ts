import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdatecharComponent } from './updatechar.component';

describe('UpdatecharComponent', () => {
  let component: UpdatecharComponent;
  let fixture: ComponentFixture<UpdatecharComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ UpdatecharComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdatecharComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
