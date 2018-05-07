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
import { Button, Card, Modal } from 'antd';
import { showWarnMsg, showSucMsg } from 'common/js/util';

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
  render() {
    const fields = [{
      title: '时间',
      field: 'sendDatetime',
      type: 'datetime'
    }, {
      title: '发件人',
      field: 'sendName',
      search: true
    }, {
      title: '标题',
      field: 'title'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      search: true,
      data: [{
        key: '1',
        value: '待处理'
      }, {
        key: '2',
        value: '待反馈'
      }],
      keyName: 'key',
      valueName: 'value'
    }];
    return this.props.buildList({
      fields,
      searchParams: {
        statusList: [1, 2]
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
    });
  }
}

export default PostRequest;
