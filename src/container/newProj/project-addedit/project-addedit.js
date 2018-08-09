import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/newProj/project-addedit';
import { getQueryString, showSucMsg, getUserId, getUserKind, moneyFormat } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import fetch from 'common/js/fetch';
import { getBankNameByCode, getBankCodeByName } from 'api/project';
import { getUserDetail } from 'api/user';
import { basename } from 'upath';

@DetailWrapper(
  state => state.newprojProjectAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class ProjectAddedit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      departmentCode: '',
      bankCode: '',
      companyCode: '',
      projectCodeList: ''
    };
    this.code = getQueryString('projectCode', this.props.location.search);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then(data => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    } else {
      getUserDetail(getUserId()).then(data => {
        this.setState({ 'companyCode': data.companyCode });
      });
    }
  }
  render() {
    // 详情
    const fields = [{
      field: 'name',
      title: '项目名称'
    }, {
      field: 'chargeUser',
      title: '负责人',
      type: this.view ? '' : 'select',
      listCode: '631086',
      params: {
        companyCode: this.state.companyCode,
        type: 'O'
      },
      keyName: 'userId',
      valueName: 'loginName'
    }, {
      field: 'attendanceStarttimes',
      title: '上下班时间',
      type: 'time',
      formatter: (v, d) => {
        return d.attendanceStarttime + '--' + d.attendanceEndtime;
      }
    }, {
      field: 'code1',
      title: '开户行',
      type: this.view ? null : 'select',
      listCode: '631106',
      keyName: 'code',
      valueName: 'bankSubbranchName',
      _keys: ['projectCard', 'bankSubbranch']
    }, {
      field: 'accountName',
      title: '户名',
      _keys: ['projectCard', 'accountName']
    }, {
      field: 'bankcardNumber',
      title: '银行账户',
      _keys: ['projectCard', 'bankcardNumber']
    }, {
      field: 'leavingDays',
      title: '累计请假人次',
      _keys: ['report', 'leavingDays']
    }, {
      field: 'staffIn',
      title: '累计入职人数',
      _keys: ['report', 'staffIn']
    }, {
      field: 'staffOn',
      title: '目前在职人数',
      _keys: ['report', 'staffOn']
    }, {
      field: 'staffOut',
      title: '累计离职人数',
      _keys: ['report', 'staffOut']
    }, {
      field: 'todayDays',
      title: '今日上工人数',
      _keys: ['report', 'todayDays']
    }, {
      field: 'totalSalary',
      title: '累计发薪金额',
      _keys: ['report', 'totalSalary'],
      amount: true
    }, {
      field: 'workingDays',
      title: '累计出工人次',
      _keys: ['report', 'workingDays']
    }, {
      field: 'salaryCreateDatetimes',
      title: '工资条形成时间',
      date28: true,
      formatter: (v, d) => {
        return '每月' + d.salaryCreateDatetime + '号';
      }
    }, {
      field: 'salaryDatetimes',
      title: '薪资发放时间',
      date28: true,
      formatter: (v, d) => {
        return '每月' + d.salaryDatetime + '号';
      }
    }, {
      field: 'salaryDelayDays',
      title: '薪资发放可延迟天数',
      readonly: true
    }, {
      field: 'lastMonthSalary',
      title: '上月实际发薪金额',
      formatter: (d, v) => {
        return moneyFormat(v.report.lastMonthSalary);
      }
    }, {
      field: 'nextMonthSalary',
      title: '下月预计发薪金额',
      formatter: (d, v) => {
        return moneyFormat(v.report.nextMonthSalary);
      }
    }];
    if (getUserKind() === 'S') {
      return this.state.projectCodeList ? this.props.buildDetail({
        fields,
        key: 'code',
        code: this.projectCode,
        view: this.view,
        editCode: 631352,
        detailCode: 631358,
        addCode: 631350
      }) : null;
    } else {
      return this.props.buildDetail({
        fields,
        key: 'code',
        code: this.projectCode,
        view: this.view,
        editCode: 631352,
        detailCode: 631358,
        addCode: 631350
      });
    }
  }
}

export default ProjectAddedit;
