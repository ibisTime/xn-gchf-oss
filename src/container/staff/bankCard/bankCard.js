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
} from '@redux/staff/bankCard';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.staffBankCard,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class BankCard extends React.Component {
  render() {
    const fields = [{
      field: 'staffCode',
      title: '员工编号'
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
    }];
    return this.props.buildList({ fields, pageCode: 631425 });
  }
}

export default BankCard;
