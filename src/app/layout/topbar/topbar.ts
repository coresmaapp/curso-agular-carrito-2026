import { Component,OnInit,inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '@core/service/auth'
@Component({
  selector: 'app-topbar',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar implements OnInit {
  private authService = inject(AuthService)
  public showLogin:boolean = true
  public isAdmin:boolean = false

  private validIsadmin():void{
    const user = this.authService.getUser()
    if(user && user.group == "admin"){
      this.isAdmin = true
    }
  }

  public ngOnInit():void{
    const token = this.authService.getAccessToken()

    if(token){
      this.showLogin = false
    }

    this.validIsadmin()

  }

}
