import Main from '@/components/main';
export const basicSettings = [
  {
    path: '/ASSbasicSettings',
    name: 'ASSbasicSettings',
    component: Main,
    meta: {
      title: '基础设置',
      icon: 'ios-paper-outline',
      roles: ['10-15-4']
    },
    children: [
      //  发送email
      {
        path: '/assetManagement/unitOfMeasure',
        name: 'unitOfMeasure',
        meta: {
          title: '计量单位',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/assetManagement/unitOfMeasure/unitOfMeasure.vue')
      },
      {
        path: '/assetManagement/storageLocation',
        name: 'storageLocation',
        meta: {
          title: '存放地点',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/assetManagement/storageLocation/storageLocation.vue')
      },
      {
        path: '/assetManagement/supplier',
        name: 'supplier',
        meta: {
          title: '供应商',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/assetManagement/supplier/supplier.vue')
      },
      {
        path: '/assetManagement/classification',
        name: 'classification',
        meta: {
          title: '资产分类',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/assetManagement/classification/classification.vue')
      },
      {
        path: '/assetManagement/numSetting',
        name: 'numSetting',
        meta: {
          title: '编号设置',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/assetManagement/numSetting/numSetting.vue')
      },
      {
        path: '/assetManagement/fixedField',
        name: 'fixedField',
        meta: {
          title: '固定字段',
          roles: ['10-11-4', '10-12-4']
        },
        component: () => import('@/views/assetManagement/fixedField/fixedField.vue')
      }
    ]
  }
];
