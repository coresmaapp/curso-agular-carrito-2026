import { Component, inject } from '@angular/core';
import { AsyncPipe, NgIf } from '@angular/common';
import { SpinnerService } from '@shared/services/spinner'

@Component({
	selector: 'app-spinner',
	standalone: true,
	imports: [NgIf, AsyncPipe],
	template: `
		<div class="backdrop" *ngIf="spinnerService.loading$ | async">
			<div class="loader"></div>
		</div>
	`,
	styles: [`
		.backdrop { position: fixed; inset: 0; display: grid; place-items: center; background: rgba(0,0,0,.25); z-index: 9999; }
		.loader { width: 44px; height: 44px; border: 4px solid #fff; border-top-color: transparent; border-radius: 50%; animation: spin 1s linear infinite; }
		@keyframes spin { to { transform: rotate(360deg); } }
	`],
})
export class Spinner {
  public spinnerService = inject(SpinnerService)
}
