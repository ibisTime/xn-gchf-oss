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
import { getUserId, getUserKind } from 'common/js/util';
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
      projectCodeList: '',
      companyCode: ''
    };
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    };
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
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
      field: 'companyName',
      title: '公司名称'
    }, {
      field: 'projectName',
      title: '项目名称'
    }, {
      field: 'bankNames',
      title: '开户行',
      formatter: (v, d) => {
        return d.bankName && d.subbranch ? d.bankName + d.subbranch : '';
      }
    }, {
      field: 'bankcardNumber',
      title: '银行账户'
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      placeholder: '银行/姓名/卡号',
      search: true,
      hidden: true
    }];
    if (getUserKind() === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields,
        pageCode: 631425,
        searchParams: {
          companyCode: this.state.companyCode
        }
      }) : null;
    } else if (getUserKind() === 'S') {
      return this.state.projectCodeList ? this.props.buildList({
        fields,
        pageCode: 631425,
        searchParams: {
          projectCodeList: this.state.projectCodeList
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