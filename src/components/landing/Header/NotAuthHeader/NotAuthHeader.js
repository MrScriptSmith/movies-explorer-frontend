import React from 'react';
import Logo from '../../common/Logo/Logo';

import './NotAuthHeader.css';

function NotAuthHeader({ isThemeDark }) {
  const backGroundColorClass = `not-auth-header ${
    isThemeDark ? 'auth-header_theme_dark' : 'auth-header_theme_light'
  }`;

  return (
    <header className={backGroundColorClass}>
      <Logo />
      <ul className="not-auth-header__links">
        <li>
          <a
            href="#link"
            target="_blank"
            className="not-auth-header__link link-hover"
          >
            Регистрация
          </a>
        </li>
        <li>
          <button
            type="button"
            aria-label="Войти"
            className="not-auth-header__button button-hover cursor-pointer"
          >
            Войти
          </button>
        </li>
      </ul>
    </header>
  );
}

export default NotAuthHeader;
