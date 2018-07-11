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
} from '@redux/staff/allStaff-history';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getQueryString, getUserId, getUserKind } from 'common/js/util';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.staffAllStaffHistory,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class AllStaffHistory extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: '',
      projectCodeList: ''
    };
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.staffCode = getQueryString('staffCode', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        console.log(data);
        this.setState({ 'companyCode': data.companyCode, 'updater': '' });
      });
    }
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList, 'updater': '' });
      });
    }
  }
  render() {
    const fields = [{
      field: 'code',
      title: '编号',
      hidden: true
    }, {
      field: 'projectCode',
      title: '项目编号',
      hidden: true
    }, {
      field: 'projectCode',
      title: '项目名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: ''
      },
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'joinDatetime',
      title: '入职时间',
      type: 'date'
    }, {
      field: 'leavingDatetime',
      title: '离职时间',
      type: 'date'
    }, {
      field: 'name',
      title: '姓名',
      formatter: (v, data) => {
        return data.staff ? data.staff.name : '';
      }
    }, {
      field: 'mobile',
      title: '手机号',
      formatter: (v, data) => {
        return data.staff ? data.staff.mobile : '';
      }
    }, {
      field: 'idNo',
      title: '证件号',
      formatter: (v, data) => {
        return data.staff.idNo;
      }
    }];
    const fieldso = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'projectCode',
      title: '项目编号'
    }, {
      field: 'projectCode',
      title: '项目名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        companyCode: this.state.companyCode,
        kind: 'O'
      },
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'joinDatetime',
      title: '入职时间',
      type: 'date'
    }, {
      field: 'leavingDatetime',
      title: '离职时间',
      type: 'date'
    }, {
      field: 'name',
      title: '姓名',
      formatter: (v, data) => {
        return data.staff ? data.staff.name : '';
      }
    }, {
      field: 'mobile',
      title: '手机号',
      formatter: (v, data) => {
        return data.staff ? data.staff.mobile : '';
      }
    }, {
      field: 'idType',
      title: '证件类型',
      formatter: (v, data) => {
        return data.staff ? data.staff.idType : '';
      },
      key: 'id_type'
    }, {
      field: 'idNo',
      title: '姓名',
      formatter: (v, data) => {
        return data.staff ? data.staff.idNo : '';
      }
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      search: true,
      hidden: true
    }];
    if (getUserKind() === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields,
        searchParams: {
          staffCode: this.staffCode
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
              this.props.history.push(`/staff/allStaff/history-detail?v=1&code=${selectedRowKeys[0]}`);
            }
          }
        }, {
          code: 'goBack',
          name: '返回',
          handler: () => {
            this.props.history.go(-1);
          }
        }],
        pageCode: 631465
      }) : null;
    } else if (getUserKind() === 'S') {
      return this.state.projectCodeList ? this.props.buildList({
        fields,
        searchParams: {
          staffCode: this.staffCode,
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
              this.props.history.push(`/staff/allStaff/history-detail?v=1&code=${selectedRowKeys[0]}`);
            }
          }
        }, {
          code: 'goBack',
          name: '返回',
          handler: () => {
            this.props.history.go(-1);
          }
        }],
        pageCode: 631465
      }) : null;
    } else {
      return this.props.buildList({
        fields,
        searchParams: {
          staffCode: this.staffCode
        },
        buttons: [],
        pageCode: 631465
      });
    }
  }
}

export default AllStaffHistory;
