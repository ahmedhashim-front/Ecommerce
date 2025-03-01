import { ICart } from './../../shared/interfaces/icart';
import { IProduct } from './../../shared/interfaces/iproduct';
import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../core/services/products/products.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-details',
  imports: [],
  templateUrl: './details.component.html',
  styleUrl: './details.component.scss',
})
export class DetailsComponent implements OnInit {
  activatedRoute = inject(ActivatedRoute);
  productsService = inject(ProductsService);
  cartService = inject(CartService);
  cartDetails: ICart = {} as ICart;

  detailsProduct: IProduct | null = null;

  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe({
      next: (p) => {
        let idProduct = p.get('id');
        console.log(idProduct);

        //call api sppacefic product
        this.productsService.getSpecificproduct(`/` + idProduct!).subscribe({
          next: (res) => {
            this.detailsProduct = res.data;
          },
        });
      },
    });
  }

  addCartItem(id: string): void {
    this.cartService.addProductToCart(id).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
