import _ from 'lodash';
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { fetchStoreListByTag } from '../actions/index';
import Notfound from '../components/not_found';
import Page from '../components/page';
import Store from '../components/store_item';
import { HOT_TAGS } from '../data/data';

const StoreListContext = createContext();

const Stores = () => {
  const stores = useContext(StoreListContext);

  return _.map(stores, (store) =>
    <Store key={store.id} store={store} />
  );
};

const renderNotFound = () => {
  return (<Notfound tags={HOT_TAGS.slice(0, 3)} />);
};

const renderLoading = () => {
  return <div className="icon-loading store-item__loading" />;
};

const checkNotFoundStoreStatus = (stores) => {
  return _.isArray(stores) && _.isEmpty(stores)
};

const renderView = (stores) => {
  const isNotFound = checkNotFoundStoreStatus(stores);
  const isLoading = _.isObject(stores) && !_.isArray(stores) && _.isEmpty(stores);

  if (isLoading) {
    return renderLoading();
  } else if (isNotFound) {
    return renderNotFound();
  }
}

const Tag = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();
  const stores = useSelector(state => state.stores);
  const isNotFound = checkNotFoundStoreStatus(stores);

  useEffect(() => {
    dispatch(fetchStoreListByTag(keyword));
  }, [keyword]);

  return (
    <Page title="標籤頁" id="tag">
      <div className="panel">
        <StoreListContext.Provider value={stores}>
          { !isNotFound
            && (
              <h1 className="panel__main-heading mb-2x">
                {
                  keyword
                }
              </h1>
            )
          }
          <Stores />
          {renderView(stores)}
          </StoreListContext.Provider>
      </div>
    </Page>
  )
}

Tag.propTypes = {
  hotStoresData: PropTypes.array.isRequired,
  nearbyStoresData: PropTypes.array.isRequired,
  recommendStoresData: PropTypes.array.isRequired,
};

export default Tag;
