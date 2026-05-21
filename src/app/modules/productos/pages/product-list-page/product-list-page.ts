import { Component, OnInit, inject, signal, viewChild, ElementRef } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductTable } from '@modules/productos/components/product-table/product-table'

import   { ProductoService } from '@core/service/producto'
import { ApiResponse, ProductInterface, ProductRequest, ProductUpdate } from '@modules/productos/models/product.models'
import { ReactiveFormsModule, FormBuilder, Validators  } from '@angular/forms'
import { FormErrorService } from '@shared/services/form-error';

@Component({
  selector: 'app-product-list-page',
  imports: [ReactiveFormsModule, ProductTable],
  templateUrl: './product-list-page.html',
  styleUrl: './product-list-page.css',
})
export class ProductListPage implements OnInit {
  constructor(
    private router: Router, 
    private routerActivate: ActivatedRoute,
    private productService: ProductoService
  ){

    console.log("ProductListPage");
    console.log(this.routerActivate.snapshot.params['id2'])

  }

  private fb = inject(FormBuilder);
  private formErrorService = inject(FormErrorService);
  protected readonly editingId = signal<number | null>(null)

  public productForm = this.fb.nonNullable.group({
    name:['', [Validators.required,Validators.minLength(3)]],
    description:['', [Validators.required,Validators.minLength(5)]],
    price:[0, [Validators.required,Validators.minLength(0.01)]],
    stock:[0, [Validators.required,Validators.minLength(0)]],
    category:[0, [Validators.required,Validators.minLength(1)]]
  }
  )

  public readonly products = signal<ProductInterface[]>([])
  private readonly dialogRef = viewChild.required<ElementRef<HTMLDialogElement>>('ProductDialog')
  protected readonly editDato = signal<string|null>(null)
  goLogin():void {
    this.router.navigate(['/login'])
  }

  public onEdit(id: number):void{

    const product = this.products().find((p) => p.id === id)
    if(!product){
      return
    }
    this.editingId.set(id)
    this.productForm.patchValue({
      name: product.name,
      description: product.description,
      price: Number(product.price),
      stock: product.stock,
      category: product.category,
    })

    this.openCreateModal()

    console.log("Edicion del producto",id)
  }

  public onDelete(id: number):void{
    console.log("Eliminar producto",id)
  }

  private getAllProduct():void{
    this.productService.getAllProducts()
    .subscribe((data:ApiResponse)=>{
      console.log(data.results)
      this.products.set(data.results?? [])
    });
  }


  public ngOnInit():void{
    this.getAllProduct();
  }
  public modalTitle(): string{
    return this.editDato() ? 'Editar Producto': 'Nuevo producto'
  }

  public openCreateModal(): void{
    this.editDato.set(null)
    queueMicrotask(() =>this.dialogRef().nativeElement.showModal());
  }

  public closeModal():void{
    this.dialogRef().nativeElement.close()
  }


  public onDialogBackdrop(event: MouseEvent): void{
    console.log("onDialogOpen")
    if(event.target === event.currentTarget){
      this.closeModal()
    }

    

  }

  public isFieldInvalid(field: string): boolean{
    const control = this.productForm.get(field)
  
    return !!(
      control && control.invalid && 
      (control.touched || control.dirty)
    )
  }

  public getFieldError(field: string): string | null{

    const control = this.productForm.get(field)
  
    return this.formErrorService.getFieldError(control)
  
  }



  public saveProduct(): void{

    if(this.productForm.invalid){
      return;
    }

    const payload = this.productForm.getRawValue()

    const id = this.editingId()
    if(id === null){
      
    this.productService.createProduct(payload as ProductRequest)
    .subscribe((reponse:ApiResponse) =>{

      this.getAllProduct();
      this.closeModal()

    })
    }else{

      const payload: ProductUpdate = {
        ...this.productForm.getRawValue(),
        created_by:1
      }

      this.productService.updateProduct(payload, id)
    .subscribe((reponse:ApiResponse) =>{

      this.getAllProduct();
      this.closeModal()

    })
    }

      
  }


  

}
