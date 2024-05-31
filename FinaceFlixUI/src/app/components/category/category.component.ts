import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(private formGroup: FormBuilder, private router:Router) {}

  ngOnInit(): void {
    this.title = 'Categorias';
    this.retriveCatogories();
  }

  title?: string;

  form!: FormGroup;

  categories = [{ id: 0, name: 'Vazio', desc: 'Vazio' }];

  private retriveCatogories() {
    this.categories = [
      { id: 1, name: 'Angular', desc: 'Angular description' },
      { id: 2, name: 'Java', desc: 'Java description' },
      { id: 1, name: 'Angular', desc: 'Angular description' },
      { id: 2, name: 'Java', desc: 'Java description' },

    ];
    console.log('Retriving categories');
  }

  protected addCategory() {
    this.router.navigate(['/category/add']);
  }

  protected editCategory() {
    this.router.navigate(['/category/edit']);
  }

  protected deleteCategory() {
    console.log('Category deleted');
  }
}
