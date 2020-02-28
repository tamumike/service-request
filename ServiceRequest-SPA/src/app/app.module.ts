import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { MatSortModule } from '@angular/material/sort';
import { CookieService } from 'ngx-cookie-service';
import { NgxCurrencyModule } from 'ngx-currency';

import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { RequestsOverviewComponent } from './components/request/requests-overview/requests-overview.component';
import { RequestService } from './services/request.service';
import { appRoutes } from './routes';
import { ModalComponent } from './UI/modal/modal.component';
import { RequestCreateComponent } from './components/request/request-create/request-create.component';
import { UserService } from './services/user.service';
import { GetRequestsResolverService } from './resolvers/get-requests-resolver.service';
import { RequestDetailComponent } from './components/request/request-detail/request-detail.component';
import { RequestDetailResolverService } from './resolvers/request-detail-resolver.service';
import { CommentListComponent } from './components/comment/comment-list/comment-list.component';
import { CommentCreateComponent } from './components/comment/comment-create/comment-create.component';
import { CommentService } from './services/comment.service';
import { NavComponent } from './UI/nav/nav.component';
import { RequestReviewComponent } from './components/request/request-review/request-review.component';
import { UserInfoResolverService } from './resolvers/user-info-resolver.service';
import { RequestDeadlinePipe } from './pipes/request-deadline.pipe';
import { ModalBodyDirective } from './directives/modal-body.directive';
import { SuccessModalComponent } from './UI/modal/sub-modal/success-modal/success-modal.component';
import { ErrorModalComponent } from './UI/modal/sub-modal/error-modal/error-modal.component';
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { EngineerRequestReviewComponent } from './components/request/engineer-request-review/engineer-request-review.component';
import { ConfirmModalComponent } from './UI/modal/sub-modal/confirm-modal/confirm-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RequestListComponent,
    RequestsOverviewComponent,
    RequestCreateComponent,
    ModalComponent,
    RequestDetailComponent,
    CommentListComponent,
    CommentCreateComponent,
    NavComponent,
    RequestReviewComponent,
    RequestDeadlinePipe,
    ModalBodyDirective,
    SuccessModalComponent,
    ErrorModalComponent,
    EngineerRequestReviewComponent,
    ConfirmModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes, { onSameUrlNavigation: 'reload' }),
    TabsModule.forRoot(),
    MatSortModule,
    NgxCurrencyModule
  ],
  providers: [
    ErrorInterceptorProvider,
    RequestService,
    UserService,
    GetRequestsResolverService,
    RequestDetailResolverService,
    CommentService,
    UserInfoResolverService,
    CookieService
  ],
  bootstrap: [AppComponent],
  entryComponents: [SuccessModalComponent]
})
export class AppModule { }
