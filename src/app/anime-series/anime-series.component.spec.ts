import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AnimeSeriesComponent } from './anime-series.component';

describe('AnimeSeriesComponent', () => {
  let component: AnimeSeriesComponent;
  let fixture: ComponentFixture<AnimeSeriesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AnimeSeriesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AnimeSeriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
