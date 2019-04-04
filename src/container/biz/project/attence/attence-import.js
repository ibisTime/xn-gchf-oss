import React from 'react';
import { Form, Spin } from 'antd';
import DetailUtil from 'common/js/build-detail-dev';
import { getUserId, findAndchangeInfo, isUndefined } from 'common/js/util';
import { getDictList } from 'api/dict';

@Form.create()
class AttenceImport extends DetailUtil {
  constructor(props) {
    super(props);
    this.state = {
      ...this.state,
      projectCode: '',
      cardTypeList: [],
      directionList: [],
      attendTypeList: [],
      isLoading: true
    };
  }
  componentDidMount() {
    Promise.all([
      getDictList({ parentKey: 'legal_manid_card_type' }),
      getDictList({ parentKey: 'direction' }),
      getDictList({ parentKey: 'attend_type' })
    ]).then(([cardTypeList, directionList, attendTypeList]) => {
      this.setState({
        cardTypeList,
        directionList,
        attendTypeList,
        isLoading: false
      });
    }).catch(() => {
      this.setState({ isLoading: false });
    });
  }
  render() {
    const { cardTypeList, directionList, attendTypeList, isLoading } = this.state;
    const fields = [{
      title: '对应项目',
      field: 'projectCode',
      type: 'select',
      listCode: '631626',
      keyName: 'localProjectCode',
      valueName: 'projectName',
      onChange: (projectCode, data) => {
        this.setState({ projectCode });
      },
      required: true
    }, {
      title: '所在班组',
      field: 'teamSysNo',
      type: 'select',
      keyName: 'code',
      valueName: 'teamName',
      searchName: 'teamName',
      pageCode: 631665,
      params: {
        projectCode: this.state.projectCode,
        userId: getUserId()
      },
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
          title: '工人所属企业名称',
          field: 'corpName'
        }, {
          title: '工人所属班组名称',
          field: 'teamName'
        }, {
          title: '证件类型',
          field: 'idCardType'
        }, {
          title: '证件号码',
          field: 'idCardNumber'
        }, {
          title: '刷卡时间',
          field: 'date',
          type: 'datetime'
        }, {
          title: '刷卡进出方向',
          field: 'direction'
        }, {
          title: '通行方式',
          field: 'channel'
        }]
      }
    }];
    return isLoading ? (
      <Spin spinning={true}></Spin>
    ) : this.buildDetail({
      fields,
      addCode: 631713,
      beforeSubmit: (params) => {
        for (let i = 0; i < params.dateList.length; i++) {
          let item = params.dateList[i];
          findAndchangeInfo(cardTypeList, item, 'idCardType', i);
          findAndchangeInfo(directionList, item, 'direction', i);
          if (!isUndefined(item.channel)) {
            findAndchangeInfo(attendTypeList, item, 'channel', i);
          }
        }
        return true;
      }
    });
  }
}

export default AttenceImport;
