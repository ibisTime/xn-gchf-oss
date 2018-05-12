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
      companyCodeList: ''
    };
  };
  componentDidMount() {
    getUserDetail(cookies.get('userId')).then((data) => {
      this.setState({
        subbranch: data.subbranch,
        bankName: data.bankName,
        companyCodeList: data.companyCodeList
      });
      console.log(data);
    });
  }
  render() {
    const fields = [{
      title: '请求时间',
      field: 'sendDatetime',
      type: 'datetime'
    }, {
      title: '发件人',
      field: 'sendName',
      search: true
    }, {
      title: '标题',
      field: 'title'
    }, {
      title: '状态',
      field: 'status',
      key: 'message_status',
      type: 'select'
    }, {
      title: '完成时间',
      field: 'handleDatetime',
      type: 'datetime'
    }];
    if (cookies.get('loginKind') === 'B') {
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
    } else if (cookies.get('loginKind') === 'S') {
      return this.state.companyCodeList
        ? this.props.buildList({
          fields,
          searchParams: {
            companyCodeList: this.state.companyCodeList
          },
          pageCode: 631435
        })
        : null;
    } else {
      this.props.buildList({
        fields,
        pageCode: 631435
      });
    }
  }
}

export default AlreadyQuest;