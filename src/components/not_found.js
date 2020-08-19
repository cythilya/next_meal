import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { Link } from 'react-router-dom';
import Card from './card';
import { fetchRecommendStoreList } from '../actions';

class Notfound extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(fetchRecommendStoreList());
  }

  renderCards(recommendStoresData) {
    return _.map(recommendStoresData, (store) => {
      return (
        <Card key={store.id} store={store} ref={this.card} />
      );
    });
  };

  render() {
    const { tags } = this.props;
    const { filteredStores: { recommendStoresData } } = this.props;

    return (
      <div>
        <h1 className="panel__main-heading">
          找不到！
        </h1>
        <Link to="/" title="回「吃什麼」首頁">
          回首頁
        </Link>
        或看熱門關鍵字
        <Link to={`/tag/${tags[0]}`} title={tags[0]}>
          {tags[0]}
        </Link>
        、
        <Link to={`/tag/${tags[1]}`} title={tags[1]}>
          {tags[1]}
        </Link>
        、
        <Link to={`/tag/${tags[2]}`} title={tags[2]}>
          {tags[2]}
        </Link>
        <hr />
        <div className="mt-2x">
          <h1 className="panel__main-heading">
          猜你想吃
          </h1>
          <div className="card-list">
            {this.renderCards(recommendStoresData)}
          </div>
        </div>
      </div>
    );
  }
}


Notfound.propTypes = {
  tags: PropTypes.array.isRequired,
  filteredStores: PropTypes.object,
};

Notfound.defaultProps = {
  filteredStores: null,
};

export default connect(state => state)(Notfound);
