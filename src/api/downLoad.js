import { getUserName } from 'common/js/util';
import fetch from 'common/js/fetch';

export function downLoad(messageCode) {
  return fetch(631446, { 'messageCode': messageCode });
}