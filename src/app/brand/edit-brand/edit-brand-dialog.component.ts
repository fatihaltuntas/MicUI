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
import { BrandDto } from '../shared/model/brand.dto';
import { BrandStatus } from '../shared/model/brand-status.enum'
import { BrandServiceProxy } from '../shared/services/brand.service';

@Component({
  templateUrl: 'edit-brand-dialog.component.html'
})
export class EditBrandDialogComponent extends AppComponentBase
  implements OnInit {
  saving = false;
  id: number;
  brand = new BrandDto();
  statusList = [];
  selectedStatus: any = { name: "SelectStatus" };

  @Output() onSave = new EventEmitter<any>();

  constructor(
    injector: Injector,
    private _brandService: BrandServiceProxy,
    public bsModalRef: BsModalRef
  ) {
    super(injector);
  }

  ngOnInit(): void {
    this.statusList = [
      {
        value: BrandStatus.Waiting, name: this.l("Waiting"),
      }, {
        value: BrandStatus.Accepted, name: this.l("Accepted"),
      }, {
        value: BrandStatus.Rejected, name: this.l("Rejected"),
      }
    ];
    
    this._brandService.get(this.id).subscribe(element => {
      this.brand = element;
      this.selectedStatus = this.statusList[this.brand.status];
    })
  }

  save(): void {
    this.saving = true;
    this.brand.status = this.selectedStatus.value;
    const brand = new BrandDto();
    brand.init(this.brand);

    this._brandService.update(brand).subscribe(
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
