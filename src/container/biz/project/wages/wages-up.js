import React from 'react';
import { Form } from 'antd';
import { getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectWagesUp extends DetailUtil {
  render() {
    const fields = [{
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '工资单列表',
      field: 'codeList',
      listCode: 631816,
      params: {
        userId: getUserId(),
        uploadStatus: '0'
      },
      type: 'o2m',
      options: {
        detail: true,
        delete: true,
        fields: [{
          title: '工人姓名',
          field: 'workerName'
        }, {
          title: '证件号',
          field: 'idCardNumber'
        }, {
          title: '发放工资的月份',
          field: 'balanceDate',
          type: 'month'
        }, {
          title: '出勤天数',
          field: 'days'
        }, {
          title: '总工时',
          field: 'workHours'
        }, {
          title: '应发金额',
          field: 'totalPayAmount',
          amount: true
        }, {
          title: '实发金额',
          field: 'actualAmount',
          amount: true
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631813,
      beforeSubmit: (params) => {
        let codeList = params.codeList.map(v => v.code);
        params.codeList = codeList;
        return true;
      }
    });
  }
}

export default ProjectWagesUp;
