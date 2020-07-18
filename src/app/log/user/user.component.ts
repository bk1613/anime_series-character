import { Component, OnInit} from '@angular/core';
import { User } from 'src/app/models/user';
import { CharService } from 'src/app/Shonen/char.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import {NavbarComponent} from 'src/app/navbar/navbar.component';
import { LocalStorageService, SessionStorageService, LocalStorage, SessionStorage } from 'angular-web-storage';

@Component({
  providers:[NavbarComponent],
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  Usermessage: String = "message from user";

  logusername: String;
  logemail: String;
  logpassword: string;
  loginrole: String;
  user: String;
  
  Users: User[];
  loggedin:Boolean = false;
  hashpass: number;
  errormessage:String;

  
  message:string;
  constructor(private cs: CharService,private router: Router, public session: SessionStorageService, private nv: NavbarComponent) { 
    this.cs.currentMessage.subscribe(message => this.message = message);
  }

  ngOnInit(): void {
    // this.loginrole = sessionStorage.getItem("role");
    // this.user = sessionStorage.getItem("user");
  }

  login(){
    var key = CryptoJS.enc.Utf8.parse('7061737323313233');
    var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    
    this.cs.getalluserss().subscribe(
      (response: any[]) =>{
        this.Users = response;
        
        for (let u of this.Users){
          let decrypted = CryptoJS.AES.decrypt(u.password.toString(), key, {
            keySize: 256 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
            }); 
            //console.log(decrypted.toString(CryptoJS.enc.Utf8))
          if(decrypted.toString(CryptoJS.enc.Utf8) == this.logpassword && u.username == this.logusername){
            
            sessionStorage.setItem("role", u.role.toString());
            sessionStorage.setItem("username", u.username.toString());
            // this.cs.role = this.session.get("role");
            this.nv.homeactivity();
            
            
            this.cs.role = u.role;
            this.loggedin = true;
            this.cs.booleanlogin = this.loggedin;
            this.router.navigate([''])
          }else{
            this.errormessage = "Invaild username/password. Please try again"
          }
        }
      }

    )
  }

  


}
