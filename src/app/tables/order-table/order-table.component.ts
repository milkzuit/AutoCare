// order-table.component.ts
import { Component, OnInit } from '@angular/core';
import { LoaderService } from '../../shared/services/loader.service';
import { PurchaseService } from '../purchase.service';

interface Purchase {
  userId: number;
  totalAmount: number;
  purchaseDate: string;
  items: Array<{ serviceName: string; price: number }>;
  _links: {
    self: {
      href: string;
    };
    purchase: {
      href: string;
    };
  };
}

@Component({
  selector: 'app-order-table',
  templateUrl: './order-table.component.html',
  styleUrls: ['./order-table.component.css'],
})
export class OrderTableComponent implements OnInit {
  purchases: Purchase[] = [];

  constructor(
    private purchaseService: PurchaseService,
    private loaderService: LoaderService
  ) {}

  ngOnInit() {
    this.loadAllPurchases();
  }

  private loadAllPurchases() {
    this.loaderService.showLoader('Loading all orders...');

    this.purchaseService.getAllPurchases().subscribe({
      next: (response: any) => {
        this.purchases = response._embedded.purchases;
        this.loaderService.hideLoader();
      },
      error: (error) => {
        console.error('Failed to load purchases:', error);
        this.loaderService.hideLoader();
      },
    });
  }

  getItemsCount(items: Array<any>): number {
    return items.length;
  }

  formatDate(date: string): string {
    return new Date(date).toLocaleString();
  }

  // Add this helper method to extract ID
  getPurchaseId(purchase: Purchase): number {
    const idString = purchase._links.self.href.split('/').pop();
    return idString ? parseInt(idString, 10) : 0;
  }

  downloadReceipt(purchaseId: number) {
    this.loaderService.showLoader('Generating receipt...');

    this.purchaseService.downloadReceipt(purchaseId).subscribe({
      next: (response: Blob) => {
        const blob = new Blob([response], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `receipt-${purchaseId}.pdf`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
        this.loaderService.hideLoader();
      },
      error: (error) => {
        console.error('Failed to download receipt:', error);
        this.loaderService.hideLoader();
      },
    });
  }
}
