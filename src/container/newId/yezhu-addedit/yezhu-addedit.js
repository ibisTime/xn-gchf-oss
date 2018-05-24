import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newId/yezhu-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
@DetailWrapper(
  state => state.newIdYezhuAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class YezhuAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '登陆名',
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
      required: true,
      hidden: this.view
    }, {
      title: '用户类型',
      field: 'type',
      value: 'O',
      hidden: true
    }, {
      title: '公司',
      field: 'companyCode',
      type: 'select',
      listCode: '631026',
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      title: '手机号',
      field: 'mobile',
      mobile: true,
      required: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      key: 'userId',
      view: this.view,
      detailCode: 631087,
      addCode: 631070
    });
  }
}

export default YezhuAddEdit;
