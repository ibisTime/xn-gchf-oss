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
} from '@redux/newProj/project-leijifaxin';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.newProjProjectLeijifaxin,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Leijifaxin extends React.Component {
  constructor(props) {
    super(props);
    this.projectCode = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '项目名称',
      field: 'projectName'
    }, {
      title: '扣款金额',
      field: 'cutAmount',
      amount: true
    }, {
      title: '扣款说明',
      field: 'cutNote'
    }, {
      title: '迟到天数',
      field: 'delayDays'
    }, {
      title: '早退天数',
      field: 'earlyDays'
    }, {
      title: '请假天数',
      field: 'leavingDays'
    }, {
      title: '税费',
      field: 'tax',
      amount: true
    }, {
      title: '所属月份',
      field: 'month',
      search: true
    }, {
      title: '累计发放金额',
      field: 'totalFactAmount',
      amount: true
    }, {
      title: '关键字',
      field: 'keyword',
      search: true,
      hidden: true
    }];
    return this.props.buildList({
      fields,
      searchParams: { projectCode: this.projectCode, updater: '' },
      pageCode: 631448,
      rowKey: 'staffCode',
      buttons: []
    });
  }
}

export default Leijifaxin;
