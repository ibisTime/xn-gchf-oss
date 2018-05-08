import React from 'react';
import fetch from 'common/js/fetch';
import XLSX from 'xlsx';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/newProj/project-kaoqin';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getQueryString, dateTimeFormat } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.newProjKaoqin,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Kaoqin extends React.Component {
  constructor(props) {
    super(props);
    this.projectCode = getQueryString('projectCode', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'projectName',
      title: '项目名称'
    }, {
      field: 'staffName',
      title: '员工姓名'
    }, {
      field: 'staffMobile',
      title: '员工手机号'
    }, {
      field: 'startDatetime',
      title: '上班时间'
    }, {
      field: 'endDatetime',
      title: '下班时间'
    }, {
      field: 'status',
      title: '出工状态',
      type: 'select',
      key: 'attendance_status'
    }, {
      field: 'settleDatetime',
      title: '结算时间',
      type: 'date'
    }, {
      field: 'createDatetime',
      title: '生成时间',
      type: 'datetime'
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyName',
      title: '关键字',
      search: true,
      hidden: true
    }];
    return this.props.buildList({
      fields,
      searchParams: { projectCode: this.projectCode },
      pageCode: 631395,
      buttons: [{
        code: 'export',
        name: '导出',
        handler: (selectedRowKeys, selectedRows) => {
          fetch(631395, { projectCode: this.projectCode, limit: 10000, start: 1 }).then((data) => {
            let tableData = [];
            let title = [];
            fields.map((item) => {
              if(item.title !== '关键字') {
                title.push(item.title);
              }
            });
            tableData.push(title);
            data.list.map((item) => {
              let temp = [];
              this.props.searchData.status.map((v) => {
                if(v.dkey === item.status) {
                  item.status = v.dvalue;
                }
              });
              temp.push(item.projectName,
                item.staffName,
                item.staffMobile,
                item.startDatetime,
                item.endDatetime,
                item.status,
                item.settleDatetime ? dateTimeFormat(item.settleDatetime) : '',
                item.createDatetime ? dateTimeFormat(item.createDatetime) : '',
                item.remark
              );
              tableData.push(temp);
            });
            const ws = XLSX.utils.aoa_to_sheet(tableData);
            const wb = XLSX.utils.book_new();
            XLSX.utils.book_append_sheet(wb, ws, 'SheetJS');
            XLSX.writeFile(wb, 'sheetjs.xlsx');
          });
        }
      }]
    });
  }
}

export default Kaoqin;
