import fetch from 'common/js/fetch';
import { SYS_USER, SYS_USER_TG } from 'common/js/config';

/**
 * 分页查询账号
 * @param start
 * @param limit
 * @param type
 */
export function getPageAccount({ start, limit, type }) {
  return fetch(802500, {
    // updater: cookies.get('userName'),
    start,
    limit,
    type
  });
}

/**
 * 列表查公司
 */
export function getCompany() {
  return fetch(631026);
}

/**
 * 列表查部门
 * @param companyCode
 */
export function getBumen(companyCode) {
  return fetch(631036, { companyCode });
}

/**
 * 删除公司
 * @param code
 */
export function deleteCompany1(code) {
  return fetch(631021, { code });
}

/**
 * 查银行
 * @param code
 */
export function getBankNameByCode() {
  return fetch(631093);
}

export function buquanxinxi(...param) {
  return fetch(631413, { ...param });
}

export function getBankCodeByName(bankName) {
  return fetch(631093, { bankName, updater: '' });
}

export function getProjectList(kind, projectCodeList) {
  return fetch(631357, { updater: '', kind, projectCodeList });
}

export function getProjectStatus() {
  return fetch(631006, { parentKey: 'project_status' });
}
/**
 * 详情查询项目
 * @param code
 */
export function getProject(code) {
  return fetch(631358, { code });
}
/**
 * 分页查询工资条
 * @param start
 * @param limit
 * @param projectCode
 */
export function getPagePayCode(start, limit, projectCode) {
  return fetch(631445, {
    start,
    limit,
    projectCode,
    month: new Date().getMonth()
  });
}
/**
 * 分页查询考勤记录
 * @param start
 * @param limit
 * @param projectCode
 */
export function getPageChecks(start, limit, projectCode) {
  return fetch(631395, {
    start,
    limit,
    projectCode
  });
}
