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
      title: '登录名',
      field: 'loginName',
      readonly: true
    }, {
      title: '真实姓名',
      field: 'realName',
      required: true
    }, {
      title: '密码',
      field: 'loginPwd',
      type: 'password',
      required: true,
      hidden: this.view
    }, {
      title: '用户类型',
      field: 'type',
      value: 'B',
      hidden: true
    }, {
      field: 'bankName',
      title: '银行名称',
      type: 'select',
      listCode: '631116',
      keyName: 'bankName',
      valueName: 'bankName',
      required: true,
      onChange: (val) => {
        this.props.setPageData({
          ...this.props.pageData,
          loginName: val + this.props.form.getFieldValue('subbranch')
        });
      }
    }, {
      title: '所属支行',
      field: 'subbranch',
      required: true,
      onChange: (val) => {
        this.props.setPageData({
          ...this.props.pageData,
          loginName: this.props.form.getFieldValue('bankName') + val
        });
      }
    }, {
      title: '手机号',
      field: 'mobile',
      mobile: true,
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.userId,
      key: 'userId',
      view: this.view,
      beforeSubmit: (param) => {
        param.loginName = param.subbranch + param.bankName;
        return param;
      },
      detailCode: 631087,
      addCode: 631070
    });
  }
}

export default BankAddEdit;
