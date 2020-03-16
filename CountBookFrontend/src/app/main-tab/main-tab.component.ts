import {Component, OnInit} from '@angular/core';
import {RecordService} from "../services/record.service";
import {Record, RecordType} from "../services/record";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {Router} from "@angular/router";
import {ShoppingItem} from "../services/shopping-item";
import {ShoppingItemService} from "../services/shopping-item.service";
import {Category} from "../services/category";
import {CategoryService} from "../services/category.service";
import {combineLatest} from "rxjs";

@Component({
  selector: 'app-main-tab',
  templateUrl: './main-tab.component.html',
  styleUrls: ['./main-tab.component.scss']
})
export class MainTabComponent implements OnInit {

/*  shoppingItem: ShoppingItem[] = [];
  recordTypes: RecordTypeModel[] = [];*/

  constructor(
    private recordService: RecordService,
    private modalService: NgbModal,
    private readonly router: Router,
    private shoppingItemService: ShoppingItemService,
    private categoryService: CategoryService,

  ) {
  }

  ngOnInit() {
    /*  combineLatest([
        this.recordService.getRecords(),
        this.categoryService.getCategorys()
      ]).subscribe(([records, categories]) => this.recordTypes = [
        {
          name: "Доходы",
          category: this.mapCategories(categories, records, RecordType.Income)
        },
        {
          name: "Расходы",
          category: this.mapCategories(categories, records, RecordType.Expense)
        }
      ]);
      this.shoppingItemService.getItems().subscribe(items => this.shoppingItem = items);
    }

    onDelete(content, recordId: number) {
      this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then(() => {
        this.recordService.deleteRecord(recordId).subscribe(() => {
          this.recordTypes.forEach(recordType =>
            recordType.category.forEach(category =>
              category.records = category.records.filter(x => x.id !== recordId)));
        });
      }, () => {
      });
    }

    onCategoryClick(category: CategoryModel) {
      category.isCollapsed = !category.isCollapsed;
    }

    private mapCategories(categories: Category[], records: Record[], recordType: RecordType): CategoryModel[] {
      const filteredRecord = records.filter(x => x.type === recordType);
      return categories
        .filter(x => filteredRecord.some(record => record.categoryId === x.id))
        .map(x => <CategoryModel>{
          id: x.id,
          name: x.name,
          isCollapsed: false,
          records: filteredRecord.filter(record => record.categoryId === x.id)
        });
    }
  }

  interface CategoryModel {
    id: number;
    name: string;
    isCollapsed: boolean;
    records: Record[];
  }

  interface RecordTypeModel {
    name: string;
    category: CategoryModel[];*/
  }
  }
