export function buildRequestPayload(
  brandData: any,
  packageData: {
    selectedOptions: Record<string, Set<string>>
    pinRanges: Record<string, [number, number]>
  },
  applicationGrade: string[],
): any {
  const req: any = {
    attributes: {},
    package: {},
  }
  // 品牌相关
  if (brandData.manufacture?.length) req.manufacture = brandData.manufacture
  if (brandData.country?.length) req.country = brandData.country
  if (applicationGrade.length) {
    for (const grade of applicationGrade) {
      if (grade === '车规级') {
        req.automotive_grade = true
      } else if (grade === '工业级') {
        req.industry_grade = true
      } else if (grade === '消费级') {
        req.consumer_grade = true
      }
    }
  }

  // 参数组件相关
  const selector = packageData.selectedOptions || {}

  const pin = packageData.pinRanges || {}

  for (const key in selector) {
    const values = Array.from(selector[key])

    switch (key) {
      case '封装类型':
        req.package.type = values
        break
      case '常见封装':
        req.package.type_std = values
        break
      case '功率器件配置方式(可多选)':
        req.attributes.power_mos_integrated = values
        break
      case '功率器件类型':
        req.attributes.power_device_type = values
        break
      default:
        req.attributes[mapLabelToKey(key)] = values[0] // 默认单选字段
    }
  }

  for (const key in pin) {
    const [gte, lte] = pin[key]
    switch (key) {
      case '配置引脚数量':
        req.package.pin_count = { gte, lte }
        break
      case '脚间距':
        req.package.pitch = { gte, lte }
        break
      default:
        req.attributes[mapLabelToKey(key)] = { gte, lte }
    }
  }
  return req
}

function mapLabelToKey(label: string): string {
  const map: Record<string, string> = {
    '最高输入电压 (V)': 'max_input_voltage',
    '最低输入电压 (V)': 'min_input_voltage',
    '最高输出电压 (V)': 'max_output_voltage',
    '最小输出电压 (V)': 'min_output_voltage',
    '最大输出电流 (A)': 'max_output_current',
    '最高开关频率 (MHz)': 'max_switch_frequency',
    '静态电流 (uA)': 'quiescent_current',
    '输出电压精度 (%)': 'output_voltage_accuracy',
    电源相位数: 'power_phase_number',
    工作模式: 'operation_mode',
    通信接口: 'communication_interface',
    使能功能: 'enable_function',
    轻载模式: 'light_load_mode',
    软启动: 'soft_start',
    输出放电: 'output_discharge',
    集成LDO: 'integrated_LDO',
    频率同步: 'frequency_sync',
    电压跟随: 'output_voltage_tracking',
    动态调压: 'dynamic_voltage_setting',
    电源指示: 'power_good_indicator',
    输出电压配置模式: 'output_voltage_config_method',
    满占空比运行: '100%_duty_cycle',
    输入过压保护: 'input_over_voltage_protection',
    输入欠压保护: 'input_under_voltage_protection',
    输出过压保护: 'output_over_voltage_protection',
    输出欠压保护: 'output_under_voltage_protection',
    输出过载保护: 'output_over_load_protection',
    输出短路保护: 'output_short_circuit_protection',
    过温保护: 'over_temperature_protection',
  }

  return map[label] || label
}
