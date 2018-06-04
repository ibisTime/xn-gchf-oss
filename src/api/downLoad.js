import { getUserName } from 'common/js/util';
import fetch from 'common/js/fetch';

export function downLoad(messageCode) {
  return fetch(631446, { messageCode });
}

export function downLoadO(messageCode) {
  return fetch(631446, { messageCode });
}

// 详情页查询数据
export function detailDate(code) {
  return fetch(631437, { code });
}

export function downNum(code, backDownload, download) {
  return fetch(631431, { code, backDownload, download });
}