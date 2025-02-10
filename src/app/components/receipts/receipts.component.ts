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
  template: `
    <div class="container mx-auto px-4 py-8">
      @if (purchases.length) {
      <h2 class="text-2xl font-bold mb-6 text-primary">
        Your Purchase History
      </h2>
      <div class="space-y-6">
        @for (purchase of purchases; track purchase.id) {
        <div
          class="bg-secondary rounded-lg shadow-xl p-6 relative border border-accent/20 hover:border-accent/40 transition-all"
        >
          <!-- Timeline dot and line -->
          <div class="absolute left-[-2rem] top-1/2 transform -translate-y-1/2">
            <div
              class="w-4 h-4 bg-accent rounded-full shadow-[0_0_10px_rgba(255,215,0,0.3)]"
            ></div>
            <div
              class="w-0.5 h-full bg-accent/20 absolute top-4 left-1/2 transform -translate-x-1/2"
            ></div>
          </div>

          <!-- Purchase content -->
          <div class="flex justify-between items-start mb-4">
            <div>
              <h3 class="text-lg font-semibold text-primary">
                Purchase #{{ purchase.id }}
              </h3>
              <p class="text-secondary-text">
                {{ purchase.purchaseDate | date : 'medium' }}
              </p>
            </div>
            <span class="text-xl font-bold text-accent"
              >₹{{ purchase.totalAmount }}</span
            >
          </div>

          <!-- Services summary -->
          <div class="mb-4">
            <p class="text-primary-text">
              Services: {{ getServicesSummary(purchase.items) }}
            </p>
          </div>

          <!-- Actions -->
          <div class="flex justify-end">
            <button
              (click)="downloadReceipt(purchase.id)"
              class="bg-accent/10 text-accent px-4 py-2 rounded hover:bg-accent/20 transition-all border border-accent/50 hover:border-accent shadow-lg"
            >
              Download Receipt
            </button>
          </div>
        </div>
        }
      </div>
      } @else {
      <div class="text-center py-12 bg-secondary rounded-lg shadow-xl p-8">
        <img
          src="/api/placeholder/400/300"
          alt="No purchases"
          class="mx-auto mb-6 rounded-lg"
        />
        <h2 class="text-2xl font-bold mb-4 text-primary">
          No Purchase History Found
        </h2>
        <p class="text-secondary-text mb-6">
          Looks like you haven't made any purchases yet. Start your car service
          journey today!
        </p>
        <button
          (click)="navigateToServices()"
          class="bg-accent/10 text-accent px-6 py-3 rounded-lg hover:bg-accent/20 transition-all border border-accent/50 hover:border-accent shadow-lg"
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
        background-color: #0a192f;
        min-height: 100vh;
        color: #ccd6f6;
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
        background-color: rgba(255, 215, 0, 0.1);
      }

      /* Theme colors */
      .text-primary {
        color: #ccd6f6;
      }
      .text-secondary-text {
        color: #8892b0;
      }
      .text-primary-text {
        color: #a8b2d1;
      }
      .bg-secondary {
        background-color: #112240;
      }
      .text-accent {
        color: #ffd700;
      }
      .bg-accent {
        background-color: #ffd700;
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
