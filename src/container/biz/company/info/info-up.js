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
      title: '企业列表',
      field: 'codeList',
      help: '上传时不需要勾选，会全部上传表格中的数据。若不想上传某项，直接删除即可。',
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
        params.codeList = codeList;
        return true;
      }
    });
  }
}

export default CompanyInfoUp;
