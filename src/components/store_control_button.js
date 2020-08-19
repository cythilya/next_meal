import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { icon as iconData } from '../data/data';
import '../styles/components/store_control_button.scss';

const StoreControlButtons = ({ store }) => {
  return (
    <div className="store-control-buttons">
      { store.booking.phone
        && (
        <Link
          to={`tel:${store.booking.phone}`}
          title={iconData.phoneBooking}
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
          <span
            className="store-control-buttons__icon icon-phone-white"
            title={iconData.phoneBooking}
          />
          <span className="button-with-line-breaks-text">
            {iconData.phoneBooking}
          </span>
        </Link>
        )
      }
      { store.booking.online
        && (
        <Link
          to={`${store.booking.online}`}
          title={iconData.onlineBooking}
          className="button"
          target="_blank"
          rel="noopener noreferrer"
        >
        <span
          className="store-control-buttons__icon icon-online-booking"
          title={iconData.onlineBooking}
        />
        <span className="button-with-line-breaks-text">
          {iconData.onlineBooking}
        </span>
        </Link>
        )
      }
      <Link
        to={`https://www.google.com.tw/maps/search/${store.location.address}`}
        title={iconData.navigation}
        className="button"
        target="_blank"
        rel="noopener noreferrer"
      >
      <span
        className="store-control-buttons__icon icon-pin-on-map"
        title={iconData.navigation}
      />
      <span className="button-with-line-breaks-text short-word">
        {iconData.navigation}
      </span>
      </Link>
    </div>
  );
};

StoreControlButtons.propTypes = {
  store: PropTypes.object.isRequired,
};

export default StoreControlButtons;
