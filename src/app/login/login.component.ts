import { Component, OnInit } from '@angular/core';
import { CharService } from '../Shonen/char.service';
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  logusername: String;
  logpassword: String;
  error: String;
  Users: User[];
  constructor(private cs: CharService, private router: Router) { }

  ngOnInit(): void {
  }

  loggedin:Boolean = false;
  
  login(){
    this.router.navigate(['series'])
    // this.cs.getalluserss().subscribe(
    //   (response: any[]) =>{
    //     this.Users = response;
        
    //     for (let u of this.Users){
    //       if(u.password == this.logpassword){
    //         this.loggedin = true;
            
    //       }else{
    //         this.error = "no such password"
    //       }
    //     }
    //   }

    // )
  }

}
