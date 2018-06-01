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
      companyCode: ''
    };
    this.projectCode = getQueryString('projectCode', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
      });
    }
  };
  render() {
    const fields = [{
      title: '员工姓名',
      field: 'staffName'
    }, {
      title: '所属月份',
      field: 'month',
      search: true
    }, {
      title: '应发工资',
      field: 'shouldAmount',
      amount: true
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
      title: '扣款金额',
      field: 'cutAmount',
      amount: true
    }, {
      title: '扣款说明',
      field: 'cutNote'
    }, {
      title: '实际工资',
      field: 'factAmount',
      amount: true
    }, {
      title: '发放金额',
      field: 'payAmount',
      amount: true
    }, {
      title: '最近一次发放时间',
      field: 'payDatetime',
      type: 'datetime'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'salay_status',
      search: true
    }, {
      title: '备注',
      field: 'remark'
    }];
    const options = {
      fields: [{
        field: 'codeList',
        title: '编号',
        value: this.codeList,
        hidden: true
      }, {
        field: 'approveNote',
        title: '审核备注',
        required: true
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
                  fetch(631445, {
                    projectCode: this.projectCode,
                    companyCode: this.state.companyCode,
                    kind: 'O'
                  }).then((data) => {
                    let tableData = [];
                    let title = [];
                    fields.map((item) => {
                      if (item.title !== '关键字') {
                        title.push(item.title);
                      }
                    });
                    tableData.push(title);
                    data.list.map((item) => {
                      let temp = [];
                      this.props.searchData.status.map((v) => {
                        if (v.dkey === item.status) {
                          item.status = v.dvalue;
                        }
                      });
                      temp.push(
                        item.amount ? moneyFormat(item.amount) : '',
                        item.cutAmount ? moneyFormat(item.cutAmount) : '',
                        item.cutNote,
                        item.delayDays,
                        item.earlyDays,
                        item.leavingDays,
                        item.shouldAmount ? moneyFormat(item.shouldAmount) : '',
                        item.factAmount ? moneyFormat(item.factAmount) : '',
                        item.tax ? moneyFormat(item.tax) : '',
                        item.month,
                        item.payDatetime ? dateTimeFormat(item.payDatetime) : '',
                        item.payAmount ? moneyFormat(item.payAmount) : '',
                        item.status,
                        item.remark
                      );
                      tableData.push(temp);
                    });
                    const ws = XLSX.utils.aoa_to_sheet(tableData);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
                    XLSX.writeFile(wb, 'sheetjs.xlsx');
                  });
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
            this.props.buildList({
              fields,
              singleSelect: false,
              buttons: [{
                code: 'export',
                name: '导出',
                handler: (selectedRowKeys, selectedRows) => {
                  fetch(631445, { projectCode: this.projectCode, limit: 10000, start: 1 }).then((data) => {
                    let tableData = [];
                    let title = [];
                    fields.map((item) => {
                      if (item.title !== '关键字') {
                        title.push(item.title);
                      }
                    });
                    tableData.push(title);
                    data.list.map((item) => {
                      let temp = [];
                      this.props.searchData.status.map((v) => {
                        if (v.dkey === item.status) {
                          item.status = v.dvalue;
                        }
                      });
                      temp.push(
                        item.amount !== undefined ? moneyFormat(item.amount) : '',
                        item.cutAmount !== undefined ? moneyFormat(item.cutAmount) : '',
                        item.cutNote,
                        item.delayDays !== undefined ? item.delayDays : '',
                        item.earlyDays !== undefined ? item.earlyDays : '',
                        item.leavingDays !== undefined ? item.leavingDays : '',
                        item.shouldAmount !== undefined ? moneyFormat(item.shouldAmount) : '',
                        item.factAmount !== undefined ? moneyFormat(item.factAmount) : '',
                        item.tax !== undefined ? moneyFormat(item.tax) : '',
                        item.month,
                        item.payDatetime ? dateTimeFormat(item.payDatetime) : '',
                        item.payAmount !== undefined ? moneyFormat(item.payAmount) : '',
                        item.status,
                        item.remark
                      );
                      tableData.push(temp);
                    });
                    const ws = XLSX.utils.aoa_to_sheet(tableData);
                    const wb = XLSX.utils.book_new();
                    XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
                    XLSX.writeFile(wb, 'sheetjs.xlsx');
                  });
                }
              }],
              searchParams: { projectCode: this.projectCode },
              pageCode: 631445
            })
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
