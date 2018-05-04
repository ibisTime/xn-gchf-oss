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
      field: 'sender'
    }, {
      title: '标题',
      field: 'title'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      search: true,
      key: 'message_status'
    }];
    return this.props.buildList({
      fields,
      pageCode: 631435
    });
  }
}

export default PostRequest;
