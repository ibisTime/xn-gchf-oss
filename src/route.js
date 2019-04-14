import asyncComponent from './component/async-component/async-component';

const ROUTES = [
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
    path: '/general/textParam',
    component: asyncComponent(() => import('container/general/text-param/text-param'))
  },
  {
    path: '/general/textParam/addedit',
    component: asyncComponent(() => import('container/general/text-param-addedit/text-param-addedit'))
  },
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
    path: '/staff/bank',
    component: asyncComponent(() => import('container/biz/bank/bank'))
  },
  {
    path: '/staff/bank/addedit',
    component: asyncComponent(() => import('container/biz/bank/bank-addedit'))
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
  // 业务管理 -- 项目管理-- 项目人员考勤-- 生成
  {
    path: '/project/attence/create',
    component: asyncComponent(() => import('container/biz/project/attence/attence-create'))
  },
  // 业务管理 -- 项目管理-- 项目人员工资
  {
    path: '/project/wages',
    component: asyncComponent(() => import('container/biz/project/wages/wages'))
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
  // 业务管理 -- 项目管理-- 项目基本信息
  {
    path: '/project/basic',
    component: asyncComponent(() => import('container/biz/project/basic/basic'))
  },
  // 业务管理 -- 项目管理-- 项目基本信息-- 详情
  {
    path: '/project/basic/addedit',
    component: asyncComponent(() => import('container/biz/project/basic/basic-addedit'))
  },
  // 业务管理 -- 项目管理-- 项目基本信息-- 项目配置
  {
    path: '/project/basic/config',
    component: asyncComponent(() => import('container/biz/project/basic/basic-config'))
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
  }
];

export default ROUTES;
