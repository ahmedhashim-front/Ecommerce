import {
  Component,
  inject,
  OnInit,
  signal,
  WritableSignal,
} from '@angular/core';
import { CartService } from '../../core/services/cart/cart.service';
import { WishlistService } from '../../core/services/wishlist.service';
import { ToastrService } from 'ngx-toastr';
import { IWishList } from '../../shared/interfaces/iwish-list';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-wish-list',
  imports: [CurrencyPipe],
  templateUrl: './wish-list.component.html',
  styleUrl: './wish-list.component.scss',
})
export class WishListComponent implements OnInit {
  private cartService = inject(CartService);
  private wishlistService = inject(WishlistService);
  private toastrService = inject(ToastrService);
  // wish :IWishList= {} as IWishList ;
  wish: WritableSignal<IWishList[]> = signal([]);
  ngOnInit(): void {
    this.add();
  }
  add(): void {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wish.set(res.data);
        console.log(res.data, 'Add');
      },
    });
  }

  addwishListItems(id: string): void {
    this.wishlistService.addProductToWishList(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'Wish List');
      },
    });
  }

  clearItem(id: string): void {
    this.wishlistService.removeProductFromWish(id).subscribe({
      next: (res) => {
        this.wish.set(res.data);
        this.cartService.cartNumber.set(res.numOfCartItems);

        this.add();
      },
    });
  }

  addCartItem(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'FreshCart');
        this.cartService.cartNumber.set(res.numOfCartItems);

        this.wish.set(res.data);
        this.add();
      },
    });
  }
}
