import React from 'react';
import fetch from 'common/js/fetch';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/yewuManage/account-addedit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId } from 'api/user';

@DetailWrapper(
  state => state.yewuManageAccountAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class AccountAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'code',
      value: this.code,
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称',
      readonly: true
    }, {
      field: 'bankSubbranch',
      title: '开户行'
    }, {
      field: 'accountName',
      title: '户名',
      required: true
    }, {
      field: 'bankcardNumber',
      title: '银行卡号',
      required: true
    }, {
      field: 'status',
      title: '状态',
      key: 'account_status',
      type: 'select',
      search: true,
      readonly: true
    }];
    const fieldso = [{
      field: 'code',
      value: this.code,
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称',
      readonly: true
    }, {
      field: 'accountName',
      title: '户名',
      required: true
    }, {
      field: 'bankCode',
      title: '银行代号',
      required: true
    }, {
      field: 'bankName',
      title: '银行名',
      required: true
    }, {
      field: 'bankcardNumber',
      title: '银行账户',
      required: true
    }, {
      field: 'subbranch',
      title: '开户行',
      required: true
    }, {
      field: 'status',
      title: '状态',
      key: 'account_status',
      type: 'select',
      search: true,
      readonly: true
    }];
    return this.props.buildDetail({
      fields: this.view ? fields : fieldso,
      code: this.code,
      view: this.view,
      detailCode: 631367,
      editCode: 631362
    });
  }
}

export default AccountAddEdit;
