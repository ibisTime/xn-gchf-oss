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
import { showWarnMsg, showSucMsg, getUserId, dateTimeFormat } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.staffAllStaff,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class AllStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCode: null,
      searchParams: null,
      province: null,
      city: null,
      area: null
    };
  }
  render() {
    const fields = [{
      field: 'name',
      title: '姓名',
      search: true
    }, {
      field: 'idCardNumber',
      title: '身份证号码',
      search: true
    }, {
      field: 'cellPhone',
      title: '手机号'
    }, {
      field: 'createDatetime',
      title: '建档时间',
      type: 'date',
      rangedate: ['createDatetimeStart', 'createDatetimeEnd'],
      formatter: dateTimeFormat,
      search: true
    }, {
        title: '人脸照片上传状态',
        field: 'workerPicUploadStatus',
        type: 'select',
        key: 'workerPicUploadStatus'
    }];
    const btnEvent = {
      // 绑定银行卡
      bank: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/bank?bcode=${selectedRowKeys[0]}&type=002`);
        }
      },
      // 重新建档
      rejiandang: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          sessionStorage.setItem('isStaff', 'true');
          this.props.history.push(`/staff/jiandang?code=${selectedRowKeys[0]}`);
        }
      },
      // 采集人脸
      face: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/staff/allStaff/acquisitionFaces?code=${selectedRowKeys[0]}`);
        }
      }
    };
    return this.props.buildList({
      fields,
      btnEvent,
      searchParams: {
        userId: getUserId()
      },
      pageCode: 631805
    });
  }
}

export default AllStaff;
