import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AlertService {
  constructor() {}

  private showAlert(title: string, message: string, icon: SweetAlertIcon) {
    Swal.fire(title, message, icon);
  }

  public showSuccessAlert(message: string, title: string) {
    this.showAlert(title, message, 'success');
  }

  public showErrorAlert(message: string, title: string) {
    this.showAlert(title, message, 'error');
  }

  public showWarningAlert(message: string, title: string) {
    this.showAlert(title, message, 'warning');
  }

  public showInfoAlert(message: string, title: string) {
    this.showAlert(title, message, 'info');
  }
}
