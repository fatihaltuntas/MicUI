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
import { ProductGroupServiceProxy } from '@app/product-group/shared/services/product-group.service';
import { ProductGroupDto } from '@app/product-group/shared/model/product-group.dto';
import { ModelDto } from '../shared/model/model.dto';
import { ModelServiceProxy } from '../shared/services/model.service';
import { ModelStatus } from '../shared/model/model-status.enum';
import { BrandDto } from '@app/brand/shared/model/brand.dto';
import { BrandServiceProxy } from '@app/brand/shared/services/brand.service';
import { BrandFilterRequestDto } from '@app/brand/shared/model/brand-filter-request.dto';
import { ProductItemFilterRequestDto } from '@app/product-item/shared/model/product-item-filter-request.dto';
import { ProductGroupStatus } from '@app/product-group/shared/model/product-group.enum';
import { BrandStatus } from '@app/brand/shared/model/brand-status.enum';

@Component({
  templateUrl: 'edit-model-dialog.component.html'
})
export class EditModelDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  model = new ModelDto();
  statusList = [];
  selectedStatus: any = { name: "SelectStatus" };
  productGroupList: Array<ProductGroupDto>;
  selectedProductGroup: ProductGroupDto;
  brandList: Array<BrandDto>;
  selectedBrand: BrandDto;
  brandFilterReq: BrandFilterRequestDto = new BrandFilterRequestDto;
  productGroupFilterReq:ProductItemFilterRequestDto = new ProductItemFilterRequestDto;
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
    private _modelService: ModelServiceProxy,
    private _productGroupService: ProductGroupServiceProxy,
    private _brandService: BrandServiceProxy,
    public bsModalRef: BsModalRef,
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.statusList = [
      {
        value: ModelStatus.Waiting, name: this.l("Waiting"),
      }, {
        value: ModelStatus.Accepted, name: this.l("Accepted"),
      }, {
        value: ModelStatus.Rejected, name: this.l("Rejected"),
      }
    ];
    
    this._modelService.get(this.id).subscribe(element => {
      this.model = element;
      this.fillFormValues(this.model);
    })
  }

  private fillFormValues(model:ModelDto){
    this.productGroupFilterReq.status = ProductGroupStatus.Accepted;
    this.brandFilterReq.status = BrandStatus.Accepted;
    this._productGroupService.filter(this.productGroupFilterReq).subscribe(element => {
      this.productGroupList = element.items;
      this.selectedProductGroup = this.productGroupList.find(el=> el.id == model.productGroupId);
    });
    this._brandService.filter(this.brandFilterReq).subscribe(element => {
      this.brandList = element.items;
      this.selectedBrand = this.brandList.find(x=> x.id == model.brandId);
    });
    this._productGroupService.getProductGroupsByBrandId(model.brandId).subscribe(element => {
      this.productGroupList = element;
      this.selectedStatus = this.statusList[model.status - 1];
    });    
  }

  save(): void {
    this.saving = true;
    this.model.status = this.selectedStatus.value;
    this.model.brandId = this.selectedBrand.id;
    this.model.productGroupId = this.selectedProductGroup.id;
    // var selectedgroups = this.productGroupList.filter(item => this.selectedProductGroups.map(x=> x.id).indexOf(item.id) > -1);
    // this.model.selectedProductGroups = selectedgroups;
    const model = new ModelDto();
    model.init(this.model);

    this._modelService.update(model).subscribe(
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
    this._productGroupService.getProductGroupsByBrandId(item.id).subscribe(element => {
      this.productGroupList = element;
    });
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
