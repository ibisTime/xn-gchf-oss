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
} from '@redux/hetong/wugong';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.hetongWugong,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Wugong extends React.Component {
  constructor(props) {
    super(props);
    this.projectCode = getQueryString('code', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'projectName',
      title: '工程名称'
    }, {
      field: 'staffCode',
      title: '务工人员ID'
    }, {
      field: 'staffMobile',
      title: '手机号'
    }, {
      field: 'contractDatetime',
      title: '签约时间',
      type: 'date'
    }, {
      field: 'updater',
      title: '更新人'
    }, {
      field: 'updateDatetime',
      title: '更新时间',
      type: 'datetime'
    }];
    const btnEvent = {
      add: (selectedRowKeys, selectedRows) => {
        this.props.history.push(`/hetong/wugong/addedit?projectCode=${this.projectCode}`);
      },
      edit: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/hetong/wugong/addedit?code=${selectedRowKeys[0]}&projectCode=${this.projectCode}`);
        }
      }
    };
    return this.props.buildList({ fields, btnEvent, searchParams: { projectCode: this.projectCode }, pageCode: 631405 });
  }
}

export default Wugong;
