import React from 'react';
import { Form, Spin } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId, findAndchangeInfo } from 'common/js/util';
import { getDictList } from 'api/dict';

@Form.create()
class InputImport extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      cardTypeList: [],
      typeList: [],
      isLoading: true
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'legal_manid_card_type' }),
      getDictList({ parentKey: 'entry_exit_type' })
    ])
    .then(([cardTypeList, typeList]) => {
      this.setState({
        cardTypeList,
        typeList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { cardTypeList, typeList, isLoading } = this.state;
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'localProjectCode',
      valueName: 'projectName',
      required: true
    }, {
      title: '项目人员进退场列表',
      field: 'dateList',
      type: 'import',
      required: true,
      options: {
        fields: [{
          title: '企业统一社会信用代码',
          field: 'corpCode'
        }, {
          title: '工人所属企业名称',
          field: 'corpName'
        }, {
          title: '工人所属班组名称',
          field: 'teamName'
        }, {
          title: '证件类型',
          field: 'idcardType'
        }, {
          title: '证件号码',
          field: 'idcardNumber'
        }, {
          title: '进退场日期',
          field: 'date',
          type: 'datetime'
        }, {
          title: '类型',
          field: 'type'
        }]
      }
    }];
    return isLoading ? (
      <Spin spinning={true}></Spin>
    ) : this.buildDetail({
      fields,
      addCode: 631733,
      beforeSubmit: (params) => {
        for (let i = 0; i < params.dateList.length; i++) {
          let item = params.dateList[i];
          findAndchangeInfo(cardTypeList, item, 'idcardType', i);
          findAndchangeInfo(typeList, item, 'type', i);
        }
        return true;
      }
    });
  }
}

export default InputImport;
