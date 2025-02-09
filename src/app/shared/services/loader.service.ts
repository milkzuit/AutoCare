// shared/services/loader.service.ts
import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class LoaderService {
  private isLoading = false;

  showLoader(message: string = 'Loading...') {
    this.isLoading = true;
    return Swal.fire({
      title: message,
      imageUrl: 'https://media2.giphy.com/media/sIIhZliB2McAo/giphy.gif',
      imageHeight: 150,
      showConfirmButton: false,
      width: '400px',
      padding: '20px',
      background: '#fff',
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });
  }

  hideLoader() {
    if (this.isLoading) {
      this.isLoading = false;
      Swal.close();
    }
  }
}
