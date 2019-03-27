import React from 'react';
import { Form } from 'antd';
import { getQueryString, formatImg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectAttenceAdd extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      projectCode: ''
    };
  }
  render() {
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
      hidden: !this.state.projectCode,
      required: true
    }, {
      title: '考勤列表',
      field: 'dataList',
      type: 'o2m',
      options: {
        rowKey: 'idCardNumber',
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
          title: '考勤时间',
          field: 'date',
          type: 'datetime',
          required: true
        }, {
          title: '进出方向',
          field: 'direction',
          type: 'select',
          key: 'direction',
          required: true
        }, {
          title: '刷卡近照',
          field: 'image',
          type: 'img',
          single: true
        }, {
          title: '通道',
          field: 'channel'
        }, {
          title: '通行方式',
          field: '通行方式',
          type: 'select',
          key: 'attend_type'
        }, {
          title: '经度',
          field: 'lng'
        }, {
          title: '纬度',
          field: 'lat'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631918,
      beforeSubmit: (params) => {
        if (params.dataList && params.dataList) {
          params.dataList.forEach(worker => {
            worker.image = formatImg(worker.image);
          });
        }
        return true;
      }
    });
  }
}

export default ProjectAttenceAdd;
