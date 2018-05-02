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
export function getBankNameByCode(bankCode) {
  return fetch(631093, { bankCode });
}