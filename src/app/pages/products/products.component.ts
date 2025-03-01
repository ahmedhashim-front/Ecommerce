import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import { Component, inject, signal, WritableSignal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { ProductsService } from '../../core/services/products/products.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { IProduct } from '../../shared/interfaces/iproduct';
import { SalePipe } from '../../shared/pipes/sale.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-products',
  imports: [
    CarouselModule,
    RouterLink,
    FormsModule,
    UpperCasePipe,
    SalePipe,
    SearchPipe,
    CurrencyPipe,
  ],
  templateUrl: './products.component.html',
  styleUrl: './products.component.scss',
})
export class ProductsComponent {
  private productsService = inject(ProductsService);
  private cartService = inject(CartService);
  private toastrService = inject(ToastrService);
  private wishlistService = inject(WishlistService);
  // countWish: WritableSignal<number> = signal(0);
  products: WritableSignal<IProduct[]> = signal([]);
  // categories: ICategories[] = [];
  categories: WritableSignal<ICategories[]> = signal([]);
  text: string = '';
  wish: any;

  ngOnInit(): void {
    this.getProductsData();
  }
 
  getProductsData(): void {
    this.productsService.getAllProducts().subscribe({
      next: (res) => {
        this.products.set(res.data);
      },
    });
  }

  addCartItem(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'FreshCart');
        console.log(res.numOfCartItems);

        this.cartService.cartNumber.set(res.numOfCartItems);
      },
    });
  }
  add(): void {
    this.wishlistService.getLoggedUserWishList().subscribe({
      next: (res) => {
        this.wish.set(res.data);
        console.log(res.data, 'Add');
      },
    });
  }
  favoritesMap: { [key: string]: boolean } = {}; // تخزين الحالة لكل عنصر

  addWishListItem(id: string): void {
    this.wishlistService.addProductToWishList(id).subscribe({
      next: (res) => {
        this.toastrService.success(res.message, 'wish');
        console.log(res);
        
        // تغيير حالة العنصر فقط دون التأثير على الآخرين
        this.favoritesMap[id] = !this.favoritesMap[id];
      },
    });
  }
  
  // إرجاع حالة العنصر لتغيير اللون في HTML
  isFavorite(id: string): boolean {
    return !!this.favoritesMap[id];
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
}
