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
} from '@redux/security/menu';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.securityMenu,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class SysParam extends React.Component {
  render() {
    const fields = [{
      field: 'remark',
      title: '参数名'
    }, {
      field: 'cvalue',
      title: '参数值'
    }, {
      field: 'updateDatetime',
      title: '最近修改时间',
      type: 'datetime'
    }];
    return this.props.buildList({ fields, pageCode: 631015, rowKey: 'id' });
  }
}

export default SysParam;
