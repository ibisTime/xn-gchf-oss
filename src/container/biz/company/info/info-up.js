import React from 'react';
import { Form } from 'antd';
import { getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class CompanyInfoUp extends DetailUtil {
  render() {
    const fields = [{
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '考勤列表',
      field: 'codeList',
      listCode: 631257,
      params: {
        userId: getUserId(),
        uploadStatus: '0'
      },
      type: 'o2m',
      options: {
        detail: true,
        delete: true,
        fields: [{
          title: '企业名称',
          field: 'corpName'
        }, {
          title: '统一社会信用代码',
          field: 'corpCode'
        }, {
          title: '注册地区编码',
          field: 'areaCode'
        }]
      }
    }];
    return this.buildDetail({
      fields,
      addCode: 631253,
      beforeSubmit: (params) => {
        let codeList = params.codeList.map(v => v.code);
        return true;
      }
    });
  }
}

export default CompanyInfoUp;
