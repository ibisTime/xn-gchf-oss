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
} from '@redux/newId/projectmanagement';
import { listWrapper } from 'common/js/build-list';

@listWrapper(
    state => ({
      ...state.ProjectManageMent,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectManageMent extends React.Component {
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
      title: '秘钥',
      field: 'secret'
    }];
    return this.props.buildList({
      fields,
      pageCode: 631625
    });
  }
}

export default ProjectManageMent;
