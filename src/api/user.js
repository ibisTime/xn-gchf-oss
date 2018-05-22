import fetch from 'common/js/fetch';
import cookies from 'browser-cookies';

export function setRoleMenus(menuCodeList, roleCode, updater) {
  return fetch(631050, { menuCodeList, roleCode, updater });
}

export function rock(userId) {
  return fetch(631075, { userId });
}

export function getUserDetail(userId) {
  return fetch(631087, { userId });
}

export function getUserId() {
  return cookies.get('userId');
}

export function getUserErrorInfo(salaryCode) {
  return fetch(631456, { salaryCode });
}

export function senderrInfo(code, handleNote, handler) {
  return fetch(631450, { code, handleNote, handler });
}

export function getUserWagesInfo(code) {
  return fetch(631447, { code });
}

export function gongzirizi(code) {
  return fetch(631457, { code });
}

export function getjinduO(companyCode, projectCode) {
  return fetch(631386, { companyCode, kind: 'O', projectCode });
}

export function getjindu(companyCode, projectCode) {
  return fetch(631386, { companyCode, projectCode });
}