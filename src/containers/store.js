import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import Page from '../components/page';
import StoreInfo from '../components/store_info';
import Notfound from '../components/not_found';
import { HOT_TAGS } from '../data/data';
import {
  fetchStoreInfo,
  fetchStoreComments,
} from '../actions/index';

const renderNotFound = () => {
  return (<Notfound tags={HOT_TAGS.slice(0, 3)} />);
};

const renderLoading = () => {
  return (
    <div className="icon-loading store-item__loading" />
  );
};

class Store extends Component {
  componentDidMount() {
    const { dispatch, router } = this.props;
    const { id } = this.props.match.params;
    dispatch(fetchStoreInfo(id));
    dispatch(fetchStoreComments(id));
  }

  componentDidUpdate(prevProps) {
    const {
      dispatch,
      match: { params: { id }},
    } = this.props;

    if (id !== prevProps.match.params.id) {
      dispatch(fetchStoreInfo(id));
      dispatch(fetchStoreComments(id));
    }
  }

  render() {
    const { store, storeComments } = this.props;
    const isNotFound = _.isEmpty(store);
    const isLoading = _.isObject(store) && _.isEmpty(store);

    return (
      <Page title="商店單頁" id="store">
        <div className="panel">
          { !isNotFound
          && (
            <div>
              <h1 className="panel__main-heading mb-2x">
                <Link to={`/store/${store.id}`} title={store.name}>
                  {store.name}
                </Link>
              </h1>
              <StoreInfo store={store} comments={storeComments} />
            </div>
          )
          }
          { isNotFound && renderNotFound() }
          { isLoading && renderLoading() }
        </div>
      </Page>
    );
  }
}

Store.propTypes = {
  store: PropTypes.object.isRequired,
  storeComments: PropTypes.object,
};

Store.defaultProps = {
  storeComments: {},
};

export default withRouter(connect(state => state)(Store));
