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
      cardTypeList: [],
      isLoading: true
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'project_corp_type' }),
      getDictList({ parentKey: 'legal_manid_card_type' })
    ]).then(([cropTypeList, cardTypeList]) => {
      this.setState({
        cropTypeList,
        cardTypeList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { cropTypeList, cardTypeList, isLoading } = this.state;
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'localProjectCode',
      valueName: 'projectName',
      required: true
    }, {
      field: 'userId',
      value: getUserId(),
      hidden: true
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
          title: '项目经理证件类型',
          field: 'pmIDCardType'
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
        for (let i = 0; i < params.dateList.length; i++) {
          let item = params.dateList[i];
          findAndchangeInfo(cropTypeList, item, 'corpType', i);
          if (!isUndefined(item.pmIDCardType)) {
            findAndchangeInfo(cardTypeList, item, 'pmIDCardType', i);
          }
        }
        return true;
      }
    });
  }
}

export default ParticipatingImport;