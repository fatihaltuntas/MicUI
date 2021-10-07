import { PagedRequestDto } from "@shared/paged-listing-component-base";

export class ProductGroupFilterRequestDto extends PagedRequestDto{
    status:number;
    searchWord:string;
}