
export enum PropertySort {
  PRICE_ASC = 'price_asc',
  PRICE_DESC = 'price_desc',
  DATE_ADDED = 'date_added',
}

export class FilterPropertyDto {
 
  city?: string;
  minPrice?: string; 
  sort?: PropertySort;
  limit?: string; 
}