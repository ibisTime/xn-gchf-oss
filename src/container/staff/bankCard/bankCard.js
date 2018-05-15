import React from 'react';
import cookies from 'browser-cookies';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/staff/bankCard';
import { listWrapper } from 'common/js/build-list';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.staffBankCard,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class BankCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCodeList: '',
      companyCode: ''
    };
  }
  componentDidMount() {
    if (cookies.get('loginKind') === 'S') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({ 'companyCodeList': data.companyCodeList });
      });
    };
    if (cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
      });
    };
  }
  render() {
    const fields = [{
      field: 'staffCode',
      title: '员工编号',
      hidden: true
    }, {
      field: 'staffName',
      title: '真实姓名'
    }, {
      field: 'bankName',
      title: '银行名称'
    }, {
      field: 'bankcardNumber',
      title: '银行卡号'
    }, {
      field: 'subbranch',
      title: '开户支行'
    }, {
      field: 'updateDatetime',
      title: '更新时间',
      type: 'datetime'
    }, {
      field: 'updater',
      title: '更新人'
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      search: true,
      hidden: true
    }];
    if (cookies.get('loginKind') === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields,
        pageCode: 631425,
        searchParams: {
          companyCode: this.state.companyCode
        }
      }) : null;
    } else if (cookies.get('loginKind') === 'S') {
      return this.state.companyCodeList ? this.props.buildList({
        fields,
        pageCode: 631425,
        searchParams: {
          companyCodeList: this.state.companyCodeList
        }
      }) : null;
    } else {
      return this.props.buildList({
        fields,
        pageCode: 631425
      });
    }
  }
}

export default BankCard;