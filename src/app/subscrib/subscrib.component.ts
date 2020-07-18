import { Component, OnInit } from '@angular/core';
import { CharService } from '../Shonen/char.service'
import { User } from '../models/user';
import { Router } from '@angular/router';

import {Buffer} from 'buffer/';
import * as CryptoJS from 'crypto-js';
import * as crypto from "crypto-browserify";
import { $ } from 'protractor';

@Component({
  selector: 'app-subscrib',
  templateUrl: './subscrib.component.html',
  styleUrls: ['./subscrib.component.css']
})
export class SubscribComponent implements OnInit {


  constructor(private cs: CharService, private router: Router) { }

  subusername: String;
  subemail: String;
  subpassword: string;
  subrole: String;
  Users: User[];
  hashpass: number;
  htmlContent:String;
  
  ngOnInit(): void {
  }

  subscribtion(){
    
    var key = CryptoJS.enc.Utf8.parse('7061737323313233');
    var iv = CryptoJS.enc.Utf8.parse('7061737323313233');
    let encrypted = CryptoJS.AES.encrypt(CryptoJS.enc.Utf8.parse(this.subpassword), key,
        {
            keySize: 256 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

    let u = new User(0, this.subusername, this.subemail, encrypted.toString(), this.subrole);
    this.cs.getalluserss().subscribe(
        (response: any[])=>{
          for(let a of response){
            let decrypted = CryptoJS.AES.decrypt(a.password.toString(), key, {
            keySize: 256 / 8,
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
            }); 
            if(a.username == this.subusername || decrypted.toString(CryptoJS.enc.Utf8) == this.subpassword){
              this.htmlContent = `<p>ERROR: The username already exists</p>`
              
            }else if(a.username != this.subusername && a.password != this.subpassword){
                this.cs.adduser(u).subscribe(
                  (response: any[])=>{
                    console.log(response);
                    this.router.navigate(['user'])
                  }
                )
                
            }
          }
        }
    )
  } 
}
