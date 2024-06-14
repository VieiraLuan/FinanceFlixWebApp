import { Observable } from 'rxjs';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CategoryService } from 'src/app/services/category/category.service';
import { phrases } from 'src/app/shared/phrases/phrases';
import { Router } from '@angular/router';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryRequest } from 'src/app/dtos/CategoryRequest';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css'],
})
export class AddCategoryComponent implements OnInit {
  constructor(
    private formBuilder: FormBuilder,
    private alertService: AlertService,
    private categoryService: CategoryService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      name: [null, Validators.required],
      desc: [null, Validators.required],
    });
  }

  protected form!: FormGroup;

  protected title = 'Adicionar Categoria';

  protected getName() {
    return this.form.get('name');
  }

  protected getDesc() {
    return this.form.get('desc');
  }

  private validateFields(): boolean {
    if (this.getName()!.value === null) {
      this.alertService.showWarningAlert(
        phrases.writeValidName,
        phrases.invalidName
      );
      return false;
    }
    if (this.getDesc()!.value === null) {
      this.alertService.showWarningAlert(
        phrases.writeValidDesc,
        phrases.invalidDesc
      );
      return false;
    }
    return true;
  }

  private returnToList() {
    this.router.navigate(['/categories']);
  }

  protected addCategory() {
    this.alertService.showLoadingAlert('Cadastrando...');

    if (!this.validateFields() || !this.form.invalid) {
      const category: CategoryRequest = {
        nome: this.getName()!.value,
        descricao: this.getDesc()!.value,
        dono: window.localStorage.getItem('userEmail') || '',
      };

      this.categoryService.addCategory(category).subscribe({
        next: (response) => {
          this.alertService.showSuccessAlert(
            phrases.categoryAddedSuccess,
            phrases.categoryAdded
          );
          setTimeout(() => {
            this.alertService.closeAlert();
            this.returnToList();
          }, 1000);
        },
        error: (error) => {
          console.error('Error:', error);
          if (error.error.message != null) {
            this.alertService.showErrorAlert(
              error.error.message,
              phrases.errorPhrase
            );
          } else {
            this.alertService.showErrorAlert(
              phrases.loginErrorContactSupport,
              phrases.errorPhrase
            );
          }
        },
      });
    }
  }
}
