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
} from '@redux/yewuManage/account';
import { listWrapper } from 'common/js/build-list';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.yewuManageAccount,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Account extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: '',
      companyCodeList: ''
    };
    if (cookies.get('loginKind') === 'S') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({ 'companyCodeList': data.companyCodeList });
      });
    }
    if (cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
      });
    }
  }
  render() {
    const fieldso = [{
      field: 'projectCode',
      title: '工程编号'
    }, {
      field: 'projectName',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        companyCode: this.state.companyCode,
        kind: 'O'
      },
      keyName: 'name',
      valueName: 'name'
    }, {
      field: 'bankName',
      title: '银行名称'
    }, {
      field: 'bankCode',
      title: '银行类别'
    }, {
      field: 'subbranch',
      title: '开户行'
    }, {
      field: 'bankcardNumber',
      title: '银行卡号'
    }, {
      field: 'status',
      title: '状态',
      key: 'account_status',
      type: 'select',
      search: true
    }, {
      field: 'createDatetime',
      title: '创建时间',
      type: 'datetime'
    }, {
      field: 'keyword',
      title: '关键字',
      search: true,
      hidden: true
    }];
    const fields = [{
      field: 'projectCode',
      title: '工程编号'
    }, {
      field: 'projectName',
      title: '工程名称'
    }, {
      field: 'bankName',
      title: '银行名称'
    }, {
      field: 'bankCode',
      title: '银行类别'
    }, {
      field: 'subbranch',
      title: '开户行'
    }, {
      field: 'bankcardNumber',
      title: '银行卡号'
    }, {
      field: 'status',
      title: '状态',
      key: 'account_status',
      type: 'select',
      search: true
    }, {
      field: 'createDatetime',
      title: '创建时间',
      type: 'datetime'
    }, {
      field: 'keyword',
      title: '关键字',
      search: true,
      hidden: true
    }];
    if (cookies.get('loginKind') === 'P') {
      return this.props.buildList({
        fields,
        pageCode: 631365,
        searchParams: {
          companyCode: ''
        }
      });
    } else if (cookies.get('loginKind') === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields,
        pageCode: 631365,
        searchParams: {
          companyCode: this.state.companyCode,
          kind: 'O'
        }
      }) : null;
    } else {
      return this.state.companyCodeList ? this.props.buildList({
        fields,
        pageCode: 631365,
        searchParams: {
          companyCodeList: this.state.companyCodeList
        }
      }) : null;
    }
  }
}

export default Account;
