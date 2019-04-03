import React from 'react';
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
} from '@redux/biz/project/participating-bank';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg, getUserId } from 'common/js/util';
import { getProjectList } from 'api/general';

@listWrapper(
    state => ({
      ...state.projectParticipatingBank
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class ParticipatingBank extends React.Component {
  upDownRecord(keys, items, up) {
    let status = up ? '1' : '0';
    let tip = up ? '启用' : '弃用';
    if (!keys.length) {
      showWarnMsg('请选择记录');
    } else if (keys.length > 1) {
      showWarnMsg('请选择一条记录');
    } else if (items[0].status != status) {
      showWarnMsg('该记录已经' + tip);
    } else {
      Modal.confirm({
        okType,
        title: '您确定要' + tip + '该条记录吗?',
        okText: '确定',
        cancelText: '取消',
        onOk() {
          this.props.doFetching();
          fetch(631751, {
            code: keys[0],
            userId: getUserId()
          }).then(() => {
            showSucMsg('操作成功');
            this.props.getPageData();
          }).catch(this.props.cancelFetching);
        }
      });
    }
  }
  render() {
    const fields = [{
      title: '银行支行名称',
      field: 'bankName'
    }, {
      title: '银行卡号',
      field: 'bankNumber'
    }, {
      title: '银行联号',
      field: 'bankLinkNumber'
    }, {
      title: '状态',
      field: 'status',
      type: 'select',
      key: 'bankcard_status',
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 631765,
      buttons: [{
        code: 'add',
        name: '新增',
        handler: () => {
          this.props.history.push('');
        }
      }, {
        code: 'edit',
        name: '修改',
        handler: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].uploadStatus === '2') {
            showWarnMsg('已上传不可修改');
          } else {
            this.props.history.push(`/project/projectparticipant/addedit?code=${keys[0]}`);
          }
        }
      }, {
        code: 'up',
        name: '启用',
        handler: (keys, items) => {
          this.upDownRecord(keys, items, true);
        }
      }, {
        code: 'down',
        name: '弃用',
        handler: (keys, items) => {
          this.upDownRecord(keys, items);
        }
      }, {
        code: 'detail',
        name: '详情',
        handler: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            this.props.history.push(`/project/projectparticipant/addedit?v=1&code=${keys[0]}`);
          }
        }
      }]
    });
  }
}

export default ParticipatingBank;
