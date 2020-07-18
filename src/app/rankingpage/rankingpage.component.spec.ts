import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RankingpageComponent } from './rankingpage.component';

describe('RankingpageComponent', () => {
  let component: RankingpageComponent;
  let fixture: ComponentFixture<RankingpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
