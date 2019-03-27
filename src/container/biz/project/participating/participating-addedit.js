import React from 'react';
import { Form } from 'antd';
import { getQueryString } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ParticipatingAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.pCode = getQueryString('pcode', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    let _this = this;
    const fields = [{
      title: '企业名称',
      field: 'corpCode',
      pageCode: 631255,
      params: {
        uploadStatus: '2'
      },
      keyName: 'corpCode',
      valueName: 'corpName',
      type: 'select',
      onChange: (code, data) => {
        let cropInfo = data.find(v => v.corpCode == code);
        if (cropInfo) {
          let pageData = _this.state.pageData || {};
          _this.setState({
            pageData: {
              ...pageData,
              corpName: cropInfo.corpName
            }
          });
        }
      },
      required: true
    }, {
      title: '企业名称',
      field: 'corpName',
      required: true,
      hidden: true
    }, {
      title: '企业类型',
      field: 'corpType',
      type: 'select',
      key: 'project_corp_type',
      required: true
    }, {
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'projectCode',
      valueName: 'projectName',
      required: true
    }, {
      title: '进场时间',
      field: 'entryTime',
      type: 'datetime'
    }, {
      title: '退场时间',
      field: 'exitTime',
      type: 'datetime'
    }, {
      title: '项目经理',
      field: 'pmName'
    }, {
      title: '项目经理电话',
      field: 'pmPhone',
      mobile: true
    }, {
      title: '项目经理证件类型',
      field: 'pmIdcardType',
      type: 'select',
      key: 'legal_manid_card_type'
    }, {
      title: '项目经理证件号码',
      field: 'pmIdcardNumber'
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      key: 'corpCode',
      detailCode: 631907,
      editCode: 631906,
      addCode: 631905,
      beforeDetail: (params) => {
        params.pageIndex = 0;
        params.pageSize = 1;
        params.projectCode = this.pCode;
      }
    });
  }
}

export default ParticipatingAddEdit;
