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
} from '@redux/hetong/chengbaoshang';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.hetongChengbaoshang,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Chengbaoshang extends React.Component {
  render() {
    const fields = [{
      field: 'companyName',
      title: '所属公司',
      hidden: true
    }, {
      field: 'projectName',
      title: '所属工程'
    }, {
      field: 'bname',
      title: '承包商名称'
    }, {
      field: 'bmobile',
      title: '承包商手机号'
    }, {
      field: 'contractDatetime',
      title: '签约时间',
      type: 'date'
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      search: true,
      hidden: true,
      title: '关键字'
    }];
    return this.props.buildList({ fields, pageCode: 631375, rowKey: 'code' });
  }
}

export default Chengbaoshang;
