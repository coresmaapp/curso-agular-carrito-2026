import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@core/service/auth'
import { AuthResponse } from '@modules/auth/models/auth.models';
import { Router } from '@angular/router';

import { ReactiveFormsModule, FormBuilder, Validators  } from '@angular/forms'

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth  implements OnInit {
private authService = inject(AuthService)
private router = inject(Router);
private fb = inject(FormBuilder);

public loginForm = this.fb.group({
  username:['', [Validators.required,Validators.minLength(3), ,Validators.maxLength(10)]],
  password:['', Validators.required]
}
)

public login(): void{
  console.log(this.loginForm)
  if(this.loginForm.invalid){
    return;
  }

  console.log(this.loginForm.value.username)
  console.log(this.loginForm.value.password)

  console.log(this.loginForm.get('username')?.value)
  
}
public ngOnInit():void{
  if (this.authService.getAccessToken()) {
    this.router.navigate(['/productos']);
}
}


}
