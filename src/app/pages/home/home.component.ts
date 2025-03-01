import { CurrencyPipe, UpperCasePipe } from '@angular/common';
import {
  Component,
  inject,
  OnInit,
  WritableSignal,
  signal,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ToastrService } from 'ngx-toastr';
import { CartService } from '../../core/services/cart/cart.service';
import { CategoriesService } from '../../core/services/categories/categories.service';
import { ProductsService } from '../../core/services/products/products.service';
import { ICategories } from '../../shared/interfaces/icategories';
import { IProduct } from '../../shared/interfaces/iproduct';
import { SalePipe } from '../../shared/pipes/sale.pipe';
import { SearchPipe } from '../../shared/pipes/search.pipe';
import { NgxSpinnerService } from 'ngx-spinner';
import { single } from 'rxjs';
import { WishlistService } from '../../core/services/wishlist.service';

@Component({
  selector: 'app-home',
  imports: [
    CarouselModule,
    RouterLink,
    FormsModule,
    UpperCasePipe,
    SalePipe,
    SearchPipe,
    CurrencyPipe,
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private productsService = inject(ProductsService);
  private categoriesService = inject(CategoriesService);
  private cartService = inject(CartService);
  private toastrService = inject(ToastrService);
  private wishlistService = inject(WishlistService);

  products: WritableSignal<IProduct[]> = signal([]);
  // categories: ICategories[] = [];
  categories: WritableSignal<ICategories[]> = signal([]);

  text: string = '';
  ngOnInit(): void {
    this.getProductsData();
    this.getCategoriesData();
  }
  customMaiSlider: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 3000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items: 1,
    nav: false,
  };
  customOptions: OwlOptions = {
    loop: true,
    autoplay: true,
    autoplayTimeout: 2000,
    autoplayHoverPause: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    rtl: true,
    dots: true,
    navSpeed: 700,
    navText: [
      '<i class="fa-solid fa-angles-left"></i>',
      '<i class="fa-solid fa-angles-right"></i>',
    ],
    responsive: {
      0: {
        items: 1,
      },
      400: {
        items: 2,
      },
      740: {
        items: 3,
      },
      940: {
        items: 4,
      },
    },
    nav: false,
  };

  getCategoriesData(): void {
    this.categoriesService.getAllCategories().subscribe({
      next: (res) => {
        this.categories.set(res.data);
      },
    });
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
  
}
