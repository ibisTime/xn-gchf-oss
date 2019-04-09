import React from 'react';
import { Form, Spin } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId, findAndchangeInfo, isUndefined } from 'common/js/util';
import { getDictList } from 'api/dict';

@Form.create()
class ClassImport extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      cardTypeList: [],
      isLoading: true
    };
  }
  componentDidMount() {
    getDictList({ parentKey: 'legal_manid_card_type' }).then((cardTypeList) => {
      this.setState({
        cardTypeList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { cardTypeList, isLoading } = this.state;
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
          title: '企业统一社会信用代码',
          field: 'corpCode'
        }, {
          title: '企业名称',
          field: 'corpName'
        }, {
          title: '班组名称',
          field: 'teamName'
        }, {
          title: '责任人姓名',
          field: 'responsiblePersonName'
        }, {
          title: '责任人联系电话',
          field: 'responsiblePersonPhone'
        }, {
          title: '责任人证件类型',
          field: 'responsiblePersonIdcardType'
        }, {
          title: '责任人证件号码',
          field: 'responsiblePersonIdNumber'
        }, {
          title: '备注',
          field: 'remark'
        }, {
          title: '进场时间',
          field: 'entryTime',
          type: 'datetime'
        }, {
          title: '退场时间',
          field: 'exitTime',
          type: 'datetime'
        }]
      }
    }];
    return isLoading ? (
      <Spin spinning={true}></Spin>
    ) : this.buildDetail({
      fields,
      addCode: 631653,
      beforeSubmit: (params) => {
        for (let i = 0; i < params.dateList.length; i++) {
          let item = params.dateList[i];
          if (!isUndefined(item.responsiblePersonIdcardType)) {
            findAndchangeInfo(cardTypeList, item, 'responsiblePersonIdcardType', i);
          }
        }
        return true;
      }
    });
  }
}

export default ClassImport;