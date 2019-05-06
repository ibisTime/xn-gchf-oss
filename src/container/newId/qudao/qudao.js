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
} from '@redux/newId/qudao';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import {getUserId} from '../../../common/js/util';

@listWrapper(
  state => ({
    ...state.newIdQudao,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class QuDao extends React.Component {
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
        placeholder: '登录名/手机号',
        search: true,
        hidden: true
      }];
    return this.state.userId ? this.props.buildList({
      fields,
      searchParams: {
        type: 'O',
        updater: ''
      },
      pageCode: 631085,
      rowKey: 'userId',
      btnEvent: {
        resetPaw: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/newId/yezhu/reset?code=${selectedRowKeys[0]}`);
          }
        }
      }
    }) : null;
  }
}

export default QuDao;
