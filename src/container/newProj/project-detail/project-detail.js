import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-detail';
import { getQueryString, getUserKind } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.newProjProjectDetail,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectDetail extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
    this.type = getUserKind();
  }
  render() {
    const fields = [{
      title: '累计请假人次',
      field: 'leavingDays'
    }, {
      title: '下月预计发薪金额',
      field: 'nextMonthSalary'
    }, {
      title: '备注',
      field: 'remark',
      maxlength: 250
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631358,
      addCode: 631040,
      editCode: 631042
    });
  }
}

export default ProjectDetail;
