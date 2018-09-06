import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../core/_services/firestore.service';
import { Section } from '../core/_models/section.model';

@Injectable()
export class SectionService  extends FirestoreService<Section>  {

  constructor(public afs: AngularFirestore) {
    super(afs, 'sections');
  }
}
