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
      field: 'approvalLevelNum',
      key: 'approval_level_num',
      type: 'select'
    }, {
      title: '负责人姓名',
      field: 'linkMan'
    }, {
      title: '负责人手机号',
      field: 'linkPhone'
    }];
    return this.props.buildList({
      fields,
      pageCode: 631615,
      searchParams: {
        userId: getUserId()
      },
      beforeDelete: (params) => {
        params.userId = getUserId();
      },
      btnEvent: {
        config: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/project/basic/config?code=${keys[0]}`);
          }
        }
      }
    });
  }
}

export default ProjectBasic;
