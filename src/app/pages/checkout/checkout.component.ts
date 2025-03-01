import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { OrderService } from '../../core/services/order/order.service';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.scss',
})
export class CheckoutComponent implements OnInit {
  private readonly activatedRoute = inject(ActivatedRoute);
  private orderService = inject(OrderService);
  CartId: string = '';
  ngOnInit(): void {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.CartId = param.get('id')!;
    });
  }
  checkOutForm = new FormGroup({
    details: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [
      Validators.required,
      Validators.pattern(/^01[0125][0-9]{8}$/),
    ]),
    city: new FormControl(null),
  });
  submitForm(): void {
    this.orderService
      .checkoutCession(this.CartId, this.checkOutForm.value)
      .subscribe({
        next: (res) => {
          open(res.session.url, '_self');
        },
        error: (er) => {
          console.log(er);
        },
      });
  }
}
