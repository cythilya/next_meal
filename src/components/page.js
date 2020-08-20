import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withCookies } from 'react-cookie';
import { withRouter } from 'react-router-dom';
import Newsticker from 'react-newsticker';
import Header from './header';
import Footer from './footer';
import TagList from './tag_list';
import { DOTCH_FOOD_COOKIE_KEY } from '../constants';
import  {
  categories,
  hotCategories,
  hotTopics,
  news,
} from '../data/data';
import '../styles/index.scss';

class Page extends Component {
  componentDidMount() {
    const { dispatch, cookies: { cookies } } = this.props;
    // restore user info from cookie when reload page
    if (!cookies || !cookies[DOTCH_FOOD_COOKIE_KEY]) {
      this.props.history.push(`/`);
    }
  }

  render() {
    const { id } = this.props;
    const reverse = id === 'index' ? 'app-container--reverse' : '';

    return (
      <div>
        <Header />
        <div className="newsticker">
          <Newsticker news={news} />
        </div>
        <div className={`app-container ${reverse}`}>
          <div className="app-main-content">
            { this.props.children }
          </div>
          <div className="app-menu">
            <div className="panel">
              <h1 className="panel__main-heading mb-1x">
                熱門主題
              </h1>
              <TagList tags={hotCategories} />
            </div>
          </div>
        </div>
        <Footer categories={categories} topics={hotTopics} />
      </div>
    );
  }
}

Page.propTypes = {
  id: PropTypes.string.isRequired,
};

export default withRouter(withCookies(connect(state => state)(Page)));
