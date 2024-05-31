import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-authenticated',
  templateUrl: './header-authenticated.component.html',
  styleUrls: ['./header-authenticated.component.css']
})
export class HeaderAuthenticatedComponent implements OnInit {

  constructor(private router: Router) {

  }

  ngOnInit(): void {

  }


  protected find() {
    console.log('find');
  }

  protected logoff(){
    window.localStorage.clear();
    this.router.navigate(['/login']);
  }

  protected redirectToHome(){
    this.router.navigate(['/home']);
  }



}
