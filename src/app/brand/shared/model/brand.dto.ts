import { ProductGroupDto } from '@app/product-group/shared/model/product-group.dto';
import * as moment from 'moment';
import {BrandStatus} from './brand-status.enum';
export interface IBrandDto {
    id: number;
    title: string;
    status:BrandStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;
    selectedProductGroups : Array<ProductGroupDto>;
}

export class BrandDto implements IBrandDto {
    id: number;
    title: string;
    status:BrandStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;
    selectedProductGroups : Array<ProductGroupDto>;
    constructor(data?: IBrandDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(_data?: any) {
        if (_data) {
            this.id = _data["id"];
            this.title = _data["title"];
            this.status = _data["status"];
            this.createdUserId = _data["createdUserId"];
            this.editedUserId = _data["editedUserId"];
            this.selectedProductGroups = _data["selectedProductGroups"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): BrandDto {
        data = typeof data === 'object' ? data : {};
        let result = new BrandDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["status"] = this.status;
        data["createdUserId"] = this.createdUserId;
        data["editedUserId"] = this.editedUserId;
        data["selectedProductGroups"] = this.selectedProductGroups;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        return data; 
    }

    clone(): BrandDto {
        const json = this.toJSON();
        let result = new BrandDto();
        result.init(json);
        return result;
    }
}