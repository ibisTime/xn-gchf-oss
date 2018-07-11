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
} from '@redux/waitList/alreadyQuest';
import { listWrapper } from 'common/js/build-list';
import { getUserDetail } from 'api/user';
import cookies from 'browser-cookies';
import { getUserKind, getUserId, moneyFormat } from 'common/js/util';
require('./alreadyQuest.css');

@listWrapper(
  state => ({
    ...state.waitListAlreadyQuest,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class AlreadyQuest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subbranch: '',
      bankName: '',
      projectCodeList: '',
      companyCode: ''
    };
    this.userKind = getUserKind();
  };
  componentDidMount() {
    getUserDetail(getUserId()).then((data) => {
      this.setState({
        subbranch: data.subbranch,
        bankName: data.bankName,
        projectCodeList: data.projectCodeList,
        companyCode: data.companyCode
      });
      console.log(data);
    });
  }
  render() {
    const fields = [{
      title: '发件人',
      field: 'sendName',
      className: this.userKind === 'B' ? 'haha' : ''
    }, {
      title: '标题',
      field: 'title',
      className: this.userKind === 'B' ? 'haha' : ''
    }, {
      field: 'bankNames',
      title: '开户行',
      formatter: (v, d) => {
        return d.bankName + d.subbranch;
      },
      className: this.userKind === 'B' ? 'haha' : ''
    }, {
      field: 'bankcardNumber',
      title: '账户',
      className: this.userKind === 'B' ? 'haha' : ''
    }, {
      field: 'totalAmounts',
      title: '本月累计发薪',
      formatter: (v, d) => {
        return moneyFormat(d.totalAmount);
      },
      className: this.userKind === 'B' ? 'haha' : ''
    }, {
      title: '共计税费',
      field: 'totalTaxs',
      formatter: (v, d) => {
        return moneyFormat(d.totalTax);
      },
      className: this.userKind === 'B' ? 'haha' : ''
    }, {
      title: '状态',
      field: 'status',
      key: 'message_status',
      type: 'select',
      className: this.userKind === 'B' ? 'haha' : ''
    }, {
      title: '请求时间',
      field: 'sendDatetime',
      type: 'datetime',
      className: this.userKind === 'B' ? 'haha' : ''
    }, {
      title: '完成时间',
      field: 'handleDatetime',
      type: 'datetime',
      className: this.userKind === 'B' ? 'haha' : ''
    }];
    if (getUserKind() === 'B') {
      return this.state.subbranch && this.state.bankName
        ? this.props.buildList({
          fields,
          searchParams: {
            status: 3,
            subbranch: this.state.subbranch,
            bankName: this.state.bankName
          },
          pageCode: 631435,
          className: 'tableClass'
        })
        : null;
    } else if (getUserKind() === 'O') {
      return this.state.companyCode
        ? this.props.buildList({
          fields,
          searchParams: {
            statusList: ['1', '2', '3'],
            companyCode: this.state.companyCode,
            kind: 'O'
          },
          pageCode: 631435
        })
        : null;
    } else if (getUserKind() === 'S') {
      return this.state.projectCodeList ? this.props.buildList({
        fields,
        searchParams: {
          statusList: ['1', '2', '3'],
          projectCodeList: this.state.companyCode
        },
        pageCode: 631435
      }) : null;
    } else {
      return this.props.buildList({
        fields,
        searchParams: {
          statusList: ['1', '2', '3']
        },
        pageCode: 631435
      });
    }
  }
}

export default AlreadyQuest;