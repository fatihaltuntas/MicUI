import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { BrandDto } from '../shared/model/brand.dto';
import { BrandServiceProxy } from '../shared/services/brand.service'
import { forEach as _forEach, map as _map } from 'lodash-es';
import { BrandStatus } from '../shared/model/brand-status.enum';
import { ProductGroupServiceProxy } from '@app/product-group/shared/services/product-group.service';
import { ProductGroupDto } from '@app/product-group/shared/model/product-group.dto';
@Component({
  templateUrl: 'create-brand-dialog.component.html'
})
export class CreateBrandDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  brand = new BrandDto();
  brandStatus: BrandStatus;
  productGroupList: Array<ProductGroupDto>;
  selectedProductGroups: Array<ProductGroupDto>;
  dropdownSettings = {
    singleSelection: false,
    idField: 'id',
    textField: 'title',
    selectAllText: 'Hepsini Seç',
    unSelectAllText: 'Hepsini Kaldır',
    itemsShowLimit: 3,
    allowSearchFilter: true
  };

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _brandService: BrandServiceProxy,
    private _productGroupService: ProductGroupServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    debugger;
    var asd = this._productGroupService.getAllByAccepted().subscribe(element => {
      this.productGroupList = element;
    });

  }
  save(): void {
    this.saving = true;

    // const brand = new BrandDto();
    // debugger;
    var selectedgroups = this.productGroupList.filter(item => this.selectedProductGroups.map(x=> x.id).indexOf(item.id) > -1);
    this.brand.selectedProductGroups = selectedgroups;
    
    // brand.init(this.brand);

    this._brandService
      .create(this.brand)
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

  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
