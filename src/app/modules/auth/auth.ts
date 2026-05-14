import { Component, OnInit, inject } from '@angular/core';
import { AuthService } from '@core/service/auth'
import { AuthResponse } from '@modules/auth/models/auth.models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [],
  templateUrl: './auth.html',
  styleUrl: './auth.css',
})
export class Auth  implements OnInit {
private authService = inject(AuthService)
private router = inject(Router);

public login(username:string, password:string): void{
  this.authService.login(username,password)
  .subscribe((response:AuthResponse)=>{
    if (response.access) {
      this.router.navigate(['/productos'])
    }
  })
}

public loginForm(): void{
  let userdata = {
    username: 'admin',
    password: '123456@@'
   }

   this.login(userdata.username, userdata.password)
}

public ngOnInit():void{
  if (this.authService.getAccessToken()) {
    this.router.navigate(['/productos']);
}
}


}
