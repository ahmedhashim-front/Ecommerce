import {
  Component,
  computed,
  inject,
  input,
  OnInit,
  Signal,
} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth/auth.service';
import { TranslatePipe, TranslateService } from '@ngx-translate/core';
import { MyTranslateService } from '../../core/services/myTranslate/my-translate.service';
import { CartService } from '../../core/services/cart/cart.service';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink, RouterLinkActive, TranslatePipe],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss',
})
export class NavbarComponent implements OnInit {
  private myTranslateService = inject(MyTranslateService);
  private translateService = inject(TranslateService);
  isLogin = input<boolean>(true);
  private authService = inject(AuthService);
  private cartService = inject(CartService);
  contNumber: Signal<number> = computed(() => this.cartService.cartNumber());

  ngOnInit(): void {
    // this.contNumber = this.cartService.cartNumber.getValue();

    this.cartService.getLoggedUserCart().subscribe({
      next: (res) => {
        this.cartService.cartNumber.set(res.numOfCartItems);
      },
    });
    // this.cartService.cartNumber.subscribe({
    //   next: (data) => {
    //     this.contNumber = data;
    //   },
    // });
    console.log(this.contNumber);
  }
  logOut(): void {
    this.authService.logOut();
  }
  change(lang: string): void {
    this.myTranslateService.changeLangTranslate(lang);
  }
  currentLang(lang: string): boolean {
    return this.translateService.currentLang === lang;
  }
}
