<template>
  <view class="container">
    <view class="info-1">
      <view class="input-row">
        <view class="title">头像:</view>
        <view class="input-wrapper">
          <button class="avatar-button" open-type="chooseAvatar" @chooseavatar="onChooseAvatar">
            <view class="avatar">
              <image :src="avatarUrl" class="avatar-img" mode="aspectFill" />
            </view>
          </button>
        </view>
      </view>

      <view class="input-row">
        <view class="title">姓名:</view>
        <view class="input-wrapper">
          <view class="fake-placeholder" v-if="!isNameFocused" @click="focusInput('name')">
            {{ namePlaceholder }} >
          </view>
          <input
            v-else
            ref="nameInputRef"
            v-model="name"
            @blur="isNameFocused = false"
            :focus="isNameFocused"
            @confirm="edit"
          />
        </view>
      </view>

      <view class="input-row">
        <view class="title">昵称:</view>
        <view class="input-wrapper">
          <view class="fake-placeholder" v-if="!isNickNameFocused" @click="focusInput('nickName')">
            {{ nickNamePlaceholder }} >
          </view>
          <input
            v-else
            ref="nickNameInputRef"
            v-model="nickName"
            @blur="isNickNameFocused = false"
            :focus="isNickNameFocused"
            @confirm="edit"
          />
        </view>
      </view>

      <!-- 性别 -->
      <view class="picker">
        <picker :range="gender" :value="selectedGenderIndex" @change="onGenderPickerChange">
          <view class="inner-picker">
            <view class="title">性别:</view>
            <view class="picker-text">{{ genderDefault }} ></view>
          </view>
        </picker>
      </view>
    </view>

    <view class="info-2">
      <view class="input-row">
        <view class="title">邮箱:</view>
        <view class="input-wrapper">
          <view class="fake-placeholder" v-if="!isMailFocused" @click="focusInput('mail')">
            {{ mailPlaceholder }} >
          </view>
          <input
            v-else
            ref="mailInputRef"
            v-model="mail"
            @blur="isMailFocused = false"
            :focus="isMailFocused"
            @confirm="edit"
          />
        </view>
      </view>

      <view class="input-row">
        <view class="title">公司:</view>
        <view class="input-wrapper">
          <view class="fake-placeholder" v-if="!isCompanyFocused" @click="focusInput('company')">
            {{ companyPlaceholder }} >
          </view>
          <input
            v-else
            ref="companyInputRef"
            v-model="company"
            @blur="isCompanyFocused = false"
            :focus="isCompanyFocused"
            @confirm="edit"
          />
        </view>
      </view>

      <!-- 职位 -->
      <view class="picker">
        <picker
          mode="multiSelector"
          :range="multiRange"
          :value="multiIndex"
          @change="onOccupationPickerChange"
          @columnchange="columnChange"
        >
          <view class="inner-picker">
            <view class="title">职位:</view>
            <view class="picker-text">{{ occupationDefault }} ></view>
          </view>
        </picker>
      </view>
    </view>

    <view class="info-3">
      <!-- 所属行业 -->
      <view class="picker job">
        <picker :range="occupation" :value="selectedJob" @change="onJobPickerChange">
          <view class="inner-picker">
            <view class="title">所属行业:</view>
            <view class="picker-text">{{ jobDefault }} ></view>
          </view>
        </picker>
      </view>

      <view class="input-row">
        <view class="title">联系电话:</view>
        <view class="input-wrapper">
          <view class="fake-placeholder">
            {{ phone }}
          </view>
        </view>
      </view>

      <view class="input-row address">
        <view class="title">地址:</view>
        <view class="input-wrapper">
          <view class="fake-placeholder" v-if="!isAddressFocused" @click="focusInput('address')">
            {{ addressPlaceholder }} >
          </view>
          <input
            v-else
            ref="addressInputRef"
            v-model="address"
            @blur="isAddressFocused = false"
            :focus="isAddressFocused"
            @confirm="edit"
          />
        </view>
      </view>
    </view>
    <button class="logoutButton" @click="logout">退出登录</button>
  </view>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { withAuthRequest } from '@/utils/withAuthRequest'
import { withAuthUpload } from '@/utils/withAuthUpload'

// 输入框 focus 状态
const isNameFocused = ref(false)
const isMailFocused = ref(false)
const isCompanyFocused = ref(false)
const isAddressFocused = ref(false)
const isNickNameFocused = ref(false)

// 输入框引用
const nameInputRef = ref()
const mailInputRef = ref()
const companyInputRef = ref()
const addressInputRef = ref()
const nickNameInputRef = ref()

// 聚焦函数
const focusInput = (field: string) => {
  if (field === 'name') {
    isNameFocused.value = true
    nameInputRef.value?.focus()
  } else if (field === 'mail') {
    isMailFocused.value = true
    mailInputRef.value?.focus()
  } else if (field === 'company') {
    isCompanyFocused.value = true
    companyInputRef.value?.focus()
  } else if (field === 'address') {
    isAddressFocused.value = true
    addressInputRef.value?.focus()
  } else if (field === 'nickName') {
    isNickNameFocused.value = true
    nickNameInputRef.value?.focus()
  }
}
// avatar
const avatarUrl = ref('')

// phone
const phone = ref('')

// 点击头像选择
const onChooseAvatar = (e: any) => {
  avatarUrl.value = e.detail.avatarUrl
  uni.setStorageSync('avatar', avatarUrl.value)
  download(avatarUrl.value)
}

// download avatar
const download = async (url: string) => {
  if (!url) {
    uni.showToast({ title: '头像地址无效', icon: 'none' })
    return
  }

  uni.downloadFile({
    url,
    success: (res) => {
      if (res.statusCode === 200) {
        withAuthUpload(
          {
            url: 'http://121.199.10.78:8001/api/v1/users/me/avatar',
            uploadMode: true,
            filePath: res.tempFilePath,
            method: 'PUT',
            data: {},
          },
          (uploadRes) => {
            console.log('上传成功', uploadRes)
            uni.showToast({ title: '上传成功', icon: 'success' })
          },
          (err) => {
            console.error('上传失败', err)
            uni.showToast({ title: '上传失败', icon: 'none' })
          },
        )
      } else {
        console.warn('下载失败 statusCode:', res.statusCode)
        uni.showToast({ title: '头像下载失败', icon: 'none' })
      }
    },
    fail: (err) => {
      console.error('下载请求失败', err)
      uni.showToast({ title: '网络错误，下载失败', icon: 'none' })
    },
  })
}

// 表单数据
const name = ref('')
const mail = ref('')
const company = ref('')
const address = ref('')
const nickName = ref('')

// 占位符
const nickNamePlaceholder = ref('请输入昵称')
const namePlaceholder = ref('请输入姓名')
const mailPlaceholder = ref('请输入邮箱地址')
const companyPlaceholder = ref('请输入公司名称')
const addressPlaceholder = ref('请输入住址')

// 性别与职位
const gender = ['男', '女']
const selectedGenderIndex = ref(0)
const selectedJob = ref(0)
const genderDefault = ref('请选择性别')
const jobDefault = ref('请选择所属行业')

const occupation = ['汽车', '计算机', '通信', '工业', '个人消费']
const occupationMap: any = {
  汽车: ['整车厂商', '车载充电机', '车灯模组', '娱乐与仪表', '动力系统'],
  计算机: ['算力中心', '企业服务器', '个人电脑', '数据存储'],
  通信: ['无线基站设备', '有线网络', '数据通信模块', '宽带接入', '通信模组'],
  工业: [
    '航空航天',
    '国防',
    '家用电器',
    '新能源',
    '医疗健康',
    '机器人',
    '工业仪表',
    '电力设备',
    '安防监控',
    '测试测量',
  ],
  个人消费: ['手机', '可穿戴设备', '电视、平板', '家庭娱乐'],
}
const multiIndex = ref([0, 0])
const occupationDefault = ref('请选择职业')
const multiRange = ref([occupation, occupationMap[occupation[0]]])

const onGenderPickerChange = (e: any) => {
  selectedGenderIndex.value = Number(e.detail.value)
  genderDefault.value = gender[selectedGenderIndex.value]
  edit()
}

const onJobPickerChange = (e: any) => {
  selectedJob.value = Number(e.detail.value)
  jobDefault.value = occupation[selectedJob.value]
  edit()
}

const onOccupationPickerChange = (e: any) => {
  multiIndex.value = e.detail.value
  const [i, j] = multiIndex.value
  occupationDefault.value = `${occupation[i]} - ${multiRange.value[1][j]}`
  edit()
}

const columnChange = (e: any) => {
  const column = e.detail.column
  const value = e.detail.value
  if (column === 0) {
    const main = occupation[value]
    multiRange.value[1] = occupationMap[main]
    multiIndex.value = [value, 0]
  }
}

const getUserInfo = async (head: string) => {
  const url = head + 'api/v1/users/me'

  await withAuthRequest(
    { url, method: 'GET' },
    (res) => {
      const data = res.data as any
      name.value = data.name || ''
      namePlaceholder.value = data.name || '请输入姓名'

      nickNamePlaceholder.value = data.nickname || '请输入昵称'
      nickName.value = data.nickName

      mail.value = data.email || ''
      mailPlaceholder.value = data.email || '请输入邮箱地址'

      company.value = data.company || ''
      companyPlaceholder.value = data.company || '请输入公司名称'

      address.value = data.address || ''
      addressPlaceholder.value = data.address || '请输入住址'

      occupationDefault.value = data.job_title || '请选择职业'
      genderDefault.value = data.gender || '请选择性别'
      jobDefault.value = data.industry || '请选择所属行业'

      phone.value = data.phone_number

      avatarUrl.value = head + 'api/v1/files/download?path=' + data.avatar_url
    },
    (err) => {
      console.error('用户信息加载失败:', err)
    },
  )
}

// 修改请求
const edit = async () => {
  let url = `http://121.199.10.78:8001/api/v1/users/me`
  const data = {
    nickname: nickName.value,
    // name: name.value,
    gender: genderDefault.value,
    email: mail.value,
    company: company.value,
    job_title: occupationDefault.value,
    province: 'hangzhou',
    city: 'hangzhou',
    district: 'binjiang',
    address: address.value,
    industry: jobDefault.value,
  }
  await withAuthRequest(
    { url, method: 'PUT', data },
    (res) => {
      console.log(res)
      getUserInfo('http://121.199.10.78:8001/')
      uni.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 2000,
        mask: true,
      })
      const data = res.data as any
      namePlaceholder.value = data.name || '请输入姓名'
      companyPlaceholder.value = data.company || '请输入公司名称'
      mailPlaceholder.value = data.email || '请输入邮箱地址'
      occupationDefault.value = data.job_title || '请选择职业'
      genderDefault.value = data.gender || '请选择性别'
      addressPlaceholder.value = data.address || '请输入住址'
      nickNamePlaceholder.value = data.nickname || '请输入昵称'
      jobDefault.value = data.industry || '请输入所属行业'
    },
    (err) => {
      if (err.statusCode === 422) {
        uni.showToast({
          title: '请补全信息',
          icon: 'error',
          duration: 2000,
          mask: true,
        })
      }
    },
  )
}

// 登出
const logout = async () => {
  let url = `http://121.199.10.78:8001/api/v1/auth/wechat_logout`
  await withAuthRequest(
    { url, method: 'POST' },
    (res) => {
      console.log('this is logout log', res)
      uni.setStorageSync('status', false)
      uni.removeStorageSync('token')
      uni.removeStorageSync('refresh')
      uni.removeStorageSync('avatar')
      uni.switchTab({
        url: '/pages/login/center',
      })
    },
    (err) => {
      console.error('登出失败:', err)
    },
    false,
  )
}
onMounted(() => {
  getUserInfo('http://121.199.10.78:8001/')
})
</script>

<style lang="css" scoped>
/* [class] {
  border: 1rpx solid;
} */

.container {
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #f8f8f8;
  padding: 30rpx 0;
}

.info-1,
.info-2,
.info-3 {
  width: 666rpx;
  background: #ffffff;
  border-radius: 46rpx;
  padding: 32rpx 36rpx;
  box-shadow: 0 6rpx 12rpx rgba(0, 0, 0, 0.03);
  box-sizing: border-box;
}

.info-2,
.info-3 {
  margin-top: 27rpx;
}

.input-row {
  width: 100%;
  height: 80rpx;
  display: flex;
  flex-direction: row;
  align-items: center;
  margin-bottom: 15rpx;
  border-bottom: 4rpx solid #f5f7fa;
}

.input-row.address {
  border: 0;
}

.title {
  width: 200rpx;
  height: 46rpx;
  font-family: Inter, Inter;
  font-size: 32rpx;
}

.input-wrapper {
  justify-content: flex-end;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20rpx 0;
  font-size: 30rpx;
  flex: 1;
}

.avatar-button {
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0;
  margin: 0;
  border: none;
  background: transparent;
  gap: 20rpx;
}

.avatar {
  width: 60rpx;
  height: 60rpx;
  background: #ffffff;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
}

input {
  width: 100%;
  font-size: 28rpx;
  color: #111;
  padding: 10rpx 0rpx;
  border: none;
  background: transparent;
}

.fake-placeholder {
  flex: 1;
  text-align: right;
  font-size: 28rpx;
}
.picker {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 20rpx 0;
  font-size: 30rpx;
}

.picker.job {
  border-bottom: 4rpx solid #f5f7fa;
  margin-bottom: 15rpx;
}

.picker picker {
  display: block;
  width: 100%;
}

.inner-picker {
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
}

.picker-text {
  text-align: right;
  flex: 1;
  padding-left: 20rpx;
}

.logoutButton {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 60rpx;
  width: 594rpx;
  height: 76rpx;
  background: #ff6a00;
  box-shadow: 0rpx 8rpx 8rpx -6rpx rgba(0, 0, 0, 0.25);
  border-radius: 38rpx 38rpx 38rpx 38rpx;
  font-family: Inter, Inter;
  font-weight: 400;
  font-size: 32rpx;
  color: #ffffff;
  line-height: 42rpx;
  text-align: center;
  font-style: normal;
  text-transform: none;
}
</style>
