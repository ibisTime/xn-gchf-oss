import React from 'react';
import { Form } from 'antd';
import { getQueryString, getUserId, showWarnMsg } from 'common/js/util';
import DetailUtil from 'common/js/build-detail-dev';

@Form.create()
class ProjectBasicAddEdit extends DetailUtil {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      field: 'name',
      title: '项目名称',
      required: true
    }, {
      field: 'contractorCorpCode',
      title: '总承包单位统一社会信用代码',
      required: true
    }, {
      field: 'description',
      title: '项目简介',
      type: 'textarea',
      normalArea: true
    }, {
      field: 'category',
      title: '项目分类',
      key: 'category',
      type: 'select',
      required: true
    }, {
      field: 'buildCorpCode',
      title: '建设单位统一社会信用代码'
    }, {
      field: 'prjPlanNum',
      title: '建设工程规划许可证编号'
    }, {
      field: 'areaCode',
      title: '项目所在地',
      required: true
    }, {
      field: 'invest',
      title: '总投资'
    }, {
      field: 'buildingArea',
      title: '总面积'
    }, {
      field: 'buildingLength',
      title: '总长度'
    }, {
      field: 'startDate',
      title: '开工日期',
      type: 'date'
    }, {
      field: 'completeDate',
      title: '竣工日期',
      type: 'date'
    }, {
      field: 'linkMan',
      title: '联系人姓名',
      required: true
    }, {
      field: 'linkPhone',
      title: '联系人电话',
      mobile: true,
      required: true
    }, {
      field: 'prjStatus',
      title: '项目状态',
      type: 'select',
      key: 'prj_status',
      required: true
    }, {
      field: 'lng',
      title: '经度',
      onChange(v) {
        if(v) {
          let vd = v.toString().split('.')[0];
          if(vd.length > 3) {
            showWarnMsg('请输入正确的经度值');
            document.getElementById('lng').value = vd.substr(0, 3);
            return '';
          }
        }
      }
    }, {
      field: 'lat',
      title: '纬度',
      onChange(v) {
        if(v) {
          let vd = v.toString().split('.')[0];
          if(vd.length > 3) {
            showWarnMsg('请输入正确的纬度值');
            document.getElementById('lat').value = vd.substr(0, 3);
            return '';
          }
        }
      }
    }, {
      field: 'address',
      title: '项目地址'
    }, {
      field: 'approvalNum',
      title: '立项文号'
    }, {
      field: 'approvalLevelNum',
      title: '立项级别',
      type: 'select',
      key: 'project_approval_level'
    }, {
      field: 'prjSize',
      title: '建设规模',
      type: 'select',
      key: 'project_size'
    }, {
      field: 'propertyNum',
      title: '建设性质',
      type: 'select',
      key: 'property_num'
    }, {
      field: 'prjNum',
      title: '工程用途',
      type: 'select',
      key: 'function_num'
    }, {
      field: 'nationNum',
      title: '国籍或地区'
    }, {
      field: 'builderLicenses',
      title: '施工许可证',
      required: true,
      type: 'o2m',
      options: {
        add: true,
        edit: true,
        delete: true,
        fields: [{
          field: 'prjName',
          title: '工程名称',
          required: true
        }, {
          field: 'builderLicenseNum',
          title: '施工许可证编号',
          required: true
        }]
      }
    }, {
      field: 'userId',
      value: getUserId(),
      hidden: true
    }];
    return this.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      addCode: 631600,
      editCode: 631602,
      detailCode: 631616
    });
  }
}

export default ProjectBasicAddEdit;
