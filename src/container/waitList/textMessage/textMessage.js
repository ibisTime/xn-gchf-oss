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
import {getUserDetail} from '../../../api/user';

@listWrapper(
  state => ({
    ...state.waitListTextMessage,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class TextMessage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      organizationCode: ''
    };
  }
  componentDidMount() {
    getUserDetail(getUserId()).then((res) => {
      this.setState({ organizationCode: res.organizationCode });
    });
  }
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
    return this.state.organizationCode ? this.props.buildList({
      fields,
      searchParams: {
        organizationCode: this.state.organizationCode
      },
      pageCode: 631515,
      deleteCode: 631511
    }) : null;
  }
}

export default TextMessage;
