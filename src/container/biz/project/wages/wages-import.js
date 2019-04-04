import React from 'react';
import { Form, Spin } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId, findAndchangeInfo, isUndefined } from 'common/js/util';
import { getDictList } from 'api/dict';

@Form.create()
class ProjectWagesImport extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      cardTypeList: [],
      bankCodeList: [],
      isNotList: [],
      isLoading: true
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'legal_manid_card_type' }),
      getDictList({ parentKey: 'bank_code' }),
      getDictList({ parentKey: 'is_not' })
    ]).then(([cardTypeList, bankCodeList, isNotList]) => {
      this.setState({
        cardTypeList,
        bankCodeList,
        isNotList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { cardTypeList, bankCodeList, isNotList, isLoading } = this.state;
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
          title: '统一社会信用代码',
          field: 'corpCode'
        }, {
          title: '企业名称',
          field: 'corpName'
        }, {
          title: '班组名称',
          field: 'teamName'
        }, {
          title: '发放工资的月份',
          field: 'payMonth'
        }, {
          title: '证件类型',
          field: 'idCardType'
        }, {
          title: '证件号码',
          field: 'idCardNumber'
        }, {
          title: '出勤天数',
          field: 'days'
        }, {
          title: '总工时',
          field: 'workHours'
        }, {
          title: '工人工资卡号',
          field: 'payRollBankCardNumber'
        }, {
          title: '工人工资卡银行代码',
          field: 'payRollBankCode'
        }, {
          title: '工人工资卡开户行名称',
          field: 'payRollBankName'
        }, {
          title: '工资代发银行卡号',
          field: 'payBankCardNumber'
        }, {
          title: '工资代发银行代码',
          field: 'payBankCode'
        }, {
          title: '工资代发开户行名称',
          field: 'payBankName',
          required: true
        }, {
          title: '应发金额',
          field: 'totalPayAmount',
          amount: true,
          required: true
        }, {
          title: '实发金额',
          field: 'actualAmount',
          amount: true,
          required: true
        }, {
          title: '是否为补发',
          field: 'isBackPay'
        }, {
          title: '发放日期',
          field: 'balanceDate',
          type: 'date'
        }, {
          title: '补发月份',
          field: 'backPayMonth',
          type: 'month'
        }, {
          title: '第三方工资单编号',
          field: 'thirdPayRollCode'
        }]
      }
    }];
    return isLoading ? (
      <Spin spinning={true}></Spin>
    ) : this.buildDetail({
      fields,
      addCode: 631812,
      beforeSubmit: (params) => {
        for (let i = 0; i < params.dateList.length; i++) {
          let item = params.dateList[i];
          findAndchangeInfo(cardTypeList, item, 'idCardType', i);
          findAndchangeInfo(bankCodeList, item, 'payRollBankCode', i);
          findAndchangeInfo(bankCodeList, item, 'payBankCode', i);
          findAndchangeInfo(isNotList, item, 'isBackPay', i);
        }
        return true;
      }
    });
  }
}

export default ProjectWagesImport;
