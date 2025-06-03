'use client';

import { FormEvent, useState } from 'react';
import { useRouter } from 'next/navigation';
import styles from './RegisterStyles.module.scss';



const RegisterView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const { push } = useRouter();

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setError('');
    const form = event.target as HTMLFormElement;

    const data = {
      email: form.email.value,
      fullname: form.fullname.value,
      phone: form.phone.value,
      password: form.password.value,
    };

    try {
      const result = await fetch('/api/user/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      if (result.ok) {
        form.reset();
        push('/auth/login');
      } else {
        setError('Registration failed. Please try again.');
      }
    } catch (err) {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.register}>
      <h1 className={styles.register__title}>Register</h1>

      <div className={styles.register__form}>
        <form onSubmit={handleSubmit}>
          <div className={styles.register__form__item}>
            <label htmlFor="email">Email</label>
            <input
              name="email"
              id="email"
              type="email"
              className={styles.register__form__item__input}
              required
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="fullname">Fullname</label>
            <input
              name="fullname"
              id="fullname"
              type="text"
              className={styles.register__form__item__input}
              required
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="phone">Phone</label>
            <input
              name="phone"
              id="phone"
              type="text"
              className={styles.register__form__item__input}
              required
            />
          </div>
          <div className={styles.register__form__item}>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              id="password"
              type="password"
              className={styles.register__form__item__input}
              required
            />
          </div>
          {error && <p className={styles.register__error}>{error}</p>}
          <button className={styles.register__form__button} type="submit" disabled={isLoading}>
            {isLoading ? 'Loading...' : 'Register'}
          </button>
        </form>
      </div>
      <p className={styles.register__footer}>
        Already have an account? <a href="/auth/login">Login</a>
      </p>
    </div>
  );
};

export default RegisterView;
