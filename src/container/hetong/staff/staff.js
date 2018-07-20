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
} from '@redux/hetong/staff';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.hetongStaff,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class HStaff extends React.Component {
  constructor(props) {
    super(props);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'name',
      title: '姓名',
      required: true
    }, {
      field: 'place',
      title: '籍贯',
      required: true
    }, {
      field: 'mobile',
      title: '手机号',
      mobile: true,
      required: true
    }, {
      field: 'idType',
      title: '证件类型',
      type: 'select',
      key: 'id_type',
      required: true
    }, {
      field: 'idNo',
      title: '证件号',
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }];
    const btnEvent = {
      add: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/hetong/wugong/contract?staffCode=${selectedRowKeys[0]}&projectCode=${this.projectCode}`);
        }
      }
    };
    return this.props.buildList({
        fields,
        btnEvent,
        searchParams: {
          updater: ''
        },
        pageCode: 631415,
        buttons: [{
          code: 'add',
          name: '合同录入',
          handler: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              this.props.history.push(`/hetong/wugong/contract?staffCode=${selectedRowKeys[0]}&projectCode=${this.projectCode}`);
            }
          }
        }]
      });
  }
}

export default HStaff;
