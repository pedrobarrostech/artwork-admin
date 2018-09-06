import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as firebase from 'firebase';

import { DATATABLES_CONFIG } from '../core/_configs/datatable-pt-br.config';
import { routerTransition } from '../core/_configs/router-transition.config';
import { ScrollService } from '../core/_services/scroll.service';
import { SectionService } from './section.service';
import { UploadService } from '../core/_services/upload.service';
@Component({
  animations: [ routerTransition() ],
  selector: 'app-section',
  templateUrl: './section.component.html',
  styleUrls: ['./section.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class SectionComponent implements OnInit, OnDestroy, AfterViewInit {
  addSectionForm: FormGroup;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  imageUploadStatus = true;
  isEditing = false;
  isLoading = true;
  section = {};
  sectionEditImage = {};
  sections: any = [];

  private description = new FormControl('');
  private imageEdit;
  private imageEditRef;
  private info = new FormControl('');
  private infoMsg = { body: '', type: 'info' };
  private name = new FormControl('', Validators.required);

  constructor(
    private _sectionService: SectionService,
    private _scrollService: ScrollService,
    private formBuilder: FormBuilder
  ) { }

  addSection(): void {
    window.setTimeout(() => {
      this._sectionService.create(this.addSectionForm.value).then(
        () => {
          this.addSectionForm.reset();
          this.rerender();
          this.scrollTo('table');
        },
        error => console.error(error)
      );
    }, 1000);
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.section = {};
    this.sendInfoMsg('Edição de section cancelada.', 'warning');
  }

  editSection(section): void {
    if (this.imageEdit) {
      section.image = this.imageEdit;
      section.imageRef = this.imageEditRef;
    }

    this._sectionService.update(section.id, section).then(
      () => {
        this.isEditing = false;
        this.sendInfoMsg('Section editado com sucesso.', 'success');
        this.rerender();
      },
      error => console.error(error)
    );
  }

  enableEditing(section): void {
    this.isEditing = true;
    this.section = section;

  }

  getSections(): void {
    this._sectionService.getData().subscribe(
      data => {
        this.sections = data;
        this.rerender();
      },
      error => console.error(error),
      () => this.isLoading = false
    );
  }

  ngAfterViewInit(): void {
    this.dtTrigger.next();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  ngOnInit(): void {
    this.dtOptions = DATATABLES_CONFIG;
    this.getSections();
    this.addSectionForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      info: this.info,
      image: null,
      imageRef: null
    });
  }

  async onFileChange(event): Promise<void> {
    if (event.target.files && event.target.files.length > 0) {
      const reader = new FileReader();
      const file = event.target.files[0];
      this.imageUploadStatus = false;
      reader.readAsDataURL(file);
      reader.onload = () => {

        const filename = `${UploadService.generateId()}${file.name}`;
        const ref = firebase.storage().ref();
        const storageRef = ref.child(filename);
        storageRef.put(file).then(
          snapshot => {
            snapshot.ref.getDownloadURL().then(
              downloadURL => {
                this.addSectionForm.get('image').setValue(downloadURL);
                this.addSectionForm.get('imageRef').setValue(filename);
                this.imageEdit = downloadURL;
                this.imageEditRef = filename;
                this.imageUploadStatus = true;
              },
              error => console.error(error));
          },
          error => console.error(error)
        );
      };
    }
  }

  rerender(): void {
    if (this.dtElement && this.dtElement.dtInstance) {
      this.dtElement.dtInstance.then(
        (dtInstance: DataTables.Api) => {
            // Destroy the table first
          dtInstance.destroy();
          // Call the dtTrigger to rerender again
          this.dtTrigger.next();
        },
        error => console.error(error)
      );
    }
  }

  scrollTo(id): any {
    this._scrollService.scrollTo(id);
  }

  sendInfoMsg(body, type, time = 3000): void {
    this.infoMsg.body = body;
    this.infoMsg.type = type;
    window.setTimeout(() => this.infoMsg.body = '', time);
  }

}
