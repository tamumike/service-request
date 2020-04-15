import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent,
        HttpResponse, HTTP_INTERCEPTORS, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { ModalService } from './modal.service';
import { tap, delay, catchError, finalize } from 'rxjs/operators';

@Injectable()
export class ModalInterceptor implements HttpInterceptor {

  constructor(private modalService: ModalService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    // Promise.resolve(null).then(() => this.showLoadingModal());

    return next.handle(req).pipe(
      tap(() => { this.hideModal(); })
      , catchError(error => {
        console.log('error from modal interceptor');
        if (error instanceof HttpErrorResponse) {
          const applicationError = error.headers.get('Application-Error');
          if (applicationError) {
            this.showErrorModal();
            return throwError(applicationError);
          }
        }
      })
    );
  }

  private showLoadingModal(): void {
    this.modalService.toggleDisplay({ display: true, type: 'loading' });
  }

  private showSuccessModal(): void {
    this.modalService.toggleDisplay({ display: true, type: 'success'});
  }

  private hideModal(): void {
    this.modalService.toggleDisplay({ display: false, type: ''});
  }

  private showErrorModal(): void {
    this.modalService.toggleDisplay({ display: true, type: 'error' });
  }
}

export const ModalInterceptorProvider = {
  provide: HTTP_INTERCEPTORS,
  useClass: ModalInterceptor,
  multi: true
};
