import React from 'react';
import { Form, Spin } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId, findAndchangeInfo, isUndefined } from 'common/js/util';
import { getDictList } from 'api/dict';

@Form.create()
class ParticipatingImport extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      cropTypeList: [],
      isLoading: false
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'project_corp_type' })
    ]).then(([cropTypeList]) => {
      this.setState({
        cropTypeList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { cropTypeList, isLoading } = this.state;
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      pageCode: '631615',
      keyName: 'code',
      valueName: 'name',
      searchName: 'name',
      required: true
    }, {
      title: '导入模版',
      field: 'downloadTmp',
      type: 'download',
      links: [{
        name: '字段填写说明',
        url: '/download/00.字段填写说明.xlsx'
      }, {
        name: '参建单位导入模板',
        url: '/download/01.参建单位导入模板.xlsx'
      }]
    }, {
      field: 'userId',
      value: getUserId(),
      hidden: true
    }, {
      title: '项目参建单位列表',
      field: 'dateList',
      type: 'import',
      required: true,
      options: {
        fields: [{
          title: '统一社会信用代码',
          field: 'corpCode'
        }, {
          title: '企业名称',
          field: 'corpName'
        }, {
          title: '参建类型',
          field: 'corpType'
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
          title: '项目经理证件号码',
          field: 'pmIDCardNumber'
        }, {
          title: '项目经理电话',
          field: 'pmPhone'
        }]
      }
    }];
    return isLoading ? (
      <Spin spinning={true}></Spin>
    ) : this.buildDetail({
      fields,
      addCode: 631633,
      beforeSubmit: (params) => {
        console.log(params);
        let error = false;
        for (let i = 0; i < params.dateList.length; i++) {
          let item = params.dateList[i];
          let error1 = findAndchangeInfo(cropTypeList, item, 'corpType', i);
          if (!error) {
            error = error1;
          }
        }
        return !error;
      }
    });
  }
}

export default ParticipatingImport;
