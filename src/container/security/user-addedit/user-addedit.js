import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/user-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
@DetailWrapper(
  state => state.securityUserAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class UserAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '手机号',
      field: 'mobile',
      mobile: true,
      required: true
    }, {
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
      required: true
    }, {
      title: '用户类型',
      field: 'type',
      value: 'P',
      required: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631087,
      addCode: 631070
    });
  }
}

export default UserAddEdit;
