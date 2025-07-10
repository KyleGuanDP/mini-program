export interface PackageInfo {
  type: string
  type_std: string
  pin_count: number
  length: number
  width: number
  hight: number
}

export interface ProductHit {
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
  automotive_grade: boolean
  industry_grade: boolean
  consumer_grade: boolean
  package: PackageInfo
}

export interface DeviceHit {
  oid: string
  part_number: string
  order_device: string
  marking: string
  status: string
  operation_temp: string
  package_type: string
  package_type_std: string
  pin_count: number
  length: number
  width: number
  hight: number
  pitch: number
  output_voltage: string
  environmental_rating: string
  application_grade: string
  MSL: string
}

export interface ProductData {
  total: number
  hits: ProductHit[]
  is_device_hit: boolean
  device_hit: DeviceHit
}

export interface DesignHit {
  name: string
  path: string
}

export interface DesignData {
  total: number
  hits: DesignHit[]
}

export interface TechnicalData {
  total: number
  hits: DesignHit[]
}

export interface InformationData {
  total: number
  hits: DesignHit[]
}

export interface SearchApiResponse {
  product: ProductData
  design: DesignData
  technical: TechnicalData
  information: InformationData
}
