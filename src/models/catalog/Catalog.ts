/**
 * Created by Widiana Putra on 23/06/2022
 * Copyright (c) 2022 - Made with love
 */
import { BaseModel } from "../BaseModel";

export interface CatalogListResponse extends BaseModel {
  data: CatalogItem[];
}

export interface CatalogItem {
  id: number;
  name?: string;
  price?: number;
  description?: string;
  image?: string;
}
