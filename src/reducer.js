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
import { waitListPostReauestAddEdit } from './redux/waitList/postRequest-addedit';
import { waitListAlreadyQuest } from './redux/waitList/alreadyQuest';
import { waitListAlreadyQuestAddedit } from './redux/waitList/alreadyQuest-addedit';
import { generalTextParam } from './redux/general/text-param';
import { generalTextParamAddEdit } from './redux/general/text-param-addedit';
import { financeAccount } from './redux/finance/account';
import { financeLedger } from './redux/finance/ledger';
import { dailiManageMap } from './redux/dailiManage/map';
import { financeLedgerAddEdit } from '@redux/finance/ledger-addedit';
import { financePlatformLedger } from '@redux/finance/platform-ledger';
import { financeDistAddr } from '@redux/finance/dist-addr';
import { financeDistAddrLedger } from '@redux/finance/dist-addr-ledger';
import { newProjCompanyConstruct } from './redux/newProj/companyConstruct';
import { newProjBumenConstruct } from './redux/newProj/bumenConstruct';
import { newProjAddCompany } from './redux/newProj/addCompany';
import { newProjAddBumen } from './redux/newProj/addBumen';
import { newProjProject } from './redux/newProj/project';
import { newprojProjectAddEdit } from './redux/newProj/project-addedit';
import { newprojProjectEdit } from './redux/newProj/project-edit';
import { newprojProjectCheck } from './redux/newProj/project-check';
import { yewuManageAccount } from './redux/yewuManage/account';
import { yewuManageAccountAddEdit } from './redux/yewuManage/account-addedit';

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
  waitListAlreadyQuest,
  waitListPostReauestAddEdit,
  waitListAlreadyQuestAddedit,
  generalTextParam,
  generalTextParamAddEdit,
  financeAccount,
  financeLedger,
  financeLedgerAddEdit,
  financePlatformLedger,
  financeDistAddr,
  financeDistAddrLedger,
  newProjCompanyConstruct,
  newProjBumenConstruct,
  newProjAddCompany,
  newProjAddBumen,
  newProjProject,
  newprojProjectAddEdit,
  newprojProjectEdit,
  newprojProjectCheck,
  yewuManageAccount,
  yewuManageAccountAddEdit,
  securityUserSetBumen
});
