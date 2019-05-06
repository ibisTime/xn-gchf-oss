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
} from '@redux/biz/project/p_config';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getUserId } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.projectConfig,
    parentCode: state.menu.subMenuCode
  }),
  { setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectConfig extends React.Component {
  render() {
    const fields = [{
      title: '项目名称',
      field: 'projectName',
      search: true
    }, {
      title: '账号',
      field: 'projectCode'
    }, {
      title: '密码',
      field: 'password'
    }, {
      title: '密钥',
      field: 'secret'
    }];
    return this.props.buildList({
      fields,
      pageCode: 631625
    });
  }
}

export default ProjectConfig;
