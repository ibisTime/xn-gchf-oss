import fetch from 'common/js/fetch';
import { getRoleCode } from 'common/js/util';
import {getUserKind} from '../common/js/util';

/**
 * 获取当前菜单拥有的按钮列表
 * @param parentKey
 */
export function getOwnerBtns(parentCode, systemCode) {
  // 627056
  return fetch(631056, {
    parentCode,
    roleCode: getRoleCode(),
    type: 2,
    updater: '',
    systemCode
  });
}

/**
 * 列表获取菜单和按钮
 */

export function getMenuBtnList(systemCode) {
  return fetch(631066, {systemCode});
}

/**
 * 根据角色列表获取菜单
 */
export function getRoleMenuList() {
  return fetch(631056, {
    type: 1,
    roleCode: getRoleCode(),
    updater: '',
    systemCode: getUserKind() === 'S' ? 'S' : 'P'
  });
}

/**
 * 根据角色列表获取菜单和按钮getRoleMenuList
 */
export function getRoleMenuBtnList(roleCode, systemCode) {
  roleCode = roleCode || getRoleCode();
  return fetch(631056, { roleCode, systemCode, updater: '' });
}
