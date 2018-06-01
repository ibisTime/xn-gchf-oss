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
} from '@redux/waitList/postRequest';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getUserId, getUserKind, moneyFormat } from 'common/js/util';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.waitListPostRequest,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class PostRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subbranch: '',
      bankName: ''
    };
  };
  componentDidMount() {
    if (getUserKind() === 'B') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({
          subbranch: data.subbranch,
          bankName: data.bankName
        });
      });
    };
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
    if (getUserKind() === 'P' || getUserKind() === 'S' || getUserKind() === 'O') {
      return this.props.buildList({
        fields,
        searchParams: {
          statusList: [1, 2]
        },
        pageCode: 631435
      });
    } else {
      return this.state.subbranch && this.state.bankName
        ? this.props.buildList({
          fields,
          searchParams: {
            statusList: [1, 2],
            subbranch: this.state.subbranch,
            bankName: this.state.bankName
          },
          pageCode: 631435
        })
        : null;
    }
  }
}

export default PostRequest;
