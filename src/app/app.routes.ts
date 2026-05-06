import { Routes } from '@angular/router';

import { Auth } from './modules/auth/auth';
import { ProductListPage } from './modules/productos/pages/product-list-page/product-list-page';

export const routes: Routes = [
    {
        path:"login",
        loadComponent: () => import ('./modules/auth/auth').then(m=> m.Auth)
    },

    { path: 'productos',
        loadComponent: () => import('./modules/productos/pages/product-list-page/product-list-page').then(m => m.ProductListPage)
    },
];
