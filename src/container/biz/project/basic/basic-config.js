import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectBasicConfig extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.isSend = true;
  }
  render() {
    const fields = [{
      field: 'localProjectCode',
      value: this.code,
      required: true,
      hidden: true
    }, {
      field: 'projectCode',
      title: '国家平台项目编码',
      _keys: ['projectConfig', 'projectCode'],
      required: true
    }, {
      field: 'projectName',
      title: '项目名称',
      _keys: ['projectConfig', 'projectName'],
      required: true
    }, {
      field: 'password',
      title: '密码',
      _keys: ['projectConfig', 'password'],
      required: true
    }, {
      field: 'secret',
      title: '国家平台项目秘钥',
      _keys: ['projectConfig', 'secret'],
      required: true
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      detailCode: 631616,
      editCode: 631622
    });
  }
}

export default ProjectBasicConfig;
