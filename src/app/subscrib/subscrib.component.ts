import { Component, OnInit } from '@angular/core';
import { CharService } from '../Shonen/char.service'
import { User } from '../models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-subscrib',
  templateUrl: './subscrib.component.html',
  styleUrls: ['./subscrib.component.css']
})
export class SubscribComponent implements OnInit {

  constructor(private cs: CharService, private router: Router) { }

  subusername: String;
  subpassword: String;
  Users: User[];

  ngOnInit(): void {
  }

  subscribtion(){
    this.router.navigate(['series'])
    let u = new User(0, this.subusername, this.subpassword);
    // this.cs.adduser(u).subscribe(
    //   (response: any[]) =>{
    //     console.log(response);
    //     this.Users = response;
    //   }
    // )

  }

}
