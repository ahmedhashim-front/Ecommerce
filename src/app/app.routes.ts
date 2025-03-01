import { AllordersComponent } from './pages/allorders/allorders.component';
// import { Routes } from '@angular/router';
// import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
// import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
// import { LoginComponent } from './pages/login/login.component';
// import { RegisterComponent } from './pages/register/register.component';
// import { HomeComponent } from './pages/home/home.component';
// import { BrandsComponent } from './pages/brands/brands.component';
// import { CartComponent } from './pages/cart/cart.component';
// import { CategoriesComponent } from './pages/categories/categories.component';
// import { CheckoutComponent } from './pages/checkout/checkout.component';
// import { DetailsComponent } from './pages/details/details.component';
// import { ProductsComponent } from './pages/products/products.component';
// import { NotfoundComponent } from './pages/notfound/notfound.component';

// export const routes: Routes = [
//   { path: '', redirectTo: 'home', pathMatch: 'full' },
//   {
//     path: '',
//     component: AuthLayoutComponent,
//     title: 'auth',
//     children: [
//       { path: 'login', component: LoginComponent, title: 'login' },
//       { path: 'register', component: RegisterComponent, title: 'register' },
//     ],
//   },
//   {
//     path: '',
//     component: BlankLayoutComponent,
//     title: 'blank',
//     children: [
//       { path: 'home', component: HomeComponent, title: 'home' },
//       { path: 'cart', component: CartComponent, title: 'cart' },
//       {
//         path: 'categories',
//         component: CategoriesComponent,
//         title: 'categories',
//       },
//       { path: 'checkout', component: CheckoutComponent, title: 'checkout' },
//       { path: 'details', component: DetailsComponent, title: 'details' },
//       { path: 'products', component: ProductsComponent, title: 'products' },
//       { path: 'brands', component: BrandsComponent, title: 'brands' },
//       { path: '**', component: NotfoundComponent, title: 'notfound' },
//     ],
//   },
// ];

import { Routes } from '@angular/router';
import { AuthLayoutComponent } from './layouts/auth-layout/auth-layout.component';
import { BlankLayoutComponent } from './layouts/blank-layout/blank-layout.component';
import { NotfoundComponent } from './pages/notfound/notfound.component';
import { authGuard } from './core/guards/auth.guard';
import { loginGuard } from './core/guards/login.guard';
import { WishListComponent } from './pages/wish-list/wish-list.component';

export const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },

  {
    path: '',
    component: AuthLayoutComponent,
    title: 'auth',
    canActivate: [loginGuard],
    children: [
      {
        path: 'login',
        title: 'login',
        loadComponent: () =>
          import('./pages/login/login.component').then((m) => m.LoginComponent),
      },
      {
        path: 'register',
        title: 'register',
        loadComponent: () =>
          import('./pages/register/register.component').then(
            (m) => m.RegisterComponent
          ),
      },
      {
        path: 'forgotpassword',
        title: 'forgotpassword',
        loadComponent: () =>
          import('./pages/forgotpassword/forgotpassword.component').then(
            (m) => m.ForgotpasswordComponent
          ),
      },
    ],
  },

  {
    path: '',
    component: BlankLayoutComponent,
    title: 'blank',
    canActivate: [authGuard],

    children: [
      {
        path: 'home',
        title: 'home',
        loadComponent: () =>
          import('./pages/home/home.component').then((m) => m.HomeComponent),
      },
      {
        path: 'cart',
        title: 'cart',
        loadComponent: () =>
          import('./pages/cart/cart.component').then((m) => m.CartComponent),
      },
      {
        path: 'categories',
        title: 'categories',
        loadComponent: () =>
          import('./pages/categories/categories.component').then(
            (m) => m.CategoriesComponent
          ),
      },
      // {
      //   path: 'allorders',
      //   title: 'allorders',
      //   loadComponent: () =>
      //     import('./pages/allorders/allorders.component').then(
      //       (m) => m.AllordersComponent
      //     ),
      // },
      { path: 'allorders', component: AllordersComponent, title: 'allorders' },
      {
        path: 'checkout/:id',
        title: 'checkout',
        loadComponent: () =>
          import('./pages/checkout/checkout.component').then(
            (m) => m.CheckoutComponent
          ),
      },

      {path:'wish list' ,component:WishListComponent,title:'wish list'},
      // {
      //   path: 'wish-list/:id',
      //   title: 'wish-list',
      //   loadComponent: () =>
      //     import('./pages/wish-list/wish-list.component').then(
      //       (m) => m.WishListComponent
      //     ),
      // },
      {
        path: 'details/:id',
        title: 'details',
        loadComponent: () =>
          import('./pages/details/details.component').then(
            (m) => m.DetailsComponent
          ),
      },
      {
        path: 'products',
        title: 'products',
        loadComponent: () =>
          import('./pages/products/products.component').then(
            (m) => m.ProductsComponent
          ),
      },
      {
        path: 'brands',
        title: 'brands',
        loadComponent: () =>
          import('./pages/brands/brands.component').then(
            (m) => m.BrandsComponent
          ),
      },
      { path: '**', component: NotfoundComponent, title: 'notfound' },
    ],
  },
];
