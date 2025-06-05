import { Component, inject } from '@angular/core';
import { MatButton } from '@angular/material/button';
import { MatFormField, MatLabel } from '@angular/material/form-field';
import { MatIcon } from '@angular/material/icon';
import { MatInput } from '@angular/material/input';
import { CartService } from '../../../core/services/cart.service';
import { CurrencyPipe, Location, NgIf } from '@angular/common';
import { RouterLink } from '@angular/router';
import { StripeService } from '../../../core/services/stripe.service';
import { firstValueFrom } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-order-summary',
  imports: [
    MatButton,
    MatFormField,
    MatLabel,
    MatInput,
    CurrencyPipe,
    RouterLink,
    FormsModule,
    MatIcon,
    NgIf
  ],
  templateUrl: './order-summary.component.html',
  styleUrl: './order-summary.component.css'
})
export class OrderSummaryComponent {
  cartService = inject(CartService);
  private stripeService = inject(StripeService);
  location = inject(Location);
  code?: string;

  applyCouponCode() {
    if (!this.code) return;
    this.cartService.applyDiscount(this.code).subscribe({
      next: async coupon => {
        const cart = this.cartService.cart();
        if (cart) {
          cart.coupon = coupon;
          await firstValueFrom(this.cartService.setCart(cart));
          this.code = undefined;
        }
        if (this.location.path() === '/checkout') {
          await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
        }
      }
    });
  }

  async removeCouponCode() {
    const cart = this.cartService.cart();
    if (!cart) return;
    if (cart.coupon) cart.coupon = undefined;
    await firstValueFrom(this.cartService.setCart(cart));
    if (this.location.path() === '/checkout') {
      await firstValueFrom(this.stripeService.createOrUpdatePaymentIntent());
    }
  }
}
