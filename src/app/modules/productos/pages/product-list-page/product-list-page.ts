import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductTable } from '../../components/product-table/product-table'

import   { Producto } from '../../../../core/service/producto'
import { ProductoInterface } from '../../models/product.models'

@Component({
  selector: 'app-product-list-page',
  imports: [ProductTable],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.css',
})
export class ProductListPage {
  constructor(private router: Router, private routerActivate: ActivatedRoute){

    console.log("ProductListPage");
    console.log(this.routerActivate.snapshot.params['id2'])

  }

  public products: ProductoInterface[] = [
    {id: 1, name:"Producto 1", price:100, stock: 10, category: 'Ropa'},
    {id: 2, name:"Producto 2", price:200, stock: 20, category: 'Calzado'}
  ]

  goLogin():void {
    this.router.navigate(['/login'])
  }

  public onEdit(id: number):void{
    console.log("Edicion del producto",id)
  }

  public onDelete(id: number):void{
    console.log("Eliminar producto",id)
  }


}
