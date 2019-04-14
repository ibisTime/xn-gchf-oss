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
      isLoading: false
    };
  }
  componentDidMount() {
    // Promise.all([
    //   getDictList({ parentKey: 'legal_manid_card_type' }),
    //   getDictList({ parentKey: 'entry_exit_type' })
    // ])
    // .then(([cardTypeList, typeList]) => {
    //   this.setState({
    //     cardTypeList,
    //     typeList,
    //     isLoading: false
    //   });
    // }).catch(() => {
    //   this.setState({ isLoading: false });
    // });
  }
  render() {
    const { cardTypeList, typeList, isLoading } = this.state;
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
        name: '项目人员进退场导入模板',
        url: '/download/04.项目人员进退场导入模板.xlsx'
      }]
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
        let error = false;
        // for (let i = 0; i < params.dateList.length; i++) {
        //   let item = params.dateList[i];
        //   let error1 = findAndchangeInfo(cardTypeList, item, 'idcardType', i);
        //   let error2 = findAndchangeInfo(typeList, item, 'type', i);
        //   if (!error) {
        //     error = error1 || error2;
        //   }
        // }
        return !error;
      }
    });
  }
}

export default InputImport;
