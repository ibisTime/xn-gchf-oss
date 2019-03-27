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
  // return fetch(631907, {
  //   projectCode,
  //   pageIndex: 0,
  //   pageSize: 1
  // });
  return Promise.resolve({
    'pageNO': 1,
    'start': 0,
    'pageSize': 10,
    'totalCount': 1,
    'totalPage': 1,
    'list': [
      {
        'projectCode': '33112220190310002',
        'corpCode': '913311001484116584',
        'corpName': '正达建设有限公司',
        'corpType': '009',
        'entryTime': 'Aug 22, 2018 12:13:14 PM',
        'exitTime': 'Aug 31, 2018 5:16:17 AM',
        'pmName': '',
        'pmIDCardType': '',
        'pmIDCardNumber': '',
        'pmPhone': ''
      }
    ]
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
