import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header-authenticated',
  templateUrl: './header-authenticated.component.html',
  styleUrls: ['./header-authenticated.component.css']
})
export class HeaderAuthenticatedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }


  protected find() {
    console.log('find');
  }

  protected logoff(){
    window.localStorage.removeItem('token');
    window.location.href = '/login';
  }

}
