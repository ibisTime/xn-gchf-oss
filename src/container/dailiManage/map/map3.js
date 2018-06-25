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
} from '@redux/map/map';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getUserKind, getUserId } from 'common/js/util';
import cookies from 'browser-cookies';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.mapMap,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Map extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      companyCode: '',
      projectCodeList: ''
    };
  }
  componentDidMount() {
    if (getUserKind() === 'S') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'projectCodeList': data.projectCodeList });
      });
    };
    if (getUserKind() === 'O') {
      getUserDetail(getUserId()).then((data) => {
        this.setState({ 'companyCode': data.companyCode });
      });
    };
  }
  render() {
    var btnEvent = {
      addProject: (selectedRowKeys, selectedRows) => {
        this.props.history.push(`/projectManage/project/addedit`);
      },
      Statistics: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/newProj/project/detail?v=1&code=${selectedRowKeys[0]}`);
        }
      },
      attendance: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/kaoqin?code=${selectedRowKeys[0]}`);
        }
      },
      tiqingshenhe: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/edit?v=1&code=${selectedRowKeys[0]}`);
        }
      },
      wages: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/salary?projectCode=${selectedRowKeys[0]}`);
        }
      },
      proDetail: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/addedit?v=1&projectCode=${selectedRowKeys[0]}`);
        }
      },
      allWages: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/leijifaxin?v=1&projectCode=${selectedRowKeys[0]}`);
        }
      },
      overTime: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/end?v=1&projectCode=${selectedRowKeys[0]}`);
        }
      },
      editPro: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/addedit?projectCode=${selectedRowKeys[0]}`);
        }
      },
      checkPro: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/check?v=1&projectCode=${selectedRowKeys[0]}`);
        }
      },
      overPro: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/stop?stop=1&projectCode=${selectedRowKeys[0]}`);
        }
      },
      kCard: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/daka?projectCode=${selectedRowKeys[0]}`);
        }
      },
      aWork: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/projectManage/project/stop?start=1&projectCode=${selectedRowKeys[0]}`);
        }
      },
      progress: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          this.props.history.push(`/hetong/jindu/info?start=1&projectCode=${selectedRowKeys[0]}`);
        }
      },
      addBumen: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          if(selectedRows[0].status !== '5') {
            this.props.history.push(`/projectManage/project/addBumen?code=${selectedRows[0].code}`);
          }else {
            showWarnMsg('该项目已结束，不能新增部门');
          }
        }
      }
    };
    const fields = [{
      field: 'projectCode',
      formatter: (v, d) => {
        return d.name;
      },
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        kind: 'O',
        companyCode: this.state.companyCode
      },
      keyName: 'code',
      valueName: 'name'
    }, {
      field: 'provinces',
      title: '项目详细地址',
      formatter: (v, d) => {
        return d.province + d.city + d.area + d.address;
      }
    }, {
      field: 'startDatetime',
      title: '项目开始时间',
      type: 'datetime'
    }, {
      field: 'endDatetime',
      title: '项目结束时间',
      type: 'datetime'
    }, {
      field: 'chargeUser',
      title: '负责人'
    }, {
      field: 'chargeMobile',
      title: '负责人手机号'
    }, {
      title: '状态',
      field: 'status',
      key: 'project_status',
      type: 'select'
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      placeholder: '手机号',
      hidden: true,
      search: true
    }];
    if (getUserKind() === 'P') {
      return this.props.buildList({
        fields,
        btnEvent,
        searchParams: {
          companyCode: ''
        },
        pageCode: 631356
      });
    } else if (getUserKind() === 'O') {
      return this.state.companyCode ? this.props.buildList({
        fields,
        btnEvent,
        searchParams: {
          companyCode: this.state.companyCode,
          kind: 'O'
        },
        pageCode: 631356
      }) : null;
    } else {
      return this.state.projectCodeList ? this.props.buildList({
        fields,
        btnEvent,
        searchParams: {
          projectCodeList: this.state.projectCodeList
        },
        pageCode: 631356
      }) : null;
    }
  }
}

export default Map;
