import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from './header';
import Newsticker from 'react-newsticker';
import Footer from './footer';
import TagList from './tag_list';
import  {
  categories,
  hotCategories,
  hotTopics,
  news,
} from '../data/data';
import '../styles/index.scss';

class Page extends Component {
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

export default connect(state => state)(Page);
