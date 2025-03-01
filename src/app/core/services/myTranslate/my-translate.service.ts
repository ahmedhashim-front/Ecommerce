import { isPlatformBrowser } from '@angular/common';
import {
  Inject,
  inject,
  Injectable,
  PLATFORM_ID,
  Renderer2,
  RendererFactory2,
} from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root',
})
export class MyTranslateService {
  private renderer2!: Renderer2;
  constructor(
    private translateService: TranslateService,
    @Inject(PLATFORM_ID) private id: object,
    renderer: RendererFactory2
  ) {
    this.renderer2 = renderer.createRenderer(null, null);
    if (isPlatformBrowser(this.id)) {
      // 1
      this.translateService.setDefaultLang('en');
      // 2
      const saveLang = localStorage.getItem('lang');

      //3
      if (saveLang) {
        this.translateService.use(saveLang!);
      }
    }
    this.changeDirection();
  }
  changeDirection(): void {
    if (localStorage.getItem('lang') === 'en') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'ltr');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'en');
    } else if (localStorage.getItem('lang') === 'ar') {
      this.renderer2.setAttribute(document.documentElement, 'dir', 'rtl');
      this.renderer2.setAttribute(document.documentElement, 'lang', 'ar');
    }
  }

  changeLangTranslate(lang: string): void {
    localStorage.setItem('lang', lang);
    this.translateService.use(lang);
    this.changeDirection();
  }
}
