import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CreateRecordModel, Record} from "./record";
import {CreateShoppingItemModel, ShoppingItem} from "./shopping-item";

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {

  constructor(private http: HttpClient) { }

  getItems(){
    return this.http.get<ShoppingItem[]>("http://localhost:5000/shoppingitem/getlist");
  }

  addItem(item: CreateShoppingItemModel){
    return this.http.post<ShoppingItem>("http://localhost:5000/shoppingitem/create", item);
  }

  deleteItem(id: number){
    return this.http.post("http://localhost:5000/shoppingitem/delete/" + id, {});
  }
}
