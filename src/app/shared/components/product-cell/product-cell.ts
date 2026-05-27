import { Component, input } from '@angular/core';

@Component({
  selector: 'app-product-cell',
  imports: [],
  templateUrl: './product-cell.html',
  styleUrl: './product-cell.css',
})
export class ProductCell {
  public readonly imageUrl = input<string | null | undefined>(null);
  public readonly name = input.required<string>();
  public readonly subtitle = input<string>('');
}
