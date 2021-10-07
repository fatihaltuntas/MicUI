import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { ProductGroupDto } from './shared/model/product-group.dto';
import { PagedResultDtoOfProductGroupDto } from './shared/model/paged-result-dto-of-product-group.dto';
import { ProductGroupServiceProxy } from './shared/services/product-group.service';
import { CreateProductGroupDialogComponent } from './create-product-group/create-product-group-dialog.component';
import { EditProductGroupDialogComponent } from './edit-product-group/edit-product-group-dialog.component';
import { ProductGroupFilterRequestDto } from './shared/model/product-group-filter-request.dto'
import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { ProductGroupStatus } from './shared/model/product-group.enum';

@Component({
  templateUrl: './product-group.component.html',
  animations: [appModuleAnimation()]
})
export class ProductGroupComponent extends PagedListingComponentBase<ProductGroupDto> {
  productGroups: ProductGroupDto[] = [];
  keyword = '';
  statusList = [];
  selectedStatus: any = { name: "SelectStatus" };
  request: ProductGroupFilterRequestDto = new ProductGroupFilterRequestDto;

  constructor(
    injector: Injector,
    private _productGroupService: ProductGroupServiceProxy,
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
        value: ProductGroupStatus.Waiting, name: this.l("Waiting"),
      }, {
        value: ProductGroupStatus.Accepted, name: this.l("Accepted"),
      }, {
        value: ProductGroupStatus.Rejected, name: this.l("Rejected"),
      }
    ];

    this._productGroupService
      .filter(request)
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

  search() {
    this._productGroupService.filter(this.request).subscribe((result: PagedResultDtoOfProductGroupDto) => {
      this.productGroups = result.items;
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
