import PropTypes from 'prop-types';
import React, { Component } from 'react';
import css from './Searchbar.module.css';

export default class Searchbar extends Component {
  static propTypes = { onSubmit: PropTypes.func.isRequired };

  render() {
    const { onSubmit } = this.props;
    return (
      <header className={css['Searchbar']}>
        <form className={css['SearchForm']} onSubmit={onSubmit}>
          <button type="submit" className={css['SearchForm-button']}>
            <span className={css['SearchForm-button-label']}>Search</span>
          </button>

          <input
            className={css['SearchForm-input']}
            type="text"
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
            name="searchQuery"
          />
        </form>
      </header>
    );
  }
}
