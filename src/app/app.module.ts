import { NgModule } from '@angular/core'
import { BrowserModule } from '@angular/platform-browser'

import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatMenuModule } from '@angular/material/menu'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatListModule } from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
import { ToastrModule } from 'ngx-toastr'
import { AppComponent } from './app.component'
import { AppRoutingModule } from './app-routing.module'
import { AuthModule } from './auth/auth.module'
import { AuthHttpInterceptor } from './auth/auth-http-interceptor'
import { ErrorHttpInterop } from './error-http-interop'
import { HomeComponent } from './home/home.component'
import { DashboardComponent } from './dashboard/dashboard.component'
import { SettingsModule } from './settings/settings.module'

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DashboardComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    AuthModule,
    SettingsModule,
    MatSidenavModule,
    MatMenuModule,
    MatToolbarModule,
    MatListModule,
    MatIconModule,
    HttpClientModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthHttpInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: ErrorHttpInterop, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
}
