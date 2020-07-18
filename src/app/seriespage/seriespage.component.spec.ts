import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SeriespageComponent } from './seriespage.component';

describe('SeriespageComponent', () => {
  let component: SeriespageComponent;
  let fixture: ComponentFixture<SeriespageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SeriespageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SeriespageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
