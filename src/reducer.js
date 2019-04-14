import { combineReducers } from 'redux';
import { user } from './redux/user';
import { menu } from './redux/menu';
import { modalDetail } from './redux/modal/build-modal-detail';
import { securityRole } from './redux/security/role';
import { securityRoleAddEdit } from './redux/security/role-addedit';
import { securityMenu } from './redux/security/menu';
import { securityMenuAddEdit } from './redux/security/menu-addedit';
import { securityHelp } from './redux/security/help';
import { securityHelpAddEdit } from './redux/security/help-addedit';
import { securityUser } from './redux/security/user';
import { securityUserAddEdit } from './redux/security/user-addedit';
import { securityUserResetPwd } from './redux/security/user-resetPwd';
import { securityUserSetRole } from './redux/security/user-setRole';
import { securityUserSetBumen } from './redux/security/user-setBumen';
import { securityUserChangeMobile } from './redux/security/user-changeMobile';
import { securitySysParam } from './redux/security/sysParam';
import { securitySysparamAddEdit } from './redux/security/sysParam-addedit';
import { securityDict } from './redux/security/dict';
import { securityDictAddEdit } from './redux/security/dict-addedit';
import { publicBanner } from './redux/public/banner';
import { publicBannerAddEdit } from './redux/public/banner-addedit';
import { publicAboutusAddEdit } from './redux/public/aboutus-addedit';
import { publicTimeAddEdit } from './redux/public/time-addedit';
import { generalTextParam } from './redux/general/text-param';
import { generalTextParamAddEdit } from './redux/general/text-param-addedit';
import { staffAllStaff } from './redux/staff/allStaff';
import { staffAllStaffAddEdit } from './redux/staff/allStaff-addedit';
import { newIdBank } from './redux/newId/bank';
import { newIdOperation } from './redux/newId/operation';
import { newIdOperationAddEdit } from './redux/newId/operation-addedit';
import { newIdBankAddEdit } from './redux/newId/bank-addedit';
import { newIdYezhu } from './redux/newId/yezhu';
import { newIdYezhuAddEdit } from './redux/newId/yezhu-addedit';
import { newIdSupervise } from './redux/newId/supervise';
import { newIdSuperviseAddEdit } from './redux/newId/supervise-addedit';
import { jiandangStep2 } from './redux/staff/jiandang-step2';
import { jiandangStep3 } from './redux/staff/jiandang-step3';
import { bizBank } from './redux/biz/bank';
// 开设账号 -- 业主单位--项目管理
import { projectParticipating } from './redux/biz/project/participating';
import { projectClass } from './redux/biz/project/class';
import { projectMember } from './redux/biz/project/member';
import { projectInout } from './redux/biz/project/inout';
import { projectMemContract } from './redux/biz/project/memcontract';
import { projectAttence } from './redux/biz/project/attence';
import { projectWages } from './redux/biz/project/wages';
import { projectBasic } from './redux/biz/project/basic';
import { companyInfo } from './redux/biz/company/info';

export default combineReducers({
  user,
  menu,
  modalDetail,
  securityRole,
  securityRoleAddEdit,
  securityMenu,
  securityMenuAddEdit,
  securityHelp,
  securityHelpAddEdit,
  securityUser,
  securityUserAddEdit,
  securityUserSetRole,
  securityUserSetBumen,
  securityUserResetPwd,
  securityUserChangeMobile,
  securitySysParam,
  securitySysparamAddEdit,
  securityDict,
  securityDictAddEdit,
  publicBanner,
  publicBannerAddEdit,
  publicAboutusAddEdit,
  publicTimeAddEdit,
  generalTextParam,
  generalTextParamAddEdit,
  staffAllStaff,
  staffAllStaffAddEdit,
  newIdBank,
  newIdOperation,
  newIdOperationAddEdit,
  newIdBankAddEdit,
  newIdYezhu,
  newIdYezhuAddEdit,
  newIdSupervise,
  newIdSuperviseAddEdit,
  jiandangStep2,
  jiandangStep3,
  bizBank,
  projectParticipating,
  projectClass,
  projectMember,
  projectInout,
  projectMemContract,
  projectAttence,
  projectWages,
  projectBasic,
  companyInfo
});
