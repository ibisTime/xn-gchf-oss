import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newId/supervise-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import {getUserId} from '../../../common/js/util';
@DetailWrapper(
  state => state.newIdSuperviseAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class SuperviseAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: '' };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    let userId = getUserId();
    this.setState({ userId });
  }
  render() {
    const fields = [{
      field: 'a',
      title: '辖区',
      type: 'line'
    }, {
      title: '区域',
      field: 'quyu',
      type: 'citySelect',
      required: true
    }, {
      field: 'b',
      title: '管理员',
      type: 'line'
    }, {
      title: '登录名',
      field: 'loginName',
      required: true
    }, {
      title: '登录密码',
      field: 'loginPwd',
      type: 'password',
      required: true,
      hidden: this.view
    }, {
      title: '真实姓名',
      field: 'realName',
      required: true
    }, {
      title: '手机号',
      field: 'mobile',
      mobile: true,
      required: true
    }, {
      title: '备注',
      field: 'remark'
    }, {
      title: '用户类型',
      field: 'type',
      value: 'S',
      hidden: true
    }];
    return this.state.userId ? this.props.buildDetail({
      fields,
      code: this.code,
      key: 'userId',
      view: this.view,
      detailCode: 631087,
      addCode: 631070,
      beforeSubmit: (params) => {
        params.userRefree = this.state.userId;
        return params;
      }
    }) : null;
  }
}

export default SuperviseAddEdit;
