import React from 'react';
import { Form } from 'antd';
import { getQueryString, formatImg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectInoutAdd extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      projectCode: ''
    };
  }
  render() {
    let _this = this;
    const fields = [{
      title: '项目编码',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      onChange: (projectCode, data) => {
        this.setState({ projectCode });
      },
      required: true
    }, {
      title: '所在班组',
      field: 'teamSysNo',
      type: 'select',
      keyName: 'teamSysNo',
      valueName: 'teamName',
      searchName: 'teamName',
      pageCode: this.state.projectCode ? 631910 : '',
      params: {
        projectCode: this.state.projectCode
      },
      pagination: {
        startKey: 'pageIndex',
        start: 0,
        limitKey: 'pageSize'
      },
      onChange: (code, data) => {
        let classInfo = data.find(v => (v.teamSysNo + '') === code);
        if (classInfo) {
          let pageData = _this.state.pageData || {};
          _this.setState({
            pageData: {
              ...pageData,
              corpCode: classInfo.corpCode,
              corpName: classInfo.corpName
            }
          });
        }
      },
      hidden: !this.state.projectCode,
      required: true
    }, {
      field: 'corpCode',
      hidden: true,
      required: true
    }, {
      field: 'corpName',
      hidden: true,
      required: true
    }, {
      title: '工人列表',
      field: 'workerList',
      type: 'o2m',
      options: {
        add: true,
        edit: true,
        detail: true,
        delete: true,
        fields: [{
          title: '证件类型',
          field: 'idCardType',
          type: 'select',
          key: 'legal_manid_card_type',
          required: true
        }, {
          title: '证件号',
          field: 'idCardNumber',
          required: true
        }, {
          title: '类型',
          field: 'type',
          type: 'select',
          key: 'entry_exit_type',
          required: true
        }, {
          title: '进退场日期',
          field: 'date',
          type: 'datetime'
        }, {
          title: '凭证扫描件',
          field: 'voucherUrl',
          type: 'img',
          single: true,
          required: true
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631914,
      beforeSubmit: (params) => {
        if (params.workerList && params.workerList) {
          params.workerList.forEach(worker => {
            worker.voucherUrl = formatImg(worker.voucherUrl);
          });
        }
        return true;
      }
    });
  }
}

export default ProjectInoutAdd;
