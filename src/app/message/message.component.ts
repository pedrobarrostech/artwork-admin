import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';

import { DATATABLES_CONFIG } from '../core/_configs/datatable-pt-br.config';
import { routerTransition } from '../core/_configs/router-transition.config';
import { ScrollService } from '../core/_services/scroll.service';
import { MessageService } from './message.service';
@Component({
  animations: [ routerTransition() ],
  selector: 'app-message',
  templateUrl: './message.component.html',
  styleUrls: ['./message.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class MessageComponent implements OnInit, OnDestroy, AfterViewInit {
  addMessageForm: FormGroup;
  bannerEditImage = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  imageUploadStatus = true;
  isEditing = false;
  isLoading = true;
  message = {};
  messages: any = [];

  private description = new FormControl('', Validators.required);
  private email = new FormControl('', Validators.required);
  private infoMsg = { body: '', type: 'info'};
  private name = new FormControl('', Validators.required);
  private phone = new FormControl('', Validators.required);
  private subject = new FormControl('', Validators.required);

  constructor(
    private _messageService: MessageService,
    private _scrollService: ScrollService,
    private formBuilder: FormBuilder
  ) { }

  addMessage(): void {
    window.setTimeout(() => {
      this._messageService.create(this.addMessageForm.value).then(
        () => {
          this.addMessageForm.reset();
          this.rerender();
          this.scrollTo('table');
        },
        error => console.error(error)
      );
    }, 1000);
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.message = {};
    this.sendInfoMsg('Edição de message cancelada.', 'warning');
  }

  deleteMessage(message): void {
    if (window.confirm('Tem certeza que quer deletar este mensagem?')) {
      this._messageService.delete(message.id).then(
        () => {
          this.sendInfoMsg('Mensagem deletado com sucesso.', 'success');
          this.getMessages();
          this.rerender();
        },
        error => console.error(error)
      );
    }
  }

  editMessage(message): void {

    this._messageService.update(message.id, message).then(
      res => {
        this.isEditing = false;
        this.sendInfoMsg('Mensagem editado com sucesso.', 'success');
        this.rerender();
      },
      error => console.error(error)
    );
  }

  enableEditing(message): void {
    this.isEditing = true;
    this.message = message;
  }

  getMessages(): void {
    this._messageService.getData().subscribe(
      data => {
        this.messages = data;
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
    this.getMessages();
    this.addMessageForm = this.formBuilder.group({
      name: this.name,
      phone: this.phone,
      email: this.email,
      subject: this.subject,
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
}
