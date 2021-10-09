import { Component, Injector } from '@angular/core';
import { finalize } from 'rxjs/operators';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';
import { appModuleAnimation } from '@shared/animations/routerTransition';

import {
  PagedListingComponentBase,
  PagedRequestDto
} from '@shared/paged-listing-component-base';
import { ProductGroupFilterRequestDto } from '@app/product-group/shared/model/product-group-filter-request.dto';
import { ModelDto } from './shared/model/model.dto';
import { ModelServiceProxy } from './shared/services/model.service';
import { ModelStatus } from './shared/model/model-status.enum';
import { PagedResultDtoOfModelDto } from './shared/model/paged-result-dto-of-model.dto';
import { CreateModelDialogComponent } from './create-model/create-model-dialog.component';
import { EditModelDialogComponent } from './edit-model/edit-model-dialog.component';

@Component({
  templateUrl: './model.component.html',
  animations: [appModuleAnimation()]
})
export class ModelComponent extends PagedListingComponentBase<ModelDto> {
  models: ModelDto[] = [];
  keyword = '';
  statusList = [];
  selectedStatus: any = { name: "SelectStatus" };
  request: ProductGroupFilterRequestDto = new ProductGroupFilterRequestDto;

  constructor(
    injector: Injector,
    private _modelService: ModelServiceProxy,
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
        value: ModelStatus.Waiting, name: this.l("Waiting"),
      }, {
        value: ModelStatus.Accepted, name: this.l("Accepted"),
      }, {
        value: ModelStatus.Rejected, name: this.l("Rejected"),
      }
    ];

    this._modelService
      .filter(request)
      .pipe(
        finalize(() => {
          finishedCallback();
        })
      )
      .subscribe((result: PagedResultDtoOfModelDto) => {
        this.models = result.items;
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

  createModel(): void {
    this.showCreateOrEditModelDialog();
  }

  editModel(model: ModelDto): void {
    this.showCreateOrEditModelDialog(model.id);
  }

  search() {
    this._modelService.filter(this.request).subscribe((result: PagedResultDtoOfModelDto) => {
      this.models = result.items;
      this.showPaging(result, 0);
    });;
  }

  onStatusSelected(status) {
    this.request.status = status.value;
  }

  showCreateOrEditModelDialog(id?: number): void {
    let createOrEditModelDialog: BsModalRef;
    if (!id) {
      createOrEditModelDialog = this._modalService.show(
        CreateModelDialogComponent,
        {
          class: 'modal-lg',
        }
      );
      } else {
        createOrEditModelDialog = this._modalService.show(
          EditModelDialogComponent,
          {
            class: 'modal-lg',
            initialState: {
              id: id,
            },
          }
        );
      }

      createOrEditModelDialog.content.onSave.subscribe(() => {
        this.refresh();
      });
    }
  }
