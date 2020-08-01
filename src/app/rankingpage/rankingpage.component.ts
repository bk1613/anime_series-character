import { Component, OnInit } from '@angular/core';
import { CharService } from 'src/app/Shonen/char.service'
import { Series } from 'src/app/models/series';
import { Skills } from 'src/app/models/skills';
import { Character } from 'src/app/models/character'
import { AnimeSeriesComponent } from 'src/app/anime-series/anime-series.component';
import { Router } from '@angular/router';
import { map, switchMap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';
import {MatDialog} from '@angular/material/dialog';

@Component({
  selector: 'app-rankingpage',
  templateUrl: './rankingpage.component.html',
  styleUrls: ['./rankingpage.component.css']
})
export class RankingpageComponent implements OnInit {

  Charaterid: number;
  Charactername: String;
  Charactergender: String;
  Characterdescrip: String;
  Characterimage: String;
  Characterrank: String;
  Characterability: String;
  Characterskill: String;
  charac: Character;

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

  rankarr: any[] = ["1", "2", "3", "4", "5", "6","7", "8", "9", "10"];
  rankmap: Object = {"1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0, "10":0};
  grades: String[] = ["A", "B", "C"];
  rankact: String;
  grade: String;
  
  constructor(private cs: CharService, private router: Router, public dialog: MatDialog) { }

  ngOnInit(): void {
    this.Charaterid = this.cs.AnimeCharacters.charId;
    this.Charactername = this.cs.AnimeCharacters.name;
    this.Characterdescrip = this.cs.AnimeCharacters.profile;
    this.Charactergender = this.cs.AnimeCharacters.gender;
    this.Characterimage = this.cs.AnimeCharacters.image;
    this.Characterability = this.cs.AnimeCharacters.special;
    this.Animeskill = this.cs.AnimeCharacters.skills;
    this.Characterrank = this.cs.AnimeCharacters.rank;
    this.seriesname = this.cs.seriesname;
    this.cs.seriesname = undefined;

    this.serid = this.cs.seriesid;
    this.cs.seriesid = undefined;

    this.serdesp = this.cs.seriesdescription;
    this.cs.seriesdescription = undefined;

    this.serimage = this.cs.seriesimage;
    this.cs.seriesimage = undefined;
    console.log(this.rankmap);
    this.getrank();
  }
  
  getrank(){
    let ranks = {"1":0, "2":0, "3":0, "4":0, "5":0, "6":0, "7":0, "8":0, "9":0, "10":0}
    // ranks.set("1",0);
    // ranks.set("2",0);
    // ranks.set("3",0);
    // ranks.set("4",0);
    // ranks.set("5",0);
    // ranks.set("6",0);
    // ranks.set("7",0);
    // ranks.set("8",0);
    // ranks.set("9",0);
    // ranks.set("10",0);
    // let count = 0;
    for (let a of Object.values(this.rankmap)) {
      console.log(a);       
    } 
    
    
  }

  rank1(){
    this.rankmap["1"]++;
    console.log("1: ", this.rankmap["1"]);
    this.rankact = this.rankarr[0];
  }

  rank2(){
    this.rankmap["2"]++;
    console.log("2: ", this.rankmap["2"]);
    this.rankact = this.rankarr[1];
  }
  rank3(){
    this.rankmap["3"]++;
    console.log("3: ", this.rankmap["3"]);
    this.rankact = this.rankarr[2];
  }
  rank4(){
    this.rankmap["4"]++;
    console.log("4: ", this.rankmap["4"]);
    this.rankact = this.rankarr[3];
  }
  rank5(){
    this.rankmap["5"]++;
    console.log("5: ", this.rankmap["5"]);
    this.rankact = this.rankarr[4];
  }
  rank6(){
    this.rankmap["6"]++;
    console.log("6: ", this.rankmap["6"]);
    this.rankact = this.rankarr[5];
  }
  rank7(){
    this.rankmap["7"]++;
    console.log("7: ", this.rankmap["7"]);
    this.rankact = this.rankarr[6];
  }

  rank8(){
    this.rankmap["8"]++;
    console.log("8: ", this.rankmap["8"]);
    this.rankact = this.rankarr[7];
  }
  rank9(){
    this.rankmap["9"]++;
    console.log("9: ", this.rankmap["9"]);
    this.rankact = this.rankarr[8];
  }
  rank10(){
    this.rankmap["10"]++;
    console.log("10: ", this.rankmap["10"]);
    this.rankact = this.rankarr[9];
  }

  gradeA(){
    this.grade = this.grades[0];
  }

  gradeB(){
    this.grade = this.grades[1];
  }

  gradeC(){
    this.grade = this.grades[2];
  }

  markRank(){
    console.log(this.serid)
    console.log(this.seriesname)
    let s = new Series(this.serid, this.seriesname, this.serimage, this.serdesp, []);
    console.log(this.rankmap);
    let arr = Object.values(this.rankmap);
    let max = Math.max(...arr);
    for(let [key, value] of Object.entries(this.rankmap) ){
      if(max==value){
        this.Updaterank = key+this.grade;
      }
    }
    console.log(this.Updaterank);
    this.cs.getAllCharacters().subscribe(
      (response: Character[]) =>{
        console.log(response);
        // response;
        for(let a of response){

          if(a.charId == this.Charaterid){
            this.cs.updatechar(new Character(a.charId, this.Charactername, a.image, this.Charactergender, [], this.Characterability, this.Characterdescrip, this.Updaterank, s)).subscribe(
            // this.cs.updatechar(new Character(a.charId, this.Charactername, a.image, this.Charactergender, [], this.Characterability, this.Characterdescrip, a.rank, this.Characterachievements, s)).subscribe(

            )
          }
        }
      }
    )
    this.Updaterank = this.Updaterank;
  }

  rankinfo(){
    const dialogRef = this.dialog.open(DialogContentExampleDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

}
@Component({
  selector: 'rank-dialog',
  templateUrl: 'rank-dialog.html',
})
export class DialogContentExampleDialog {}