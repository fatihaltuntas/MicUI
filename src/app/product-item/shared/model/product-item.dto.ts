import * as moment from 'moment';
import { ProductItemStatus } from './product-item-status.enum';
export interface IProductItemDto {
    id: number;
    title: string;
    barcode:string;
    serialNumber:string;
    brandId:number;
    brandName:string;
    modelId:number;
    modelName:string;
    productGroupId:number;
    productGroupName:string;
    userId:number;
    note:string;
    status:ProductItemStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;
}

export class ProductItemDto implements IProductItemDto {
    id: number;
    barcode:string;
    serialNumber:string;
    brandId:number;
    brandName:string;
    modelId:number;
    modelName:string;
    productGroupId:number;
    productGroupName:string;
    userId:number;
    note:string;
    title: string;
    status:ProductItemStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;

    constructor(data?: IProductItemDto) {
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
            this.serialNumber = _data["serialNumber"];
            this.brandId = _data["brandId"];
            this.modelId = _data["modelId"];
            this.productGroupId = _data["productGroupId"];
            this.userId = _data["userId"];
            this.note = _data["note"];
            this.status = _data["status"];
            this.createdUserId = _data["createdUserId"];
            this.editedUserId = _data["editedUserId"];
            this.barcode = _data["barcode"];
            this.brandName = _data["brandName"];
            this.modelName = _data["modelName"];
            this.productGroupName = _data["productGroupName"];
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
        }
    }

    static fromJS(data: any): ProductItemDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProductItemDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["serialNumber"] = this.serialNumber;
        data["brandId"] = this.brandId;
        data["modelId"] = this.modelId;
        data["productGroupId"] = this.productGroupId;
        data["userId"] = this.userId;
        data["note"] = this.note;
        data["status"] = this.status;
        data["createdUserId"] = this.createdUserId;
        data["editedUserId"] = this.editedUserId;
        data["barcode"] = this.barcode;
        data["brandName"] = this.brandName;
        data["productGroupName"] = this.productGroupName;
        data["productGroupName"] = this.modelName;
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        return data; 
    }

    clone(): ProductItemDto {
        const json = this.toJSON();
        let result = new ProductItemDto();
        result.init(json);
        return result;
    }
}