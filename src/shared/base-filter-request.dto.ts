import { PagedRequestDto } from "./../shared/paged-listing-component-base";

export class BaseFilterRequest extends PagedRequestDto{
    status:number;
    searchWord:string;
}