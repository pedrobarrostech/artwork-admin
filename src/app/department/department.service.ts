import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../core/_services/firestore.service';
import { Department } from '../core/_models/department.model';

@Injectable()
export class DepartmentService  extends FirestoreService<Department>  {

  constructor(public afs: AngularFirestore) {
    super(afs, 'departments');
  }
}
