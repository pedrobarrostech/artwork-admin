import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../core/_services/firestore.service';
import { Schedule } from '../core/_models/schedule.model';

@Injectable()
export class ScheduleService  extends FirestoreService<Schedule>  {

  constructor(public afs: AngularFirestore) {
    super(afs, 'schedules');
  }
}
