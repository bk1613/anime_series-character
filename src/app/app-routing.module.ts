import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './Shonen/characters/characters.component';

import { AnimeSeriesComponent  } from './anime-series/anime-series.component';

const routes: Routes = [
  {
    path: 'series',
    component: AnimeSeriesComponent 
  },
  {
    path: 'character',
    component: CharactersComponent
  },
  {
    path: '',
    component: AnimeSeriesComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
