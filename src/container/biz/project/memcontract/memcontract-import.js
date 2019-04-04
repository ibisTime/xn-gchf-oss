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
      cardTypeList: [],
      periodTypeList: [],
      unitList: [],
      isLoading: true
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'legal_manid_card_type' }),
      getDictList({ parentKey: 'contract_period_type' }),
      getDictList({ parentKey: 'unit' })
    ]).then(([cardTypeList, periodTypeList, unitList]) => {
      this.setState({
        cardTypeList,
        periodTypeList,
        unitList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { cardTypeList, periodTypeList, unitList, isLoading } = this.state;
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'localProjectCode',
      valueName: 'projectName',
      required: true
    }, {
      title: '参建单位列表',
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
          title: '证件类型',
          field: 'idCardType'
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
        for (let i = 0; i < params.dateList.length; i++) {
          let item = params.dateList[i];
          findAndchangeInfo(cardTypeList, item, 'idCardType', i);
          findAndchangeInfo(periodTypeList, item, 'contractPeriodType', i);
          if (!isUndefined(item.unit)) {
            findAndchangeInfo(unitList, item, 'unit', i);
          }
        }
        return true;
      }
    });
  }
}

export default ProjectMemContractImport;
