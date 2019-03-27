import React from 'react';
import {
  initStates,
  doFetching,
  cancelFetching,
  setSelectData,
  setPageData,
  restore
} from '@redux/biz/company/info-addedit';
import { getQueryString, getUserId } from 'common/js/util';
import { DetailWrapper } from 'common/js/build-detail';

@DetailWrapper(
  state => state.companyInfoAddEdit,
  { initStates, doFetching, cancelFetching, setSelectData, setPageData, restore }
)
class CompanyInfoAddEdit extends React.Component {
  constructor(props) {
    super(props);
    this.code = getQueryString('code', this.props.location.search);
    this.view = !!getQueryString('v', this.props.location.search);
  }
  render() {
    const fields = [{
      title: '企业名称',
      field: 'corpName',
      required: true
    }, {
      title: '企业登记注册类型',
      field: 'corpType',
      type: 'select',
      key: 'corp_type'
    }, {
      title: '统一社会信用代码',
      field: 'corpCode',
      required: true
    }, {
      title: '工商营业执照注册号',
      field: 'licenseNum'
    }, {
      title: '注册地区编码',
      field: 'areaCode',
      required: true
    }, {
      title: '企业营业地址',
      field: 'address',
      required: true
    }, {
      title: '邮政编码',
      field: 'zipCode'
    }, {
      title: '法定代表人姓名',
      field: 'legalMan'
    }, {
      title: '法定代表人职务',
      field: 'legalManDuty'
    }, {
      title: '法定代表人职称',
      field: 'legalManProTitle'
    }, {
      title: '法定代表人证件类型',
      field: 'legalManIdcardType',
      type: 'select',
      key: 'legal_manid_card_type'
    }, {
      title: '法定代表人证件号码',
      field: 'legalManIdcardNumber'
    }, {
      title: '注册资本',
      field: 'regCapital'
    }, {
      title: '实收资本',
      field: 'factRegCapital'
    }, {
      title: '资本币种',
      field: 'capitalCurrencyType',
      type: 'select',
      key: 'capital_currency_type'
    }, {
      title: '注册日期',
      field: 'registerDate',
      type: 'date',
      required: true
    }, {
      title: '成立日期',
      field: 'establishDate',
      type: 'date'
    }, {
      title: '办公电话',
      field: 'officePhone'
    }, {
      title: '传真号码',
      field: 'faxNumber'
    }, {
      title: '联系人姓名',
      field: 'linkMan'
    }, {
      title: '联系人电话',
      field: 'linkPhone',
      mobile: true
    }, {
      title: '企业邮箱',
      field: 'email'
    }, {
      title: '企业网址',
      field: 'webSite'
    }];
    return this.props.buildDetail({
      fields,
      code: this.code,
      view: this.view,
      detailCode: 631256,
      addCode: 631250,
      editCode: 631251,
      beforeDetail: (params) => {
        params.userId = getUserId();
      }
    });
  }
}

export default CompanyInfoAddEdit;
