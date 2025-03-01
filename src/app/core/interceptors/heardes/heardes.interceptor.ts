import { HttpInterceptorFn } from '@angular/common/http';

export const heardesInterceptor: HttpInterceptorFn = (req, next) => {
  let myToken = localStorage.getItem('userToken');

  if (myToken) {
    if (
      req.url.includes('cart') ||
      req.url.includes('orders') ||
      req.url.includes('wishlist')
    ) {
      req = req.clone({
        setHeaders: {
          token: myToken!,
        },
      });
    }
  }
  return next(req);
};
