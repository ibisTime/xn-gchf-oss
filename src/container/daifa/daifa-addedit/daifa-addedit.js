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
} from '@redux/daifa/daifa-addedit';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getUserKind, getUserId, getQueryString, dateTimeFormat, moneyFormat } from 'common/js/util';
import { getUserDetail } from 'api/user';
import ModalDetail from 'common/js/build-modal-detail';
import fetch from 'common/js/fetch';

@listWrapper(
  state => ({
    ...state.daifaDaifaAddEdit
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class DaifaAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      companyCode: '',
      projectCodeList: ''
    };
    this.code = getQueryString('code', this.props.location.search);
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
                      this.props.history.push(`/daifa/daifa/addedit/edit?code=${selectedRowKeys[0]}&projectCode=${this.projectCode}`);
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
              }],
              searchParams: {
                messageCode: this.code,
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
              buttons: [],
              searchParams: { messageCode: this.code },
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

export default DaifaAddEdit;
