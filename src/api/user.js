import fetch from 'common/js/fetch';
import cookies from 'browser-cookies';

export function setRoleMenus(menuCodeList, roleCode, updater) {
  return fetch(631050, { menuCodeList, roleCode, updater });
}

export function rock(userId, updater) {
  return fetch(631075, { userId, updater });
}

export function getUserDetail(userId) {
  return fetch(631087, { userId });
}

export function getUserId() {
  return cookies.get('userId');
}

export function getjinduList(projectCodeList, companyCode, kind) {
  return fetch(631357, { projectCodeList, companyCode, kind: 'O' });
}

export function getUserErrorInfo(salaryCode) {
  return fetch(631456, { salaryCode });
}

export function query(idNo, projectCodeList) {
  return fetch(631418, { idNo, projectCodeList });
}

export function query1(idNo) {
  return fetch(631418, { idNo });
}

export function senderrInfo(salaryCode, handleNote, handler) {
  return fetch(631450, { salaryCode, handleNote, handler });
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

export function jiandang(birthday,
  idAddress,
  idEndDate,
  idNation,
  idNo,
  idPic,
  idPolice,
  idStartDate,
  realName,
  sex,
  updater) {
  return fetch(631410, { birthday,
    idAddress,
    idEndDate,
    idNation,
    idNo,
    idPic,
    idPolice,
    idStartDate,
    realName,
    sex,
    updater });
}