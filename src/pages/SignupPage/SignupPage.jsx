import AuthForm from '../../components/AuthForm/AuthForm.jsx';
import DocumentTitle from '../../components/DocumentTitle';
import styles from '../SigninPage/SigninPage.module.css';
import mobileBackground1x from '../../images/signinPage/background-sign-in-mobile.png';
import mobileBackground2x from '../../images/signinPage/background-sign-in-mobile_2x.png';
import mobileBottleBackground1x from '../../images/signinPage/bottle-sign-in-mobile.png';
import mobileBottleBackground2x from '../../images/signinPage/bottle-sign-in-mobile_2x.png';
import tabletBottleBackground1x from '../../images/signinPage/bottle-sign-in-tablet.png';
import tabletBottleBackground2x from '../../images/signinPage/bottle-sign-in-tablet_2x.png';
import deskBottleBackground1x from '../../images/signinPage/bottle-sign-in-desk.png';
import deskBottleBackground2x from '../../images/signinPage/bottle-sign-in-desk_2x.png';
import deskBackground1x from '../../images/signinPage/background-sign-in-desk.png';
import deskBackground2x from '../../images/signinPage/background-sign-in-desk_2x.png';
import { useDispatch } from 'react-redux';
import { signUp } from '../../redux/auth/operations.js';
import { Toaster } from 'react-hot-toast';

export default function SignupPage() {
  const dispatch = useDispatch();
  const handleSubmit = async userData => {
    try {
      const resultAction = await dispatch(signUp(userData));
      if (signUp.rejected.match(resultAction)) {
        return { error: resultAction.payload };
      }
      return true;
    } catch {
      return { error: 'An unexpected error occurred during sign up' };
    }
  };

  return (
    <section className={styles.section}>
      <DocumentTitle>Signup page</DocumentTitle>
      <div className={styles.container}>
        <h1 className={styles.title}>Sign Up</h1>
        <AuthForm submitButtonLabel="Sign up" onSubmit={handleSubmit} />

        <picture className={styles.point}>
          <source
            className={styles.bg_point}
            media="(min-width: 320px) and (max-width: 767px)"
            srcSet={`${mobileBackground1x} 1x, ${mobileBackground2x} 2x `}
          />
          <source
            className={styles.bg_bottle}
            media="(min-width: 1440px)"
            srcSet={`${deskBackground1x} 1x, ${deskBackground2x} 2x `}
          />
          <img
            className={styles.bg_point}
            src={mobileBackground1x}
            alt="Background element"
          />
        </picture>

        <picture className={styles.bottle}>
          <source
            className={styles.bg_bottle}
            media="(min-width: 320px) and (max-width: 767px)"
            srcSet={`${mobileBottleBackground1x} 1x, ${mobileBottleBackground2x} 2x `}
          />
          <source
            className={styles.bg_bottle}
            media="(min-width: 768px) and (max-width: 1439px)"
            srcSet={`${tabletBottleBackground1x} 1x, ${tabletBottleBackground2x} 2x `}
          />
          <source
            className={styles.bg_bottle}
            media="(min-width: 1440px)"
            srcSet={`${deskBottleBackground1x} 1x, ${deskBottleBackground2x} 2x `}
          />
          <img
            className={styles.bg_bottle}
            src={mobileBottleBackground1x}
            alt="Background element"
          />
        </picture>
        <Toaster position="top-center" reverseOrder={false} />
      </div>
    </section>
  );
}
