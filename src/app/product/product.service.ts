import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../core/_services/firestore.service';
import { Product } from '../core/_models/product.model';

@Injectable()
export class ProductService  extends FirestoreService<Product>  {

  constructor(public afs: AngularFirestore) {
    super(afs, 'products');
  }
}
