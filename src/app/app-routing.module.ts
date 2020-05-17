import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './Shonen/characters/characters.component';
import { UpdatecharComponent } from './Shonen/updatechar/updatechar.component';
import { UserComponent } from './log/user/user.component';
import {LoginComponent} from './login/login.component'
import {SubscribComponent} from './subscrib/subscrib.component'
import { AnimeSeriesComponent  } from './anime-series/anime-series.component';

const routes: Routes = [
  {
    path: 'user',
    component: UserComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'subscribe',
    component: SubscribComponent
  },
  {
    path: 'series',
    component: AnimeSeriesComponent 
  },
  {
    path: 'character',
    component: CharactersComponent
  },
  {
    path: 'update',
    component: UpdatecharComponent
  },
  {
    path: '',
    component: UserComponent 
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
