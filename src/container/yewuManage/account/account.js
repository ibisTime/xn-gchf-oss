import React from 'react';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/yewuManage/account';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.yewuManageAccount,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Account extends React.Component {
  render() {
    const fields = [{
      field: 'projectCode',
      title: '工程编号'
    }, {
      field: 'projectName',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: ''
      },
      keyName: 'name',
      valueName: 'name'
    }, {
      field: 'bankName',
      title: '银行名称'
    }, {
      field: 'bankCode',
      title: '银行类别'
    }, {
      field: 'subbranch',
      title: '开户行'
    }, {
      field: 'bankcardNumber',
      title: '银行卡号'
    }, {
      field: 'status',
      title: '状态',
      key: 'account_status',
      type: 'select',
      search: true
    }, {
      field: 'createDatetime',
      title: '创建时间',
      type: 'datetime'
    }, {
      field: 'keyword',
      title: '关键字',
      search: true,
      hidden: true
    }];
    return this.props.buildList({ fields, pageCode: 631365, rowKey: 'code' });
  }
}

export default Account;
