import React from 'react';
import { Form } from 'antd';
import { getUserId, dateFormat } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectMemContractUp extends DetailUtil {
  render() {
    const fields = [{
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '项目人员合同列表',
      field: 'codeList',
      listCode: 631687,
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
          field: 'idcardNumber'
        }, {
          title: '期限',
          field: 'startDate',
          render: (v, d) => {
            return d ? dateFormat(d.startDate) + '~' + dateFormat(d.endDate) : '';
          }
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631674,
      beforeSubmit: (params) => {
        let codeList = params.codeList.map(v => v.code);
        params.codeList = codeList;
        return true;
      }
    });
  }
}

export default ProjectMemContractUp;
