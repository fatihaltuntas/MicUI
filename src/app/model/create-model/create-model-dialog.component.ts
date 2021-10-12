import {
  Component,
  Injector,
  OnInit,
  EventEmitter,
  Output,
} from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { AppComponentBase } from '@shared/app-component-base';
import { forEach as _forEach, map as _map } from 'lodash-es';
import { ProductGroupServiceProxy } from '@app/product-group/shared/services/product-group.service';
import { ProductGroupDto } from '@app/product-group/shared/model/product-group.dto';
import { ModelDto } from '../shared/model/model.dto';
import { ModelStatus } from '../shared/model/model-status.enum';
import { ModelServiceProxy } from '../shared/services/model.service';
import { BrandDto } from '@app/brand/shared/model/brand.dto';
import { BrandServiceProxy } from '@app/brand/shared/services/brand.service';
import { BrandFilterRequestDto } from '@app/brand/shared/model/brand-filter-request.dto';
import { BrandStatus } from '@app/brand/shared/model/brand-status.enum';
@Component({
  templateUrl: 'create-model-dialog.component.html'
})
export class CreateModelDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  model = new ModelDto();
  modelStatus: ModelStatus;
  productGroupList: Array<ProductGroupDto>;
  selectedProductGroup: ProductGroupDto;
  brandList: Array<BrandDto>;
  selectedBrand: BrandDto;
  brandFilterReq:BrandFilterRequestDto = new BrandFilterRequestDto;
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

    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.brandFilterReq.status = BrandStatus.Accepted;
    this._brandService.filter(this.brandFilterReq).subscribe(element => {
      this.brandList = element.items;
    });
  }
  save(): void {
    this.saving = true;
    this.model.status = ModelStatus.Waiting;
    this.model.productGroupId = this.selectedProductGroup.id;
    this.model.brandId = this.selectedBrand.id;

    this._modelService
      .create(this.model)
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
    this._productGroupService.getProductGroupsByBrandId(item.id).subscribe(element => {
      this.productGroupList = element;
    });
  }
  onSelectAll(items: any) {
    console.log(items);
  }
}
