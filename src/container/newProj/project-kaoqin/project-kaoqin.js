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
} from '@redux/newProj/project-kaoqin';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getQueryString } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.newProjKaoqin,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Kaoqin extends React.Component {
  constructor(props) {
    super(props);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'projectName',
      title: '项目名称'
    }, {
      field: 'staffName',
      title: '员工姓名'
    }, {
      field: 'staffMobile',
      title: '员工手机号'
    }, {
      field: 'startDatetime',
      title: '上班时间'
    }, {
      field: 'endDatetime',
      title: '下班时间'
    }, {
      field: 'status',
      title: '出工状态',
      type: 'select',
      key: 'attendance_status'
    }, {
      field: 'settleDatetime',
      title: '结算时间',
      type: 'date'
    }, {
      field: 'createDatetime',
      title: '生成时间',
      type: 'datetime'
    }, {
      field: 'remark',
      title: '备注'
    }];
    const btnEvent = {
      edit: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          if(selectedRows[0].status === '0') {
            this.props.history.push(`/newProj/project/edit?code=${selectedRowKeys[0]}`);
          }else {
            showWarnMsg('该状态无法进行审核');
          }
        }
      },
      check: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          if(selectedRows[0].status === '1') {
            this.props.history.push(`/newProj/project/check?v=1&code=${selectedRows[0].code}`);
          }else {
            showWarnMsg('该状态无法进行审核');
          }
        }
      },
      endProject: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          if(selectedRows[0].status !== '3') {
            this.props.history.push(`/newProj/project/end?v=1&code=${selectedRows[0].code}`);
          }else {
            showWarnMsg('该项目已结束');
          }
        }
      }
    };
    return this.props.buildList({ fields, btnEvent, searchParams: { projectCode: this.projectCode }, pageCode: 631395, rowKey: 'code' });
  }
}

export default Kaoqin;
