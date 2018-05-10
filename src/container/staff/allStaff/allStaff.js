import React from 'react';
import cookies from 'browser-cookies';
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
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.staffAllStaff,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class AllStaff extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      pageCode: null,
      searchParams: null
    };
  }
  componentDidMount() {
    getUserDetail(cookies.get('userId')).then((data) => {
      if (cookies.get('loginKind') === 'O') {
        this.setState({ pageCode: '631415' });
        this.setState({ searchParams: {'companyCode': data.companyCode, 'kind': 'O'} });
      }else {
        this.setState({ pageCode: '631415' });
        this.setState({ searchParams: {} });
      }
    });
  }
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
      search: true,
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
    }, {
      field: 'keyword',
      hidden: true,
      search: true,
      title: '关键字'
    }];

    const fieldso = [{
      field: 'name',
      title: '姓名'
      // formatter: (v, data) => {
      //   if(data.Staff) {
      //     return data.Staff.name;
      //   }
      // }
    }, {
      field: 'place',
      title: '籍贯'
      // formatter: (v, data) => {
      //   if(data.Staff) {
      //     return data.Staff.place;
      //   }
      // }
    }, {
      field: 'idType',
      title: '证件类型',
      type: 'select',
      search: true,
      key: 'id_type'
      // formatter: (v, data) => {
      //   if(data.Staff) {
      //     return data.Staff.idType;
      //   }
      // }
    }, {
      field: 'idNo',
      title: '证件号'
      // formatter: (v, data) => {
      //   if(data.Staff) {
      //     return data.Staff.idNo;
      //   }
      // }
    }, {
      field: 'mobile',
      title: '联系方式'
      // formatter: (v, data) => {
      //   if(data.Staff) {
      //     return data.Staff.mobile;
      //   }
      // }
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
    }, {
      field: 'keyword',
      hidden: true,
      search: true,
      title: '关键字'
    }];
    const btnEvent = {
      edit: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          // if (cookies.get('loginKind') === 'O') {
          //   this.props.history.push(`/staff/allStaff/addedit?staffCode=${selectedRows[0].Staff.code}`);
          // }else {
            this.props.history.push(`/staff/allStaff/addedit?staffCode=${selectedRowKeys[0]}`);
          // }
        }
      },
      detail: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          // if (cookies.get('loginKind') === 'O') {
          //   this.props.history.push(`/staff/allStaff/addedit?v=1&staffCode=${selectedRows[0].Staff.code}`);
          // }else {
            this.props.history.push(`/staff/allStaff/addedit?v=1&staffCode=${selectedRowKeys[0]}`);
          // }
        }
      },
      error: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          // if (cookies.get('loginKind') === 'O') {
          //   this.props.history.push(`/staff/allStaff/error?staffCode=${selectedRows[0].Staff.code}`);
          // }else {
            this.props.history.push(`/staff/allStaff/error?staffCode=${selectedRowKeys[0]}`);
          // }
        }
      },
      history: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          // if (cookies.get('loginKind') === 'O') {
          //   this.props.history.push(`/staff/allStaff/history?staffCode=${selectedRows[0].Staff.code}`);
          // }else {
            this.props.history.push(`/staff/allStaff/history?staffCode=${selectedRowKeys[0]}`);
          // }
        }
      }
    };
    return this.state.pageCode && this.state.searchParams ? this.props.buildList({
      fields: cookies.get('loginKind') === 'O' ? fieldso : fields,
      btnEvent,
      searchParams: this.state.searchParams,
      pageCode: this.state.pageCode
    }) : null;
  }
}

export default AllStaff;
