import React from 'react';
import cookies from 'browser-cookies';
import { rock } from 'api/user';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/newId/operation';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.newIdOperation,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Operation extends React.Component {
  render() {
    const fields = [{
      title: '银行别称',
      field: 'bankCode'
    }, {
      title: '银行名',
      field: 'bankName'
    }];
    return this.props.buildList({
      fields,
      pageCode: 631115
    });
  }
}

export default Operation;
