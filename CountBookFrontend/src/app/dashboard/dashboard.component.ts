import {Component, OnInit} from '@angular/core';
import {DashboardModelService} from "../services/dashboard.service";
import {Dashboard} from "../services/dashboard";
import {RecordType} from "../services/record";
import {ShoppingItem} from "../services/shopping-item";
import {ShoppingItemService} from "../services/shopping-item.service";
import {AccountService} from "../account/account.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard;
  readonly expenseQuery = {type: RecordType[RecordType.Expense]};
  readonly incomeQuery = {type: RecordType[RecordType.Income]};
  isLoaded: boolean = false;
  shoppingItem: ShoppingItem[] = [];

  constructor(
    private dashboardService: DashboardModelService,
    private shoppingItemService: ShoppingItemService,
    private readonly accountService: AccountService) {
  }

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe(item => {
      this.dashboard = item;
      this.isLoaded = true;
    });
    this.shoppingItemService.getItems().subscribe(items => this.shoppingItem = items);
  }

  logout(){
    this.accountService.logout();
  }

}
