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
} from '@redux/biz/project/basic';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getUserId } from 'common/js/util';

@listWrapper(
    state => ({
      ...state.projectBasic,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectBasic extends React.Component {
  render() {
    const fields = [{
      title: '项目名称',
      field: 'name',
      search: true
    }, {
      title: '项目类别',
      field: 'category',
      type: 'select',
      key: 'category'
    }, {
      title: '项目状态',
      field: 'prjStatus',
      type: 'select',
      key: 'prj_status'
    }, {
      title: '立项级别',
      field: 'approvalLevelNum'
    }, {
      title: '负责人姓名',
      field: 'linkMan'
    }, {
      title: '负责人手机号',
      field: 'linkPhone'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'project_secret_status'
    }];
    return this.props.buildList({
      fields,
      pageCode: 631615,
      searchParams: {
        userId: getUserId()
      },
      beforeDelete: (params) => {
        params.userId = getUserId();
      }
    });
  }
}

export default ProjectBasic;
