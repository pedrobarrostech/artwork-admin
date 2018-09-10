import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { DATATABLES_CONFIG } from '../core/_configs/datatable-pt-br.config';
import { routerTransition } from '../core/_configs/router-transition.config';
import { ScrollService } from '../core/_services/scroll.service';
import { ClientService } from './client.service';
import { Router } from '@angular/router';
@Component({
  animations: [ routerTransition() ],
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ClientComponent implements OnInit, OnDestroy, AfterViewInit {
  addClientForm: FormGroup;
  bannerEditImage = {};
  client = {};
  clients: any = [];
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  imageUploadStatus = true;
  isEditing = false;
  isLoading = true;

  private address = new FormControl('', Validators.required);
  private city = new FormControl('', Validators.required);
  private cpf = new FormControl('', Validators.required);
  private date = new FormControl('', Validators.required);
  private description = new FormControl('', Validators.required);
  private email = new FormControl('', Validators.required);
  private facebook = new FormControl('', Validators.required);
  private infoMsg = { body: '', type: 'info'};
  private lastname = new FormControl('', Validators.required);
  private maritalStatus = new FormControl('', Validators.required);
  private name = new FormControl('', Validators.required);
  private phone = new FormControl('', Validators.required);
  private rg = new FormControl('', Validators.required);
  private sex = new FormControl('', Validators.required);
  private state = new FormControl('', Validators.required);

  constructor(
    private _clientService: ClientService,
    private _scrollService: ScrollService,
    private formBuilder: FormBuilder,
    private router: Router
  ) { }

  addClient(): void {
    window.setTimeout(() => {
      this._clientService.create(this.addClientForm.value).then(
        () => {
          this.addClientForm.reset();
          this.rerender();
          this.scrollTo('table');
        },
        error => console.error(error)
      );
    }, 1000);
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.client = {};
    this.sendInfoMsg('Edição de client cancelada.', 'warning');
  }

  deleteClient(client): void {
    if (window.confirm('Tem certeza que quer deletar este client?')) {
      this._clientService.delete(client.id).then(
        () => {
          this.sendInfoMsg('Client deletado com sucesso.', 'success');
          this.getClients();
          this.rerender();
        },
        error => console.error(error)
      );
    }
  }

  editClient(client): void {

    this._clientService.update(client.id, client).then(
      res => {
        this.isEditing = false;
        this.sendInfoMsg('Client editado com sucesso.', 'success');
        this.rerender();
      },
      error => console.error(error)
    );
  }

  enableEditing(client): void {
    this.isEditing = true;
    this.client = client;
  }

  getClients(): void {
    this._clientService.getData().subscribe(
      data => {
        this.clients = data;
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
    this.getClients();
    this.addClientForm = this.formBuilder.group({
      name: this.name,
      lastname: this.lastname,
      rg: this.rg,
      cpf: this.cpf,
      maritalStatus: this.maritalStatus,
      sex: this.sex,
      city: this.city,
      address: this.address,
      state: this.state,
      phone: this.phone,
      facebook: this.facebook,
      email: this.email,
      date: this.date,
      description: this.description
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

  showSchedules(client): void {
    this.router.navigate(['/horarios', client.id]).then(
      () => {
        console.warn('Route change');
      },
      error => console.error(error)
    );
  }
}
