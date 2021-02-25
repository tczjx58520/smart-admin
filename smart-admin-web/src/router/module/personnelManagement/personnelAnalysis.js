import Main from '@/components/main';
export const personnelAnalysis = [
  {
    path: '/personnelAnalysis',
    component: Main,
    name: 'personnelAnalysis',
    meta: {
      title: '人事分析',
      icon: 'icon iconfont iconxitongjiankong',
      roles: ['59-74-4', '59-75-4', '59-76-4', '59-77-4', '59-78-4', '59-79-4', '59-80-4']
    },
    children: [
      {
        path: '/personnelAnalysis/staffPositionAnalysis',
        name: 'staffPositionAnalysis',
        meta: {
          title: '人员岗位分析',
          roles: ['59-74-4']
        },
        component: () => import('@/views/personnelManagement/staffPositionAnalysis/staffPositionAnalysis')
      },
      {
        path: '/personnelAnalysis/storeStatusAnalysis',
        name: 'storeStatusAnalysis',
        meta: {
          title: '门店状况分析',
          roles: ['59-75-4']
        },
        component: () => import('@/views/personnelManagement/storeStatusAnalysis/storeStatusAnalysis')
      },
      {
        path: '/personnelAnalysis/staffPositionAnalysisSetting',
        name: 'staffPositionAnalysisSetting',
        meta: {
          title: '人员岗位分析相关设置',
          roles: ['59-76-4', '59-77-4', '59-78-4', '59-79-4', '59-80-4']
        },
        children: [
          {
            path: '/personnelAnalysis/staffPositionAnalysisSetting/staffPromotionAssessment',
            name: 'staffPromotionAssessment',
            meta: {
              title: '员工岗位晋升考核',
              roles: ['59-76-4']
            },
            component: () => import('@/views/personnelManagement/staffPositionAnalysisSetting/staffPromotionAssessment/staffPromotionAssessment')
          },
          {
            path: '/personnelAnalysis/staffPositionAnalysisSetting/postAssessmentTaskManagement',
            name: 'postAssessmentTaskManagement',
            meta: {
              title: '岗位考核任务管理',
              roles: ['59-77-4']
            },
            component: () => import('@/views/personnelManagement/staffPositionAnalysisSetting/postAssessmentTaskManagement/postAssessmentTaskManagement')
          },
          {
            path: '/personnelAnalysis/staffPositionAnalysisSetting/positionIndicatorSetting',
            name: 'positionIndicatorSetting',
            meta: {
              title: '岗位指标集设置',
              roles: ['59-78-4']
            },
            component: () => import('@/views/personnelManagement/staffPositionAnalysisSetting/postAssessmentSet/postAssessmentSet')
          },
          {
            path: '/personnelAnalysis/staffPositionAnalysisSetting/postIndexItemSetting',
            name: 'postIndexItemSetting',
            meta: {
              title: '岗位指标项设置',
              roles: ['59-79-4']
            },
            component: () => import('@/views/personnelManagement/staffPositionAnalysisSetting/postAssessmentSetSingle/postAssessmentSetSingle')
          },
          {
            path: '/personnelAnalysis/staffPositionAnalysisSetting/standardSettingOfPostPromotion',
            name: 'standardSettingOfPostPromotion',
            meta: {
              title: '岗位升降标准设置',
              roles: ['59-80-4']
            },
            component: () => import('@/views/personnelManagement/staffPositionAnalysisSetting/standardSettingOfPostPromotion/standardSettingOfPostPromotion')
          }
        ]
      },
      {
        path: '/personnelAnalysis/storeStatusAnalysisRelatedSettings',
        name: 'storeStatusAnalysisRelatedSettings',
        meta: {
          title: '门店状况分析相关设置',
          roles: ['59-81-4', '59-82-4']
        },
        children: [
          {
            path: '/personnelAnalysis/storeStatusAnalysisRelatedSettings/storeTaskItemManagement',
            name: 'storeTaskItemManagement',
            meta: {
              title: '门店任务项管理',
              roles: ['59-81-4']
            },
            component: () => import('@/views/personnelManagement/storeStatusAnalysis/storeSetSingle/storeSetSingle')
          },
          {
            path: '/personnelAnalysis/storeStatusAnalysisRelatedSettings/storeTaskSet',
            name: 'storeTaskSet',
            meta: {
              title: '门店任务集',
              roles: ['59-82-4']
            },
            component: () => import('@/views/personnelManagement/storeStatusAnalysis/storeSet/storeSet')
          }
        ]
      }

    ]
  }
];
