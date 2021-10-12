import { BaseFilterRequest } from "../../../../shared/base-filter-request.dto";

export class ProductItemFilterRequestDto extends BaseFilterRequest{
    productGroupId:number;
}