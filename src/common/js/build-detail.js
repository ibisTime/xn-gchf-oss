import React from 'react';
import { connect } from 'react-redux';
import { Form } from 'antd';
import ModalDetail from 'common/js/build-modal-detail';
import DetailComp from './lib/detailComp';
export const DetailWrapper = (mapStateToProps = state => state, mapDispatchToProps = {}) => (WrapComponent) => {
  return (
    @Form.create()
    @connect(mapStateToProps, mapDispatchToProps)
    class DetailComponent extends DetailComp {
      render() {
        return (
          <div>
            <WrapComponent {...this.props} buildDetail={this.buildDetail} getSelectData={this.getSelectData}></WrapComponent>
            <ModalDetail
              title={this.state.modalOptions.title || ''}
              visible={this.state.modalVisible}
              hideModal={() => this.setState({modalVisible: false})}
              options={this.state.modalOptions}></ModalDetail>
          </div>
        );
      }
    }
  );
};