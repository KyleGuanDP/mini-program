import { http } from '@/utils/http'
import { SearchApiResponse } from './search.typings'
/**
 * 登录表单
import {  } from "module";

/**
 * 查资料
 * @returns SearchApiResponse 验证码
 */
export const getSearchData = (params: any) => {
  return http.get<SearchApiResponse>('/api/v1/products/search', params)
}

export interface Product {
  part_number: string
  description: string
  company_name: string
  attributes?: Record<string, any>
}

export const fetchProducts = (params: any, body: any) => {
  return http.post<Product>('/api/v1/categories/search', body, params)
}
