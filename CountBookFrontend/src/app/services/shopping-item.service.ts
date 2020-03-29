import {Injectable} from '@angular/core';
import {CreateShoppingItemModel, ShoppingItem} from "./shopping-item";
import {HttpAuthService} from "../account/core/http-auth.service";

@Injectable({
  providedIn: 'root'
})
export class ShoppingItemService {

  constructor(private http: HttpAuthService) {
  }

  getItems() {
    return this.http.get<ShoppingItem[]>("shoppingitem/getlist");
  }

  addItem(item: CreateShoppingItemModel) {
    return this.http.post<ShoppingItem>("shoppingitem/create", item);
  }

  deleteItem(id: number) {
    return this.http.post("shoppingitem/delete/" + id, {});
  }
}
