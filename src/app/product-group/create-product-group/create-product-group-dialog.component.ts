import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductGroupDto } from '../shared/model/product-group.dto';
import { ProductGroupServiceProxy } from '../shared/services/product-group.service'
import { forEach as _forEach, map as _map } from 'lodash-es';
import { CreateProductGroupDto } from '../shared/model/create-product-group.dto';
import { ProductGroupStatus } from '../shared/model/product-group.enum';
@Component({
  templateUrl: 'create-product-group-dialog.component.html'
})
export class CreateProductGroupDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  productGroup = new ProductGroupDto();
  productGroupStatus : ProductGroupStatus;

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productGroupService: ProductGroupServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
  }
  save(): void {
    this.saving = true;

    const productGroup = new CreateProductGroupDto();
    productGroup.init(this.productGroup);

    this._productGroupService
      .create(productGroup)
      .subscribe(
        () => {
          this.notify.info(this.l('SavedSuccessfully'));
          this.bsModalRef.hide();
          this.onSave.emit();
        },
        () => {
          this.saving = false;
        }
      );
  }
}
