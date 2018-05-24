import React from 'react';
import cookies from 'browser-cookies';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/hetong/wugong';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, showWarnMsg, showSucMsg, getUserKind, getUserId } from 'common/js/util';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.hetongWugong,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Wugong extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: ''
    };
    this.projectCode = getQueryString('code', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
      });
    };
  }
  render() {
    const fields = [{
      field: 'projectCode',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        companyCode: this.state.companyCode,
        kind: 'O',
        updater: ''
      },
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'staffName',
      title: '工人姓名'
    }, {
      field: 'staffMobile',
      title: '手机号'
    }, {
      field: 'contractDatetime',
      title: '签约时间',
      type: 'date'
    }, {
      field: 'updateName',
      title: '更新人'
    }, {
      field: 'updateDatetime',
      title: '更新时间',
      type: 'datetime'
    }];
    if (getUserKind() === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields,
        searchParams: {
          companyCode: this.state.companyCode,
          kind: 'O'
        },
        buttons: [{
          code: 'add',
          name: '合同录入',
          handler: (selectedRowKeys, selectedRows) => {
            this.props.history.push(`/hetong/staff/addedit`);
          }
        }, {
          code: 'edit',
          name: '修改',
          handler: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/hetong/wugong/edit?code=${selectedRowKeys[0]}`);
            }
          }
        }, {
          code: 'detail',
          name: '详情',
          handler: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/hetong/wugong/edit?v=1&code=${selectedRowKeys[0]}`);
            }
          }
        }],
        pageCode: 631405
      }) : null;
    }else {
      return this.props.buildList({
        fields,
        buttons: [{
          code: 'edit',
          name: '修改',
          handler: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/hetong/wugong/edit?code=${selectedRowKeys[0]}`);
            }
          }
        }, {
          code: 'detail',
          name: '详情',
          handler: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/hetong/wugong/edit?v=1&code=${selectedRowKeys[0]}`);
            }
          }
        }],
        pageCode: 631405
      });
    }
  }
}

export default Wugong;
