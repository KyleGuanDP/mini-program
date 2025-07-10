import { http } from '@/utils/http'

interface ISearch {
  query: string
}
interface ISearchData {
  status: string
  message: string
  data: {
    product: {
      total: 0
      hits: [
        {
          pid: string
          part_number: string
          category_lv1: string
          category_lv2: string
          category_lv3: string
          part_number_title: string
          feature: string
          description: string
          applications: string
          typical_application_circuit: string
          pin_config: string
          function_block_diagram: string
          company_name: string
          country: string
          automotive_grade: true
          industry_grade: true
          consumer_grade: true
          package: {}
        },
      ]
      is_device_hit: true
      device_hit: {
        oid: string
        part_number: string
        order_device: string
        marking: string
        status: string
        operation_temp: string
        package_type: string
        package_type_std: string
        pin_count: 0
        length: 0.1
        width: 0.1
        hight: 0.1
        pitch: 0.1
        output_voltage: string
        environmental_rating: string
        application_grade: string
        MSL: string
      }
    }
    design: {
      total: 0
      hits: [
        {
          name: string
          path: string
        },
      ]
    }
    technical: {
      total: 0
      hits: [
        {
          name: string
          path: string
        },
      ]
    }
    information: {
      total: 0
      hits: [
        {
          name: string
          path: string
        },
      ]
    }
  }
}
interface IUser {
  username: string
  phone: string
  password: string
  profile: {
    name: string
  }
}
export const getSearchData = (query: ISearch) => {
  return http.get<ISearchData>('/api/v1/products/search', query)
}
export const getDeviceSearchData = (query: any) => {
  return http.get<any>('/api/v1/devices/search', query)
}
export const getCategories = (query?: any) => {
  return http.get<any>('/api/v1/categories', query)
}
export const getProductDetail = (pid: string) => {
  return http.get<any>(`/api/v1/products/${pid}`)
}
export const getDeviceDetail = (oid: string) => {
  return http.get<any>(`/api/v1/products/${oid}`)
}
export const getConversations = (data: { user_id: string }) => {
  return http.post<any>(`/api/v1/conversations`, data)
}
export const addMessages = (data: { message: string; conversation_id: string }) => {
  return http.post<any>(`/api/v1/conversations/${data.conversation_id}/messages`, data)
}
export const deleteMessages = (conversation_id: string) => {
  return http.delete<any>(`/api/v1/conversations/${conversation_id}`)
}
export const registerUser = (user: IUser) => {
  return http.delete<any>(`/api/v1/auth/register`, user)
}
export const loginUser = (data: { identifier: string; password: string }) => {
  return http.delete<any>(`/api/v1/auth/login`, data)
}
export const getMessages = (datas: { conversation_id: string; role: string; content: string }) => {
  const { conversation_id, ...data } = datas
  return http.post<any>(`/api/v1/conversations/${conversation_id}/messages`, data)
}
