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
} from '@redux/biz/project/inout';
import { listWrapper } from 'common/js/build-list';
import { isUndefined, showWarnMsg, getUserId } from 'common/js/util';
import { getProjectList } from 'api/general';

@listWrapper(
    state => ({
      ...state.projectInout,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ProjectInout extends React.Component {
  render() {
    const fields = [{
      title: '工人姓名',
      field: 'workerName',
      search: true
    }, {
      title: '证件号',
      field: 'idcardNumber'
    }, {
      title: '进退场日期',
      field: 'date',
      type: 'datetime'
    }, {
      title: '类型',
      field: 'type',
      type: 'select',
      key: 'entry_exit_type'
    }, {
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'localProjectCode',
      valueName: 'projectName',
      search: true
    }, {
      title: '所在企业',
      field: 'corpName'
    }, {
      title: '所在企业',
      field: 'corpCode',
      pageCode: '631255',
      params: {
        uploadStatus: '2'
      },
      keyName: 'corpCode',
      valueName: 'corpName',
      type: 'select',
      hidden: true,
      search: true
    }, {
      title: '所在班组',
      field: 'teamSysNo'
    }];
    return this.props.buildList({
      fields,
      pageCode: 631745,
      deleteCode: 631731,
      searchParams: {
        userId: getUserId()
      },
      beforeDelete: (params) => {
        params.userId = getUserId();
      },
      btnEvent: {
        // 上传平台
        up: (keys, items) => {
          this.props.history.push('/project/inout/up');
        },
        // 导入
        import: (keys, items) => {
          this.props.history.push('/project/inout/import');
        },
        edit: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].uploadStatus === '2') {
            showWarnMsg('已上传不可修改');
          } else {
            this.props.history.push(`/project/inout/addedit?code=${keys[0]}`);
          }
        }
      }
    });
  }
}

export default ProjectInout;
