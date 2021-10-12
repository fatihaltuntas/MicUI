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
import { BrandDto } from '../shared/model/brand.dto';
import { BrandStatus } from '../shared/model/brand-status.enum'
import { BrandServiceProxy } from '../shared/services/brand.service';
import { ProductGroupServiceProxy } from '@app/product-group/shared/services/product-group.service';
import { ProductGroupDto } from '@app/product-group/shared/model/product-group.dto';
import { ProductGroupFilterRequestDto } from '@app/product-group/shared/model/product-group-filter-request.dto';
import { ProductGroupStatus } from '@app/product-group/shared/model/product-group.enum';

@Component({
  templateUrl: 'edit-brand-dialog.component.html'
})
export class EditBrandDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  brand = new BrandDto();
  statusList = [];
  selectedStatus: any = { name: "SelectStatus" };
  productGroupList: Array<ProductGroupDto>;
  selectedProductGroups: Array<ProductGroupDto>;
  productGroupRequest : ProductGroupFilterRequestDto = new ProductGroupFilterRequestDto;
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
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.statusList = [
      {
        value: BrandStatus.Waiting, name: this.l("Waiting"),
      }, {
        value: BrandStatus.Accepted, name: this.l("Accepted"),
      }, {
        value: BrandStatus.Rejected, name: this.l("Rejected"),
      }
    ];
    this.productGroupRequest.status = ProductGroupStatus.Accepted;
    this._productGroupService.filter(this.productGroupRequest).subscribe(element => {
      this.productGroupList = element.items;
    });
    this._brandService.get(this.id).subscribe(element => {
      this.brand = element;
      this.selectedProductGroups = element.selectedProductGroups;
      this.selectedStatus = this.statusList[this.brand.status - 1];
    })
  }

  save(): void {
    this.saving = true;
    this.brand.status = this.selectedStatus.value;
    var selectedgroups = this.productGroupList.filter(item => this.selectedProductGroups.map(x=> x.id).indexOf(item.id) > -1);
    this.brand.selectedProductGroups = selectedgroups;
    const brand = new BrandDto();
    brand.init(this.brand);

    this._brandService.update(brand).subscribe(
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
