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
} from '@redux/staff/allStaff';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.staffAllStaff,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class AllStaff extends React.Component {
  render() {
    const fields = [{
      field: 'name',
      title: '姓名'
    }, {
      field: 'place',
      title: '籍贯'
    }, {
      field: 'idType',
      title: '证件类型',
      type: 'select',
      key: 'id_type'
    }, {
      field: 'idNo',
      title: '证件号'
    }, {
      field: 'mobile',
      title: '联系方式'
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
    const btnEvent = {
      error: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/error?staffCode=${selectedRowKeys[0]}`);
        }
      },
      history: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/history?staffCode=${selectedRowKeys[0]}`);
        }
      }
    };
    return this.props.buildList({ fields, btnEvent, pageCode: 631415 });
  }
}

export default AllStaff;
