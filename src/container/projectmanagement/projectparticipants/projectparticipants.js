import React from 'react';
import { rock } from 'api/user';
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
} from '@redux/newId/projectmanagement';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import {getUserId} from '../../../common/js/util';

@listWrapper(
    state => ({
      ...state.ProjectParticiPants,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectManageMent extends React.Component {
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
      title: '项目名称',
      field: 'projectCode',
      search: true
    }, {
      title: '密钥',
      field: 'secret'
    }];
    return this.props.buildList({
      fields,
      pageCode: 631645,
      rowKey: 'userId',
      btnEvent: {
        edit: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
              this.props.history.push(`/project/projectmanagement/addedit?code=${selectedRows[0].code}`);
          }
        },
        detail: (selectedRowKeys, selectedRows) => {
          if (!selectedRowKeys.length) {
            showWarnMsg('请选择记录');
          } else if (selectedRowKeys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/project/projectmanagement/addedit?v=1&code=${selectedRows[0].code}`);
          }
        }
      }
    }
    );
  }
}

export default ProjectManageMent;
