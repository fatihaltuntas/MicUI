// public string Title { get; set; }
//         public DateTime CreationTime { get; set; }
//         public ProductGroupStatus Status { get; set; }
//         public long CreatedUserId { get; set; }
//         public long EditedUserId { get; set; }


export interface ICreateProductGroupDto {
    id: number | undefined;
    creationTime: Date;
    isActive: boolean;
    title: boolean;
    content: boolean;
    userId: boolean;
    publicationId: boolean;
}


export class CreateProductGroupDto implements ICreateProductGroupDto {
    title: boolean;
    creationTime: Date;
    content: boolean;
    userId: boolean;
    publicationId: boolean;
    id: number;
    isActive: boolean;

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
            this.isActive = data['isActive'];
            this.title = data['title'];
            this.content = data['content'];
            this.userId = data['userId'];
            this.publicationId = data['publicationId'];
        }
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['isActive'] = this.isActive;
        data['title'] = this.title;
        data['content'] = this.content;
        data['userId'] = this.userId;
        data['publicationId'] = this.publicationId;

        return data;
    }

    clone(): CreateProductGroupDto {
        const json = this.toJSON();
        const result = new CreateProductGroupDto();
        result.init(json);
        return result;
    }
}
