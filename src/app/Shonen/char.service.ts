import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Character } from '../models/character';
import { Series } from '../models/series';
import { Skills } from '../models/skills';

@Injectable({
  providedIn: 'root'
})
export class CharService {
  configUrl = 'http://localhost:8080/project2';
  seriesUrl = 'https://kitsu.io/api/edge/anime?filter[text]=';
  characterUrl = 'http://www.animecharactersdatabase.com/api_series_characters.php?character_id=';

  constructor(private http: HttpClient) { }

  getCharacter(id: number): Observable<any>{
    return this.http.get<Character>(this.characterUrl + id)
  }
  
  getSeries(name: String): Observable<any>{
    return this.http.get<Series>(this.seriesUrl + name);
  }

  // getSeries(name: String): Observable<any>{
  //   return this.http.get<Series>("http://www.animecharactersdatabase.com/api_series_characters.php?anime_id=" + id)
  // }

  getSkill(id:number){
    return this.http.get<Skills>(this.configUrl + '/anime/characterskill');
  }

  getAllCharacters() {
    return this.http.get<Character[]>(this.configUrl + '/anime/animecharacter');
  }

  getAllSeries() {
    return this.http.get<Series[]>(this.configUrl + '/anime/animeseries')
  }

  getAllSkills() {
    return this.http.get<Skills[]>(this.configUrl + '/anime/characterskill')
  }

  addCharacter(c:Character): Observable<Character[]> {
    return this.http.post<Character[]>(this.configUrl + '/anime/char/insert', c);
  }

  addSeries(s:Series): Observable<Series[]> {
    return this.http.post<Series[]>(this.configUrl + '/anime', s);
  }

  addSkill(sk:Skills): Observable<Skills[]>{
    return this.http.post<Skills[]>(this.configUrl + '/anime/ski/insert', sk);
  }

}
