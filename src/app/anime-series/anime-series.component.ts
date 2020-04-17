import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__ } from '@angular/core';
import { CharService } from '../Shonen/char.service'
import { Series } from '../models/series';
import { Skills } from '../models/skills';
import { Character } from '../models/character'
import { map, switchMap } from 'rxjs/operators';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-anime-series',
  templateUrl: './anime-series.component.html',
  styleUrls: ['./anime-series.component.css']
})

export class AnimeSeriesComponent implements OnInit {

  Seriesid: number;
  Seriesname: String;
  Seriesdescription: String;
  Seriesimage: String;

  Charaterid: number;
  Charactername: String;
  Charactergender: String;
  Characterdescrip: String;
  Characterimage: String;
  Characterrank: String;
  Characterability: String;
  Characterskill: String;

  Animeskill: Skills[];

  AnimeImage: Blob;
  Animeseries: Series[];
  AnimeCharacters: Character[];
  details: string;
  title: string;

  constructor(private cs: CharService) { }

  ngOnInit(): void {

     //this.getCharacters();
  }

  ser = [14719, 45];

  getSeries(){
    this.cs.getSeries(this.Seriesid).subscribe(
      (response: Series[]) => {
        console.log(response);
        this.Animeseries = response;
        this.details = JSON.stringify(this.Animeseries);
        JSON.parse(this.details, (key, value) => {
          if (typeof value === 'string') {
            if(key === 'title_english' && !(value === null)){
              this.Seriesname = value;
            } else if(key === 'title'){
              this.Seriesname = value;
            }
            if(key === 'synopsis'){
              this.Seriesdescription = value;
            }
            if(key === 'image_url'){
              this.Seriesimage = value;
            }

            new Series(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription, []);
            return value.toUpperCase();
          }
          return value;
        })
        // console.log(JSON.parse(this.details));
        this.sendseries(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription);
        this.getCharacters();
      }
    )
  }

  getCharacters(){
    this.cs.getAllSeries().subscribe(
      (response: any[]) =>{
        this.Animeseries = response;
        for (let s of this.Animeseries){
          if(s.sId == this.Seriesid){
            console.log(s.characters);
            this.AnimeCharacters = s.characters;
            console.log(this.AnimeCharacters);
            // this.AnimeCharacters.push(new Character(s.characters.))
          }
          
        }
      }
    )
  }


  sendseries(id: number, name: String, image: String, syn: String){
    
    
    let s = new Series(id, name, image, syn, []);
    
    this.cs.getAllSeries().subscribe(
      (response: Series[]) => {
        console.log(response);
        this.Animeseries = response;
        let noser: Boolean = true;
        for (let a of this.Animeseries){
          
          if(a.sId == id){
            console.log(a.sId);
            noser = false;
            break;
          }
        }
        console.log(noser);
        console.log(response);
        if(noser === true){
          this.cs.addSeries(s).subscribe(
            (response: Series[]) => {
              this.Animeseries = response;
              this.getCharacters();
            }
          )
        }
      }
    )
  }

  sendskill() : void{
    let s = new Series(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription, []);
    // let c = new Character(this.Charaterid, this.Charactername, this.Seriesimage, this.Charactergender, [], this.Characterability, this.Characterdescrip, this.Characterrank, s);
    this.cs.getAllCharacters().subscribe(
      (response: Character[]) =>{
        console.log(response);
        this.AnimeCharacters = response;
        
        for(let a of this.AnimeCharacters){
          console.log(a.charId);
          console.log(this.Charaterid);
          if(a.charId == this.Charaterid){
            let c = a;
            this.cs.addSkill(new Skills(1, this.Characterskill, c)).subscribe(
              (response: Skills[]) => {
                this.Animeskill = response;
                this.getCharacters(); //Test if table updates in real time **DELETE IF THROWS ERRORS
              }
            )
          }
        }
      }
    )
      
    
    // this.cs.addSkill(new Skills(1, this.Characterskill, c)).subscribe(
    //     (response: Skills[]) => {
    //             this.Animeskill = response;
              
    //     }
    // )
      
  }

  sendCharacter() : void{
    // console.log(this.Seriesid);
    // console.log(this.Charactername);
    // console.log(this.Charactergender);
    // console.log(this.Characterimage);
    // console.log(this.Characterdescrip);
    // console.log(this.Characterrank);
    // console.log(this.Characterability);
    let s = new Series(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription, []);
    // let c = new Character(1, this.Charactername, this.Seriesimage, this.Charactergender, [], this.Characterability, this.Characterdescrip, this.Characterrank, s)
    // this.cs.getSeries(this.Seriesid).pipe(
    //)

    let c  =new Character(0, this.Charactername, this.Characterimage, this.Charactergender, [], this.Characterability, this.Characterdescrip,
      this.Characterrank, s);
    console.log(c.series.sId);
    this.cs.addCharacter(c).subscribe(
      (response: any[]) =>{
        console.log(response);
        this.AnimeCharacters = response;
        this.getCharacters();
      } 
    )

  }

}
