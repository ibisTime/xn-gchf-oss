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
} from '@redux/biz/company/info';
import { Modal, Table, message } from 'antd';
import { listWrapper } from 'common/js/build-list';
import { getUserId, showWarnMsg } from 'common/js/util';
import { showUploadConfirm } from '../../util';
import ProjectBasic from 'container/biz/project/basic/basic';
import fetch from 'common/js/fetch';

@listWrapper(
    state => ({
      ...state.companyInfo,
      parentCode: state.menu.subMenuCode
    }),
    { setTableData, clearSearchParam, doFetching, setBtnList,
      cancelFetching, setPagination, setSearchParam, setSearchData }
)
class CompanyInfo extends React.Component {
  state = {
    visible: false,
    isok: '0',
    rowKey: ''
  };
  showModal = () => {
    this.setState({
      visible: true,
      isok: '1'
    });
  };
  handleOk = () => {
    const rowKey = sessionStorage.getItem('selectedRowKeys') || '';
    const selectedRowKeys = rowKey ? JSON.parse(rowKey) : '';
    if(Array.isArray(selectedRowKeys) && selectedRowKeys.length === 0) {
      message.warning('请选中后操作', 1.5);
      return false;
    }else {
      const hasMsg = message.loading('');
      this.setState({
        visible: false,
        isok: '2'
      });
      fetch(631254, {
        code: this.state.rowKey,
        projectCodeList: selectedRowKeys,
        userId: getUserId()
      }).then(() => {
        hasMsg();
        message.success('绑定成功', 1.5);
      }, hasMsg);
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
      isok: '-1'
    });
  };
  seleOptions = (options) => {
    console.log(options);
  };
  ownerModel = () => {
      return (
        <Modal
          width={1000}
          title="绑定项目"
          visible={this.state.visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText='确认'
          cancelText='取消'
        >
          <ProjectBasic noBtn={true} seleOptions={this.seleOptions} isok={this.state.isok}/>
        </Modal>
      );
  };
  render() {
    const fields = [{
      title: '企业名称',
      field: 'corpName',
      search: true
    }, {
      title: '统一社会信用代码',
      field: 'corpCode',
      search: true
    }, {
      title: '注册地区编码',
      field: 'areaCode'
    }, {
      title: '状态',
      field: 'uploadStatus',
      type: 'select',
      key: 'upload_status',
      search: true
    }];
    return this.props.buildList({
      fields,
      pageCode: 631255,
      deleteCode: 631252,
      searchParams: {
        userId: getUserId()
      },
      singleSelect: false,
      ownerModel: this.ownerModel,
      btnEvent: {
        edit: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else if (items[0].uploadStatus == '2') {
            showWarnMsg('当前状态下不可修改');
          } else {
            this.props.history.push(`/company/info/addedit?code=${keys[0]}`);
          }
        },
        up: (keys, items) => {
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else {
            showUploadConfirm(keys, items, this.props.getPageData,
              this.props.doFetching, this.props.cancelFetching, 631253);
          }
        },
        bindProject: (keys, items) => {
          const _this = this;
          if (!keys.length) {
            showWarnMsg('请选择记录');
          } else if (keys.length > 1) {
            showWarnMsg('请选择一条记录');
          } else {
            _this.showModal();
            _this.setState({
              rowKey: keys[0]
            });
          }
        }
      }
    });
  }
}

export default CompanyInfo;
