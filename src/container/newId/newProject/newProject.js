import React from 'react';
import { rock } from 'api/user';
import { getCompany, deleteCompany1 } from 'api/company';
import { Modal } from 'antd';
import {
  setTableData,
  setPagination,
  setBtnList,
  setSearchParam,
  clearSearchParam,
  doFetching,
  cancelFetching,
  setSearchData
} from '@redux/newId/newProject';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';

@listWrapper(
  state => ({
    ...state.newIdNewProject,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class NewProject extends React.Component {
  render() {
    const fields = [{
      title: '项目名称',
      field: 'name'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'project_status'
    }, {
      title: '备注',
      field: 'remark'
    }];
    return this.props.buildList({
      fields,
      buttons: [{
        name: '新增项目',
        code: 'add',
        handler: () => {
          this.props.history.push(`/newId/newProject/addProject`);
        }
      }],
      pageCode: 631356
    });
  }
}

export default NewProject;
