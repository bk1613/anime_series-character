import { Component } from '@angular/core';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';
import { Router } from '@angular/router';
import { CharService } from 'src/app/Shonen/char.service';
import { NavbarComponent } from 'src/app/navbar/navbar.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date = null;
  title: any = 'angular-anime-characters';
  role: String;

  constructor(private idle: Idle, private keepalive: Keepalive, private router: Router, private cs: CharService) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(5);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    this.role = sessionStorage.getItem("role")

    
    idle.onIdleEnd.subscribe(() => { 
      this.idleState = 'No longer idle.'
      console.log(this.idleState);
      this.reset();
    });
    
    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      // this.timedOut = true;
      // console.log(this.role)
      // if(this.role != undefined){ 
      //     sessionStorage.removeItem('role');
      //     this.router.navigate(['/user']);
      // }
      
      
    });
    
    idle.onIdleStart.subscribe(() => {
        this.idleState = 'You\'ve gone idle!'
        console.log(this.idleState);
        
    });
    
    idle.onTimeoutWarning.subscribe((countdown) => { 
       this.idleState = 'You will be timed out in ' + countdown + ' seconds!'
      console.log(this.idleState);
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.reset();
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }
}
