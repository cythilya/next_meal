import _ from 'lodash';
import React, { createContext, useContext, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import PropTypes from 'prop-types';
import { Center, CircularProgress } from '@chakra-ui/react';
import { fetchStoreListByTag } from '../actions/index';
import Notfound from '../components/not_found';
import Page from '../components/page';
import Store from '../components/store_item';
import { useUIDispatch, useUIState } from '../context';
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
  return (
    <Center h='100vh'>
      <CircularProgress isIndeterminate color="orange.400" />
    </Center>
  )
};

const checkNotFoundStoreStatus = (stores) => {
  return _.isArray(stores) && _.isEmpty(stores)
};

const Tag = () => {
  const dispatch = useDispatch();
  const { toggleLoading } = useUIDispatch();
  const { keyword } = useParams();
  const { isLoading } = useUIState();
  const stores = useSelector(state => state.stores);
  const isNotFound = checkNotFoundStoreStatus(stores);

  useEffect(() => {
    toggleLoading(true);
    dispatch(fetchStoreListByTag(keyword)).then(() => {
      toggleLoading(false);
    });
  }, [keyword]);

  return (
    <Page title="標籤頁" id="tag">
      {isLoading && renderLoading()}
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
          {isNotFound && renderNotFound()}
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
