import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CharactersComponent } from './Shonen/characters/characters.component';
import { AnimeSeriesComponent } from './anime-series/anime-series.component';
import { HttpClientModule } from '@angular/common/http';
import { UserComponent } from './log/user/user.component';
import { SubscribComponent } from './subscrib/subscrib.component';

import { LoginComponent } from './login/login.component';
import { NavbarComponent } from './navbar/navbar.component';
import { UpdatecharComponent } from './Shonen/updatechar/updatechar.component';
import { HomepageComponent } from './homepage/homepage.component';
// import { MatAutocompleteModule } from '@angular/material/autocomplete';
// import { AutocompleteModule } from 'ng2-input-autocomplete';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatAutocompleteModule} from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import {MatDialogModule} from '@angular/material/dialog';
import { RankingpageComponent } from './rankingpage/rankingpage.component';
import {BreadcrumbModule} from 'angular-crumbs';
import { SeriespageComponent } from './seriespage/seriespage.component';



@NgModule({
  declarations: [
    AppComponent,
    CharactersComponent,
    AnimeSeriesComponent,
    UserComponent,
    SubscribComponent,
    LoginComponent,
    NavbarComponent,
    UpdatecharComponent,
    HomepageComponent,
    RankingpageComponent,
    SeriespageComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    NgxPaginationModule,
    NgIdleKeepaliveModule.forRoot(),
    BrowserAnimationsModule,
    MatAutocompleteModule,
    MatInputModule,
    ReactiveFormsModule,
    BreadcrumbModule,
    MatDialogModule
    // MatInputModule
  ],
  providers: [AnimeSeriesComponent, CharactersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
