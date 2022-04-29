import { Injectable } from "@angular/core";
import {
  HttpEvent,
  HttpRequest,
  HttpHandler,
  HttpInterceptor,
  HttpErrorResponse,
  HttpClient,
  HttpHeaders,
} from "@angular/common/http";
import { Router } from "@angular/router";
import { Observable, of, throwError } from "rxjs";
import { catchError } from "rxjs/operators";

@Injectable()
export class ServerErrorInterceptor implements HttpInterceptor {
  constructor(private router: Router, private http: HttpClient) {}
  // private client_Id = "f143bfa6c67845d8a07602e8fb560312";
  // private client_Secret = "60b16bff56814be3ba5d8010fbd6ff10";
  private client_Id = "c7253f1e3dc54533819588fb25163f18"; // user deplpoy
  private client_Secret = "6277e235244d45cf9c9186b0e0d62d46";

  encoder = btoa(`${this.client_Id}:${this.client_Secret}`);
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    request = request.clone({
      setHeaders: {
        Authorization: "Basic  " + this.encoder,
        "Content-Type": "application/x-www-form-urlencoded;",
      },
    });
    return next.handle(request).pipe(
      catchError((response: HttpErrorResponse) => {
        if (response.status === 401) {
          localStorage.clear();
          this.router.navigateByUrl("/login");
        }
        return throwError(response);
      })
    );
  }
}
