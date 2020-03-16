import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {AddRecordComponent} from "./add-record/add-record.component";
import {MainTabComponent} from "./main-tab/main-tab.component";
import {AddShoppingListComponent} from "./add-shopping-list/add-shopping-list.component";
import {DashboardComponent} from "./dashboard/dashboard.component";
import {RecordTypeSummaryComponent} from "./record-type-summary/record-type-summary.component";
import {RecordSummaryComponent} from "./record-type-summary/record-summary/record-summary.component";


const routes: Routes = [
  {path: 'add-record', component: AddRecordComponent},
  {path: 'edit-record/:id', component: AddRecordComponent},
  {path: 'main-tab', component: MainTabComponent},
  {path: 'add-shopping-list', component: AddShoppingListComponent},
  {path: 'dashboard', component: DashboardComponent},
  {path: 'record-type-summary/:recordType', component: RecordTypeSummaryComponent},
  {path: 'record-summary/:id', component: RecordSummaryComponent},
  {path: '', component: DashboardComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
