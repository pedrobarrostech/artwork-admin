import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { FirestoreService } from '../core/_services/firestore.service';
import { Photo } from '../core/_models/photo.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable()
export class GalleryService  extends FirestoreService<Photo>  {

  galleryCollection: AngularFirestoreCollection<Photo>;
  photoDocument: AngularFirestoreDocument<Photo>;

  constructor(public afs: AngularFirestore) {
    super(afs, 'photos');
  }

  getGalleryByParentId(parentId): Observable<Array<Photo>> {
    this.galleryCollection = this.afs.collection(
      'photos',
      ref => ref.where('parentId', '==', parentId)
    );

    return this.galleryCollection.snapshotChanges().pipe(
      map(actions => {
        return actions.map(a => {
          const data: any = a.payload.doc.data();

          return {...data, id: a.payload.doc.id};
        });
      })
    );
  }
}
