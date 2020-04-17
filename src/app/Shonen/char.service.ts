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
  seriesUrl = 'https://api.jikan.moe/v3/anime/';
  // characterUrl = 'http://www.animecharactersdatabase.com/api_series_characters.php?character_id=';

  constructor(private http: HttpClient) { }

  getCharacter(id: number): Observable<any>{
    return this.http.get<Character>(this.configUrl + '/anime/' + id)
  }
  
  getSeries(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.seriesUrl + id);
  }

  getallSkill(){
    return this.http.get<Skills[]>(this.configUrl + '/anime/characterskill');
  }

  getAllCharacters() {
    return this.http.get<Character[]>(this.configUrl + '/anime/animecharacter');
  }

  getAllSeries() {
    return this.http.get<Series[]>(this.configUrl + '/anime/animeseries')
  }

  // getAllSkills() {
  //   return this.http.get<Skills[]>(this.configUrl + '/anime/characterskill')
  // }

  addCharacter(c:Character): Observable<Character[]> {
    console.log("respond");
    return this.http.put<Character[]>(this.configUrl + '/anime/char/insert', c);
  }

  addSeries(s:Series): Observable<Series[]> {
    return this.http.post<Series[]>(this.configUrl + '/anime/ser/insert', s);
  }

  addSkill(sk:Skills): Observable<Skills[]>{
    return this.http.put<Skills[]>(this.configUrl + '/anime/ski/insert', sk);
  }

}
