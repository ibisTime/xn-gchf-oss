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
      readonly: true,
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称'
    }, {
      field: 'bankNames',
      title: '银行名称账户',
      formatter: (v, d) => {
        return d.bankName + '(' + d.bankcardNumber + ')';
      }
    }, {
      field: 'subbranch',
      title: '开户行',
      required: true
    }, {
      field: 'createDatetime',
      title: '创建时间',
      type: 'datetime'
    }, {
      field: 'status',
      title: '状态',
      key: 'account_status',
      type: 'select',
      search: true,
      readonly: true
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
