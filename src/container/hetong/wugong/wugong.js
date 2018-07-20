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
      projectCodeList: '',
      companyCode: ''
    };
    this.projectCode = getQueryString('code', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ companyCode: data.companyCode, projectCodeList: data.projectCodeList });
      });
    };
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
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
      field: 'remark',
      title: '备注'
    }];
    if (getUserKind() === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields,
        searchParams: {
          projectCodeList: this.state.projectCodeList,
          kind: 'O'
        },
        buttons: [{
          code: 'add',
          name: '新增',
          handler: (selectedRowKeys, selectedRows) => {
            this.props.history.push(`/hetong/wugong/addedit`);
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
    } else if (getUserKind() === 'S') {
      return this.state.projectCodeList ? this.props.buildList({
        fields,
        searchParams: {
          projectCodeList: this.state.projectCodeList
        },
        buttons: [{
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
    } else {
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
