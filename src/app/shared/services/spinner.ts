import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs'

@Injectable({
  providedIn: 'root',
})
export class SpinnerService {
private readonly _isLoading$ = new BehaviorSubject<boolean>(false);

readonly loading$ = this._isLoading$.asObservable()

public show(): void{
  this._isLoading$.next(true)
}

public hide(): void{
  this._isLoading$.next(false)
}

}
