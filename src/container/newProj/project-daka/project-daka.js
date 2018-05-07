import React from 'react';
import fetch from 'common/js/fetch';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/newProj/project-daka';
import { listWrapper } from 'common/js/build-list';
import { getQueryString, showWarnMsg, showSucMsg } from 'common/js/util';
import { Modal } from 'antd';

@listWrapper(
  state => ({
    ...state.newProjProjectDaka,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Daka extends React.Component {
  constructor(props) {
    super(props);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'name',
      title: '员工',
      _keys: ['staff', 'name']
    }, {
      field: 'type',
      title: '员工类别',
      search: true,
      type: 'select',
      key: 'staff_type',
      required: true
    }, {
      field: 'position',
      title: '职位',
      required: true
    }, {
      field: 'salary',
      title: '薪酬',
      required: true
    }, {
      field: 'joinDatetime',
      title: '入职时间',
      type: 'date',
      required: true
    }, {
      field: 'upUser',
      title: '上级'
    }, {
      field: 'status',
      title: '状态',
      type: 'select',
      search: true,
      key: 'staff_status'
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      search: true,
      hidden: true
    }];
    return this.props.buildList({
      fields,
      searchParams: { projectCode: this.projectCode, updater: '', status: '0' },
      pageCode: 631465,
      rowKey: 'staffCode',
      buttons: [{
        code: 'daka',
        name: '打卡',
        handler: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            Modal.confirm({
              okText: '确认',
              cancelText: '取消',
              content: '确定打卡？',
              onOk: () => {
                this.props.doFetching();
                fetch(631390, { projectCode: this.projectCode, staffCode: selectedRowKeys[0] }).then(() => {
                  showSucMsg('操作成功');
                  this.props.cancelFetching();
                  }).catch(this.props.cancelFetching);
                  }
            });
          }
        }
      }]
    });
  }
}

export default Daka;
