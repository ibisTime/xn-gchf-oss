import React from 'react';
import cookies from 'browser-cookies';
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
} from '@redux/daifa/daifa';
import { listWrapper } from 'common/js/build-list';
import { showWarnMsg, showSucMsg } from 'common/js/util';
import ModalDetail from 'common/js/build-modal-detail';
import { getUserDetail } from 'api/user';

@listWrapper(
  state => ({
    ...state.daifaDaifa,
    parentCode: state.menu.subMenuCode
  }),
  {
    setTableData, clearSearchParam, doFetching, setBtnList,
    cancelFetching, setPagination, setSearchParam, setSearchData
  }
)
class Daifa extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false,
      code: '',
      companyCode: ''
    };
    if(cookies.get('loginKind') === 'O') {
      getUserDetail(cookies.get('userId')).then((data) => {
        this.setState({'companyCode': data.companyCode});
      });
    }
  }
  render() {
    const fields = [{
      field: 'code',
      title: '编号',
      hidden: true
    }, {
      field: 'projectCode',
      title: '项目编号',
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: ''
      },
      keyName: 'name',
      valueName: 'name'
    }, {
      field: 'title',
      title: '标题'
    }, {
      field: 'content',
      title: '内容'
    }, {
      field: 'status',
      title: '状态',
      search: true,
      type: 'select',
      key: 'message_status'
    }, {
      field: 'createDatetime',
      title: '创建时间',
      type: 'datetime'
    }, {
      field: 'handleDatetime',
      title: '处理时间',
      type: 'datetime'
    }, {
      field: 'handleNote',
      title: '处理备注'
    }, {
      field: 'handler',
      title: '处理人'
    }, {
      field: 'keyword',
      search: true,
      hidden: true,
      title: '关键字'
    }];
    const fieldso = [{
      field: 'code',
      title: '编号',
      hidden: true
    }, {
      field: 'projectCode',
      title: '项目编号',
      hidden: true
    }, {
      field: 'projectName',
      title: '工程名称',
      type: 'select',
      search: true,
      listCode: '631357',
      params: {
        updater: '',
        kind: 'O',
        companyCode: this.state.companyCode
      },
      keyName: 'name',
      valueName: 'name'
    }, {
      field: 'status',
      title: '状态',
      search: true,
      type: 'select',
      key: 'message_status'
    }, {
      field: 'createDatetime',
      title: '创建时间',
      type: 'datetime'
    }, {
      field: 'handleDatetime',
      title: '处理时间',
      type: 'datetime'
    }, {
      field: 'handleNote',
      title: '处理备注'
    }, {
      field: 'handler',
      title: '处理人'
    }, {
      field: 'keyword',
      search: true,
      hidden: true,
      title: '关键字'
    }];
    const btnEvent = {
      send: (selectedRowKeys, selectedRows) => {
        if (!selectedRowKeys.length) {
          showWarnMsg('请选择记录');
        } else if (selectedRowKeys.length > 1) {
          showWarnMsg('请选择一条记录');
        } else {
          if (selectedRows[0].status === '0') {
            this.code = selectedRowKeys[0];
            this.setState({ visible: true });
            this.setState({ code: selectedRowKeys[0] });
          }else {
            showWarnMsg('该状态消息不可发送');
          }
        }
      }
    };
    const options = {
      fields: [{
        field: 'code',
        hidden: true,
        value: this.code
      }, {
        field: 'sender',
        hidden: true,
        value: cookies.get('userId')
      }, {
        field: 'title',
        title: '标题',
        required: true,
        maxlength: 30
      }, {
        field: 'content',
        title: '内容',
        required: true,
        maxlength: 30
      }, {
        field: 'sendNote',
        title: '发送说明'
      }],
      addCode: 631430
    };
    if (cookies.get('loginKind') === 'O') {
      return this.state.companyCode ? (
            <div>
              {this.props.buildList({
                fields: fieldso,
                btnEvent,
                searchParams: {
                  updater: '',
                  companyCode: this.state.companyCode,
                  kind: 'O'
                },
                pageCode: 631435,
                rowKey: 'code'
                })}
              <ModalDetail
                title='发送消息'
                visible={this.state.visible}
                hideModal={() => this.setState({ visible: false })}
                options={options} />
            </div>
          ) : null;
    }else {
      return (
        <div>
          {this.props.buildList({
            fields,
            btnEvent,
            searchParams: {
              updater: ''
            },
            pageCode: 631435,
            rowKey: 'code'
            })}
          <ModalDetail
            title='发送消息'
            visible={this.state.visible}
            hideModal={() => this.setState({ visible: false })}
            options={options} />
        </div>
      );
    }
  }
}

export default Daifa;
