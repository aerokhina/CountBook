import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Category, CreateCategoryModel} from "./category";
import {CreateRecordModel, Record} from "./record";
import {ShoppingItem} from "./shopping-item";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpClient) {
  }

  getCategorys() {
    return this.http.get<Category[]>("http://localhost:5000/category/getlist");
  }

  getCategory(id: number){
    return this.http.get<Category>("http://localhost:5000/category/get/" + id);
  }

  addCategory(item: CreateCategoryModel){
    return this.http.post<Category>("http://localhost:5000/category/create", item);
  }

  deleteCategory(id: number){
    return this.http.post("http://localhost:5000/category/delete/" + id, {});
  }

  editCategory(id: number, item: CreateCategoryModel)
  {
    return this.http.post("http://localhost:5000/category/edit/" + id, item);
  }
}
