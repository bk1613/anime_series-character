import { Component, OnInit, Input } from '@angular/core';
import {  ActivatedRoute, Router, NavigationEnd } from '@angular/router';
import { CharService } from 'src/app/Shonen/char.service';
import { Series } from '../models/series';
import { IBreadCrumb } from '../navbar/navbar.interface'
import { filter, distinctUntilChanged } from 'rxjs/operators';
// import { HomepageComponent } from 'src/app/homepage/homepage.component';
// import { SeriespageComponent } from 'src/app/seriespage/seriespage.component';

import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  // providers:[HomepageComponent, SeriespageComponent],
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {


  @Input() childMessage: String;

  constructor(private cs: CharService, private router: Router, public session: SessionStorageService, private activatedRoute: ActivatedRoute) { }

  // public breadcrumbs: IBreadCrumb[]
  hpage: String;
  spage: String;
  loginname: String;
  boollogin: boolean
  role: String;
  Animeseries: Series[];
  rouetname: String;
 
  ngOnInit(): void {
    // this.hpage = this.hp.homename;
    // this.spage = this.sp.homename;
    // console.log(this.hpage)
    // console.log(this.spage)
    this.role = sessionStorage.getItem("role");
    if(this.role != undefined || this.role != null){
      this.rouetname = "home"
    }
  }

  initi(s : String){
    if(s == "home" && (this.role != undefined || this.role != null)){
      this.rouetname = s;
    }
  }

  loggs(){
    this.role = sessionStorage.getItem("role");
    if(this.role != undefined || this.role != null){
      this.rouetname = "home"
      
    }
    console.log(this.role);
    console.log(this.rouetname);
  }

  homeactivity(){
    this.rouetname = "home";
    console.log(this.rouetname);
    console.log(this.role)
    this.cs.Animeseries = undefined;
  }

  useractivity(){
    this.rouetname = "series";
    
    console.log(this.rouetname);
    console.log(this.role)
    
  }

  logging(){
    
      this.rouetname = null;
      this.session.remove("role");
      this.role = undefined;
      if(this.session.get("role") != null || this.session.get("role") != undefined){
        console.log("item removed")
      }
      
    
  }
}
