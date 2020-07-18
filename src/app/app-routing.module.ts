import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CharactersComponent } from './Shonen/characters/characters.component';
import { UpdatecharComponent } from './Shonen/updatechar/updatechar.component';
import { UserComponent } from './log/user/user.component';
import {LoginComponent} from './login/login.component'
import {SubscribComponent} from './subscrib/subscrib.component'
import { AnimeSeriesComponent  } from './anime-series/anime-series.component';
import {SeriespageComponent} from './seriespage/seriespage.component'
import { HomepageComponent } from './homepage/homepage.component'
import {RankingpageComponent} from './rankingpage/rankingpage.component'
const routes: Routes = [
  {
    path: '',
    data:{
      breadcrumb: 'Home'
    },
    component: HomepageComponent
  },
  // {
  //   path: 'home',
  //   data:{
  //     breadcrumb: 'Home'
  //   },
  //   component: HomepageComponent
  // },
  {
    path: 'user',
    component: UserComponent
  },
  // {
  //   path: 'login',
  //   data:{
  //     breadcrumb: 'Login'
  //   },
  //   component: LoginComponent
  // },
  {
    path: 'subscribe',
    data:{
      breadcrumb: 'Subscribe'
    },
    component: SubscribComponent
  },
  {
    path: 'series',
    data:{
      breadcrumb: 'Series'
    },
    // component: AnimeSeriesComponent
    component: SeriespageComponent
  },
  {
    path: 'character',
    data:{
      breadcrumb: 'Character'
    },
    component: CharactersComponent
  },
  {
    path: 'update',
    data:{
      breadcrumb: 'Update'
    },
    component: UpdatecharComponent
  },
  {
    path: 'rank',
    data:{
      breadcrumb: 'Rank'
    },
    component: RankingpageComponent
  }
//   {
//   path: '',
//   component: HomepageComponent,
//   children : [
//       {
//         path: 'home',
//         data:{
//           breadcrumb: 'Home'
//         },
//         component: HomepageComponent,
        
//       },
//       {
//         path: 'user',
//         data:{
//           breadcrumb: 'User'
//         },
//         component: UserComponent,
//         children : [
//           {
//             path: 'subscribe',
//             data:{
//               breadcrumb: 'Subscribe'
//             },
//             component: SubscribComponent
//           }
//         ]
//       },
//       {
//         path: 'series',
//         data:{
//           breadcrumb: 'Series'
//         },
//         component: AnimeSeriesComponent,
//         children : [
//         {
//           path: 'character',
//           data:{
//             breadcrumb: 'Character'
//           },
//           component: CharactersComponent
//         },
//         {
//           path: 'update',
//           data:{
//             breadcrumb: 'Update'
//           },
//           component: UpdatecharComponent
//         },
//         {
//           path: 'rank',
//           data:{
//             breadcrumb: 'Rank'
//           },
//           component: RankingpageComponent
//         }
//       ]
//     }
//   ]
// }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
