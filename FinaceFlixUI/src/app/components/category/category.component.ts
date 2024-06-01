import { Component, OnInit, enableProdMode } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Category } from 'src/app/dtos/Category';
import { CategoryRequest } from 'src/app/dtos/CategoryRequest';
import { AlertService } from 'src/app/services/alert/alert.service';
import { CategoryService } from 'src/app/services/category/category.service';
import { phrases } from 'src/app/shared/phrases/phrases';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent implements OnInit {
  constructor(
    private formGroup: FormBuilder,
    private router: Router,
    private categoryService: CategoryService,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.title = 'Categorias';
    this.retriveCatogories();
  }

  title?: string;

  form!: FormGroup;

  categories: Category[] = [];

  selectedIds: string[] = [];

  private retriveCatogories() {
    const category: CategoryRequest = {
      nome: '',
      descricao: '',
      dono: this.getOwner(),
    };

    this.categoryService.retrieveCategories(category).subscribe({
      next: (response) => {
        response.forEach((element) => {
          var category: Category = {
            id: element.id,
            name: element.nome,
            desc: element.descricao,
            owner: this.getOwner(),
          };

          this.categories.push(category);
        });
      },

      error: (error: any) => {
        console.error('Error retrieving categories', error);
      },
    });
  }

  protected addCategory() {
    this.router.navigate(['/category/add']);
  }

  protected editCategory() {
    if (this.selectedIds.length === 0) {
      this.alertService.showWarningAlert(
        phrases.selectAtLeastOne,
        phrases.warning
      );
      return;
    }

    this.router.navigate(['/category/edit/', this.selectedIds[0]]);
    this.selectedIds = [];
  }

  protected deleteCategory() {
    if (this.selectedIds.length === 0) {
      this.alertService.showWarningAlert(
        phrases.selectAtLeastOne,
        phrases.warning
      );
      return;
    } else {
      this.alertService.showConfirmAlert(
        phrases.warning,
        phrases.confirmDeleteCategory,
        phrases.yes,
        phrases.no,
        () => {
          this.selectedIds.forEach((id) => {
            this.categoryService.deleteCategory(id).subscribe({
              next: (response) => {
                console.log('category deleted' + id);
              },
              error: (error: any) => {
                console.error('Error deleting category', error);
              },
            });
          });

          this.selectedIds = [];

          this.alertService.showSuccessAlert(
            phrases.categoryDeleted,
            phrases.sucess
          );

          window.location.reload();
          this.alertService.closeAlert();
        }
      );

     
    }
  }

  private getOwner(): string {
    return window.localStorage.getItem('userEmail') || '';
  }

  protected selectAll() {
    console.log('Select all');
  }

  protected select(id: string) {
    this.selectedIds.push(id);
  }
}
