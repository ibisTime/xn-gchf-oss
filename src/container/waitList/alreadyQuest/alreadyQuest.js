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
      search: true
    }, {
      title: '标题',
      field: 'title'
    }, {
      field: 'bankNames',
      title: '开户行',
      formatter: (v, d) => {
        return d.bankName + d.subbranch;
      }
    }, {
      field: 'bankcardNumber',
      title: '账户'
    }, {
      field: 'totalAmounts',
      title: '本月累计发薪',
      formatter: (v, d) => {
        return moneyFormat(d.totalAmount);
      }
    }, {
      title: '共计扣款',
      field: 'totalCutAmounts',
      formatter: (v, d) => {
        return moneyFormat(d.totalCutAmount);
      }
    }, {
      title: '共计税费',
      field: 'totalTaxs',
      formatter: (v, d) => {
        return moneyFormat(d.totalTax);
      }
    }, {
      title: '状态',
      field: 'status',
      key: 'message_status',
      type: 'select'
    }, {
      title: '请求时间',
      field: 'sendDatetime',
      type: 'datetime'
    }, {
      title: '完成时间',
      field: 'handleDatetime',
      type: 'datetime'
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
          pageCode: 631435
        })
        : null;
    } else if (getUserKind() === 'O') {
      return this.state.companyCode
        ? this.props.buildList({
          fields,
          searchParams: {
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
          status: 3,
          projectCodeList: this.state.companyCode
        },
        pageCode: 631435
      }) : null;
    } else {
      return this.props.buildList({
        fields,
        searchParams: {
          status: 3
        },
        pageCode: 631435
      });
    }
  }
}

export default AlreadyQuest;