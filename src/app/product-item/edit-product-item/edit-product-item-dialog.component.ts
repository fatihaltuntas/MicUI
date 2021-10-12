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
import { ProductItemDto } from '../shared/model/product-item.dto';
import { ProductItemServiceProxy } from '../shared/services/product-item.service';
import { ProductItemStatus } from '../shared/model/product-item-status.enum';
import { UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ProductGroupDto } from '@app/product-group/shared/model/product-group.dto';
import { BrandDto } from '@app/brand/shared/model/brand.dto';
import { ModelDto } from '@app/model/shared/model/model.dto';
import { BrandFilterRequestDto } from '@app/brand/shared/model/brand-filter-request.dto';
import { ModelFilterRequestDto } from '@app/model/shared/model/model-filter-request.dto';
import { ProductGroupServiceProxy } from '@app/product-group/shared/services/product-group.service';
import { BrandServiceProxy } from '@app/brand/shared/services/brand.service';
import { ModelServiceProxy } from '@app/model/shared/services/model.service';
import { ProductGroupFilterRequestDto } from '@app/product-group/shared/model/product-group-filter-request.dto';
import { ProductGroupStatus } from '@app/product-group/shared/model/product-group.enum';
import { BrandStatus } from '@app/brand/shared/model/brand-status.enum';

@Component({
  templateUrl: 'edit-product-item-dialog.component.html'
})
export class EditProductItemDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  productItem = new ProductItemDto();
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
    private _userService: UserServiceProxy,
    private _productGroupService: ProductGroupServiceProxy,
    private _brandService: BrandServiceProxy,
    private _modelService: ModelServiceProxy,
    public bsModalRef: BsModalRef
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
    this._productItemService.get(this.id).subscribe(element => {
      this.productItem = element;
      this.selectedStatus = this.statusList[this.productItem.status - 1];
    })
    this._userService.getAll("", true, 0, 99999999).subscribe(users => {
      this.users = users.items;
      this.selectedUser = this.users.find(x=> x.id == this.productItem.userId);
    });
    this.productGroupReq.status = ProductGroupStatus.Accepted
    this._productGroupService.filter(this.productGroupReq).subscribe(element => {
      this.productGroups = element.items;
      this.selectedProductGroup = this.productGroups.find(x=> x.id == this.productItem.productGroupId);
    })
    this.brandFilterReq.status = BrandStatus.Accepted;
    this.brandFilterReq.productGroupId = this.productItem.productGroupId;
    this._brandService.filter(this.brandFilterReq).subscribe(element => {
      this.brands = element.items;
      this.selectedBrand = this.brands.find(x=> x.id == this.productItem.brandId);
    })
    this._modelService.filter(this.modelFilterReq).subscribe(element => {
      this.models = element.items;
      this.selectedModel = this.models.find(x=> x.id == this.productItem.modelId);
    })
  }
  onPgSelect(productGroup: ProductGroupDto) {
    this.brandFilterReq.productGroupId = productGroup.id;
    this._brandService.filter(this.brandFilterReq).subscribe(element => {
      this.brands = element.items;
    })
  }
  onBrandSelect(brand: BrandDto) {
    this.modelFilterReq.brandId = brand.id;
    this._modelService.filter(this.modelFilterReq).subscribe(element => {
      this.models = element.items;
    })
  }

  save(): void {
    this.saving = true;
    this.productItem.status = this.selectedStatus.value;
    const productItem = new ProductItemDto();
    productItem.init(this.productItem);

    this._productItemService.update(productItem).subscribe(
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
