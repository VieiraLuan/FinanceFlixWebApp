import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-generic-header',
  templateUrl: './generic-header.component.html',
  styleUrls: ['./generic-header.component.css']
})
export class GenericHeaderComponent implements OnInit {

  constructor(private router:Router) { }

  ngOnInit(): void {
  }

  @Input() title?: string;

  protected redirectToHome(){
    this.router.navigate(['/home']);
  }

}
