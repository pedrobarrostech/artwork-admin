import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { DataTableDirective } from 'angular-datatables';
import * as firebase from 'firebase';

import { DATATABLES_CONFIG } from '../core/_configs/datatable-pt-br.config';
import { routerTransition } from '../core/_configs/router-transition.config';
import { ScrollService } from '../core/_services/scroll.service';
import { ProductService } from './product.service';
import { UploadService } from '../core/_services/upload.service';
@Component({
  animations: [ routerTransition() ],
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.Emulated
})
export class ProductComponent implements OnInit, OnDestroy, AfterViewInit {
  addProductForm: FormGroup;
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtOptions: DataTables.Settings = {};
  dtTrigger = new Subject();
  imageUploadStatus = true;
  isEditing = false;
  isLoading = true;
  product = {};
  productEditImage = {};
  products: any = [];

  private active = new FormControl('', Validators.required);
  private description = new FormControl('', Validators.required);
  private imageEdit;
  private imageEditRef;
  private infoMsg = { body: '', type: 'info' };
  private link = new FormControl('', Validators.required);
  private name = new FormControl('', Validators.required);

  constructor(
    private _productService: ProductService,
    private _scrollService: ScrollService,
    private formBuilder: FormBuilder
  ) { }

  addProduct(): void {
    window.setTimeout(() => {
      this._productService.create(this.addProductForm.value).then(
        () => {
          this.addProductForm.reset();
          this.rerender();
          this.scrollTo('table');
        },
        error => console.error(error)
      );
    }, 1000);
  }

  cancelEditing(): void {
    this.isEditing = false;
    this.product = {};
    this.sendInfoMsg('Edição de product cancelada.', 'warning');
  }

  deleteProduct(product): void {
    if (window.confirm('Tem certeza que quer deletar este product?')) {
      this._productService.delete(product.id).then(
        () => {
          UploadService.deleteFile(product.imageRef).then(
            () => {
              this.sendInfoMsg('Product deletado com sucesso.', 'success');
              this.getProducts();
              this.rerender();
            },
            error => console.error(error)
          );
        },
        error => console.error(error)
      );
    }
  }

  editProduct(product): void {
    if (this.imageEdit) {
      product.image = this.imageEdit;
      product.imageRef = this.imageEditRef;
    }

    this._productService.update(product.id, product).then(
      () => {
        this.isEditing = false;
        this.sendInfoMsg('Product editado com sucesso.', 'success');
        this.rerender();
      },
      error => console.error(error)
    );
  }

  enableEditing(product): void {
    this.isEditing = true;
    this.product = product;

  }

  getProducts(): void {
    this._productService.getData().subscribe(
      data => {
        this.products = data;
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
    this.getProducts();
    this.addProductForm = this.formBuilder.group({
      name: this.name,
      link: this.link,
      image: null,
      imageRef: null,
      description: this.description,
      active: this.active
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
                this.addProductForm.get('image').setValue(downloadURL);
                this.addProductForm.get('imageRef').setValue(filename);
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
