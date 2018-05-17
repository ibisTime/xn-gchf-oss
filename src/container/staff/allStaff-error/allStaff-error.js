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
} from '@redux/staff/allStaff-error';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getQueryString } from 'common/js/util';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.staffAllStaffError,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class AllStaffError extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectCodeList: '',
      companyCode: ''
    };
    if (cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
      });
    } else if (cookies.get('loginKind') === 'S') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    }
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.staffCode = getQueryString('staffCode', this.props.location.search);
  }
  render() {
    const fieldso = [{
      field: 'code',
      title: '编号',
      hidden: true
    }, {
      field: 'projectCode',
      title: '项目编号',
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        kind: 'O',
        companyCode: this.state.companyCode,
        projectCodeList: this.state.projectCodeList
      },
      keyName: 'name',
      valueName: 'name'
    }, {
      field: 'staffCode',
      title: '务工人员',
      type: 'select',
      listCode: '631416',
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'salaryCode',
      title: '工资条编号',
      hidden: true
    }, {
      field: 'handleNote',
      title: '操作描述',
      hidden: true
    }, {
      field: 'handleName',
      title: '处理人'
    }, {
      field: 'handleDatetime',
      title: '处理时间',
      type: 'datetime'
    }, {
      field: 'remark',
      title: '备注'
    }];
    const fields = [{
      field: 'code',
      title: '编号',
      hidden: true
    }, {
      field: 'projectCode',
      title: '项目编号',
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: ''
      },
      keyName: 'name',
      valueName: 'name'
    }, {
      field: 'salaryCode',
      title: '工资条编号',
      hidden: true
    }, {
      field: 'handleNote',
      title: '操作描述',
      hidden: true
    }, {
      field: 'staffCode',
      title: '务工人员',
      type: 'select',
      listCode: '631416',
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'handleName',
      title: '处理人'
    }, {
      field: 'handleDatetime',
      title: '处理时间',
      type: 'datetime'
    }, {
      field: 'remark',
      title: '备注'
    }];
    const btnEvent = {
      error: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/error?staffCode=${selectedRowKeys[0]}`);
        }
      }
    };
    if (cookies.get('loginKind') === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields: fieldso,
        btnEvent,
        searchParams: {
          staffCode: this.staffCode,
          type: '1',
          companyCode: this.state.companyCode,
          kind: 'O',
          status: 4
        },
        buttons: [{
          code: 'detail',
          name: '详情'
        }],
        pageCode: 631455
      }) : null;
    } else if (cookies.get('loginKind') === 'S') {
      return this.state.projectCodeList ? this.props.buildList({
        fields: fieldso,
        btnEvent,
        searchParams: {
          staffCode: this.staffCode,
          type: '1',
          projectCodeList: this.state.projectCodeList,
          kind: 'S',
          status: 4
        },
        buttons: [{
          code: 'detail',
          name: '详情'
        }],
        pageCode: 631455
      }) : null;
    } else {
      return this.props.buildList({
        fields,
        btnEvent,
        searchParams: { staffCode: this.staffCode, type: '1', status: 4 },
        buttons: [{
          code: 'detail',
          name: '详情'
        }],
        pageCode: 631455
      });
    }
  }
}

export default AllStaffError;
