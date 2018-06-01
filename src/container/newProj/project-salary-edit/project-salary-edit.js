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
      field: 'delayDays',
      title: '迟到天数',
      number: true,
      required: true
    }, {
      field: 'earlyDays',
      title: '早退天数',
      number: true,
      required: true
    }, {
      field: 'leavingDays',
      title: '请假天数',
      number: true,
      required: true
    }, {
      field: 'tax',
      title: '税费',
      amount: true,
      required: true
    }, {
      field: 'cutAmount',
      title: '扣款金额',
      amount: true,
      required: true
    }, {
      field: 'cutNote',
      title: '扣款说明',
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
