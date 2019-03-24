import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newId/projectmanagement-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
@DetailWrapper(
  state => state.ProjectManageMentAddedit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class OperationAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
      const fields = [{
        title: '项目名称',
        field: 'projectName',
        required: true
      }, {
        title: '账号',
        field: 'projectCode',
        required: true
      }, {
        title: '密码',
        required: true,
        field: 'password'
      }, {
        title: '秘钥',
        required: true,
        field: 'secret'
      }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631627,
      editCode: 631622,
      addCode: 631620
    });
  }
}

export default OperationAddEdit;
