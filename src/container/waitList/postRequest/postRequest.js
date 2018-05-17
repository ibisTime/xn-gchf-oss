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
} from '@redux/waitList/postRequest';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg } from 'common/js/util';
import { getUserDetail } from 'api/user';
import cookies from 'browser-cookies';

@listWrapper(
  state => ({
    ...state.waitListPostRequest,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class PostRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      subbranch: '',
      bankName: ''
    };
  };
  componentDidMount() {
    getUserDetail(cookies.get('userId')).then((data) => {
      this.setState({
        subbranch: data.subbranch,
        bankName: data.bankName
      });
    });
  }
  render() {
    const fields = [{
      field: 'code',
      title: '编号',
      hidden: true
    }, {
      field: 'projectCode',
      title: '项目编号',
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        kind: 'O',
        companyCode: this.state.companyCode
      },
      keyName: 'name',
      valueName: 'name'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      search: true,
      key: 'message_status'
    }, {
      title: '创建时间',
      field: 'createDatetime'
    }, {
      title: '处理时间',
      field: 'handleDatetime',
      type: 'datetime'
    }, {
      title: '处理备注',
      field: 'handleNote'
    }, {
      title: '处理人',
      field: 'handleName'
    }];
    if (cookies.get('loginKind') === 'P') {
      return this.props.buildList({
        fields,
        pageCode: 631435,
        btnEvent: {
          detail: (selectedRowKeys, selectedRows) => {
            if (!selectedRowKeys.length) {
              showWarnMsg('请选择记录');
            } else if (selectedRowKeys.length > 1) {
              showWarnMsg('请选择一条记录');
            } else {
              let url = `${this.props.location.pathname}/addedit?v=1&code=${selectedRowKeys[0]}&status=${selectedRows[0].status}`;
              this.props.history.push(url);
            }
          }
        }
      });
    } else {
      return this.state.subbranch && this.state.bankName
        ? this.props.buildList({
          fields,
          searchParams: {
            statusList: [1, 2],
            subbranch: this.state.subbranch,
            bankName: this.state.bankName
          },
          pageCode: 631435,
          btnEvent: {
            detail: (selectedRowKeys, selectedRows) => {
              if (!selectedRowKeys.length) {
                showWarnMsg('请选择记录');
              } else if (selectedRowKeys.length > 1) {
                showWarnMsg('请选择一条记录');
              } else {
                let url = `${this.props.location.pathname}/addedit?v=1&code=${selectedRowKeys[0]}&status=${selectedRows[0].status}`;
                this.props.history.push(url);
              }
            }
          }
        })
        : null;
    }
  }
}

export default PostRequest;
