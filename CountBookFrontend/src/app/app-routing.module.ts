import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AddRecordComponent} from "./add-record/add-record.component";
import {MainTabComponent} from "./main-tab/main-tab.component";
import {AddShoppingListComponent} from "./add-shopping-list/add-shopping-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RecordTypeSummaryComponent} from "./record-type-summary/record-type-summary.component";
import {RecordSummaryComponent} from "./record-type-summary/record-summary/record-summary.component";
import {LoginComponent} from "./account/login/login.component";
import {AuthGuard} from "./account/auth.guard";
import {RegisterComponent} from "./account/register/register.component";
import {ProfileComponent} from "./account/profile/profile.component";
import {EditProfileComponent} from "./account/profile/edit-profile/edit-profile.component";
import {ChangePasswordComponent} from "./account/profile/change-password/change-password.component";


const routes: Routes = [
  {path: 'add-record', component: AddRecordComponent, canActivate: [AuthGuard]},
  {path: 'edit-record/:id', component: AddRecordComponent, canActivate: [AuthGuard]},
  {path: 'main-tab', component: MainTabComponent, canActivate: [AuthGuard]},
  {path: 'add-shopping-list', component: AddShoppingListComponent, canActivate: [AuthGuard]},
  {path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'record-type-summary/:recordType', component: RecordTypeSummaryComponent, canActivate: [AuthGuard]},
  {path: 'record-summary/:id', component: RecordSummaryComponent, canActivate: [AuthGuard]},
  {path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent, canActivate: [AuthGuard]},
  {path: 'register', component: RegisterComponent, canActivate: [AuthGuard]},
  {path: 'profile', component: ProfileComponent, canActivate: [AuthGuard]},
  {path: 'edit-profile', component: EditProfileComponent, canActivate: [AuthGuard]},
  {path: 'change-password', component: ChangePasswordComponent, canActivate: [AuthGuard]},
  {path: '**', redirectTo: '/', canActivate: [AuthGuard]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
