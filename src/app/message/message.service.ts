import { Injectable } from '@angular/core';

import { AngularFirestore } from 'angularfire2/firestore';
import { FirestoreService } from '../core/_services/firestore.service';
import { Message } from '../core/_models/message.model';

@Injectable()
export class MessageService  extends FirestoreService<Message>  {

  constructor(public afs: AngularFirestore) {
    super(afs, 'messages');
  }
}
