import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as firebase from 'firebase';

import { DATATABLES_CONFIG } from '../core/_configs/datatable-pt-br.config';
import { routerTransition } from '../core/_configs/router-transition.config';
import { ScrollService } from '../core/_services/scroll.service';
import { DepartmentService } from './department.service';
import { UploadService } from '../core/_services/upload.service';
@Component({
  animations: [ routerTransition() ],
  selector: 'app-department',
  templateUrl: './department.component.html',
  styleUrls: ['./department.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class DepartmentComponent implements OnInit, OnDestroy, AfterViewInit {
  addDepartmentForm: FormGroup;
  department = {};
  departmentEditImage = {};
  departments: any = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  imageUploadStatus = true;
  isEditing = false;
  isLoading = true;

  private active = new FormControl('', Validators.required);
  private description = new FormControl('', Validators.required);
  private infoMsg = { body: '', type: 'info' };
  private name = new FormControl('', Validators.required);

  constructor(
    private _departmentService: DepartmentService,
    private _scrollService: ScrollService,
    private formBuilder: FormBuilder
  ) { }

  addDepartment(): void {
    window.setTimeout(() => {
      this._departmentService.create(this.addDepartmentForm.value).then(
        () => {
          this.addDepartmentForm.reset();
          this.rerender();
          this.scrollTo('table');
        },
        error => console.error(error)
      );
    }, 1000);
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.department = {};
    this.sendInfoMsg('Edição de department cancelada.', 'warning');
  }

  deleteDepartment(department): void {
    if (window.confirm('Tem certeza que quer deletar este department?')) {
      this._departmentService.delete(department.id).then(
        () => {
          this.sendInfoMsg('Department deletado com sucesso.', 'success');
          this.getDepartments();
          this.rerender();
        },
        error => console.error(error)
      );
    }
  }

  editDepartment(department): void {
    this._departmentService.update(department.id, department).then(
      () => {
        this.isEditing = false;
        this.sendInfoMsg('Department editado com sucesso.', 'success');
        this.rerender();
      },
      error => console.error(error)
    );
  }

  enableEditing(department): void {
    this.isEditing = true;
    this.department = department;

  }

  getDepartments(): void {
    this._departmentService.getData().subscribe(
      data => {
        this.departments = data;
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
    this.getDepartments();
    this.addDepartmentForm = this.formBuilder.group({
      name: this.name,
      description: this.description,
      active: this.active
    });
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
