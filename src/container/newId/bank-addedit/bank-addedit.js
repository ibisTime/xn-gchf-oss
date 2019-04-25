import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newId/bank-addedit';
import fetch from 'common/js/fetch';
import { getQueryString, showSucMsg, showWarnMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankCodeByName } from 'api/project';
import {getUserId} from '../../../common/js/util';
@DetailWrapper(
  state => state.newIdBankAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class BankAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: '' };
    this.userId = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    let userId = getUserId();
    this.setState({ userId });
  }
  render() {
    const fields = [{
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
      field: 'a',
      title: '单位',
      type: 'line'
    }, {
      field: 'b',
      title: '管理员',
      type: 'line'
    }, {
      title: '登录名',
      field: 'loginName',
      readonly: true
    }, {
      title: '密码',
      field: 'loginPwd',
      type: 'password',
      required: true,
      hidden: this.view
    }, {
      title: '对接人真实姓名',
      field: 'realName',
      required: true
    }, {
      title: '对接人手机号',
      field: 'mobile',
      mobile: true,
      required: true
    }, {
      title: '备注',
      field: 'remark'
    }, {
      title: '用户类型',
      field: 'type',
      value: 'B',
      hidden: true
    }];
    return this.state.userId ? this.props.buildDetail({
      fields,
      code: this.userId,
      key: 'userId',
      view: this.view,
      beforeSubmit: (param) => {
        param.loginName = param.bankName + param.subbranch;
        param.userRefree = this.state.userId;
        getBankCodeByName(param.bankName).then(data => {
          param.bankCode = data[0].bankCode;
          param.bankName = data[0].bankName;
          this.props.doFetching();
          fetch(631070, param).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            setTimeout(() => {
              this.props.history.go(-1);
            }, 1000);
          }).catch(this.props.cancelFetching);
        });
      },
      detailCode: 631087,
      addCode: 631070
    }) : null;
  }
}

export default BankAddEdit;
