import React from 'react';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/user-setBumen';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getUserDetail } from 'api/user';

@DetailWrapper(
  state => state.securityUserSetBumen,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class UserSetBummen extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('userId', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  // componentDidMount() {
  //   getUserDetail(cookies.get('userId')).then(data => {
  //     this.companyCode = data.companyCode;
  //   });
  // }
  render() {
    const fields = [{
      title: '用户名',
      field: 'loginName',
      required: true
    }, {
      title: '公司',
      field: 'companyCode',
      type: 'select',
      listCode: '631026',
      onChange: (val) => {
        this.companyCode = val;
        this.props.getSelectData({
          field: 'departmentCode',
          listCode: 631036,
          params: {
            companyCode: val
          }
        });
      },
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      title: '部门',
      field: 'departmentCode',
      type: 'select',
      keyName: 'code',
      valueName: 'name',
      required: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildDetail({
      fields,
      key: 'userId',
      code: this.code,
      view: this.view,
      detailCode: 631087,
      editCode: 631077
    });
  }
}

export default UserSetBummen;
