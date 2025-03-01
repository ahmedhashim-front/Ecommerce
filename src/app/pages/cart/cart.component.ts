import { Component, OnInit, inject } from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { ICart } from '../../shared/interfaces/icart';
import { CurrencyPipe } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  imports: [CurrencyPipe, RouterLink],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.scss',
})
export class CartComponent implements OnInit {
  private cartService = inject(CartService);

  cartDetails: ICart = {} as ICart;

  ngOnInit(): void {
    this.getCartData();
  }
  getCartData(): void {
    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartDetails = res.data;
        // console.log(res.data);
      },
    });
  }
  removeItem(id: string): void {
    this.cartService.removeSpecificCartItem(id).subscribe({
      next: (res) => {
        // console.log(res);
        this.cartDetails = res.data;
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }

  upDateItem(id: string, count: number): void {
    this.cartService.updateCartProduct(id, count).subscribe({
      next: (res) => {
        this.cartDetails = res.data;

        // console.log(res);
      },
    });
  }

  clearAllCart(): void {
    this.cartService.clearCart().subscribe({
      next: (res) => {
        // console.log(res);
        if (res.message === 'success') {
          this.cartDetails = {} as ICart;
          this.cartService.cartNumber.set(0);
        }
      },
    });
  }
}
