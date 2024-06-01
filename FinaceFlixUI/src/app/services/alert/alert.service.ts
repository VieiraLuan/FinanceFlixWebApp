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

  public showLoadingAlert(message: string) {
    Swal.fire({
      title: message,
      allowOutsideClick: false,
      showConfirmButton: false,
      willOpen: () => {
        Swal.showLoading();
      },
    });
  }

  public closeAlert() {
    Swal.close();
  }

  public showConfirmAlert(
    title: string,
    message: string,
    confirmButtonText: string,
    cancelButtonText: string,
    confirmCallback: () => void
  ) {
    Swal.fire({
      title: title,
      text: message,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
    }).then((result) => {
      if (result.isConfirmed) {
        confirmCallback();
      }
    });
  }
}
