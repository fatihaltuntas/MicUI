import { BaseFilterRequest } from "../../../../shared/base-filter-request.dto";

export class ProductItemFilterRequestDto extends BaseFilterRequest{
    productGroupId:number;
    brandId:number;
    modelId:number;
    serialNumber:string;
    userId:number;
}