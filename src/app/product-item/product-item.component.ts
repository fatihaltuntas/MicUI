import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { ProductItemDto } from './shared/model/product-item.dto';
import { ProductItemServiceProxy } from './shared/services/product-item.service';
import { PagedResultDtoOfProductItemDto } from './shared/model/paged-result-dto-of-product-item.dto';
import { CreateProductItemDialogComponent } from './create-product-item/create-product-item-dialog.component';
import { EditProductItemDialogComponent } from './edit-product-item/edit-product-item-dialog.component';
import { ProductItemStatus } from './shared/model/product-item-status.enum';
import { ProductGroupFilterRequestDto } from '@app/product-group/shared/model/product-group-filter-request.dto';
import { CreateProductGroupDialogComponent } from '@app/product-group/create-product-group/create-product-group-dialog.component';
import { CreateBrandDialogComponent } from '@app/brand/create-brand/create-brand-dialog.component';
import { CreateModelDialogComponent } from '@app/model/create-model/create-model-dialog.component';
import { UserDto, UserServiceProxy } from '@shared/service-proxies/service-proxies';
import { ProductGroupDto } from '@app/product-group/shared/model/product-group.dto';
import { BrandDto } from '@app/brand/shared/model/brand.dto';
import { ModelDto } from '@app/model/shared/model/model.dto';
import { BrandFilterRequestDto } from '@app/brand/shared/model/brand-filter-request.dto';
import { ModelFilterRequestDto } from '@app/model/shared/model/model-filter-request.dto';
import { ProductGroupServiceProxy } from '@app/product-group/shared/services/product-group.service';
import { BrandServiceProxy } from '@app/brand/shared/services/brand.service';
import { ModelServiceProxy } from '@app/model/shared/services/model.service';
import { ProductGroupStatus } from '@app/product-group/shared/model/product-group.enum';
import { BrandStatus } from '@app/brand/shared/model/brand-status.enum';
import { ModelStatus } from '@app/model/shared/model/model-status.enum';
import { ProductItemFilterRequestDto } from './shared/model/product-item-filter-request.dto';

@Component({
  templateUrl: './product-item.component.html',
  animations: [appModuleAnimation()]
})
export class ProductItemComponent extends PagedListingComponentBase<ProductItemDto> {
  productItems: ProductItemDto[] = [];
  keyword = '';
  statusList = [];
  selectedStatus: any = { name: "SelectStatus" };
  request: ProductItemFilterRequestDto = new ProductItemFilterRequestDto;
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

  constructor(
    injector: Injector,
    private _productItemService: ProductItemServiceProxy,
    private _productGroupService: ProductGroupServiceProxy,
    private _brandService: BrandServiceProxy,
    private _modelService: ModelServiceProxy,
    private _modalService: BsModalService,
    private _userService:UserServiceProxy
  ) {
    super(injector);
  }

  list(
    request: ProductItemFilterRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {

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
    
    this.productGroupReq.status = ProductGroupStatus.Accepted
    this._productGroupService.filter(this.productGroupReq).subscribe(element => {
      this.productGroups = element.items;
    })
    this._userService.getAll("", true, 0, 999999).subscribe(element => {
      this.users = element.items;
    })
    
    this._productItemService
      .filter(request)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfProductItemDto) => {
        this.productItems = result.items;
        this.showPaging(result, pageNumber);
      });
  }

  search() {
    this._productItemService.filter(this.request).subscribe((result: PagedResultDtoOfProductItemDto) => {
      this.productItems = result.items;
      this.showPaging(result, 0);
    });;
  }

  onStatusSelected(status) {
    this.request.status = status.value;
  }
  onUserSelected(user:UserDto){
    this.request.userId = user.id;
  }
  onPgSelect(productGroup: ProductGroupDto) {
    this.brandFilterReq.status = BrandStatus.Accepted;
    this.brandFilterReq.productGroupId = productGroup.id;
    this._brandService.filter(this.brandFilterReq).subscribe(element => {
      this.brands = element.items;
    })
    this.request.productGroupId = productGroup.id;
  }
  onBrandSelect(brand: BrandDto) {
    this.modelFilterReq.status = ModelStatus.Accepted;
    this.modelFilterReq.brandId = brand.id;
    this._modelService.filter(this.modelFilterReq).subscribe(element => {
      this.models = element.items;
    })
    this.request.brandId = brand.id;
  }
  onModelSelected(model:ModelDto){
    this.request.modelId = model.id;
  }

  delete(): void {
    // abp.message.confirm(
    //   this.l('ProducteleteWarningMessage', role.displayName),
    //   undefined,
    //   (result: boolean) => {
    //     if (result) {
    //       this._rolesService
    //         .delete(role.id)
    //         .pipe(
    //           finalize(() => {
    //             abp.notify.success(this.l('SuccessfullyDeleted'));
    //             this.refresh();
    //           })
    //         )
    //         .subscribe(() => {});
    //     }
    //   }
    // );
  }

  createProductItem(): void {
    this.showCreateOrEditProductItemDialog();
  }
  createProductGroup(): void {
    let createProductGroupDialog: BsModalRef;
    createProductGroupDialog = this._modalService.show(
      CreateProductGroupDialogComponent,
      {
        class: 'modal-lg',
      }
    );
  }
  createBrand(): void {
    let createBrandDialog: BsModalRef;
    createBrandDialog = this._modalService.show(
      CreateBrandDialogComponent,
      {
        class: 'modal-lg',
      }
    );
  }
  createModel(): void {
    let createModelDialog: BsModalRef;
    createModelDialog = this._modalService.show(
      CreateModelDialogComponent,
      {
        class: 'modal-lg',
      }
    );
  }

  editProductItem(productItem: ProductItemDto): void {
    this.showCreateOrEditProductItemDialog(productItem.id);
  }

  showCreateOrEditProductItemDialog(id?: number): void {
    let createOrEditProductItemDialog: BsModalRef;
    if (!id) {
      createOrEditProductItemDialog = this._modalService.show(
        CreateProductItemDialogComponent,
        {
          class: 'modal-lg',
        }
      );
    } else {
      createOrEditProductItemDialog = this._modalService.show(
        EditProductItemDialogComponent,
        {
          class: 'modal-lg',
          initialState: {
            id: id,
          },
        }
      );
    }

    createOrEditProductItemDialog.content.onSave.subscribe(() => {
      this.refresh();
    });
  }
}
