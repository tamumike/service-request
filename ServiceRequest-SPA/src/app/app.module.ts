import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './containers/home/home.component';
import { RequestListComponent } from './components/request-list/request-list.component';
import { RequestQueueComponent } from './components/request-queue/request-queue.component';
import { SidebarComponent } from './containers/sidebar/sidebar.component';
import { RequestsOverviewComponent } from './components/requests-overview/requests-overview.component';
import { RequestService } from './services/request.service';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { ModalComponent } from './UI/modal/modal.component';
import { RequestCreateComponent } from './components/request-create/request-create.component';
import { UserService } from './services/user.service';
import { GetRequestsResolverService } from './resolvers/get-requests-resolver.service';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SidebarComponent,
    RequestListComponent,
    RequestQueueComponent,
    RequestsOverviewComponent,
    RequestCreateComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BsDatepickerModule.forRoot(),
    RouterModule.forRoot(appRoutes)
  ],
  providers: [
    RequestService,
    UserService,
    GetRequestsResolverService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
