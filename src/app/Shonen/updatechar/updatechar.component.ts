import { Component, OnInit } from '@angular/core';
import { CharService } from '../char.service'
import { Series } from 'src/app/models/series';
import { Skills } from 'src/app/models/skills';
import { Character } from 'src/app/models/character'
import { AnimeSeriesComponent } from 'src/app/anime-series/anime-series.component';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import { Achievements } from 'src/app/models/achievements';

@Component({
  selector: 'app-updatechar',
  templateUrl: './updatechar.component.html',
  styleUrls: ['./updatechar.component.css']
})
export class UpdatecharComponent implements OnInit {
  Charaterid: number;
  Charactername: String;
  Charactergender: String;
  Characterdescrip: String;
  Characterimage: String;
  Characterrank: String;
  Characterability: String;
  Characterskill: String;
  Characterachievements: Achievements[];

  Updateability: String;
  Updatedescrip: String;
  Updaterank: String;
  Updatename: String;


  Animeskill: Skills[];
  rowskill: Skills[][] = [];
  colskill: Skills[] = [];

  seriesname: String;
  serid: number;
  serdesp: String;
  serimage: String;
  AnimeCharacters: Character;
  Animeseries: Series[];
  count: number = 0;
  constructor(private cs: CharService, private router: Router) { }

  ngOnInit(): void {
    //this.getCharacters();

    this.seriesname = this.cs.seriesname;
    this.cs.seriesname = undefined;

    this.serid = this.cs.seriesid;
    this.cs.seriesid = undefined;

    this.serdesp = this.cs.seriesdescription;
    this.cs.seriesdescription = undefined;

    this.serimage = this.cs.seriesimage;
    this.cs.seriesimage = undefined;

    this.Charactername = this.cs.AnimeCharacters.name;
    this.cs.Charactername = undefined;

    this.Charaterid = this.cs.Charaterid;
    this.cs.Charaterid = undefined;

    this.Charactergender = this.cs.AnimeCharacters.gender;

    this.Characterimage = this.cs.AnimeCharacters.image;

    this.Characterrank = this.cs.AnimeCharacters.rank;

    this.Characterdescrip = this.cs.AnimeCharacters.profile;

    this.Characterability = this.cs.AnimeCharacters.special;

    this.Animeskill = this.cs.AnimeCharacters.skills;
    
    this.AnimeCharacters = this.cs.AnimeCharacters;

    
    this.countskill();
  }

  countskill(){
    // console.log(this.Animeskill);
    for(let a = 0; a < this.Animeskill.length; a++){
        
        // console.log(a);
        // console.log(this.Animeskill[a]);
        this.colskill.push(this.Animeskill[a]);
        if(this.colskill.length == 5){
          this.rowskill.push(this.colskill);
          this.colskill = [];
        }
    }
    this.rowskill.push(this.colskill);
    console.log(this.rowskill);
  }

  sendskill() : void{
    // let s = new Series(this.serid, this.seriesname, this.serimage, this.serdesp, []);
    // let c = new Character(this.Charaterid, this.Charactername, this.Characterimage, this.Charactergender, [], this.Characterability, this.Characterdescrip, this.Characterrank, s);
    
    this.cs.getCharacter(this.Charaterid).subscribe(
      (response: Character) =>{
        let c = response;
        console.log(c);
        this.cs.addSkill(new Skills(1, this.Characterskill, c)).subscribe(
          (skresponse: Skills[]) => {
            this.cs.getCharacter(this.Charaterid).subscribe(
              (response: Character) =>{
                console.log(response.skills)
                this.Animeskill = response.skills;
                let row: Skills[][] = [];
                let col: Skills[] = [];
                for(let a = 0; a < this.Animeskill.length; a++){
        
                  // console.log(a);
                  // console.log(this.Animeskill[a]);
                  col.push(this.Animeskill[a]);
                  if(col.length == 5){
                    row.push(col);
                    col = [];
                  }
                }
                row.push(col);
                this.rowskill = row;
              }
            )
          }
        )
      }

    )
    
  }

  updatechar():void{
    let s = new Series(this.serid, this.seriesname, this.serimage, this.serdesp, []);
    console.log(this.cs.AnimeCharacters.charId);
    console.log(this.Charaterid);
    this.cs.getAllCharacters().subscribe(
      (response: Character[]) =>{
        console.log(response);
        // response;
        for(let a of response){

          if(a.charId == this.Charaterid){
            this.cs.updatechar(new Character(a.charId, this.Charactername, a.image, this.Charactergender, [], this.Characterability, this.Characterdescrip, a.rank, s)).subscribe(
            // this.cs.updatechar(new Character(a.charId, this.Charactername, a.image, this.Charactergender, [], this.Characterability, this.Characterdescrip, a.rank, this.Characterachievements, s)).subscribe(

            )
          }
        }
      }
    )
    
  }
  
  cancel(): void{
    this.router.navigate(['series'])
  }

  deleteskill(id): void{
    console.log(id);
    let c = confirm("Are you sure you want to delete")
    if( c == true){
      console.log("you deleted this row")
      for(let ac of this.Animeskill){
        if(ac.skillId == id){
          
              this.cs.deleteskill(ac).subscribe(
              (response: any[]) => {
            }
          )
        }
      }
    }
    this.router.navigate(['update'])
  }
}
