import React from 'react';
import cookies from 'browser-cookies';
import { rock, getUserId } from 'api/user';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/security/user';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import { getUserDetail } from '../../../api/user';

@listWrapper(
  state => ({
    ...state.securityUser,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class User extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      province: '',
      city: '',
      area: ''
    };
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
      title: '用户名',
      field: 'loginName'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'user_status'
    }, {
      title: '角色',
      field: 'roleCode',
      type: 'select',
      listCode: '631046',
      keyName: 'code',
      valueName: 'name'
    }, {
      title: '手机号',
      field: 'mobile',
      mobile: true
    }, {
      title: '关键字',
      field: 'keyword',
      placeholder: '用户名/手机号',
      search: true,
      hidden: true
    }];
    const btnEvent = {
      reset: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/security/user/resetPwd?userId=${selectedRowKeys[0]}&loginName=${selectedRows[0].loginName}`);
        }
      },
      rock: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          Modal.confirm({
            okText: '确认',
            cancelText: '取消',
            content: '确定注销/激活？',
            onOk: () => {
              this.props.doFetching();
              rock(selectedRowKeys[0], getUserId()).then(() => {
                showSucMsg('操作成功');
                this.props.cancelFetching();
              }).catch(this.props.cancelFetching);
            }
          });
        }
      },
      assign: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/security/user/setRole?userId=${selectedRowKeys[0]}&loginName=${selectedRows[0].loginName}`);
        }
      },
      changeMobile: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/security/user/changeMobile?userId=${selectedRowKeys[0]}&loginName=${selectedRows[0].loginName}`);
        }
      }
    };
    if(cookies.get('loginKind') === 'P') {
      return this.props.buildList({
        fields,
        btnEvent,
        searchParams: { type: 'P', updater: '' },
        pageCode: 631085,
        rowKey: 'userId'
      });
    }else {
      return this.state.province ? this.props.buildList({
        fields,
        btnEvent,
        searchParams: {
          province: this.state.province,
          city: this.state.city,
          area: this.state.area,
          updater: ''
        },
        pageCode: 631085,
        rowKey: 'userId'
      }) : null;
    }
  }
}

export default User;
