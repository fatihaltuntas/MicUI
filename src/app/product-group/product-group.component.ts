import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProductGroupDto } from './shared/model/product-group.dto';
import { PagedResultDtoOfProductGroupDto } from './shared/model/paged-result-dto-of-product-group.dto';
import { ProductGroupServiceProxy } from './shared/services/product-group.service';
import { CreateProductGroupDialogComponent } from './create-product-group/create-product-group-dialog.component';
import { EditProductGroupDialogComponent } from './edit-product-group/edit-product-group-dialog.component';
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';

class PagedProductGroupRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './product-group.component.html',
  animations: [appModuleAnimation()]
})
export class ProductGroupComponent extends PagedListingComponentBase<ProductGroupDto> {
  productGroups: ProductGroupDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _productGroupService: ProductGroupServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedProductGroupRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._productGroupService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfProductGroupDto) => {
        this.productGroups = result.items;
        this.showPaging(result, pageNumber);
      });
  }

search(){
  this._productGroupService.search(this.keyword).subscribe((result: PagedResultDtoOfProductGroupDto) => {
    this.productGroups = result.items;
    this.showPaging(result, 0);
  });;
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

  createProductGroup(): void {
    this.showCreateOrEditProductGroupDialog();
  }

  editProductGroup(productGroup: ProductGroupDto): void {
    this.showCreateOrEditProductGroupDialog(productGroup.id);
  }

  showCreateOrEditProductGroupDialog(id?: number): void {
    let createOrEditProductGroupDialog: BsModalRef;
    if (!id) {
      createOrEditProductGroupDialog = this._modalService.show(
        CreateProductGroupDialogComponent,
        {
          class: 'modal-lg',
        }
      );
      } else {
        createOrEditProductGroupDialog = this._modalService.show(
          EditProductGroupDialogComponent,
          {
            class: 'modal-lg',
            initialState: {
              id: id,
            },
          }
        );
      }

      createOrEditProductGroupDialog.content.onSave.subscribe(() => {
        this.refresh();
      });
    }
  }
