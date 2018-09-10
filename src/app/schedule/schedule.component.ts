import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { DATATABLES_CONFIG } from '../core/_configs/datatable-pt-br.config';
import { routerTransition } from '../core/_configs/router-transition.config';
import { ScrollService } from '../core/_services/scroll.service';
import { ScheduleService } from './schedule.service';
import { ClientService } from '../client/client.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  animations: [ routerTransition() ],
  selector: 'app-schedule',
  templateUrl: './schedule.component.html',
  styleUrls: ['./schedule.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ScheduleComponent implements OnInit, OnDestroy, AfterViewInit {
  addScheduleForm: FormGroup;
  bannerEditImage = {};
  client = {};
  clientId: string;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  imageUploadStatus = true;
  isEditing = false;
  isLoading = true;
  schedule = {};
  schedules: any = [];
  sub: any;

  private end = new FormControl(new Date(), Validators.required);
  private infoMsg = { body: '', type: 'info'};
  private start = new FormControl(new Date(), Validators.required);
  private title = new FormControl('', Validators.required);
  private value = new FormControl('', Validators.required);

  constructor(
    private _clientService: ClientService,
    private _scheduleService: ScheduleService,
    private _scrollService: ScrollService,
    private formBuilder: FormBuilder,
    private activeRoute: ActivatedRoute
  ) { }

  addSchedule(): void {

    window.setTimeout(() => {
      this.addScheduleForm.get('color').setValue({
        primary: '#0056a0',
        secondary: '#a1b9ce'
      });

      this.addScheduleForm.get('clientId').setValue(this.clientId);

      this._scheduleService.create(this.addScheduleForm.value).then(
        () => {
          this.addScheduleForm.reset();
          this.rerender();
          this.scrollTo('table');
        },
        error => console.error(error)
      );
    }, 1000);
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.schedule = {};
    this.sendInfoMsg('Edição de schedule cancelada.', 'warning');
  }

  deleteSchedule(schedule): void {
    if (window.confirm('Tem certeza que quer deletar este schedule?')) {
      this._scheduleService.delete(schedule.id).then(
        () => {
          this.sendInfoMsg('Schedule deletado com sucesso.', 'success');
          this.getSchedules();
          this.rerender();
        },
        error => console.error(error)
      );
    }
  }

  editSchedule(schedule): void {

    this._scheduleService.update(schedule.id, schedule).then(
      res => {
        this.isEditing = false;
        this.sendInfoMsg('Schedule editado com sucesso.', 'success');
        this.rerender();
      },
      error => console.error(error)
    );
  }

  enableEditing(schedule): void {
    this.isEditing = true;
    schedule.start = new Date(schedule.start.toMillis());
    schedule.end = new Date(schedule.end.toMillis());
    this.schedule = schedule;
  }

  getClientById(clientId): void {
    this._clientService.getById(clientId).then(
      data => {
        this.client = data;
      },
      error => console.error(error)
    );
  }

  getSchedules(): void {
    this._scheduleService.getData().subscribe(
      data => {
        this.schedules = data;
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
    this.sub = this.activeRoute.params.subscribe(params => {
      this.clientId = params['clientId'];
      this.dtOptions = DATATABLES_CONFIG;
      this.getSchedules();
      this.getClientById(this.clientId);
      this.addScheduleForm = this.formBuilder.group({
        clientId: null,
        color: null,
        start: this.start,
        end: this.end,
        title: this.title,
        value: this.value
      });
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
