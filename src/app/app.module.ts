import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { FormsModule } from '@angular/forms';
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
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [AnimeSeriesComponent, CharactersComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
