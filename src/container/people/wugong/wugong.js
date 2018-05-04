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
} from '@redux/people/wugong';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.peopleWugong,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class PWugong extends React.Component {
  constructor(props) {
    super(props);
    this.projectCode = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'projectCode',
      title: '项目编号',
      value: this.projectCode,
      hidden: true
    }, {
      field: 'staffCode',
      title: '员工',
      type: 'select',
      listCode: '631406',
      params: {
        projectCode: this.projectCode,
        updater: ''
      },
      keyName: 'staffCode',
      valueName: 'staffCode',
      required: true
    }, {
      field: 'type',
      title: '员工类别',
      type: 'select',
      key: 'staff_type',
      required: true
    }, {
      field: 'position',
      title: '职位',
      required: true
    }, {
      field: 'salary',
      title: '薪酬',
      required: true
    }, {
      field: 'joinDatetime',
      title: '入职时间',
      type: 'date',
      required: true
    }, {
      field: 'upUser',
      title: '上级'
    }, {
      field: 'status',
      title: '状态',
      key: 'staff_status'
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildList({
      fields,
      searchParams: { projectCode: this.projectCode, updater: '' },
      pageCode: 631465,
      rowKey: 'staffCode',
      buttons: [{
        code: 'break',
        name: '请假',
        handler: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/people/wugong/break?code1=${selectedRows[0].code}`);
          }
        }
      }, {
        code: 'leave',
        name: '离职',
        handler: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/people/wugong/leave?code1=${selectedRows[0].code}`);
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
            this.props.history.push(`/people/wugong/addedit?v=1&staffCode=${selectedRowKeys[0]}&projectCode=${this.projectCode}`);
          }
        }
      }]
    });
  }
}

export default PWugong;
