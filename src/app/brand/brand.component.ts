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

class PagedBrandRequestDto extends PagedRequestDto {
  keyword: string;
}

@Component({
  templateUrl: './brand.component.html',
  animations: [appModuleAnimation()]
})
export class BrandComponent extends PagedListingComponentBase<BrandDto> {
  brands: BrandDto[] = [];
  keyword = '';

  constructor(
    injector: Injector,
    private _brandService: BrandServiceProxy,
    private _modalService: BsModalService
  ) {
    super(injector);
  }

  list(
    request: PagedBrandRequestDto,
    pageNumber: number,
    finishedCallback: Function
  ): void {
    request.keyword = this.keyword;

    this._brandService
      .getAll(request.keyword, request.skipCount, request.maxResultCount)
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
    //   }
    // );
  }

  createBrand(): void {
    this.showCreateOrEditBrandDialog();
  }

  editBrand(brand: BrandDto): void {
    this.showCreateOrEditBrandDialog(brand.id);
  }

  search(){
    this._brandService.search(this.keyword).subscribe((result: PagedResultDtoOfBrandDto) => {
      this.brands = result.items;
      this.showPaging(result, 0);
    });;
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
