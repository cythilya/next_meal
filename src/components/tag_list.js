import _ from 'lodash';
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import '../styles/components/tag_list.scss';

const TagList = ({ tags }) => {
  return (
    <div className="tag-list">
      {
        _.map(tags, (item) => {
          return (
            <div
              key={item.id}
              className="tag-list__item"
            >
              <Link href={`/tag?keyword=${item.tag}`}>
                <a
                  title={item.title}
                  className="tag-list__item__link"
                >
                  <span
                    title={item.title}
                    className={`tag-list__item__icon icon-${item.className}`}
                  />
                  <span className="tag-list__item__title">
                    {item.title}
                  </span>
                </a>
              </Link>
            </div>
          );
        })
      }
    </div>
  );
};

TagList.propTypes = {
  tags: PropTypes.array.isRequired,
};

export default TagList;
