import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import Page from '../components/page';
import StoreItem from '../components/store_item';
import Notfound from '../components/not_found';

import {
  fetchStoreList,
  fetchStoreListByTag,
} from '../actions/index';
import { hotTags } from '../data/data';

const renderStores = (stores) => {
  return _.map(stores, (store) => {
    return (
      <StoreItem key={store.id} store={store} />
    );
  });
};

const renderNotFound = () => {
  return (<Notfound tags={hotTags.slice(0, 3)} />);
};

const renderLoading = () => {
  return (
    <div className="icon-loading store-item__loading" />
  );
};

class Tag extends Component {
  componentDidMount() {
    const {
      fetchStoreList,
      fetchStoreListByTag,
    } = this.props;
    const keyword = this.props.match.params.keyword;

    keyword ? fetchStoreListByTag(keyword) : fetchStoreList();
  }

  componentDidUpdate(prevProps) {
    const {
      fetchStoreListByTag,
      match: { params: { keyword }}
    } = this.props;

    if (keyword !== prevProps.match.params.keyword) {
      fetchStoreListByTag(keyword);
    }
  }

  render() {
    const { stores } = this.props;
    const keyword = this.props.match.params.keyword;
    const isNotFound = _.isArray(stores) && _.isEmpty(stores);
    const isLoading = _.isObject(stores) && !_.isArray(stores) && _.isEmpty(stores);
    return (
      <Page title="標籤頁" id="tag">
        <div className="panel">
          { !isNotFound
            && (
              <h1 className="panel__main-heading mb-2x">
                {
                  keyword
                }
              </h1>
            )
          }
          { renderStores(stores) }
          { isNotFound && renderNotFound() }
          { isLoading && renderLoading() }
        </div>
      </Page>
    );
  }
}

Tag.propTypes = {
  hotStoresData: PropTypes.array.isRequired,
  nearbyStoresData: PropTypes.array.isRequired,
  recommendStoresData: PropTypes.array.isRequired,
};

const mapDispatchToProps = {
  fetchStoreList,
  fetchStoreListByTag,
};

export default withRouter(connect(
  state => state,
  mapDispatchToProps,
)(Tag));
