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
      field: 'projectCode',
      title: '工程编号',
      readonly: true
    }, {
      field: 'bankCode',
      title: '银行名称',
      type: 'select',
      listCode: '631093',
      keyName: 'bankCode',
      valueName: 'bankName',
      required: true
    }, {
      field: 'subbranch',
      title: '开户行',
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
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631367,
      editCode: 631362,
      beforeSubmit: (param) => {
        param.bankName = this.props.selectData.bankCode.filter(v => v.bankCode === param.bankCode)[0].bankName;
        return param;
      }
    });
  }
}

export default AccountAddEdit;
