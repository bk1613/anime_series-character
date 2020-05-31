import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__, Input } from '@angular/core';
import { CharService } from '../Shonen/char.service'
import { Series } from '../models/series';
import { Skills } from '../models/skills';
import { Character } from '../models/character'
import { map, switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';

@Component({
  selector: 'app-anime-series',
  templateUrl: './anime-series.component.html',
  styleUrls: ['./anime-series.component.css']

})

export class AnimeSeriesComponent implements OnInit {
  @Input() id:number;
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
  specificChar:any;
  details: string;
  title: string;

  charindex: number;
  

  constructor(private router: Router, private cs: CharService) { }

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
        console.log(JSON.parse(this.details));
        this.sendseries(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription);
        console.log("ghjakkklkr");
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
            // for(let ac of this.AnimeCharacters){
            //   this.Charaterid = ac.charId;
            // }
            
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
        console.log("gjhgjg");
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

  changechar(charid){
   
    this.cs.seriesid = this.Seriesid;
    this.cs.seriesname = this.Seriesname;
    this.cs.Charaterid = charid;
    this.cs.Charactername = this.Charactername;
    this.cs.Characterdescrip = this.Characterdescrip;
    this.cs.Charactergender = this.Charactergender;
    this.cs.Characterability = this.Characterability;
    for(let ac of this.AnimeCharacters){
      if(ac.charId == charid){
        // console.log(ac);
        this.specificChar = ac;
      }
    }
    console.log(this.specificChar.name)
    this.cs.AnimeCharacters = this.specificChar;
    
    this.cs.Animeseries = this.Animeseries;
    this.router.navigate(['update'])
  }

  char(){
    this.cs.seriesname = this.Seriesname;
    this.cs.seriesid = this.Seriesid;
    this.cs.seriesimage = this.Seriesimage;
    this.cs.seriesdescription = this.Seriesdescription;
    this.router.navigate(['character'])
  }

  deletechar(id){
    let c = confirm("Are you sure you want to delete")
    if( c == true){
      console.log("you deleted this row")
      

      for(let ac of this.AnimeCharacters){

        
        if(ac.charId == id){
          console.log(ac);
          console.log(ac.skills);
          for(let sk of ac.skills){
            this.cs.deleteskill(sk).subscribe(
              (response: any[]) => {
                this.Animeseries = response;
                this.cs.deletechar(ac).subscribe(
                  (response: any[]) => {
                    // this.AnimeCharacters = response;
                  }
                )

              }
            )
          }
          
        }
      }

      
    }
    this.router.navigate(['series'])
  }

}
