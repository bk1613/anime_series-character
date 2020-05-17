import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  constructor(private router: Router) { }

  // subModules = ["Home", "Series"];

  ngOnInit(): void {
  }

  

  // activateClass(subModule){
  //   subModule.active = !subModule.active;    
  // }

  seriespage(){
    this.router.navigate(['series'])
  }

  characterpage(){
    this.router.navigate(['character'])
  }

}
