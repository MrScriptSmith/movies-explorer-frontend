import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './PopupProfile.css';
import { CurrentUserContext } from '../../../contexts/CurrentUserContext';
import { useFormWithValidation } from '../../../utils/hooks/useFormWithValidation';
import { capitalizeFirstLetter } from '../../../utils/utils';

function Profile({ onSignOut, onUpdateProfile }) {
  const currentUser = useContext(CurrentUserContext);
  const { values, handleChange, errors, isValid, resetForm } =
    useFormWithValidation();
  const [textSubmit, setTextSubmit] = useState('');
  const [isDataChanged, setIsDataChanged] = useState(false);

  const navigate = useNavigate();

  const nameInTitle = (str) => `Привет, ${capitalizeFirstLetter(str)}!`;
  const handleButtonClick = () => {
    onSignOut();
    navigate('/signin');
  };

  useEffect(() => {
    // Устанавливаем начальные значения полей при обновлении currentUser
    if (currentUser) {
      resetForm({
        name: currentUser.name || '',
        email: currentUser.email || '',
      });
    }
  }, [currentUser, resetForm]);

  useEffect(() => {
    // Сверяем текущее значение с изначальным и возводим флаг
    if (currentUser) {
      const isNameChanged = values.name !== currentUser.name;
      const isEmailChanged = values.email !== currentUser.email;
      setIsDataChanged(isNameChanged || isEmailChanged);
    }
  }, [values, currentUser]);

  async function handleSubmit(e) {
    e.preventDefault();
    if (isValid) {
      try {
        await onUpdateProfile({
          name: values.name,
          email: values.email,
        });
        setTextSubmit(`Данные обновлены`);
      } catch (error) {
        setTextSubmit(``);
      }
    }
  }
  const submitClass = `profile__submit ${
    isValid && isDataChanged
      ? 'cursor-pointer button-hover'
      : 'profile__submit_inactive'
  }`;

  return (
    <main>
      <section className="profile">
        <h1 className="profile__name">
          {currentUser && nameInTitle(currentUser.name)}
        </h1>
        <form action="#" className="profile__form" onSubmit={handleSubmit}>
          <div className="profile__container-input">
            <div className="profile__label-input-wrapper">
              <label htmlFor="profile-name" className="profile__label">
                Имя
              </label>
              <input
                placeholder="Имя"
                name="name"
                id="profile-name"
                type="text"
                className="profile__input input-style"
                value={values.name || ''}
                onChange={handleChange}
                autoComplete="name"
              />
            </div>
            <span className="profile__input-text-error">{errors.name}</span>
          </div>
          <div className="profile__container-input">
            <div className="profile__label-input-wrapper">
              <label htmlFor="profile-email" className="profile__label">
                E-mail
              </label>
              <input
                placeholder="example@example.ru"
                name="email"
                id="profile-email"
                type="email"
                className="profile__input input-style"
                value={values.email || ''}
                onChange={handleChange}
                autoComplete="email"
              />
            </div>
            <span className="profile__input-text-error">{errors.email}</span>
          </div>
          <span className="profile__submit-text">{textSubmit}</span>
          <button
            className={submitClass}
            aria-label="Редактировать профиль"
            type="submit"
            name="supmitProfileButton"
            disabled={!isValid || !isDataChanged}
          >
            Редактировать
          </button>
        </form>
        <button
          className="profile__button-exit cursor-pointer button-hover"
          aria-label="Выйти из аккаунта"
          type="button"
          onClick={handleButtonClick}
        >
          Выйти из аккаунта
        </button>
      </section>
    </main>
  );
}

export default Profile;
