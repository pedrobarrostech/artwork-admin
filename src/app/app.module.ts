import {
  BrowserModule,
  BrowserTransferStateModule
} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoute } from './app.route';
import { AppComponent } from './app.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireStorageModule } from 'angularfire2/storage';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AngularFireFunctionsModule } from 'angularfire2/functions';

import { UploadExampleModule } from './upload-example/upload-example.module';
import { UiModule } from './ui/ui.module';
import { HomeModule } from './home/home.module';
import { LoginModule } from './login/login.module';
import { BannerModule } from './banner/banner.module';
import { EventModule } from './event/event.module';
import { ClientModule } from './client/client.module';
import { EventGalleryModule } from './event-gallery/event-gallery.module';
import { MessageModule } from './message/message.module';
import { SectionModule } from './section/section.module';
import { ProductModule } from './product/product.module';
import { DepartmentModule } from './department/department.module';
import { ScheduleModule } from './schedule/schedule.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserTransferStateModule,
    AppRoute,
    LoginModule,
    HomeModule,
    UiModule,
    BannerModule,
    ClientModule,
    EventModule,
    MessageModule,
    ProductModule,
    DepartmentModule,
    SectionModule,
    ScheduleModule,
    EventGalleryModule,
    UploadExampleModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFireStorageModule,
    AngularFireFunctionsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production
    })
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
