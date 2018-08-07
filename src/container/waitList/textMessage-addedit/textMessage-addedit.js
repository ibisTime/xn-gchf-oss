import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/waitList/textMessage-addedit';
import { getQueryString, showSucMsg, showWarnMsg, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankCodeByName } from 'api/project';
import {getUserDetail} from '../../../api/user';
import cookies from 'browser-cookies';

@DetailWrapper(
  state => state.waitListTextMessageAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class TextMessageAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    getUserDetail(getUserId()).then((res) => {
      this.setState({ organizationCode: res.organizationCode });
    });
  }
  render() {
    const fields = [{
      field: 'name',
      title: '通知人',
      required: true
    }, {
      field: 'mobile',
      title: '手机号',
      mobile: true,
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.state.organizationCode ? this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631517,
      addCode: 631510,
      editCode: 631512,
      beforeSubmit: (params) => {
        params.organizationCode = this.state.organizationCode;
        params.systemCode = cookies.get('loginKind');
        return params;
      }
    }) : null;
  }
}

export default TextMessageAddedit;
