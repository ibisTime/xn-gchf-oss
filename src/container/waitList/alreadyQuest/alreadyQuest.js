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
} from '@redux/waitList/alreadyQuest';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
  state => ({
    ...state.waitListAlreadyQuest,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class AlreadyQuest extends React.Component {
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
      key: 'message_status',
      type: 'select'
    }];
    return this.props.buildList({
      fields,
      searchParams: {
        status: 2
      },
      pageCode: 631435
    });
  }
}

export default AlreadyQuest;
