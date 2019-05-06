import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newId/yezhu-addedit';
import {message} from 'antd';
import { getQueryString, showWarnMsg, showSucMsg, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';

@DetailWrapper(
  state => state.newIdYezhuAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class YezhuReset extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '新密码',
      field: 'newLoginPwd',
      type: 'password',
      required: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      view: this.view,
      code: this.code,
      buttons: [{
        title: '保存',
        check: true,
        type: 'primary',
        handler: (params) => {
          this.props.doFetching();
          params.userId = this.code;
          params.updater = getUserId();
          fetch(631074, params).then(() => {
            this.props.cancelFetching();
            message.success('操作成功', 1, () => {
              window.history.go(-1);
            });
          }).catch(this.props.cancelFetching);
        }
      }, {
        title: '返回',
        handler: () => {
          window.history.go(-1);
        }
      }]
    });
  }
}

export default YezhuReset;
