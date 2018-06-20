import React from 'react';
import cookies from 'browser-cookies';
import XLSX from 'xlsx';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/newProj/project-salary';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getQueryString, dateTimeFormat, moneyFormat, getUserKind, getUserId } from 'common/js/util';
import ModalDetail from 'common/js/build-modal-detail';
import fetch from 'common/js/fetch';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.newProjProjectSalary,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Salary extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      companyCode: '',
      projectCodeList: ''
    };
    this.projectCode = getQueryString('projectCode', this.props.location.search);
  }
  componentDidMount() {
    getUserDetail(getUserId()).then((data) => {
      this.setState({
        companyCode: data.companyCode,
        projectCodeList: data.projectCodeList
      });
    });
  };
  render() {
    const fields = [{
      title: '员工姓名',
      field: 'staffName'
    }, {
      field: 'upUserName',
      title: '隶属上级'
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
      title: '迟到/早退天数',
      field: 'delayDayss',
      formatter: (v, d) => {
        return d.delayDays + d.earlyDays;
      }
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
    const options = {
      fields: [{
        field: 'codeList',
        title: '编号',
        value: this.codeList,
        hidden: true
      }, {
        field: 'approveNote',
        title: '审核备注'
      }],
      buttons: [{
        title: '通过',
        check: true,
        handler: (param) => {
          param.approver = getUserId();
          param.result = '1';
          this.props.doFetching();
          fetch(631443, param).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            this.setState({ visible: false });
          }).catch(this.props.cancelFetching);
        }
      }, {
        title: '不通过',
        check: true,
        handler: (param) => {
          param.approver = getUserId();
          param.result = '0';
          this.props.doFetching();
          fetch(631443, param).then(() => {
            showSucMsg('操作成功');
            this.props.cancelFetching();
            this.setState({ visible: false });
          }).catch(this.props.cancelFetching);
        }
      }]
    };
    if (getUserKind() === 'O') {
      return this.state.companyCode ? (
        <div>
          {
            this.props.buildList({
              fields,
              singleSelect: false,
              buttons: [{
                code: 'edit',
                name: '修改',
                handler: (selectedRowKeys, selectedRows) => {
                  if (!selectedRowKeys.length) {
                    showWarnMsg('请选择记录');
                  } else if (selectedRowKeys.length > 1) {
                    showWarnMsg('请选择一条记录');
                  } else {
                    if (selectedRows[0].status === '0') {
                      this.props.history.push(`/projectManage/project/salary/edit?code=${selectedRowKeys[0]}&projectCode=${this.projectCode}`);
                    } else {
                      showWarnMsg('该状态的工资条不可修改');
                    }
                  }
                }
              }, {
                code: 'check',
                name: '审核',
                handler: (selectedRowKeys, selectedRows) => {
                  if (!selectedRowKeys.length) {
                    showWarnMsg('请选择记录');
                  } else {
                    // if (selectedRows[0].status === '0') {
                    this.codeList = selectedRowKeys;
                    this.setState({ visible: true });
                    // } else {
                    // showWarnMsg('该状态的工资条不可审核');
                    // }
                  }
                }
              }, {
                code: 'export',
                name: '导出',
                handler: (selectedRowKeys, selectedRows) => {
                  fetch(631446, {
                    projectCode: this.projectCode,
                    companyCode: this.state.companyCode,
                    kind: 'O'
                  }).then((data) => {
                    let payroll1 = [
                      ['员工姓名', '隶属上级', '所属月份', '当月天数', '请假天数', '迟到/早退小时数', '税费', '扣款金额', '发放奖金', '实际工资']
                    ];
                    let payroll2 = data.map((d, i) => {
                      return [d.staffName, d.upUserName, d.month, d.monthDays, d.leavingDays, d.earlyDays + d.delayDays, moneyFormat(d.tax), moneyFormat(d.cutAmount1), moneyFormat(d.awardAmount), moneyFormat(d.factAmount)];
                    });
                    payroll1 = payroll1.concat(payroll2);
                    const ws = XLSX.utils.aoa_to_sheet(payroll1);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
                    XLSX.writeFile(wb, 'sheetjs.xlsx');
                  }, () => { });
                }
              }],
              searchParams: {
                projectCode: this.projectCode,
                companyCode: this.state.companyCode,
                kind: 'O'
              },
              pageCode: 631445
            })
          }
          <ModalDetail
            title='审核'
            visible={this.state.visible}
            hideModal={() => this.setState({ visible: false })}
            options={options} />
        </div>
      ) : null;
    } else {
      return (
        <div>
          {
            this.state.projectCodeList ? this.props.buildList({
              fields,
              singleSelect: false,
              buttons: [{
                code: 'export',
                name: '导出',
                handler: (selectedRowKeys, selectedRows) => {
                  fetch(631446, {
                    projectCodeList: this.state.projectCodeList,
                    companyCode: this.state.companyCode
                  }).then((data) => {
                    let payroll1 = [
                      ['员工姓名', '隶属上级', '所属月份', '当月天数', '请假天数', '迟到/早退小时数', '税费', '扣款金额', '发放奖金', '实际工资']
                    ];
                    let payroll2 = data.map((d, i) => {
                      return [d.staffName, d.upUserName, d.month, d.monthDays, d.leavingDays, d.earlyDays + d.delayDays, moneyFormat(d.tax), moneyFormat(d.cutAmount1), moneyFormat(d.awardAmount), moneyFormat(d.factAmount)];
                    });
                    payroll1 = payroll1.concat(payroll2);
                    const ws = XLSX.utils.aoa_to_sheet(payroll1);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
                    XLSX.writeFile(wb, 'sheetjs.xlsx');
                  }, () => { });
                }
              }],
              searchParams: { projectCode: this.projectCode },
              pageCode: 631445
            }) : null
          }
          <ModalDetail
            title='审核'
            visible={this.state.visible}
            hideModal={() => this.setState({ visible: false })}
            options={options} />
        </div>
      );
    }
  }
}

export default Salary;
