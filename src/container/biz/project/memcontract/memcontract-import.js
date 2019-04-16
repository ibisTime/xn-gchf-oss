import React from 'react';
import { Form, Spin } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId, findAndchangeInfo, isUndefined } from 'common/js/util';
import { getDictList } from 'api/dict';

@Form.create()
class ProjectMemContractImport extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      periodTypeList: [],
      unitList: [],
      isLoading: false
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'contract_period_type' }),
      getDictList({ parentKey: 'unit' })
    ]).then(([periodTypeList, unitList]) => {
      this.setState({
        periodTypeList,
        unitList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { periodTypeList, unitList, isLoading } = this.state;
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
        name: '项目人员合同导入模板',
        url: '/download/05.项目人员合同导入模板.xlsx'
      }]
    }, {
      title: '项目人员合同列表',
      field: 'dateList',
      type: 'import',
      required: true,
      options: {
        fields: [{
          title: '企业统一社会信用代码',
          field: 'corpCode'
        }, {
          title: '企业名称',
          field: 'corpName'
        }, {
          title: '工人姓名',
          field: 'workerName'
        }, {
          title: '证件号码',
          field: 'idCardNumber'
        }, {
          title: '合同期限类型',
          field: 'contractPeriodType'
        }, {
          title: '开始日期',
          field: 'startDate'
        }, {
          title: '结束日期',
          field: 'endDate'
        }, {
          title: '计量单位',
          field: 'unit'
        }, {
          title: '计量单价',
          field: 'unitPrice'
        }]
      }
    }];
    return isLoading ? (
      <Spin spinning={true}></Spin>
    ) : this.buildDetail({
      fields,
      addCode: 631673,
      beforeSubmit: (params) => {
        let error = false;
        for (let i = 0; i < params.dateList.length; i++) {
          let item = params.dateList[i];
          let error2 = findAndchangeInfo(periodTypeList, item, 'contractPeriodType', i);
          let error3;
          if (!isUndefined(item.unit)) {
            error3 = findAndchangeInfo(unitList, item, 'unit', i);
          }
          if (!error) {
            error = error2 || error3;
          }
        }
        return !error;
      }
    });
  }
}

export default ProjectMemContractImport;
