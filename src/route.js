import asyncComponent from './component/async-component/async-component';

const ROUTES = [
  {
    path: '/home',
    component: asyncComponent(() => import('container/home/home'))
  },
  {
    path: '/system/role',
    component: asyncComponent(() => import('container/security/role/role'))
  },
  {
    path: '/system/role/addedit',
    component: asyncComponent(() => import('container/security/role-addedit/role-addedit'))
  },
  {
    path: '/security/role/menu',
    component: asyncComponent(() => import('container/security/role-menu/role-menu'))
  },
  {
    path: '/system/menu',
    component: asyncComponent(() => import('container/security/menu/menu'))
  },
  {
    path: '/system/menu/addedit',
    component: asyncComponent(() => import('container/security/menu-addedit/menu-addedit'))
  },
  {
    path: '/system/user',
    component: asyncComponent(() => import('container/security/user/user'))
  },
  {
    path: '/system/user/addedit',
    component: asyncComponent(() => import('container/security/user-addedit/user-addedit'))
  },
  {
    path: '/system/help',
    component: asyncComponent(() => import('container/security/help/help'))
  },
  {
    path: '/system/help/addedit',
    component: asyncComponent(() => import('container/security/help-addedit/help-addedit'))
  },
  {
    path: '/system/sysPara',
    component: asyncComponent(() => import('container/security/sysParam/sysParam'))
  },
  {
    path: '/system/sysPara/addedit',
    component: asyncComponent(() => import('container/security/sysParam-addedit/sysParam-addedit'))
  },
  {
    path: '/system/dataDict',
    component: asyncComponent(() => import('container/security/dict/dict'))
  },
  {
    path: '/system/dataDict/addedit',
    component: asyncComponent(() => import('container/security/dict-addedit/dict-addedit'))
  },
  {
    path: '/public/aboutus_addedit',
    component: asyncComponent(() => import('container/public/aboutus-addedit/aboutus-addedit'))
  },
  {
    path: '/security/user/resetPwd',
    component: asyncComponent(() => import('container/security/user-resetPwd/user-resetPwd'))
  },
  {
    path: '/security/user/setRole',
    component: asyncComponent(() => import('container/security/user-setRole/user-setRole'))
  },
  {
    path: '/security/user/setBumen',
    component: asyncComponent(() => import('container/security/user-setBumen/user-setBumen'))
  },
  {
    path: '/security/user/changeMobile',
    component: asyncComponent(() => import('container/security/user-changeMobile/user-changeMobile'))
  },
  {
    path: '/public/banner',
    component: asyncComponent(() => import('container/public/banner/banner'))
  },
  {
    path: '/public/banner/addedit',
    component: asyncComponent(() => import('container/public/banner-addedit/banner-addedit'))
  },
  {
    path: '/public/time_addedit',
    component: asyncComponent(() => import('container/public/time-addedit/time-addedit'))
  },
  {
    path: '/waitList/postRequest',
    component: asyncComponent(() => import('container/waitList/postRequest/postRequest'))
  },
  {
    path: '/waitList/alreadyQuest',
    component: asyncComponent(() => import('container/waitList/alreadyQuest/alreadyQuest'))
  },
  {
    path: '/waitList/postRequest/addedit',
    component: asyncComponent(() => import('container/waitList/postRequest-addedit/postRequest-addedit'))
  },
  {
    path: '/waitList/alreadyQuest/addedit',
    component: asyncComponent(() => import('container/waitList/alreadyQuest-addedit/alreadyQuest-addedit'))
  },
  {
    path: '/waitList/feedback',
    component: asyncComponent(() => import('container/waitList/feedback/feedback'))
  },
  {
    path: '/waitList/feedback/addedit',
    component: asyncComponent(() => import('container/waitList/feedback-addedit/feedback-addedit'))
  },
  {
    path: '/waitList/textMessage',
    component: asyncComponent(() => import('container/waitList/textMessage/textMessage'))
  },
  {
    path: '/waitList/textMessage/addedit',
    component: asyncComponent(() => import('container/waitList/textMessage-addedit/textMessage-addedit'))
  },
  {
    path: '/general/textParam',
    component: asyncComponent(() => import('container/general/text-param/text-param'))
  },
  {
    path: '/general/textParam/addedit',
    component: asyncComponent(() => import('container/general/text-param-addedit/text-param-addedit'))
  },
  {
    path: '/newProj/kaoqin',
    component: asyncComponent(() => import('container/newProj/kaoqin/kaoqin'))
  },
  {
    path: '/newProj/bumenConstruct',
    component: asyncComponent(() => import('container/newProj/bumenConstruct/bumenConstruct'))
  },
  {
    path: '/projectManage/project/edit',
    component: asyncComponent(() => import('container/newProj/project-edit/project-edit'))
  },
  {
    path: '/projectManage/project/addBumen',
    component: asyncComponent(() => import('container/newProj/project-addBumen/project-addBumen'))
  },
  {
    path: '/staff/allStaff/weekday',
    component: asyncComponent(() => import('container/newProj/project-weekday/project-weekday'))
  },
  {
    path: '/newProj/project/check',
    component: asyncComponent(() => import('container/newProj/project-check/project-check'))
  },
  {
    path: '/staff/allStaff/quit',
    component: asyncComponent(() => import('container/newProj/project-quit/project-quit'))
  },
  {
    path: '/projectManage/project/check',
    component: asyncComponent(() => import('container/newProj/project-check/project-check'))
  },
  {
    path: '/projectManage/project/end',
    component: asyncComponent(() => import('container/newProj/project-end/project-end'))
  },
  {
    path: '/projectManage/project/stop',
    component: asyncComponent(() => import('container/newProj/project-stop/project-stop'))
  },
  {
    path: '/projectManage/project/leijifaxin',
    component: asyncComponent(() => import('container/newProj/project-leijifaxin/project-leijifaxin'))
  },
  {
    path: '/projectManage/project/kaoqin',
    component: asyncComponent(() => import('container/newProj/project-kaoqin/project-kaoqin'))
  },
  {
    path: '/projectManage/project/salary',
    component: asyncComponent(() => import('container/newProj/project-salary/project-salary'))
  },
  {
    path: '/newProj/project/detail',
    component: asyncComponent(() => import('container/newProj/project-detail/project-detail'))
  },
  {
    path: '/projectManage/project/salary/edit',
    component: asyncComponent(() => import('container/newProj/project-salary-edit/project-salary-edit'))
  },
  // {
  //   path: '/projectManage/project/salary/check',
  //   component: asyncComponent(() => import('container/newProj/project-salary-check/project-salary-check'))
  // },
  {
    path: '/projectManage/project/addedit',
    component: asyncComponent(() => import('container/newProj/project-addedit/project-addedit'))
  },
  {
    path: '/projectManage/project/daka',
    component: asyncComponent(() => import('container/newProj/project-daka/project-daka'))
  },
  {
    path: '/yewuManage/account',
    component: asyncComponent(() => import('container/yewuManage/account/account'))
  },
  {
    path: '/yewuManage/account/addedit',
    component: asyncComponent(() => import('container/yewuManage/account-addedit/account-addedit'))
  },
  {
    path: '/hetong/chengbaoshang',
    component: asyncComponent(() => import('container/hetong/chengbaoshang/chengbaoshang'))
  },
  {
    path: '/hetong/chengbaoshang/addedit',
    component: asyncComponent(() => import('container/hetong/chengbaoshang-addedit/chengbaoshang-addedit'))
  },
  {
    path: '/hetong/wugong',
    component: asyncComponent(() => import('container/hetong/wugong/wugong'))
  },
  {
    path: '/hetong/wugong/addedit',
    component: asyncComponent(() => import('container/hetong/wugong-addedit/wugong-addedit'))
  },
  {
    path: '/hetong/wugong/edit',
    component: asyncComponent(() => import('container/hetong/wugong-edit/wugong-edit'))
  },
  {
    path: '/hetong/wugong/contract',
    component: asyncComponent(() => import('container/hetong/wugong-addedit/wugong-addedit'))
  },
  // {
  //   path: '/people/wugong',
  //   component: asyncComponent(() => import('container/people/wugong/wugong'))
  // },
  {
    path: '/staff/allStaff/entry',
    component: asyncComponent(() => import('container/people/wugong-addedit/wugong-addedit'))
  },
  {
    path: '/people/wugong/break',
    component: asyncComponent(() => import('container/people/wugong-break/wugong-break'))
  },
  {
    path: '/people/wugong/leave',
    component: asyncComponent(() => import('container/people/wugong-leave/wugong-leave'))
  },
  // {
  //   path: '/people/history',
  //   component: asyncComponent(() => import('container/people/history/history'))
  // },
  {
    path: '/staff/allStaff',
    component: asyncComponent(() => import('container/staff/allStaff/allStaff'))
  },
  {
    path: '/staff/allStaff/bank',
    component: asyncComponent(() => import('container/biz/bank/bank-addedit'))
  },
  {
    path: '/staff/allStaff/addedit',
    component: asyncComponent(() => import('container/staff/allStaff-addedit/allStaff-addedit'))
  },
  {
    path: '/staff/allStaff/leaveRecords',
    component: asyncComponent(() => import('container/staff/allStaff-leaveRecords/allStaff-leaveRecords'))
  },
  {
    path: '/staff/allStaff/skill',
    component: asyncComponent(() => import('container/staff/allStaff-skill/allStaff-skill'))
  },
  {
    path: '/staff/allStaff/skill-addedit',
    component: asyncComponent(() => import('container/staff/skill-addedit/skill-addedit'))
  },
  {
    path: '/staff/bank',
    component: asyncComponent(() => import('container/biz/bank/bank'))
  },
  {
    path: '/staff/bank/addedit',
    component: asyncComponent(() => import('container/biz/bank/bank-addedit'))
  },
  {
    path: '/staff/idCardQuery',
    component: asyncComponent(() => import('container/staff/idCardQuery/idCardQuery'))
  },
  {
    path: '/staff/allStaffNotice',
    component: asyncComponent(() => import('container/staff/allStaff-notice/allStaff-notice'))
  },
  {
    path: '/staff/allStaffNotice/addedit',
    component: asyncComponent(() => import('container/staff/allStaff-noticeAddedit/allStaff-noticeAddedit'))
  },
  {
    path: '/staff/allStafferror',
    component: asyncComponent(() => import('container/staff/allStaff-error/allStaff-error'))
  },
  {
    path: '/staff/allStafferrHistory',
    component: asyncComponent(() => import('container/staff/allStaff-errHistory/allStaff-errHistory'))
  },
  {
    path: '/staff/allStafferror/history/addedit',
    component: asyncComponent(() => import('container/staff/allStaff-errHistoryAddedit/allStaff-errHistoryAddedit'))
  },
  {
    path: '/staff/allStaff/error/Edit',
    component: asyncComponent(() => import('container/staff/allStaff-errorEdit/allStaff-errorEdit'))
  },
  {
    path: '/staff/error',
    component: asyncComponent(() => import('container/staff/allStaff-error/allStaff-error'))
  },
  {
    path: '/staff/allStaff/error/addedit',
    component: asyncComponent(() => import('container/staff/allStaff-detail/allStaff-detail'))
  },
  {
    path: '/staff/allStafferror/addedit',
    component: asyncComponent(() => import('container/staff/allStaff-errorAddedit/allStaff-errorAddedit'))
  },
  {
    path: '/staff/allStaff/wages',
    component: asyncComponent(() => import('container/staff/allStaff-wages/allStaff-wages'))
  },
  {
    path: '/staff/allStaff/history',
    component: asyncComponent(() => import('container/staff/allStaff-history/allStaff-history'))
  },
  {
    path: '/staff/allStaff/history-detail',
    component: asyncComponent(() => import('container/staff/history-detail/history-detail'))
  },
  {
    path: '/staff/allStaff/history/addedit',
    component: asyncComponent(() => import('container/staff/allStaff-detail/allStaff-detail'))
  },
  {
    path: '/staff/allStaff/detail',
    component: asyncComponent(() => import('container/staff/allStaff-detail/allStaff-detail'))
  },
  {
    path: '/staff/allStaff/leaveRecords-detail',
    component: asyncComponent(() => import('container/staff/leaveRecords-detail/leaveRecords-detail'))
  },
  {
    path: '/staff/bankCard',
    component: asyncComponent(() => import('container/staff/bankCard/bankCard'))
  },
  {
    path: '/staff/bankCard/addedit',
    component: asyncComponent(() => import('container/staff/bankCard-addedit/bankCard-addedit'))
  },
  {
    path: '/staff/jiandang',
    component: asyncComponent(() => import('container/staff/archives/jiandang'))
  },
  {
    path: '/staff/jiandang/step2',
    component: asyncComponent(() => import('container/staff/archives/jiandang-step2'))
  },
  {
    path: '/staff/jiandang/step3',
    component: asyncComponent(() => import('container/staff/archives/jiandang-step3'))
  },
  // {
  //   path: '/staff/jiandang1',
  //   component: asyncComponent(() => import('container/staff/archives/jiandang1'))
  // },
  {
    path: '/staff/jiandang/mianguanRead',
    component: asyncComponent(() => import('container/staff/archives/mianguanRead'))
  },
  {
    path: '/staff/jiandang/mianguanRead1',
    component: asyncComponent(() => import('container/staff/archives/mianguanRead1'))
  },
  {
    path: '/staff/jiandang/mianguanRead2',
    component: asyncComponent(() => import('container/staff/archives/mianguanRead2'))
  },
  {
    path: '/staff/jiandang/idInfoRead',
    component: asyncComponent(() => import('container/staff/archives/idInfoRead'))
  },
  {
    path: '/staff/jiandang/salaryCard',
    component: asyncComponent(() => import('container/staff/archives/salaryCard'))
  },
  {
    path: '/staff/jiandang/luru',
    component: asyncComponent(() => import('container/staff/archives/luru'))
  },
  {
    path: '/staff/jiandang/luru1',
    component: asyncComponent(() => import('container/staff/archives/luru1'))
  },
  {
    path: '/staff/jiandang/luru2',
    component: asyncComponent(() => import('container/staff/archives/luru2'))
  },
  {
    path: '/staff/ruzhiInfo',
    component: asyncComponent(() => import('container/staff/archives/ruzhiInfo'))
  },
  { path: '/staff/allStaff/addBankCard',
    component: asyncComponent(() => import('container/staff/allStaff-addBankCard/allStaff-addBankCard'))
  },
  {
    path: '/staff/jiandang/idPicture',
    component: asyncComponent(() => import('container/staff/archives/idPicture'))
  },
  {
    path: '/staff/jiandang/idPicture1',
    component: asyncComponent(() => import('container/staff/archives/idPicture1'))
  },
  {
    path: '/staff/jiandang/idPicture2',
    component: asyncComponent(() => import('container/staff/archives/idPicture2'))
  },
  {
    path: '/daifa/daifa',
    component: asyncComponent(() => import('container/daifa/daifa/daifa'))
  },
  {
    path: '/daifa/daifa/addedit',
    component: asyncComponent(() => import('container/daifa/daifa-addedit/daifa-addedit'))
  },
    {
    path: '/daifa/daifa/addedit/edit',
    component: asyncComponent(() => import('container/daifa/daifa-edit/daifa-edit'))
  },
  {
    path: '/newId/bank',
    component: asyncComponent(() => import('container/newId/bank/bank'))
  },
  {
    path: '/newId/operation',
    component: asyncComponent(() => import('container/newId/operation/operation'))
  },
  {
    path: '/newId/operation/addedit',
    component: asyncComponent(() => import('container/newId/operation-addedit/operation-addedit'))
  },
  {
    path: '/newId/bank/addedit',
    component: asyncComponent(() => import('container/newId/bank-addedit/bank-addedit'))
  },
  {
    path: '/newId/yezhu',
    component: asyncComponent(() => import('container/newId/yezhu/yezhu'))
  },
  {
    path: '/newId/yezhu/addedit',
    component: asyncComponent(() => import('container/newId/yezhu-addedit/yezhu-addedit'))
  },
  {
    path: '/newId/supervise',
    component: asyncComponent(() => import('container/newId/supervise/supervise'))
  },
  {
    path: '/newId/supervise/addedit',
    component: asyncComponent(() => import('container/newId/supervise-addedit/supervise-addedit'))
  },
  {
    path: '/projectManage/project',
    component: asyncComponent(() => import('container/dailiManage/map/map3'))
  },
  {
    path: '/projectStaff/projectStaff',
    component: asyncComponent(() => import('container/projectStaff/projectStaff/projectStaff'))
  },
  {
    path: '/projectStaff/projectStaff/addedit',
    component: asyncComponent(() => import('container/projectStaff/projectStaff-addedit/projectStaff-addedit'))
  },
  {
    path: '/projectStaff/projectStaff/addBankCard',
    component: asyncComponent(() => import('container/projectStaff/projectStaff-addBankCard/projectStaff-addBankCard'))
  },
  // 开设账号 -- 业主单位-- 项目管理
  {
    path: '/project/projectmanagement',
    component: asyncComponent(() => import('container/newId/projectmanagement/projectmanagement'))
  },
  {
    path: '/project/projectmanagement/addedit',
    component: asyncComponent(() => import('container/newId/projectmanagement/projectmanagement-addedit'))
  },
  // 业务管理 -- 项目管理-- 项目参建单位
  {
    path: '/project/projectparticipant',
    component: asyncComponent(() => import('container/biz/project/participating/participating'))
  },
  // 业务管理 -- 项目管理-- 项目参建单位--详情
  {
    path: '/project/projectparticipant/addedit',
    component: asyncComponent(() => import('container/biz/project/participating/participating-addedit'))
  },
  // 业务管理 -- 项目管理-- 项目参建单位--上传
  {
    path: '/project/projectparticipant/up',
    component: asyncComponent(() => import('container/biz/project/participating/participating-up'))
  },
  // 业务管理 -- 项目管理-- 项目参建单位--导入
  {
    path: '/project/projectparticipant/import',
    component: asyncComponent(() => import('container/biz/project/participating/participating-import'))
  },
  // 业务管理 -- 项目管理-- 项目参建单位--银行列表
  {
    path: '/project/projectparticipant/bank',
    component: asyncComponent(() => import('container/biz/bank/bank'))
  },
  // 业务管理 -- 项目管理-- 项目参建单位--银行列表--详情
  {
    path: '/project/projectparticipant/bank/addedit',
    component: asyncComponent(() => import('container/biz/bank/bank-addedit'))
  },
  // 业务管理 -- 项目管理-- 项目班组
  {
    path: '/project/class',
    component: asyncComponent(() => import('container/biz/project/class/class'))
  },
  // 业务管理 -- 项目管理-- 项目班组-- 详情
  {
    path: '/project/class/addedit',
    component: asyncComponent(() => import('container/biz/project/class/class-addedit'))
  },
  // 业务管理 -- 项目管理-- 项目班组-- 上传
  {
    path: '/project/class/up',
    component: asyncComponent(() => import('container/biz/project/class/class-up'))
  },
  // 业务管理 -- 项目管理-- 项目班组-- 导入
  {
    path: '/project/class/import',
    component: asyncComponent(() => import('container/biz/project/class/class-import'))
  },
  // 业务管理 -- 项目管理-- 项目人员
  {
    path: '/project/member',
    component: asyncComponent(() => import('container/biz/project/member/member'))
  },
  // 业务管理 -- 项目管理-- 项目人员-- 详情
  {
    path: '/project/member/addedit',
    component: asyncComponent(() => import('container/biz/project/member/member-addedit'))
  },
  // 业务管理 -- 项目管理-- 项目人员-- 上传平台
  {
    path: '/project/member/up',
    component: asyncComponent(() => import('container/biz/project/member/member-up'))
  },
  // 业务管理 -- 项目管理-- 项目人员-- 导入
  {
    path: '/project/member/import',
    component: asyncComponent(() => import('container/biz/project/member/member-import'))
  },
  // 业务管理 -- 项目管理-- 项目人员进退场
  {
    path: '/project/inout',
    component: asyncComponent(() => import('container/biz/project/inout/inout'))
  },
  // 业务管理 -- 项目管理-- 项目人员进退场-- 上传平台
  {
    path: '/project/inout/up',
    component: asyncComponent(() => import('container/biz/project/inout/inout-up'))
  },
  // 业务管理 -- 项目管理-- 项目人员进退场-- 导入
  {
    path: '/project/inout/import',
    component: asyncComponent(() => import('container/biz/project/inout/inout-import'))
  },
  // 业务管理 -- 项目管理-- 项目人员进退场-- 详情
  {
    path: '/project/inout/addedit',
    component: asyncComponent(() => import('container/biz/project/inout/inout-addedit'))
  },
  // 业务管理 -- 项目管理-- 项目人员合同
  {
    path: '/project/memcontract',
    component: asyncComponent(() => import('container/biz/project/memcontract/memcontract'))
  },
  // 业务管理 -- 项目管理-- 项目人员合同-- 上传平台
  {
    path: '/project/memcontract/up',
    component: asyncComponent(() => import('container/biz/project/memcontract/memcontract-up'))
  },
  // 业务管理 -- 项目管理-- 项目人员合同-- 导入
  {
    path: '/project/memcontract/import',
    component: asyncComponent(() => import('container/biz/project/memcontract/memcontract-import'))
  },
  // 业务管理 -- 项目管理-- 项目人员合同-- 详情
  {
    path: '/project/memcontract/addedit',
    component: asyncComponent(() => import('container/biz/project/memcontract/memcontract-addedit'))
  },
  // 业务管理 -- 项目管理-- 项目人员考勤
  {
    path: '/project/attence',
    component: asyncComponent(() => import('container/biz/project/attence/attence'))
  },
  // 业务管理 -- 项目管理-- 项目人员考勤-- 上传平台
  {
    path: '/project/attence/up',
    component: asyncComponent(() => import('container/biz/project/attence/attence-up'))
  },
  // 业务管理 -- 项目管理-- 项目人员考勤-- 导入
  {
    path: '/project/attence/import',
    component: asyncComponent(() => import('container/biz/project/attence/attence-import'))
  },
  // 业务管理 -- 项目管理-- 项目人员考勤-- 详情
  {
    path: '/project/attence/addedit',
    component: asyncComponent(() => import('container/biz/project/attence/attence-addedit'))
  },
  // 业务管理 -- 项目管理-- 项目人员工资
  {
    path: '/project/wages',
    component: asyncComponent(() => import('container/biz/project/wages/wages'))
  },
  // 业务管理 -- 项目管理-- 项目人员工资-- 上传平台
  {
    path: '/project/wages/up',
    component: asyncComponent(() => import('container/biz/project/wages/wages-up'))
  },
  // 业务管理 -- 项目管理-- 项目人员工资-- 新增
  {
    path: '/project/wages/add',
    component: asyncComponent(() => import('container/biz/project/wages/wages-add'))
  },
  // 业务管理 -- 项目管理-- 项目人员工资-- 导入
  {
    path: '/project/wages/import',
    component: asyncComponent(() => import('container/biz/project/wages/wages-import'))
  },
  // 业务管理 -- 项目管理-- 项目人员工资-- 详情
  {
    path: '/project/wages/addedit',
    component: asyncComponent(() => import('container/biz/project/wages/wages-addedit'))
  },
  // 业务管理 -- 企业库-- 企业基本信息
  {
    path: '/company/info',
    component: asyncComponent(() => import('container/biz/company/info/info'))
  },
  // 业务管理 -- 企业库-- 企业基本信息-- 详情
  {
    path: '/company/info/addedit',
    component: asyncComponent(() => import('container/biz/company/info/info-addedit'))
  },
  // 业务管理 -- 企业库-- 企业基本信息-- 上传平台
  {
    path: '/company/info/up',
    component: asyncComponent(() => import('container/biz/company/info/info-up'))
  }
];

export default ROUTES;
