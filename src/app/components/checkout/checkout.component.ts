import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html'
,
  styleUrl:'./checkout.component.html',

})
export class CheckoutComponent implements OnInit {
  cartItems: any[] = [];
  total: number = 0;
  processing: boolean = false;
  message: string = '';
  success: boolean = false;

  paymentDetails = {
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    amount: 0,
  };

  constructor(private cartService: CartService) {}

  ngOnInit() {
    this.cartItems = this.cartService.cartItems;
    this.total = this.cartService.getTotal();
  }

  async onSubmit() {
    this.processing = true;
    this.message = '';
    this.paymentDetails.amount = this.total;

    try {
      const result = await this.cartService.processPayment(this.paymentDetails);
      this.success = result.success;
      this.message = result.message;

      if (result.success) {
        console.log('Payment successful');
      }
    } catch (error) {
      this.success = false;
      this.message = 'An error occurred while processing payment';
    } finally {
      this.processing = false;
    }
  }
}
