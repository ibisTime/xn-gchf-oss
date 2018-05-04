import { getUserName } from 'common/js/util';
import fetch from 'common/js/fetch';

export function downLoad(code) {
  return fetch(631446, { code });
}