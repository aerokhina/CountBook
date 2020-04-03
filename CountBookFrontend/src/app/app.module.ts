import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {MainTabComponent} from './main-tab/main-tab.component';
import {AddRecordComponent} from './add-record/add-record.component';
import {NgbModule} from "@ng-bootstrap/ng-bootstrap";
import {ReactiveFormsModule} from "@angular/forms";
import {CommonModule, registerLocaleData} from "@angular/common";
import {HttpClientModule} from "@angular/common/http";
import {AddShoppingListComponent} from './add-shopping-list/add-shopping-list.component';
import {DashboardComponent} from './dashboard/dashboard.component';
import {RecordTypeSummaryComponent} from './record-type-summary/record-type-summary.component';
import localeRu from '@angular/common/locales/ru';
import {MonthInputComponent} from './record-type-summary/month-input/month-input.component';
import {WeekInputComponent} from './record-type-summary/week-input/week-input.component';
import {DayInputComponent} from './record-type-summary/day-input/day-input.component';
import {YearInputComponent} from './record-type-summary/year-input/year-input.component';
import {AllTimeInputComponent} from './record-type-summary/all-time-input/all-time-input.component';
import {RecordSummaryComponent} from './record-type-summary/record-summary/record-summary.component';
import {ChartsModule} from "ng2-charts";
import {LoginComponent} from './account/login/login.component';
import {RegisterComponent} from './account/register/register.component';
import {ProfileComponent} from './account/profile/profile.component';
import {EditProfileComponent} from './account/profile/edit-profile/edit-profile.component';
import {ChangePasswordComponent} from './account/profile/change-password/change-password.component';

registerLocaleData(localeRu);

@NgModule({
  declarations: [
    AppComponent,
    MainTabComponent,
    AddRecordComponent,
    AddShoppingListComponent,
    DashboardComponent,
    RecordTypeSummaryComponent,
    MonthInputComponent,
    WeekInputComponent,
    DayInputComponent,
    YearInputComponent,
    AllTimeInputComponent,
    RecordSummaryComponent,
    LoginComponent,
    RegisterComponent,
    ProfileComponent,
    EditProfileComponent,
    ChangePasswordComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    NgbModule,
    ReactiveFormsModule,
    HttpClientModule,
    ChartsModule
  ],
  providers: [
    {
      provide: LOCALE_ID,
      useValue: 'ru'
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
