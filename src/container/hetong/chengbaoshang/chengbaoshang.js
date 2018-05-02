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
      field: 'contentPic',
      title: '合同照片',
      type: 'img'
    }, {
      field: 'pict1',
      title: '免冠照片',
      type: 'img'
    }, {
      field: 'pict2',
      title: '手持身份证照片',
      type: 'img'
    }, {
      field: 'pict3',
      title: '身份证正反面照片',
      type: 'img'
    }, {
      field: 'remark',
      title: '备注'
    }];
    return this.props.buildList({ fields, pageCode: 631375, rowKey: 'code' });
  }
}

export default Chengbaoshang;
