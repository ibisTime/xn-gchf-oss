import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newId/bank-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
@DetailWrapper(
  state => state.newIdBankAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class BankAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.userId = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '用户名',
      field: 'loginName',
      required: true
    }, {
      title: '真实姓名',
      field: 'realName',
      required: true
    }, {
      title: '密码',
      field: 'loginPwd',
      type: 'password',
      hidden: true
    }, {
      title: '用户类型',
      field: 'type',
      value: 'B',
      hidden: true
    }, {
      field: 'bankName',
      title: '银行名称',
      type: 'select',
      listCode: '631093',
      keyName: 'bankName',
      valueName: 'bankName',
      required: true
    }, {
      title: '所属支行',
      field: 'subbranch',
      required: true
    }, {
      title: '手机号',
      field: 'mobile',
      mobile: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.userId,
      key: 'userId',
      view: this.view,
      detailCode: 631087,
      addCode: 631070
    });
  }
}

export default BankAddEdit;
