import { Component, OnInit} from '@angular/core';
import { CharService } from '../Shonen/char.service';
import { Series } from '../models/series';
import { Router } from '@angular/router';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';
import {map, startWith} from 'rxjs/operators';

// import { MdbTablePaginationComponent, MdbTableDirective } from 'PATH-TO-MDB-ANGULAR-HERE';

@Component({
  
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.css']
})


export class HomepageComponent implements OnInit {

  constructor(private cs: CharService, private router: Router, public session: SessionStorageService) { }
  homename: String = "home";
  Seriestitle : String;
  Seriesimage: String;
  Animeseries: Series[];
  Aseries: Series;
  Seriesid: number;
  Serisname : String;
  Serisdescrip : String;
  Serisimage : String;
  rowseries: Series[][] = [];
  colseries: Series[] = [];
  role: String;
  myControl = new FormControl();
  options: String[] = [];
  filteredSeries: Observable<Series[]>;

  p: number = 1;

  ngOnInit(): void {

    this.homename = "home";
    this.role = sessionStorage.getItem("role");
    if(this.role == undefined || this.role == null){
      this.router.navigate(['user'])

    }
    // this.nav.initi("home")
    
    this.getallseries()
    // this.filteredOptions = this.myControl.valueChanges
    //   .pipe(
    //     startWith(''),
    //     map(value => this._filter(value))
    // );


  }
  filterSeries(s: any){
    let Seriesname = s.name || s;
    return this.Animeseries.filter(serie =>
      serie.name.toLowerCase().indexOf(Seriesname.toLowerCase()) === 0);
  }
  // private _filter(value: String): String[] {
  //   const filterValue = value.toLowerCase();

  //   return this.options.filter(option => option.toLowerCase().includes(filterValue));
  // }

  getallseries(){
    
    this.cs.getAllSeries().subscribe(
      (response: Series[]) => {
        
         this.Animeseries = response.sort(function(a, b) { 
          return a.sId - b.sId;
        });
        this.filteredSeries = this.myControl.valueChanges
        .pipe(
          startWith(null),
          map(serie => serie ? this.filterSeries(serie) : this.Animeseries.slice())
        );
         for(let a = 0; a < this.Animeseries.length; a++){
        
        
          // console.log(this.Animeskill[a]);
          this.colseries.push(this.Animeseries[a]);
          if(this.colseries.length == 5){
            this.rowseries.push(this.colseries);
            this.colseries = [];
          }
      }
        this.rowseries.push(this.colseries);
        this.rowseries.pop()
        console.log(this.rowseries);
        console.log(this.options);
        }
      )
    
  }

  displaySeries(ser: Series) {
    console.log(this.Seriesid)
    return ser ? ser.name : '';
  }

  gotoseriespage(id){
    console.log(id);
    for(let s of this.Animeseries){
      if(id == s.sId){
        this.Aseries = s;
      }
    }
    this.cs.seriesimage = undefined;
    this.cs.seriesid = undefined;
    this.cs.seriesname = undefined;
    this.cs.seriesdescription = undefined;
    console.log(this.Aseries)
    this.cs.Animeseries = this.Aseries;
    this.router.navigate(['series'])
    // 
  }

  gotoseries(){
    // console.log(this.Aseries.sId);
    // for(let s of this.Animeseries){
    //   if(this.Serisname == s.name){
    //     this.Aseries = s;
    //   }
    // }

    this.cs.seriesimage = undefined;
    this.cs.seriesid = undefined;
    this.cs.seriesname = undefined;
    this.cs.seriesdescription = undefined;

    this.cs.Animeseries = this.Aseries;
    console.log(this.cs.Animeseries)
    this.router.navigate(['series'])
  }

  

}
