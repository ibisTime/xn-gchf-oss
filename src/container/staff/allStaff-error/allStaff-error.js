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
import { showWarnMsg, showSucMsg, getQueryString, getUserKind, getUserId } from 'common/js/util';
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
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.staffCode = getQueryString('staffCode', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
      });
    } else if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
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
      field: 'projectName',
      title: '工程名称'
    }, {
      title: '姓名',
      field: 'staffName'
    }, {
      field: 'month',
      title: '发放工资月份'
    }, {
      field: 'salaryCode',
      title: '工资条编号',
      hidden: true
    }, {
      field: 'factAmount',
      title: '应发工资',
      formatter: (v, data) => {
        return v / 1000;
      }
    }, {
      field: 'payAmount',
      title: '发放工资',
      formatter: (v, data) => {
        return v / 1000;
      }
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      search: true,
      key: 'salary_status'
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
      },
      detail: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          console.log(selectedRows);
          this.props.history.push(`/staff/allStafferror/addedit?v=1&code=${selectedRowKeys[0]}`);
        }
      }
    };
    if (getUserKind() === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields,
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
        pageCode: 631445
      }) : null;
    } else if (getUserKind() === 'S') {
      return this.state.projectCodeList ? this.props.buildList({
        fields,
        btnEvent,
        searchParams: {
          projectCodeList: this.state.projectCodeList,
          kind: 'S',
          statusList: [2, 4]
        },
        buttons: [{
          code: 'detail',
          name: '详情'
        }],
        pageCode: 631445
      }) : null;
    } else {
      return this.props.buildList({
        fields,
        btnEvent,
        searchParams: { staffCode: this.staffCode, type: 'P', statusList: [2, 4] },
        buttons: [{
          code: 'detail',
          name: '详情'
        }],
        pageCode: 631445
      });
    }
  }
}

export default AllStaffError;
