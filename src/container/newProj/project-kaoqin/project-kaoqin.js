import React from 'react';
import fetch from 'common/js/fetch';
import { Modal } from 'antd';
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
import { showWarnMsg, showSucMsg, getQueryString, dateTimeFormat, getUserId, getUserKind } from 'common/js/util';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.newProjProjectKaoqin,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class ProjectKaoqin extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      projectCodeList: '',
      companyCode: ''
    };
    this.code = getQueryString('code', this.props.location.search);
  }
  componentDidMount() {
    if (getUserKind() === 'S' || getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        console.log(data);
        this.setState({ 'projectCodeList': data.projectCodeList, companyCode: data.companyCode });
      });
    };
  }
  render() {
    const fields = [{
      field: 'projectName',
      title: '工程名称'
    }, {
      field: 'staffName',
      title: '员工姓名'
    }, {
      field: 'staffMobile',
      title: '员工手机号'
    }, {
      field: 'startDatetime',
      title: '上班时间',
      type: 'datetime'
    }, {
      field: 'endDatetime',
      title: '下班时间',
      type: 'datetime'
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
      title: '考勤生成时间',
      type: 'datetime'
    }, {
      field: 'dateStart',
      title: '开始时间',
      search: true,
      type: 'datetime',
      hidden: true
    }, {
      field: 'dateEnd',
      title: '结束时间',
      search: true,
      type: 'datetime',
      hidden: true
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      placeholder: '姓名',
      search: true,
      hidden: true
    }];
    const fieldso = [{
      field: 'projectName',
      title: '工程名称'
    }, {
      field: 'staffName',
      title: '员工姓名'
    }, {
      field: 'staffMobile',
      title: '员工手机号'
    }, {
      field: 'startDatetime',
      title: '上班时间',
      type: 'datetime'
    }, {
      field: 'endDatetime',
      title: '下班时间',
      type: 'datetime'
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
      title: '考勤生成时间',
      type: 'datetime'
    }, {
      field: 'dateStart',
      title: '开始时间',
      search: true,
      type: 'datetime',
      hidden: true
    }, {
      field: 'dateEnd',
      title: '结束时间',
      search: true,
      type: 'datetime',
      hidden: true
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      placeholder: '姓名',
      search: true,
      hidden: true
    }];
    if (getUserKind() === 'O' || getUserKind() === 'S') {
      return this.state.projectCodeList ? this.props.buildList({
        fields,
        searchParams: { projectCode: this.code },
        pageCode: 631395,
        buttons: [{
          code: 'export',
          name: '导出',
          handler: (selectedRowKeys, selectedRows) => {
            fetch(631395, { projectCode: this.projectCode, limit: 10000, start: 1 }).then((data) => {
              let tableData = [];
              let title = [];
              fields.map((item) => {
                if (item.title !== '关键字') {
                  title.push(item.title);
                }
              });
              tableData.push(title);
              data.list.map((item) => {
                let temp = [];
                this.props.searchData.status.map((v) => {
                  if (v.dkey === item.status) {
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
        },
        {
          code: 'daka',
          name: '手工打卡',
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
                  setTimeout(() => {
                    this.props.getPageDate();
                  }, 1000);
                  // this.props.doFetching();
                  // fetch(631390, { projectCode: selectedRows[0].projectCode, staffCode: selectedRows[0].staffCode }).then(() => {
                  //   showSucMsg('操作成功');
                  //   this.props.cancelFetching();
                  // }).catch(this.props.cancelFetching);
                }
              });
            }
          }
        }]
      }) : null;
    } else {
      return this.props.buildList({
        fields: fieldso,
        searchParams: { projectCode: this.code },
        pageCode: 631395,
        buttons: [{
          code: 'export',
          name: '导出',
          handler: (selectedRowKeys, selectedRows) => {
            fetch(631395, { projectCode: this.projectCode, limit: 10000, start: 1 }).then((data) => {
              let tableData = [];
              let title = [];
              fields.map((item) => {
                if (item.title !== '关键字') {
                  title.push(item.title);
                }
              });
              tableData.push(title);
              data.list.map((item) => {
                let temp = [];
                this.props.searchData.status.map((v) => {
                  if (v.dkey === item.status) {
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
}

export default ProjectKaoqin;
