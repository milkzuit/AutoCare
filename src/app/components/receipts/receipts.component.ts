// receipts.component.ts
import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { PurchaseService } from '../../services/purchase.service';
import { LoaderService } from '../../shared/services/loader.service';
// import { LoaderComponent } from '../shared/loader/loader.component';

interface Purchase {
  id: number;
  purchaseDate: string;
  totalAmount: number;
  items: Array<{ serviceName: string; price: number }>;
}

@Component({
  selector: 'app-receipts',
  template: `
    <div class="container mx-auto px-4 py-8">
      @if (purchases.length) {
      <!-- Your existing purchases display code -->
      <h2 class="text-2xl font-bold mb-6">Your Purchase History</h2>
      <div class="space-y-6">
        @for (purchase of purchases; track purchase.id) {
        <div class="bg-white rounded-lg shadow-md p-6 relative">
          <!-- Timeline dot and line -->
          <div class="absolute left-[-2rem] top-1/2 transform -translate-y-1/2">
            <div class="w-4 h-4 bg-blue-500 rounded-full"></div>
            <div
              class="w-0.5 h-full bg-blue-200 absolute top-4 left-1/2 transform -translate-x-1/2"
            ></div>
          </div>

          <!-- Purchase content -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold">Purchase #{{ purchase.id }}</h3>
              <p class="text-gray-600">
                {{ purchase.purchaseDate | date : 'medium' }}
              </p>
            </div>
            <span class="text-xl font-bold text-green-600">
              ₹{{ purchase.totalAmount }}
            </span>
          </div>

          <!-- Services summary -->
          <div class="mb-4">
            <p class="text-gray-700">
              Services: {{ getServicesSummary(purchase.items) }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end">
            <button
              (click)="downloadReceipt(purchase.id)"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Download Receipt
            </button>
          </div>
        </div>
        }
      </div>
      } @else {
      <!-- Your existing empty state code -->
      <div class="text-center py-12">
        <img
          src="/api/placeholder/400/300"
          alt="No purchases"
          class="mx-auto mb-6"
        />
        <h2 class="text-2xl font-bold mb-4">No Purchase History Found</h2>
        <p class="text-gray-600 mb-6">
          Looks like you haven't made any purchases yet. Start your car service
          journey today!
        </p>
        <button
          (click)="navigateToServices()"
          class="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600 transition-colors"
        >
          Explore Services
        </button>
      </div>
      }
    </div>
  `,
  styles: [
    `
      :host {
        display: block;
      }

      .container {
        position: relative;
      }

      /* Timeline styling */
      .space-y-6 {
        position: relative;
        padding-left: 3rem;
      }

      .space-y-6::before {
        content: '';
        position: absolute;
        left: 1rem;
        top: 0;
        bottom: 0;
        width: 2px;
        background-color: #e5e7eb;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
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

    // Show loader
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

  downloadReceipt(purchaseId: number) {
    this.loaderService.showLoader('Generating your receipt...');

    this.purchaseService.downloadReceipt(purchaseId).subscribe({
      next: (blob) => {
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `receipt-${purchaseId}.pdf`;
        link.click();
        window.URL.revokeObjectURL(url);
        this.loaderService.hideLoader();
      },
      error: (error) => {
        console.error('Failed to download receipt:', error);
        this.loaderService.hideLoader();
        // Show error message
      },
    });
  }

  navigateToServices() {
    this.router.navigate(['/services']);
  }
}
