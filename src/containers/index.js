import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Page from '../components/page';
import Card from '../components/card';

import {
  addFavList,
  fetchHotStoreList,
  fetchNearbyStoreList,
  fetchRecommendStoreList,
} from '../actions/index';

class Index extends Component {
  constructor(props) {
    super(props);

    this.renderCards = this.renderCards.bind(this);
  }

  componentDidMount() {
    const { dispatch } = this.props;

    dispatch(fetchNearbyStoreList());
    dispatch(fetchRecommendStoreList());
    dispatch(fetchHotStoreList());
  }

  renderCards(stores) {
    const { dispatch } = this.props;
    return _.map(stores, (store) => <Card key={store.id} store={store} addFavList={(args) => {dispatch(addFavList(args))}} />);
  };

  render() {
    const {
      hotStoresData,
      nearbyStoresData,
      recommendStoresData,
    } = this.props.filteredStores;

    return (
      <Page title="首頁" id="index">
        <div className="panel">
          <h1 className="panel__main-heading">
            離我最近
            <span className="panel__heading-deco icon-pin-map" />
          </h1>
          <Link
            to="/nearby"
            className="panel__view-more"
            title="看更多-離我最近"
          >
            看更多
          </Link>
          <div className="card-list">
            { this.renderCards(nearbyStoresData) }
          </div>
        </div>
        <div className="panel">
          <h1 className="panel__main-heading">
            猜你想吃
          </h1>
          <Link to="/nearby" className="panel__view-more" title="看更多-猜你想吃">
            看更多
          </Link>
          <div className="card-list">
            { this.renderCards(recommendStoresData) }
          </div>
        </div>
        <div className="panel">
          <h1 className="panel__main-heading">
            熱門推薦
            <span className="panel__heading-deco icon-star" />
          </h1>
          <Link to="/nearby" className="panel__view-more" title="看更多-熱門推薦">
            看更多
          </Link>
          <div className="card-list">
            { this.renderCards(hotStoresData) }
          </div>
        </div>
      </Page>
    );
  }
}

Index.propTypes = {
  hotStoresData: PropTypes.array,
  nearbyStoresData: PropTypes.array,
  recommendStoresData: PropTypes.array,
};

Index.defaultProps = {
  hotStoresData: [],
  nearbyStoresData: [],
  recommendStoresData: [],
};

export default connect(state => state)(Index);
