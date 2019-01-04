import { Component } from '@angular/core';
import { NavController, IonicPage } from 'ionic-angular';
import { Observable } from 'rxjs/observable';
import { Item } from '../../models/item/item.model';
import 'rxjs/add/operator/map';

import { ShoppingListService } from '../../services/shopping-list/shopping-list.service';

@IonicPage()
@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  shoppingList$: Observable<Item[]>;

  constructor(
    public navCtrl: NavController, 
    private shopping: ShoppingListService,
    ) {
    this.shoppingList$ = this.shopping
      .getShoppingList() // db list
      .snapshotChanges() // key et valeur
      .map(changes => {
          return changes.map(c => ({
            key: c.payload.key, 
            ...c.payload.val()
          }));
        });

  }
}
