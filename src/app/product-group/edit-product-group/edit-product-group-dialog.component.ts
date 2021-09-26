import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { forEach as _forEach, includes as _includes, map as _map } from 'lodash-es';
import { AppComponentBase } from '@shared/app-component-base';
import { ProductGroupServiceProxy } from '../shared/services/product-group.service';
import { ProductGroupDto } from '../shared/model/product-group.dto';

@Component({
  templateUrl: 'edit-product-group-dialog.component.html'
})
export class EditProductGroupDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  productGroup = new ProductGroupDto();

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productGroupService: ProductGroupServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this._productGroupService.get(this.id).subscribe(element => {
      this.productGroup = element;
    })
  }

  save(): void {
    this.saving = true;

    const productGroup = new ProductGroupDto();
    productGroup.init(this.productGroup);

    this._productGroupService.update(productGroup).subscribe(
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
