// receipts.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
import { LoaderService } from '../../shared/services/loader.service';
import Swal from 'sweetalert2';

interface Purchase {
  id: number;
  purchaseDate: string;
  totalAmount: number;
  items: Array<{ serviceName: string; price: number }>;
}

@Component({
  selector: 'app-receipts',
  templateUrl: './receipts.component.html',
  styleUrl: './receipts.component.css'

})
export class ReceiptsComponent implements OnInit {
  getServicesSummary(items: Array<{ serviceName: string }>) {
    if (items.length <= 2) {
      return items.map((item) => item.serviceName).join(', ');
    }
    return `${items[0].serviceName}, ${items[1].serviceName}, and ${
      items.length - 2
    } more`;
  }

  purchases: any[] = [];

  constructor(
    private purchaseService: PurchaseService,
    private loaderService: LoaderService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadPurchases();
  }

  private loadPurchases() {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    if (!user.id) {
      this.router.navigate(['/login']);
      return;
    }

    // ? Show loader
    this.loaderService.showLoader('Fetching your purchase history...');

    this.purchaseService.getUserPurchases(user.id).subscribe({
      next: (data) => {
        this.purchases = data;
        this.loaderService.hideLoader();
        console.log(this.purchases);
      },
      error: (error) => {
        console.error('Failed to load purchases:', error);
        this.loaderService.hideLoader();
        // You might want to show an error message here
      },
    });
  }

  // In your ReceiptsComponent
  downloadReceipt(purchaseId: number) {
    this.loaderService.showLoader('Generating your receipt...');

    this.purchaseService.downloadReceipt(purchaseId).subscribe({
      next: (response: Blob) => {
        if (response.size === 0) {
          Swal.fire({
            icon: 'error',
            title: 'Download Failed',
            text: 'Received empty PDF from server',
            background: '#112240',
            color: '#ccd6f6',
            confirmButtonColor: '#ffd700',
          });
          this.loaderService.hideLoader();
          return;
        }

        // Create blob URL
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);

        // Create temporary link
        const link = document.createElement('a');
        link.href = url;
        link.download = `receipt-${purchaseId}.pdf`;

        // Append to body, click, and remove
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up
        window.URL.revokeObjectURL(url);
        this.loaderService.hideLoader();
      },
      error: (error) => {
        console.error('Failed to download receipt:', error);
        // ? Hide loader
        this.loaderService.hideLoader();

        let errorMessage = 'Failed to download the receipt. Please try again.';
        if (error.status === 404) {
          errorMessage = 'Receipt not found.';
        } else if (error.status === 403) {
          errorMessage = 'You do not have permission to download this receipt.';
        }

        Swal.fire({
          icon: 'error',
          title: 'Download Failed',
          text: errorMessage,
          background: '#112240',
          color: '#ccd6f6',
          confirmButtonColor: '#ffd700',
        });
      },
    });
  }

  navigateToServices() {
    this.router.navigate(['/services']);
  }
}
