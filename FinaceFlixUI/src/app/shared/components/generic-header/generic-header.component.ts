import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-generic-header',
  templateUrl: './generic-header.component.html',
  styleUrls: ['./generic-header.component.css']
})
export class GenericHeaderComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  @Input() title?: string;

}
