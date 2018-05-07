import React from 'react';
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

@listWrapper(
  state => ({
    ...state.staffAllStaffError,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class AllStaffError extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.staffCode = getQueryString('staffCode', this.props.location.search);
    }
  render() {
    const fields = [{
      field: 'code',
      title: '编号'
    }, {
      field: 'projectCode',
      title: '项目编号'
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
      title: '工资条编号'
    }, {
      field: 'handleNote',
      title: '操作描述'
    }, {
      field: 'handler',
      title: '处理人',
      listCode: '631086',
      type: 'select',
      search: true,
      params: {
        updater: '',
        type: 'O'
      },
      keyName: 'userId',
      valueName: 'loginName'
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
    return this.props.buildList({
      fields,
      btnEvent,
      searchParams: { staffCode: this.staffCode, type: '1' },
      buttons: [{
        code: 'detail',
        name: '详情'
        // handler: (selectedRowKeys, selectedRows) => {
        //   this.props.history.push(`/staff/allStaff/detail?code=${selectedRowKeys[0]}`);
        // }
      }],
      pageCode: 631455
    });
  }
}

export default AllStaffError;
