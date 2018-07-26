import React from 'react';
import { rock } from 'api/user';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/newId/yezhu';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import {getUserId} from '../../../common/js/util';

@listWrapper(
  state => ({
    ...state.newIdYezhu,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Yezhu extends React.Component {
  constructor(props) {
    super(props);
    this.state = { userId: '' };
  }
  componentDidMount() {
    let userId = getUserId();
    this.setState({ userId });
  }
  render() {
    const fields = [{
      title: '项目名',
      field: 'projectName'
    }, {
      title: '登录名',
      field: 'loginName'
    }, {
      title: '手机号',
      field: 'mobile'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'user_status'
    },
      {
      title: '备注',
      field: 'remark'
    }, {
      title: '关键字',
      field: 'keyword',
      search: true,
      hidden: true
    }];
    return this.state.userId ? this.props.buildList({
      fields,
      searchParams: {
        type: 'O',
        updater: '',
        userRefree: this.state.userId
      },
      pageCode: 631085,
      rowKey: 'userId'
    }) : null;
  }
}

export default Yezhu;
