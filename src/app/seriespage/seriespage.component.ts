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
import {Observable, throwError} from 'rxjs';


@Component({
  
  selector: 'app-seriespage',
  templateUrl: './seriespage.component.html',
  styleUrls: ['./seriespage.component.css']
})
export class SeriespageComponent implements OnInit {

  homename: String = "series";
  seriesname: String;
  filteredSeries: Observable<Series[]>;
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
  // options: Series[] = [];
  SeriesArray: Series[];
  myControl = new FormControl();
  name: String[] = [];
  id: number[] = [];

   constructor(private router: Router, private cs: CharService, public session: SessionStorageService) { }

  ngOnInit(): void {
    this.series = this.cs.Animeseries;
    console.log(this.series);
    //this.getseriesfromhome();
    this.role = sessionStorage.getItem("role");

    if (this.role == undefined || this.role == null) {
      this.router.navigate(['user'])
    } else if (this.role != undefined || this.role != null) {
      
    }
    console.log("series",this.series);
    if(this.series != undefined){
      this.getseriesfromhome();
    }else if (this.series == undefined){
      this.gethroughtab();
    }

    this.getallseries();
  }

  gethroughtab(){
    this.Seriesid = this.cs.seriesid;
      this.Seriesname = this.cs.seriesname;
      this.Seriesdescription = this.cs.seriesdescription;
      this.Seriesimage = this.cs.seriesimage;
      this.cs.getAllSeries().subscribe(
        (response: any[]) =>{
          this.Animeseries = response;
          
          for (let s of this.Animeseries){
            console.log(s.sId)
            if(s.sId == this.Seriesid){
              console.log(s.characters);
              this.AnimeCharacters = s.characters;
              console.log(this.AnimeCharacters);
             
            }
            
          }
        }
      )
  }


  getseriesfromhome(){
    this.Seriesid = this.series.sId;
    this.Seriesname = this.series.name;
    this.Seriesdescription = this.series.description;
    this.Seriesimage = this.series.image;
    this.getCharacters();
  }

  filterSeries(s: any){
    let Seriesname = s.name || s;
    return this.Animeseries.filter(serie =>
      serie.name.toLowerCase().indexOf(Seriesname.toLowerCase()) === 0);
  }
  // private _filter(value: any): Series[] {
  //   const filterValue = value;

  //   return this.options.filter(option => option);
  // }

  filter(val: any) {
    let name = val.CustomerName || val; // val can be Customer or string
    return this.SeriesArray.filter(option => option.name.toLowerCase().indexOf(name.toLowerCase()) === 0);
  }

  getallseries(){
    this.cs.getAllSeries().subscribe(
      (response: Series[]) => {
        this.Animeseries = response;
        
        this.filteredSeries = this.myControl.valueChanges
        .pipe(
          startWith(null),
          map(serie => serie ? this.filterSeries(serie) : this.Animeseries.slice())
        );
      }
    ) 
  }

  displaySeries(ser: Series) {
    console.log(this.Seriesid)
    return ser ? ser.name : '';
  }

  getSeries(){
    
    this.cs.getSeries(this.series.sId).subscribe(
      (response: Series) => {
        this.cs.seriesid = response.sId;
        this.cs.seriesname = response.name;
        this.cs.seriesdescription = response.description;
        this.cs.seriesimage = response.image;

        this.Seriesid = this.cs.seriesid;
        this.Seriesname = this.cs.seriesname;
        this.Seriesdescription = this.cs.seriesdescription;
        this.Seriesimage = this.cs.seriesimage;

        
        console.log(response.characters);
        // this.AnimeCharacters = response.characters;
            
        
        
      }
    )
    this.getCharacters();
  }

  getCharacters(){
    console.log("characters");
    console.log(this.Seriesid)
    this.cs.getAllSeries().subscribe(
      (response: any[]) =>{
        this.Animeseries = response;
        
        for (let s of this.Animeseries){
          if(s.sId == this.series.sId || s.sId == this.Seriesid){
            console.log(s.characters);
            this.AnimeCharacters = s.characters;
            console.log(this.AnimeCharacters);
           
          }
          
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
    this.cs.seriesname = this.Seriesname;
    this.cs.seriesid = this.Seriesid;
    this.cs.seriesimage = this.Seriesimage;
    this.cs.seriesdescription = this.Seriesdescription;
    this.cs.getCharacter(id).subscribe(
      (response: Character) =>{
        console.log(response);
        this.cs.AnimeCharacters = response;
        this.router.navigate(['rank'])
        }
      )
    
    }



}
