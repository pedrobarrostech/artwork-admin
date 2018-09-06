import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../core/_services/firestore.service';
import { Banner } from '../core/_models/banner.model';

@Injectable()
export class BannerService  extends FirestoreService<Banner>  {

  constructor(public afs: AngularFirestore) {
    super(afs, 'banners');
  }
}
