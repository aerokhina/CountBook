export interface Category{
  id: number;
  name: string;
}

export interface CreateCategoryModel{
  name: string;
}

export interface CategorySum extends Category{
  sum: number;
}
