import * as moment from 'moment';
import {ProductGroupStatus} from './product-group.enum';
export interface ICreateProductGroupDto {
    id: number | undefined;
    title: string;
    status:ProductGroupStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;
}


export class CreateProductGroupDto implements ICreateProductGroupDto {
    id: number;
    title: string;
    status:ProductGroupStatus;
    createdUserId:number;
    editedUserId:number;
    creationTime: moment.Moment;

    static fromJS(data: any): CreateProductGroupDto {
        data = typeof data === 'object' ? data : {};
        const result = new CreateProductGroupDto();
        result.init(data);
        return result;
    }

    constructor(data?: ICreateProductGroupDto) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property)) {
                    (<any>this)[property] = (<any>data)[property];
                }
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data['id'];
            this.title = data['title'];
            this.status = data['status'];
            this.createdUserId = data['createdUserId'];
            this.editedUserId = data['editedUserId'];
            this.creationTime = data['creationTime'] ? moment(data["creationTime"].toString()) : <any>undefined;;
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['title'] = this.title;
        data['status'] = this.status;
        data['createdUserId'] = this.createdUserId;
        data['editedUserId'] = this.editedUserId;
        data['creationTime'] = this.creationTime ? this.creationTime.toISOString() : <any>undefined;

        return data;
    }

    clone(): CreateProductGroupDto {
        const json = this.toJSON();
        const result = new CreateProductGroupDto();
        result.init(json);
        return result;
    }
}
