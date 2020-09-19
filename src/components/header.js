import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withCookies } from 'react-cookie';
import { Link, withRouter } from 'react-router-dom';
import ReactGA from 'react-ga';
import Perfume from 'perfume.js';
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/core";
import {
  login,
  logout,
  restoreUserInfo,
} from '../actions/index';
import { DOTCH_FOOD_COOKIE_KEY } from '../constants';
import { menu } from '../constants/router';
import { product } from '../constants/config';
import '../styles/components/header.scss';

const MODAL_TYPE = {
  LOGIN: 'login',
};

const analyticsTracker = function ({ metricName, data, duration }) {
  switch (metricName) {
    case 'navigationTiming':
      if (data && data.timeToFirstByte) {
        ReactGA.event({
          category: 'performance by perfume',
          action: 'navigationTiming',
          value: Number(data.timeToFirstByte),
          label: `${metricName}: ${data.timeToFirstByte}`,
        });
      }
      break;
    case 'networkInformation':
      if (data && data.effectiveType) {
        ReactGA.event({
          category: 'performance by perfume',
          action: 'networkInformation',
          value: Number(data.effectiveType),
          label: `${metricName}: ${data.effectiveType}`,
        });
      }
      break;
    case 'fp':
    case 'fcp':
    case 'fid':
    case 'lcp':
    case 'lcpFinal':
    case 'cls':
    case 'clsFinal':
    case 'tbt':
    case 'tbt5S':
    case 'tbt10S':
    case 'tbtFinal':
      const duration = Number(data);
      console.log(`${metricName}: ${duration}`);
      ReactGA.event({
        category: 'performance by perfume',
        action: metricName,
        value: duration,
        label: `${metricName}: ${duration}`,
      });
      break;
    default:
      break;
  }
};

const perfume = new Perfume({
  firstPaint: true,
  firstContentfulPaint: true,
  firstInputDelay: true,
  timeToInteractive: true,
  logging: true,
  googleAnalytics: {
    enable: true,
    timingVar: 'userId',
  },
  analyticsTracker,
});

class Header extends Component {
  constructor(props) {
    super(props);

    this.state = {
      account: null,
      keyword: '',
      modalType: null,
      password: null,
    };

    this.onSeachHandler = this.onSeachHandler.bind(this);
    this.onSearchInputChange = this.onSearchInputChange.bind(this);
    this.renderLoginModal = this.renderLoginModal.bind(this);
    this.renderLogo = this.renderLogo.bind(this);
    this.renderMenuItems = this.renderMenuItems.bind(this);
    this.renderMenuList = this.renderMenuList.bind(this);
    this.renderSearchBox = this.renderSearchBox.bind(this);

    perfume.start('AppAfterPaint');
  }

  componentDidMount() {
    const {
      dispatch,
      cookies: { cookies },
    } = this.props;

    const userId = this.props.user.isLogin ? this.props.user.userInfo.id : 'unknown user';

    ReactGA.initialize('UA-44647801-7', {
      gaOptions: {
        userId,
      },
    });

    perfume.endPaint('AppAfterPaint');

    // restore user info from cookie when reload page
    if (cookies && cookies[DOTCH_FOOD_COOKIE_KEY]) {
      try {
        dispatch(restoreUserInfo(JSON.parse(cookies[DOTCH_FOOD_COOKIE_KEY])));
      } catch(e) {
        console.log(e);
        dispatch(logout());
      }
    } else {
      dispatch(logout());
    }
  }

  componentDidUpdate({ location: prevLocation }) {
    const {
      location: { pathname, search },
    } = this.props;
    const isDifferentPathname = pathname !== prevLocation.pathname;
    const isDifferentSearch = search !== prevLocation.search;

    if (isDifferentPathname || isDifferentSearch) {
      this.logPageChange(pathname, search);
    }
  }

  logPageChange(pathname, search = '') {
    const page = pathname + search;
    const { location } = window;
    ReactGA.set({
      page,
      location: `${location.origin}${page}`,
      ...this.props.options,
    });
    ReactGA.pageview(page);
  }

  onSearchInputChange(keyword) {
    this.setState({ keyword });
  }

  onAccountInputChange(account) {
    this.setState({ account });
  }

  onPasswordInputChange(password) {
    this.setState({ password });
  }

  onSeachHandler(e) {
    if (e.key === 'Enter') {
      const keyword = e.target.value;
      this.props.history.push(`/tag/${keyword}`);
    }
  }

  renderMenuList() {
    return (
      <div className="header__menu-list">
        {this.renderMenuItems()}
      </div>
    )
  }

  renderMenuItems() {
    const { isLogin } = this.props.user;

    return _.map(menu, (item) => {
      return (
        (isLogin === item.needLogin) &&
        <div
          key={item.title}
          className="header__menu__item"
          id={item.id}
        >
          <Link
            to={item.link}
            title={item.title}
            className="header__menu__item__link"
            onClick={() => {
              if (item.modalType === MODAL_TYPE.LOGIN) {
                this.setState({ modalType: MODAL_TYPE.LOGIN });
              } else if (item.id === 'logout') {
                this.props.dispatch(logout());
              }
            }}
          >
            <span
            title={item.title}
            className={`header__menu__item__icon icon-${item.icon}`}
            />
            <span className="header__menu__item__title">
              {item.title}
            </span>
          </Link>
        </div>
      );
    })
  }

  renderSearchBox() {
    const { keyword } = this.state;

    return (
      <div className="header__searchbox">
        <input
          className="header__search-input"
          placeholder="有什麼好吃的？"
          aria-label="有什麼好吃的？"
          value={keyword}
          onChange={e => this.onSearchInputChange(e.target.value)}
          onKeyPress={e => this.onSeachHandler(e)}
        />
        <button
          type="button"
          className="header__searchbox__cancel"
          onClick={() => this.onSearchInputChange('')}
        >
          x
        </button>
      </div>
    )
  }

  renderLoginModal() {
    const { dispatch } = this.props;
    const { modalType } = this.state;

    return (
      <Modal
        isOpen={modalType === MODAL_TYPE.LOGIN}
        onClose={() => { this.setState({modalType: null}); }}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Log On</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel htmlFor="account">Account</FormLabel>
              <Input
                type="text"
                id="account"
                placeholder="Account"
                onChange={e => this.onAccountInputChange(e.target.value)}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                type="password"
                id="password"
                placeholder="Password"
                onChange={e => this.onPasswordInputChange(e.target.value)}
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              variant="ghost"
              id="submit"
              onClick={() => {
                const { account, password } = this.state;
                const result = dispatch(login(account, password, () => {
                  this.setState({ modalType: null })
                }));
              }}
            >
              Log On
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  }

  renderLogo() {
    return (
      <div className="header__nav">
      <Link to="/" title={product.title}>
        <i
          className="header__logo icon-logo"
          aria-label={product.title}
        />
      </Link>
      <Link
        to="/"
        className="header__title"
        title={product.title}
      >
        { product.title }
      </Link>
    </div>
    )
  }

  render() {
    const { modalType } = this.state;

    return (
      <div className="header">
        <div className="header__main">
          {this.renderLogo()}
          {this.renderSearchBox()}
        </div>
        <div className="header__control">
          {this.renderMenuList()}
          {this.renderLoginModal()}
        </div>
        {modalType === MODAL_TYPE.LOGON && this.renderLoginModal()}
      </div>
    );
  }
}

export default withRouter(withCookies(connect(state => state)(Header)));
