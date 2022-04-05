import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000
});

@Injectable({
  providedIn: 'root'
})
export class AuthInterceptorService implements HttpInterceptor {

  constructor(
    private router: Router
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token: string = localStorage.getItem('aa_token');

    let request = req;

    if (token) {
      request = req.clone({
        setHeaders: {
          aa_token: token
        }
      });
    }

    return next.handle(request).pipe(
      catchError((err: HttpErrorResponse) => {
        
        if (err.status === 401) {
          Toast.fire({
            icon: 'error',
            title: 'Lo sentimos su sesion ha expirado, por favor vuelva a iniciar sesion'
          });
          localStorage.removeItem('aa_token');
          this.router.navigateByUrl('/login');
        }

        if (err.status === 403) {
          Toast.fire({
            icon: 'error',
            title: 'No cuentas con los permisos necesarios para acceder a este menú.'
          });
          this.router.navigateByUrl('/dashboard');
        }

        return throwError( err );
      })
    );
  }
}
