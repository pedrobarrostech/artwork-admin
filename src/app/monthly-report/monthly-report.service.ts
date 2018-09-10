import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { FirestoreService } from '../core/_services/firestore.service';
import { Schedule } from '../core/_models/schedule.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class MonthlyReportService  extends FirestoreService<Schedule>  {
  schedulesCollection: AngularFirestoreCollection<Schedule>;

  constructor(public afs: AngularFirestore) {
    super(afs, 'schedules');
  }

  getByMonthAndYear(month, year): Observable<Array<Schedule>> {
    this.schedulesCollection = this.afs.collection(
      'schedules',
      ref => ref.where('timestamp', '>=', '2017-11').where('timestamp', '<', '2017-12')
    );

    return this.schedulesCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data: any = a.payload.doc.data();

          return {...data, id: a.payload.doc.id};
        });
      })
    );
  }
}
