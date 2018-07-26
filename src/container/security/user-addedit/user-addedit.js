import React from 'react';
import cookies from 'browser-cookies';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/security/user-addedit';
import { getQueryString, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import {getUserDetail} from '../../../api/user';
@DetailWrapper(
  state => state.securityUserAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class UserAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      province: '',
      city: '',
      area: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    if(cookies.get('loginKind') === 'S') {
      getUserDetail(getUserId()).then((res) => {
        this.setState({ province: res.province, city: res.city, area: res.area });
      });
    }
  }
  render() {
    const fields = [{
      title: '角色',
      field: 'roleCode',
      type: 'select',
      listCode: '631046',
      params: {
        updater: getUserId()
      },
      keyName: 'code',
      valueName: 'name',
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
      value: cookies.get('loginKind') === 'S' ? 'S' : 'P',
      hidden: true,
      required: true
    }, {
      title: '手机号',
      field: 'mobile',
      mobile: true,
      required: true
    }];
    if(cookies.get('loginKind') === 'S') {
      return this.state.province ? this.props.buildDetail({
        fields,
        addCode: 631070,
        beforeSubmit: (params) => {
          params.province = this.state.province;
          params.city = this.state.city;
          params.area = this.state.area;
          params.userRefree = getUserId();
          return params;
        }
      }) : null;
    }else {
      return this.props.buildDetail({
        fields,
        addCode: 631070,
        beforeSubmit: (params) => {
          params.userRefree = getUserId();
          return params;
        }
      });
    }
  }
}

export default UserAddEdit;
