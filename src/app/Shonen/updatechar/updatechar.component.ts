import { Component, OnInit } from '@angular/core';
import { CharService } from '../char.service'
import { Series } from 'src/app/models/series';
import { Skills } from 'src/app/models/skills';
import { Character } from 'src/app/models/character'
import { AnimeSeriesComponent } from 'src/app/anime-series/anime-series.component';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-updatechar',
  templateUrl: './updatechar.component.html',
  styleUrls: ['./updatechar.component.css']
})
export class UpdatecharComponent implements OnInit {
  Charaterid: number;
  Characterskill: String;
  seriesname: String;
  serid: number;
  serdesp: String;
  serimage: String;
  AnimeCharacters: Character[]

  constructor(private cs: CharService, private router: Router) { }

  ngOnInit(): void {
    this.seriesname = this.cs.seriesname;
    this.cs.seriesname = undefined;

    this.serid = this.cs.seriesid;
    this.cs.seriesid = undefined;

    this.serdesp = this.cs.seriesdescription;
    this.cs.seriesdescription = undefined;

    this.serimage = this.cs.seriesimage;
    this.cs.seriesimage = undefined;
  }

  sendskill() : void{
    let s = new Series(this.serid, this.seriesname, this.serimage, this.serdesp, []);
    // let c = new Character(this.Charaterid, this.Charactername, this.Seriesimage, this.Charactergender, [], this.Characterability, this.Characterdescrip, this.Characterrank, s);
    this.cs.getAllCharacters().subscribe(
      // (response: Character[]) =>{
      //   console.log(response);
      //   this.AnimeCharacters = response;
        
      //   for(let a of this.AnimeCharacters){
      //     console.log(a.charId);
      //     console.log(this.Charaterid);
      //     if(a.charId == this.Charaterid){
      //       let c = a;
      //       this.cs.addSkill(new Skills(1, this.Characterskill, c)).subscribe(
      //         (response: Skills[]) => {
      //           this.Animeskill = response;
      //           // this.getCharacters(); //Test if table updates in real time **DELETE IF THROWS ERRORS
      //         }
      //       )
      //     }
      //   }
      // }
    )
  }
}
