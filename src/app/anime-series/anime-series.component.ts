import { Component, OnInit, ɵCompiler_compileModuleSync__POST_R3__, Input } from '@angular/core';
import { CharService } from '../Shonen/char.service'
import { Series } from '../models/series';
import { Skills } from '../models/skills';
import { Character } from '../models/character'
import { map, startWith } from 'rxjs/operators';
import { Router } from '@angular/router';
import { ThrowStmt } from '@angular/compiler';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';


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

  series: Series;
  AnimeCharacters: Character[];
  specificChar:any;
  details: string;
  title: string;

  charindex: number;
  
  loginname: String;
  role: String;
  user: String;

  myControl = new FormControl();
  options: String[] = [];
  filteredOptions: Observable<String[]>;

  constructor(private router: Router, private cs: CharService, public session: SessionStorageService) { }

  ngOnInit(): void {
    this.role = sessionStorage.getItem("role");
    this.user = sessionStorage.getItem("username");
 
    this.series = this.cs.Animeseries;
    this.getcurrseries();
    this.getallseries();
    
    this.role = sessionStorage.getItem("role");
    if(this.role == undefined || this.role == null){
      this.router.navigate(['user'])
    }

    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    //   );
  }

  // private _filter(value: String): String[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }
  
  getcurrseries(){
    if(this.role == undefined || this.role == null){
      this.router.navigate(['user'])
    }
    this.Seriesid = this.series.sId;
    this.Seriesname = this.series.name;
    this.Seriesimage = this.series.image;
    this.Seriesdescription = this.series.description;
  }

  getallseries(){ 
    
    // this.cs.getAllSeries().subscribe(
    //   (response: Series[]) => {
    //      this.Animeseries = response;
    //      for(let a = 0; a < this.Animeseries.length; a++){
    //       this.options.push(this.Animeseries[a].name);
    //     }
    //   }
    // )  
   
    // this.getCharacters();
  }
  // getSeries(){
  //   console.log(this.Seriesid);
  //   this.cs.getSeries(this.Seriesid).subscribe(
  //     (response: Series[]) => {
  //       console.log(response);
  //       this.Animeseries = response;
  //       this.details = JSON.stringify(this.Animeseries);
        
  //       JSON.parse(this.details, (key, value) => {
  //         if (typeof value === 'string') {
  //           if(key === 'title_english' && !(value === null)){
  //             this.Seriesname = value;
  //           } else if(key === 'title'){
  //             this.Seriesname = value;
  //           }
  //           if(key === 'synopsis'){
  //             this.Seriesdescription = value;
  //           }
  //           if(key === 'image_url'){
  //             this.Seriesimage = value;
  //           }

  //           new Series(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription, []);
  //           return value.toUpperCase();
  //         }
  //         return value;
  //       })
  //       // console.log(JSON.parse(this.details));
  //       this.sendseries(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription);
  //       // console.log("ghjakkklkr");
  //       this.getCharacters();
  //     }
  //   )
  // }

  getSeries(){
    console.log(this.Animeseries);
    // this.cs.getAllSeries().subscribe(
    //   (response: Series[]) => {
    //     for(let s of response){
    //       if(s.name == this.Seriesname){
    //         this.Seriesid = s.sId;
    //       }
    //     }
    //   }
    // )
    console.log(this.Seriesid);
    this.cs.getAllSeries().subscribe(
      (response: Series[]) => {
        console.log(response);
        for(let s of response){
          if(s.sId == this.Seriesid){
             this.Seriesname = s.name;
            console.log(this.Seriesname)
            this.Seriesimage = s.image;
            this.Seriesdescription = s.description;
          }
        }
        //console.log(this.details)
       
        new Series(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription, []);
        
        // console.log(JSON.parse(this.details));
        //this.sendseries(this.Seriesid, this.Seriesname, this.Seriesimage, this.Seriesdescription);
        // console.log("ghjakkklkr");
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
  rankchar(id){
    this.router.navigate(['rankingpage'])
  }
}