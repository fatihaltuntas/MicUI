import * as moment from 'moment';
import { ModelStatus } from './model-status.enum';
export interface IModelDto {
    id: number;
    title: string;
    status:ModelStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;
    brandId:number;
    productGroupId:number;
}

export class ModelDto implements IModelDto {
    id: number;
    title: string;
    status:ModelStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;
    brandId : number;
    productGroupId:number;
    constructor(data?: IModelDto) {
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
            this.creationTime = _data["creationTime"] ? moment(_data["creationTime"].toString()) : <any>undefined;
            this.brandId = _data["brandId"];
            this.productGroupId = _data["productGroupId"];
        }
    }

    static fromJS(data: any): ModelDto {
        data = typeof data === 'object' ? data : {};
        let result = new ModelDto();
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
        data["creationTime"] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;
        data["brandId"] = this.brandId;
        data["productGroupId"] = this.productGroupId;
        return data; 
    }

    clone(): ModelDto {
        const json = this.toJSON();
        let result = new ModelDto();
        result.init(json);
        return result;
    }
}