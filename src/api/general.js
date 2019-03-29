import fetch from 'common/js/fetch';

// 加载七牛token 805951
export function getQiniuToken() {
  return fetch(631091, {});
}

// 列表查操作指南 631126
export function getHelpList(info) {
  return fetch(631126, {
    orderColumn: info.orderColumn || '',
    orderDir: info.orderDir || '',
    systemCode: info.kind
  });
}

// 获取项目列表
export function getProjectList() {
  return fetch(631626);
}

// 获取参建单位列表
export function getParticipatingList(projectCode) {
  return fetch(631907, {
    projectCode,
    pageIndex: 0,
    pageSize: 1
  });
}

// 获取公司信息列表
export function getCompanyList() {
  return fetch(631255, {
    start: 1,
    limit: 1,
    uploadStatus: 2
  });
}

// 获取班组列表
export function getClassList(projectCode, corpCode) {
  return fetch(631910, {
    projectCode,
    corpCode,
    pageIndex: 0,
    pageSize: 1
  });
}
