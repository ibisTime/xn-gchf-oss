import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/project/wages-addedit';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.projectWagesAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectWagesAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.pCode = getQueryString('pcode', this.props.location.search);
    this.payMonth = getQueryString('mon', this.props.location.search);
    this.teamSysNo = getQueryString('team', this.props.location.search);
    this.corpCode = getQueryString('corp', this.props.location.search);
    this.corpName = getQueryString('corpn', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '工人姓名',
      field: 'workerName'
    }, {
      title: '证件号',
      field: 'idcardNumber'
    }, {
      title: '发放工资的月份',
      field: 'balanceDate',
      type: 'month'
    }, {
      title: '出勤天数',
      field: 'days'
    }, {
      title: '总工时',
      field: 'workHours'
    }, {
      title: '应发金额',
      field: 'totalPayAmount',
      amount: true
    }, {
      title: '实发金额',
      field: 'actualAmount',
      amount: true
    }, {
      title: '是否为补发',
      field: 'isBackPay',
      type: 'select',
      key: 'is_not'
    }, {
      title: '对应项目',
      field: 'projectName'
    }, {
      title: '所在企业',
      field: 'corpName'
    }, {
      title: '所在班组',
      field: 'teamName'
    }];
    return this.props.buildDetail({
      fields,
      key: 'idCardNumber',
      code: this.code,
      view: true,
      detailCode: 631921,
      beforeDetail: (params) => {
        params.pageIndex = 0;
        params.pageSize = 1;
        params.projectCode = this.pCode;
        params.payMonth = this.payMonth;
        params.teamSysNo = this.teamSysNo;
        params.corpCode = this.corpCode;
        params.corpName = this.corpName;
      }
    });
  }
}

export default ProjectWagesAddEdit;
