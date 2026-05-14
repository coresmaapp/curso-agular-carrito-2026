import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '@core/service/auth'

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  if(req.url.includes('/api/token/')) return next(req)

  const authService = inject(AuthService)
  const token = authService.getAccessToken()
  
  if (!token) return next(req)

  const authReq = req.clone({
    setHeaders:{
      Authorization: `Bearer ${token}`
    }
  })

  return next(authReq)

 
};
