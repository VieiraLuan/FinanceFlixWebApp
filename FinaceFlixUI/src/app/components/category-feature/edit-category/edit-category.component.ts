import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { CategoryRequest } from 'src/app/dtos/CategoryRequest';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { phrases } from 'src/app/shared/phrases/phrases';

@Component({
  selector: 'app-edit-category',
  templateUrl: './edit-category.component.html',
  styleUrls: ['./edit-category.component.css'],
})
export class EditCategoryComponent implements OnInit {
  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private categoryService: CategoryService,
    private alertService: AlertService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((params) => {
      this.categoryIdFromRoute = params['id'];
    });

    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      desc: [null, Validators.required],
    });

    this.retriveCategory();
  }

  protected form!: FormGroup;
  protected title = 'Editar Categoria';
  categoryIdFromRoute: string = '';

  protected getName() {
    return this.form.get('name');
  }

  protected getDesc() {
    return this.form.get('desc');
  }

  private retriveCategory() {
    this.categoryService
      .retrieveCategoryById(this.categoryIdFromRoute)
      .subscribe({
        next: (category) => {
          this.form.setValue({
            name: category.nome,
            desc: category.descricao,
          });
        },
        error: (error) => {
          console.log('Error retrieving category', error);
        },
      });
  }

  protected editCategory() {
    const category: CategoryRequest = {
      id: this.categoryIdFromRoute,
      nome: this.getName()?.value,
      descricao: this.getDesc()?.value,
      dono: window.localStorage.getItem('userEmail') || '',
    };

    this.categoryService.updateCategory(category).subscribe({
      next: (response) => {
        this.alertService.showSuccessAlert(
          phrases.categoryUpdated,
          phrases.sucess
        );

        setTimeout(() => {
          this.router.navigate(['/categories']);
          this.alertService.closeAlert();
        }, 1000);
      },
      error: (error) => {
        this.alertService.showErrorAlert(phrases.errorPhrase, phrases.error);
        console.log('Error editing category', error);
      },
    });
  }
}
