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
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';

import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { RequestListComponent } from './components/request/request-list/request-list.component';
import { RequestsOverviewComponent } from './components/request/requests-overview/requests-overview.component';
import { RequestService } from './services/request.service';
import { appRoutes } from './routes';
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
import { ErrorInterceptorProvider } from './services/error.interceptor';
import { EngineerRequestReviewComponent } from './components/request/engineer-request-review/engineer-request-review.component';
import { FooterComponent } from './UI/footer/footer.component';
import { GreetingComponent } from './UI/greeting/greeting.component';
import { DividerComponent } from './UI/divider/divider.component';
import { FinalCommentCreateComponent } from './components/comment/final-comment-create/final-comment-create.component';
import { AlertifyService } from './services/alertify.service';
import { LoaderComponent } from './UI/loader/loader.component';
import { LoaderInterceptor, LoaderInterceptorProvider } from './services/loader.interceptor';
import { ModalComponent } from './UI/modal/modal.component';
import { ModalActionsService } from './services/modal-actions.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    RequestListComponent,
    RequestsOverviewComponent,
    RequestCreateComponent,
    RequestDetailComponent,
    CommentListComponent,
    CommentCreateComponent,
    NavComponent,
    RequestReviewComponent,
    RequestDeadlinePipe,
    EngineerRequestReviewComponent,
    FooterComponent,
    GreetingComponent,
    DividerComponent,
    FinalCommentCreateComponent,
    LoaderComponent,
    ModalComponent
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
    MatButtonModule,
    MatDialogModule
  ],
  providers: [
    // LoaderInterceptorProvider,
    ErrorInterceptorProvider,
    RequestService,
    UserService,
    GetRequestsResolverService,
    RequestDetailResolverService,
    CommentService,
    UserInfoResolverService,
    CookieService,
    AlertifyService,
    ModalActionsService
  ],
  bootstrap: [AppComponent],
  entryComponents: [ModalComponent]  /* The set of components to compile when this
                                      NgModule is defined, so they can be dynamically loaded into the view
                                      */
})
export class AppModule { }
