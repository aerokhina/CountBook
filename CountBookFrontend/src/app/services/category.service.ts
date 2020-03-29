import {Injectable} from '@angular/core';
import {Category, CreateCategoryModel} from "./category";
import {HttpAuthService} from "../account/core/http-auth.service";

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private http: HttpAuthService) {
  }

  getCategorys() {
    return this.http.get<Category[]>("category/getlist");
  }

  getCategory(id: number) {
    return this.http.get<Category>("category/get/" + id);
  }

  addCategory(item: CreateCategoryModel) {
    return this.http.post<Category>("category/create", item);
  }

  deleteCategory(id: number) {
    return this.http.post("category/delete/" + id, {});
  }

  editCategory(id: number, item: CreateCategoryModel) {
    return this.http.post("category/edit/" + id, item);
  }
}
