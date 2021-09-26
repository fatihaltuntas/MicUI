import * as moment from 'moment';
import {ProductGroupStatus} from './product-group.enum';
export interface IProductGroupDto {
    id: number;
    title: string;
    status:ProductGroupStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;
}

export class ProductGroupDto implements IProductGroupDto {
    id: number;
    title: string;
    status:ProductGroupStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;

    constructor(data?: IProductGroupDto) {
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
        }
    }

    static fromJS(data: any): ProductGroupDto {
        data = typeof data === 'object' ? data : {};
        let result = new ProductGroupDto();
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
        return data; 
    }

    clone(): ProductGroupDto {
        const json = this.toJSON();
        let result = new ProductGroupDto();
        result.init(json);
        return result;
    }
}