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
import { ProductItemDto } from '../shared/model/product-item.dto';
import { ProductItemStatus } from '../shared/model/product-item-status.enum';
import { ProductItemServiceProxy } from '../shared/services/product-item.service';
import { UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ProductGroupServiceProxy } from '@app/product-group/shared/services/product-group.service';
import { ProductGroupDto } from '@app/product-group/shared/model/product-group.dto';
import { BrandDto } from '@app/brand/shared/model/brand.dto';
import { ModelDto } from '@app/model/shared/model/model.dto';
import { BrandServiceProxy } from '@app/brand/shared/services/brand.service';
import { ModelServiceProxy } from '@app/model/shared/services/model.service';
import { BrandFilterRequestDto } from '@app/brand/shared/model/brand-filter-request.dto';
import { ModelFilterRequestDto } from '@app/model/shared/model/model-filter-request.dto';
import { ProductGroupFilterRequestDto } from '@app/product-group/shared/model/product-group-filter-request.dto';
import { ProductGroupStatus } from '@app/product-group/shared/model/product-group.enum';
import { BrandStatus } from '@app/brand/shared/model/brand-status.enum';
import { ModelStatus } from '@app/model/shared/model/model-status.enum';
@Component({
  templateUrl: 'create-product-item-dialog.component.html'
})
export class CreateProductItemDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  productItem = new ProductItemDto();
  productItemStatus: ProductItemStatus;
  statusList = [];
  selectedStatus: any = { name: "SelectStatus" };
  users: Array<UserDto> = new Array<UserDto>();
  selectedUser: UserDto;
  productGroups: ProductGroupDto[] = [];
  selectedProductGroup: ProductGroupDto;
  brands: BrandDto[] = [];
  selectedBrand: BrandDto;
  models: ModelDto[] = [];
  selectedModel: ModelDto;
  brandFilterReq: BrandFilterRequestDto = new BrandFilterRequestDto;
  modelFilterReq: ModelFilterRequestDto = new ModelFilterRequestDto;
  productGroupReq: ProductGroupFilterRequestDto = new ProductGroupFilterRequestDto;
  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _productItemService: ProductItemServiceProxy,
    private _productGroupService: ProductGroupServiceProxy,
    private _brandService: BrandServiceProxy,
    private _modelService: ModelServiceProxy,
    public bsModalRef: BsModalRef,
    private _userService: UserServiceProxy
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.statusList = [
      {
        value: ProductItemStatus.Stock, name: this.l("Stock"),
      }, {
        value: ProductItemStatus.Maintenance, name: this.l("Maintenance"),
      }, {
        value: ProductItemStatus.Junk, name: this.l("Junk"),
      }, {
        value: ProductItemStatus.Repository, name: this.l("Repository"),
      }
    ];
    this._userService.getAll("", true, 0, 999999).subscribe(element => {
      this.users = element.items;
    })
    this.productGroupReq.status = ProductGroupStatus.Accepted
    this._productGroupService.filter(this.productGroupReq).subscribe(element => {
      this.productGroups = element.items;
    })
  }
  save(): void {
    this.saving = true;
    this.productItem.status = this.selectedStatus.value;
    this.productItem.userId = this.selectedUser.id;
    this.productItem.productGroupId = this.selectedProductGroup.id;
    this.productItem.brandId = this.selectedBrand.id;
    this.productItem.modelId = this.selectedModel.id;
    const productItem = new ProductItemDto();
    productItem.init(this.productItem);


    this._productItemService
      .create(productItem)
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
  onPgSelect(productGroup: ProductGroupDto) {
    this.brandFilterReq.status = BrandStatus.Accepted;
    this.brandFilterReq.productGroupId = productGroup.id;
    this._brandService.filter(this.brandFilterReq).subscribe(element => {
      this.brands = element.items;
    })
  }
  onBrandSelect(brand: BrandDto) {
    this.modelFilterReq.status = ModelStatus.Accepted;
    this.modelFilterReq.brandId = brand.id;
    this._modelService.filter(this.modelFilterReq).subscribe(element => {
      this.models = element.items;
    })
  }
}
