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

@Component({
  templateUrl: './product-item.component.html',
  animations: [appModuleAnimation()]
})
export class ProductItemComponent extends PagedListingComponentBase<ProductItemDto> {
  productItems: ProductItemDto[] = [];
  keyword = '';
  statusList = [];
  selectedStatus: any = { name: "SelectStatus" };
  request: ProductGroupFilterRequestDto = new ProductGroupFilterRequestDto;

  constructor(
    injector: Injector,
    private _productItemService: ProductItemServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: ProductGroupFilterRequestDto,
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
