import { TodoEffects } from './store/effects/todo.effect';
import { ReportEffects } from './store/effects/report.effect';
import { reportReducer } from './store/reducers/report.reducer';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatTabsModule } from '@angular/material/tabs';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CreateComponent } from './components/auth/create/create.component';
import { DashboardComponent } from './components/auth/dashboard/dashboard.component';
import { DialogComponent } from './components/auth/dialog/dialog.component';
import { TodoComponent } from './components/auth/layout/container.component';
import { ReadComponent } from './components/auth/list/read.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { ReportComponent } from './components/auth/report/admin.component';
import { LoginComponent } from './components/public/login/login.component';
import { ContainerComponent } from './components/share/container/container.component';
import { NotfoundComponent } from './components/share/notfound/notfound.component';
import { AuthEffects } from './store/effects/auth.effect';
import { authReducer } from './store/reducers/auth.reducer';
import { todoReducer } from './store/reducers/tutorial.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MyInterceptor } from './service/interceptor';

@NgModule({
  declarations: [
    AppComponent,
    ReadComponent,
    CreateComponent,
    ContainerComponent,
    DialogComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    ReportComponent,
    NotfoundComponent,
    TodoComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot({
      tutorial: todoReducer,
      auth: authReducer,
      report: reportReducer,
    }),
    BrowserAnimationsModule,
    MatButtonModule,
    MatInputModule,
    MatIconModule,
    FormsModule,
    MatListModule,
    MatCheckboxModule,
    MatDialogModule,
    MatTabsModule,
    MatRadioModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: true, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
    EffectsModule.forRoot([AuthEffects, ReportEffects, TodoEffects]),
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: MyInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
