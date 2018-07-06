import React from 'react';
import ModalDetail from 'common/js/build-modal-detail';
import { getUserId } from 'common/js/util';

class ContactWithUs extends React.Component {
  constructor(props) {
    super(props);
    this.text = 'https://gw.alipayobjects.com/zos/rmsportal/DkKNubTaaVsKURhcVGkh.svg';
  }
  render() {
    const options = {
      fields: [{
        field: 'oldLoginPwd',
        title: '二维码',
        type: 'img',
        value: this.text,
        readonly: true
      }],
      addCode: 631073
    };
    return (
      <ModalDetail
        title='联系我们'
        visible={this.props.contactWithUsVisible}
        hideModal={() => this.props.setContactWithUsVisible(false)}
        options={options} />
    );
  }
}

export default ContactWithUs;
