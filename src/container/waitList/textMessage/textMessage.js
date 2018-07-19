import React from 'react';
import { rock, getUserId } from 'api/user';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/waitList/textMessage';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.waitListTextMessage,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class TextMessage extends React.Component {
  render() {
    const fields = [{
      field: 'name',
      title: '通知人',
      required: true
    }, {
      field: 'mobile',
      title: '手机号',
      mobile: true,
      required: true
    }, {
      field: 'remark',
      title: '备注'
    }, {
      field: 'keyword',
      title: '关键字',
      hidden: true,
      search: true
    }];
    const btnEvent = {
      // reset: (selectedRowKeys, selectedRows) => {
      //   if (!selectedRowKeys.length) {
      //     showWarnMsg('请选择记录');
      //   } else if (selectedRowKeys.length > 1) {
      //     showWarnMsg('请选择一条记录');
      //   } else {
      //     this.props.history.push(`/security/user/resetPwd?userId=${selectedRowKeys[0]}&loginName=${selectedRows[0].loginName}`);
      //   }
      // }
    };
    return this.props.buildList({
      fields,
      btnEvent,
      searchParams: {
        'userId': getUserId()
      },
      pageCode: 631515,
      deleteCode: 631511
    });
  }
}

export default TextMessage;
