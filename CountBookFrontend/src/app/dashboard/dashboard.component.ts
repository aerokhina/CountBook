import {Component, OnInit} from '@angular/core';
import {DashboardModelService} from "../services/dashboard.service";
import {Dashboard} from "../services/dashboard";
import {RecordType} from "../services/record";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  dashboard: Dashboard;
  readonly expenseQuery = {type: RecordType[RecordType.Expense]};
  readonly incomeQuery = {type: RecordType[RecordType.Income]};

  constructor(
    private dashboardService: DashboardModelService,) {
  }

  ngOnInit() {
    this.dashboardService.getDashboard().subscribe(item => {
      this.dashboard = item;
    });
  }

}
