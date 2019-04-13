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
} from '@redux/biz/project/participating';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, getUserId } from 'common/js/util';
import { showUploadConfirm } from '../../util';

@listWrapper(
    state => ({
      ...state.projectParticipating,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class Participating extends React.Component {
  render() {
    const fields = [{
      title: '企业名称',
      field: 'corpName'
    }, {
      title: '企业类型',
      field: 'corpType',
      type: 'select',
      key: 'corp_type',
      search: true,
      hidden: true
    }, {
      title: '企业名称',
      field: 'corpCode',
      pageCode: '631255',
      params: {
        uploadStatus: '2',
        userId: getUserId()
      },
      keyName: 'corpCode',
      valueName: 'corpName',
      type: 'select',
      hidden: true,
      search: true
    }, {
      title: '社会信用代码',
      field: 'corpCode'
    }, {
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      pageCode: '631615',
      keyName: 'code',
      valueName: 'name',
      search: true,
      hidden: true
    }, {
      title: '对应项目',
      field: 'projectName'
    }, {
      title: '进场时间',
      field: 'entryTime',
      type: 'datetime'
    }, {
      title: '退场时间',
      field: 'exitTime',
      type: 'datetime'
    }, {
      title: '项目经理',
      field: 'pmName'
    }, {
      title: '项目经理电话',
      field: 'pmPhone'
    }, {
      title: '状态',
      field: 'uploadStatus',
      type: 'select',
      key: 'upload_status',
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 631645,
      deleteCode: 631631,
      singleSelect: false,
      searchParams: {
        userId: getUserId()
      },
      beforeDelete: (params) => {
        params.userId = getUserId();
      },
      btnEvent: {
        // 上传平台
        up: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else {
            showUploadConfirm(keys, items, this.props.getPageData,
              this.props.doFetching, this.props.cancelFetching, 631634);
          }
        },
        // 导入
        import: (keys, items) => {
          this.props.history.push('/project/projectparticipant/import');
        },
        edit: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].uploadStatus === '2') {
            showWarnMsg('已上传不可修改');
          } else {
            this.props.history.push(`/project/projectparticipant/addedit?code=${keys[0]}`);
          }
        },
        // 查看银行卡
        bank: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/project/projectparticipant/bank?code=${keys[0]}&type=001`);
          }
        }
      },
      beforeDetail: (params) => {
        params.userId = getUserId();
      }
    });
  }
}

export default Participating;
