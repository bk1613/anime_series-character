import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { Character } from '../models/character';
import { Series } from '../models/series';
import { Skills } from '../models/skills';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class CharService {
  configUrl = 'http://localhost:8080/anime';
  seriesUrl = 'https://api.jikan.moe/v3/anime/';

  seriesid: any;
  seriesname: any;
  seriesdescription: any;
  seriesimage: any;

  Charaterid: any;
  Charactername: any;
  Charactergender: any;
  Characterdescrip: any;
  Characterimage: any;
  Characterrank: any;
  Characterability: any;
  Characterskill: any;

  AnimeCharacters:any;
  Animeseries:any;
  charskill: Skills[];
  private messageSource = new BehaviorSubject('default message');
  currentMessage = this.messageSource.asObservable();
  
  constructor(private http: HttpClient) { }

  changeMessage(message: string){
    this.messageSource.next(message)
  }

  getCharacter(id: number): Observable<any>{
    return this.http.get<Character>(this.configUrl + '/character/' + id)
  }
  
  getSeries(id: number): Observable<any[]>{
    return this.http.get<any[]>(this.seriesUrl + id);
  }

  getallSkill(){
    return this.http.get<Skills[]>(this.configUrl + '/skill/characterskill');
  }

  getAllCharacters() {
    return this.http.get<Character[]>(this.configUrl + '/character/animecharacter');
  }

  getAllSeries() {
    return this.http.get<Series[]>(this.configUrl + '/series/animeseries')
  }

  getalluserss() {
    return this.http.get<User[]>(this.configUrl + '/user/animeusers')
  }

  addCharacter(c:Character): Observable<Character[]> {
    console.log("respond");
    return this.http.put<Character[]>(this.configUrl + '/character/char/insert', c);
  }

  addSeries(s:Series): Observable<Series[]> {
    return this.http.post<Series[]>(this.configUrl + '/series/ser/insert', s);
  }

  addSkill(sk:Skills): Observable<Skills[]>{
    return this.http.put<Skills[]>(this.configUrl + '/skill/ski/insert', sk);
  }

  adduser(us:User): Observable<User[]>{
    return this.http.put<User[]>(this.configUrl + '/user/sub/insert', us);
  }

  deletechar(c:Character): Observable<any>{
    return this.http.put<Character>(this.configUrl + '/character/char/delete', c);
  }

  deleteskill(sk:Skills): Observable<any>{
    return this.http.put<Skills>(this.configUrl + '/skill/ski/delete', sk);
  }

  updatechar(c:Character): Observable<any>{
    return this.http.post<Character>(this.configUrl + '/character/char/update', c);
  }

}
