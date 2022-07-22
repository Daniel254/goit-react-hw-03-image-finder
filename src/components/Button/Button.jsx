import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Button.module.css';

export default class Button extends Component {
  static propTypes = { onClick: PropTypes.func.isRequired };

  render() {
    const { onClick } = this.props;
    return (
      <button type="button" onClick={onClick} className={css['Button']}>
        Load more
      </button>
    );
  }
}
