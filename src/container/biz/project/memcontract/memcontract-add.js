import React from 'react';
import { Form } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectContractAdd extends DetailUtil {
  render() {
    const fields = [{
      title: '项目编码',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      required: true
    }, {
      title: '合同列表',
      field: 'contractList',
      type: 'o2m',
      options: {
        rowKey: 'idCardNumber',
        add: true,
        edit: true,
        detail: true,
        delete: true,
        fields: [{
          title: '所属企业名称',
          field: 'corpName',
          required: true
        }, {
          title: '所属企业统一社会信用代码',
          field: 'corpCode',
          required: true
        }, {
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
          title: '合同期限类型',
          field: 'contractPeriodType',
          type: 'select',
          key: 'contract_period_type',
          required: true
        }, {
          title: '开始日期',
          field: 'startDate',
          type: 'datetime',
          required: true
        }, {
          title: '结束时期',
          field: 'endDate',
          type: 'datetime',
          required: true
        }, {
          title: '计量单位',
          field: 'unit',
          key: 'unit',
          type: 'select'
        }, {
          title: '计量单价',
          field: 'unitPrice'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631916
    });
  }
}

export default ProjectContractAdd;
