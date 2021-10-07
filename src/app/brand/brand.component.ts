import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { BrandDto } from './shared/model/brand.dto';
import { PagedResultDtoOfBrandDto } from './shared/model/paged-result-dto-of-brand.dto';
import { BrandServiceProxy } from './shared/services/brand.service';
import { CreateBrandDialogComponent } from './create-brand/create-brand-dialog.component';
import { EditBrandDialogComponent } from './edit-brand/edit-brand-dialog.component';

import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { ProductGroupFilterRequestDto } from '@app/product-group/shared/model/product-group-filter-request.dto';
import { BrandStatus } from './shared/model/brand-status.enum';

@Component({
  templateUrl: './brand.component.html',
  animations: [appModuleAnimation()]
})
export class BrandComponent extends PagedListingComponentBase<BrandDto> {
  brands: BrandDto[] = [];
  keyword = '';
  statusList = [];
  selectedStatus: any = { name: "SelectStatus" };
  request: ProductGroupFilterRequestDto = new ProductGroupFilterRequestDto;

  constructor(
    injector: Injector,
    private _brandService: BrandServiceProxy,
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
        value: BrandStatus.Waiting, name: this.l("Waiting"),
      }, {
        value: BrandStatus.Accepted, name: this.l("Accepted"),
      }, {
        value: BrandStatus.Rejected, name: this.l("Rejected"),
      }
    ];

    this._brandService
      .filter(request)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfBrandDto) => {
        this.brands = result.items;
        this.showPaging(result, pageNumber);
      });
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
    //   }++
    // );
  }

  createBrand(): void {
    this.showCreateOrEditBrandDialog();
  }

  editBrand(brand: BrandDto): void {
    this.showCreateOrEditBrandDialog(brand.id);
  }

  search() {
    this._brandService.filter(this.request).subscribe((result: PagedResultDtoOfBrandDto) => {
      this.brands = result.items;
      this.showPaging(result, 0);
    });;
  }

  onStatusSelected(status) {
    this.request.status = status.value;
  }

  showCreateOrEditBrandDialog(id?: number): void {
    let createOrEditBrandDialog: BsModalRef;
    if (!id) {
      createOrEditBrandDialog = this._modalService.show(
        CreateBrandDialogComponent,
        {
          class: 'modal-lg',
        }
      );
      } else {
        createOrEditBrandDialog = this._modalService.show(
          EditBrandDialogComponent,
          {
            class: 'modal-lg',
            initialState: {
              id: id,
            },
          }
        );
      }

      createOrEditBrandDialog.content.onSave.subscribe(() => {
        this.refresh();
      });
    }
  }
