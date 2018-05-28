import { combineReducers } from 'redux';
import { user } from './redux/user';
import { menu } from './redux/menu';
import { modalDetail } from './redux/modal/build-modal-detail';
import { securityRole } from './redux/security/role';
import { securityRoleAddEdit } from './redux/security/role-addedit';
import { securityMenu } from './redux/security/menu';
import { securityMenuAddEdit } from './redux/security/menu-addedit';
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
import { waitListPostRequest } from './redux/waitList/postRequest';
import { waitListAlreadyQuest } from './redux/waitList/alreadyQuest';
import { waitListAlreadyQuestAddedit } from './redux/waitList/alreadyQuest-addedit';
import { generalTextParam } from './redux/general/text-param';
import { generalTextParamAddEdit } from './redux/general/text-param-addedit';
import { dailiManageMap } from './redux/dailiManage/map';
import { newProjCompanyConstruct } from './redux/newProj/companyConstruct';
import { newProjBumenConstruct } from './redux/newProj/bumenConstruct';
import { newProjAddCompany } from './redux/newProj/addCompany';
import { newProjAddBumen } from './redux/newProj/addBumen';
import { newProjProject } from './redux/newProj/project';
import { newprojProjectAddEdit } from './redux/newProj/project-addedit';
import { newProjProjectDetail } from './redux/newProj/project-detail';
import { newprojProjectEdit } from './redux/newProj/project-edit';
import { newProjProjectDaka } from './redux/newProj/project-daka';
import { newprojProjectCheck } from './redux/newProj/project-check';
import { newprojProjectEnd } from './redux/newProj/project-end';
import { newprojProjectStop } from './redux/newProj/project-stop';
import { newProjProjectLeijifaxin } from './redux/newProj/project-leijifaxin';
import { newProjProjectSalary } from './redux/newProj/project-salary';
import { newProjProjectSalaryEdit } from './redux/newProj/project-salary-edit';
import { newProjProjectSalaryCheck } from './redux/newProj/project-salary-check';
import { newProjKaoqin } from './redux/newProj/project-kaoqin';
import { newProjProjectWeekday } from './redux/newProj/project-weekday';
import { newProjProjectQuit } from './redux/newProj/project-quit';
import { yewuManageAccount } from './redux/yewuManage/account';
import { yewuManageAccountAddEdit } from './redux/yewuManage/account-addedit';
import { hetongChengbaoshang } from './redux/hetong/chengbaoshang';
import { hetongChengbaoshangAddEdit } from './redux/hetong/chengbaoshang-addedit';
import { hetongJindu } from './redux/hetong/jindu';
import { hetongJinduAddEdit } from './redux/hetong/jindu-addedit';
import { hetongWugong } from './redux/hetong/wugong';
import { hetongWugongAddEdit } from './redux/hetong/wugong-addedit';
import { hetongWugongEdit } from './redux/hetong/wugong-edit';
import { hetongStaff } from './redux/hetong/staff';
import { peopleWugong } from './redux/people/wugong';
import { peopleWugongAddEdit } from './redux/people/wugong-addedit';
import { peopleWugongBreak } from './redux/people/wugong-break';
import { peopleWugongLeave } from './redux/people/wugong-leave';
import { peopleHistory } from './redux/people/history';
import { staffAllStaff } from './redux/staff/allStaff';
import { staffAllStaffAddEdit } from './redux/staff/allStaff-addedit';
import { staffAllStaffAddEditAdd } from './redux/staff/allStaff-addeditAdd';
import { staffAllStaffError } from './redux/staff/allStaff-error';
import { staffAllStaffErrHistory } from './redux/staff/allStaff-errHistory';
import { staffAllStaffErrorEdit } from './redux/staff/allStaff-errorEdit';
import { staffAllStaffHistory } from './redux/staff/allStaff-history';
import { staffAllStaffDetail } from './redux/staff/allStaff-detail';
import { staffAllStaffErrorAddEdit } from './redux/staff/allStaff-errorAddedit';
import { staffAllStaffWages } from './redux/staff/allStaff-wages';
import { staffBankCard } from './redux/staff/bankCard';
import { staffBankCardAddEdit } from './redux/staff/bankCard-addedit';
import { staffBaogong } from './redux/staff/baogong';
import { daifaDaifa } from './redux/daifa/daifa';
import { mapMap } from './redux/map/map';
import { daifaDaifaAddEdit } from './redux/daifa/daifa-addedit';
import { newIdBank } from './redux/newId/bank';
import { newIdOperation } from './redux/newId/operation';
import { newIdOperationAddEdit } from './redux/newId/operation-addedit';
import { newIdBankAddEdit } from './redux/newId/bank-addedit';
import { newIdYezhu } from './redux/newId/yezhu';
import { newIdYezhuAddEdit } from './redux/newId/yezhu-addedit';
import { newIdSupervise } from './redux/newId/supervise';
import { newIdSuperviseAddEdit } from './redux/newId/supervise-addedit';

export default combineReducers({
  user,
  menu,
  modalDetail,
  securityRole,
  securityRoleAddEdit,
  securityMenu,
  securityMenuAddEdit,
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
  waitListPostRequest,
  mapMap,
  waitListAlreadyQuest,
  waitListAlreadyQuestAddedit,
  generalTextParam,
  generalTextParamAddEdit,
  newProjCompanyConstruct,
  newProjBumenConstruct,
  newProjAddCompany,
  newProjAddBumen,
  newProjProject,
  newprojProjectAddEdit,
  newProjProjectDetail,
  newprojProjectEdit,
  newProjProjectDaka,
  newprojProjectCheck,
  newprojProjectEnd,
  newprojProjectStop,
  newProjProjectWeekday,
  newProjProjectQuit,
  newProjProjectLeijifaxin,
  newProjProjectSalary,
  newProjProjectSalaryEdit,
  newProjProjectSalaryCheck,
  newProjKaoqin,
  yewuManageAccount,
  yewuManageAccountAddEdit,
  hetongChengbaoshang,
  hetongChengbaoshangAddEdit,
  hetongJindu,
  hetongJinduAddEdit,
  hetongWugong,
  hetongWugongAddEdit,
  hetongWugongEdit,
  hetongStaff,
  peopleWugong,
  peopleWugongAddEdit,
  peopleWugongBreak,
  peopleWugongLeave,
  peopleHistory,
  staffAllStaff,
  staffAllStaffAddEdit,
  staffAllStaffAddEditAdd,
  staffAllStaffError,
  staffAllStaffErrHistory,
  staffAllStaffErrorEdit,
  staffAllStaffHistory,
  staffAllStaffDetail,
  staffBaogong,
  staffBankCard,
  staffBankCardAddEdit,
  staffAllStaffWages,
  staffAllStaffErrorAddEdit,
  daifaDaifa,
  daifaDaifaAddEdit,
  newIdBank,
  newIdOperation,
  newIdOperationAddEdit,
  newIdBankAddEdit,
  newIdYezhu,
  newIdYezhuAddEdit,
  newIdSupervise,
  newIdSuperviseAddEdit
});
