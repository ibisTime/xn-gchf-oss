import React from 'react';
import fetch from 'common/js/fetch';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/daifa/daifa-edit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId } from 'api/user';

@DetailWrapper(
  state => state.daifaDaifaEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class DaifaEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '员工姓名',
      field: 'staffName'
    }, {
      title: '所属月份',
      field: 'month',
      search: true
    }, {
      title: '当月天数',
      field: 'monthDays'
    }, {
      title: '请假天数',
      field: 'leavingDays'
    }, {
      title: '迟到小时数',
      field: 'delayDays'
    }, {
      title: '早退小时数',
      field: 'earlyDays'
    }, {
      title: '税费',
      field: 'tax',
      amount: true
    }, {
      title: '扣款金额',
      field: 'cutAmount1',
      amount: true
    }, {
      title: '发放奖金',
      field: 'awardAmount',
      amount: true
    }, {
      title: '发放金额',
      field: 'factAmount',
      amount: true
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631447,
      editCode: 631442
    });
  }
}

export default DaifaEdit;
