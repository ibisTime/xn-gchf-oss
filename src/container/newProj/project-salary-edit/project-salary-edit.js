import React from 'react';
import fetch from 'common/js/fetch';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-salary-edit';
import { getQueryString, showSucMsg } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import { getBankNameByCode } from 'api/project';
import { getUserId } from 'api/user';

@DetailWrapper(
  state => state.newProjProjectSalaryEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectSalaryEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '员工姓名',
      field: 'staffName',
      readonly: true
    }, {
      title: '所属月份',
      field: 'month',
      readonly: true
    }, {
      title: '当月天数',
      field: 'monthDays',
      readonly: true
    }, {
      title: '请假天数',
      field: 'leavingDays',
      readonly: true
    }, {
      title: '迟到小时',
      field: 'delayDays',
      readonly: true
    }, {
      title: '早退小时',
      field: 'earlyDays',
      readonly: true
    }, {
      title: '税费',
      field: 'tax',
      readonly: true
    }, {
      title: '发放金额',
      field: 'factAmount',
      amount: true,
      readonly: true
    }, {
      title: '奖励金额',
      field: 'awardAmount',
      amount: true,
      required: true
    }, {
      title: '扣款金额',
      field: 'cutAmount2',
      amount: true,
      required: true
    }, {
      title: '扣款说明',
      field: 'cutNote',
      required: true
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

export default ProjectSalaryEdit;
