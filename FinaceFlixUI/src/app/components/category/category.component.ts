import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AnyCatcher } from 'rxjs/internal/AnyCatcher';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private formGroup: FormBuilder) {}

  ngOnInit(): void {
    this.title = 'Categorias';
    this.retriveCatogories();
  }

  title?: string;

  form!: FormGroup;

  categories = [{id:0, name:'Vazio', desc:'Vazio'}];

  private retriveCatogories(){
    this.categories = [
      { id: 1, name: 'Angular', desc: 'Angular description' },
      { id: 2, name: 'Java', desc: 'Java description' },
      { id: 3, name: 'React', desc: 'React description' },
  ];
    console.log('Retriving categories');
  }

  protected addCategory() {
    console.log('Category added');
  }

  protected editCategory() {
    console.log('Category edited');
  }

  protected deleteCategory() {
    console.log('Category deleted');
  }

}
