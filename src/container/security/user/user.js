import React from 'react';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/security/user';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.securityUser,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class User extends React.Component {
  render() {
    const fields = [{
      title: '用户名',
      field: 'loginName',
      search: true,
      render: (v) => v + '1'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'user_status'
    }, {
      title: '角色',
      field: 'roleCode',
      type: 'select',
      listCode: '627046',
      keyName: 'code',
      valueName: 'name',
      search: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    const btnEvent = {
      reset: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/security/user/resetPwd?userId=${selectedRowKeys[0]}&loginName=${selectedRows[0].loginName}`);
        }
      },
      rock: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: '确定注销/激活？',
            onOk: () => {
              this.props.doFetching();
              return fetch(627303, { userId: selectedRowKeys[0] }).then(() => {
                showSucMsg('操作成功');
                this.props.cancelFetching();
              }).catch(this.props.cancelFetching);
            }
          });
        }
      }
    };
    return this.props.buildList({ fields, btnEvent, pageCode: 627355, searchParams: { kind: 'P' }, rowKey: 'userId' });
  }
}

export default User;
