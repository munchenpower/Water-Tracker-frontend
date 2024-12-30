import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { selectUser } from '../../redux/auth/selectors.js';
import { useSelector } from 'react-redux';

import { Formik, Form, Field, ErrorMessage } from 'formik';
import { toast, Toaster } from 'react-hot-toast';
import styles from './DailyNormaModal.module.css';
import icons from '../../images/icons/icons.svg';
import { updateDailyWaterRate } from '../../redux/auth/operations';
import { fetchTodayWater } from '../../redux/water/operations.js';

const DailyNormaModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();

  const user = useSelector(selectUser);

  const dailyNorma = user.dailyNorma / 1000 || 'waterIntake';

  const calculateWaterIntake = (weight = 0, activityTime = 0, gender) => {
    if (!weight && !activityTime) return 0;
    const M = Number(weight);
    const T = Number(activityTime);
    if (!isNaN(M) && !isNaN(T)) {
      let V;
      if (gender === 'female') {
        V = M * 0.03 + T * 0.4;
      } else {
        V = M * 0.04 + T * 0.6;
      }
      return V.toFixed(1);
    } else {
      toast.error('Value must be a number.');
      return 0;
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.position = 'fixed';
      document.body.style.top = `-${window.scrollY}px`;
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = '';
      document.body.style.top = '';
      window.scrollTo(0, parseInt(scrollY || '0') * -1);
    }
  }, [isOpen]);

  const handleSubmit = async values => {
    const waterAmount = parseFloat(values.waterIntake) * 1000;
    const result = await dispatch(
      updateDailyWaterRate({ dailyNorma: waterAmount })
    );

    if (updateDailyWaterRate.fulfilled.match(result)) {
      await dispatch(fetchTodayWater());
      toast.success('Data saved successfully!');
      onClose();
    } else {
      toast.error(result.payload || 'Failed to save data.');
    }
  };

  const handleClose = e => {
    if (e.target === e.currentTarget || e.key === 'Escape') {
      onClose();
    }
  };
  if (!isOpen) return null;
  return (
    <div
      className={styles.backdrop}
      onClick={handleClose}
      onKeyDown={handleClose}
    >
      <div className={styles.modal} tabIndex="0">
        <div className={styles.header}>
          <h2 className={styles.title}>My daily norma</h2>
          <button className={styles.closeButton} onClick={onClose}>
            <svg width={24} height={24}>
              <use href={`${icons}#close`} />
            </svg>
          </button>
        </div>

        <div className={styles.formulas}>
          <p className={styles.formulaText}>
            For girl: <span className={styles.span}>V=(M*0,03) + (T*0,4)</span>
          </p>
          <p className={styles.formulaText}>
            For man: <span className={styles.span}>V=(M*0,04) + (T*0,6)</span>
          </p>
        </div>
        <div className={styles.infoTextBlok}>
          <p className={styles.infoText}>
            <span className={styles.infoSpan}>*</span> V is the volume of the
            water norm in liters per day, M is your body weight, T is the time
            of active sports, or another type of activity commensurate in terms
            of loads (in the absence of these, you must set 0)
          </p>
        </div>

        <Formik
          initialValues={{
            weight: '',
            activityTime: '',
            gender: 'female',
            waterIntake: dailyNorma.toString(),
          }}
          onSubmit={handleSubmit}
        >
          {({ values }) => (
            <Form>
              <h3>Calculate your rate:</h3>
              <div className={styles.genderField}>
                <label>
                  <Field type="radio" name="gender" value="female" />
                  For woman
                </label>
                <label>
                  <Field type="radio" name="gender" value="male" />
                  For man
                </label>
              </div>
              <div className={styles.weightField}>
                <label className={styles.formulaText}>
                  Your weight in kilograms:
                </label>
                <Field
                  name="weight"
                  className={styles.input}
                  placeholder="0"
                  type="text"
                />
                <ErrorMessage name="weight" component="span" />
              </div>
              <div className={styles.weightField}>
                <label className={styles.formulaText}>
                  The time of active participation in sports or other activities
                  with a high physical load in hours:
                </label>
                <Field
                  name="activityTime"
                  className={styles.input}
                  placeholder="0"
                  type="text"
                />
                <ErrorMessage name="activityTime" component="span" />
              </div>
              <div className={styles.litersField}>
                <div>
                  <p className={styles.litersText}>
                    The required amount of water in liters per day:
                  </p>
                </div>
                <div>
                  <span className={styles.litersSpan}>
                    {values.weight || values.activityTime
                      ? calculateWaterIntake(
                          values.weight,
                          values.activityTime,
                          values.gender
                        )
                      : '0'}{' '}
                    L
                  </span>
                </div>
              </div>
              <div>
                <label>Write down how much water you will drink:</label>
                <Field
                  name="waterIntake"
                  className={styles.input}
                  placeholder="0"
                  type="text"
                  value={values.waterIntake}
                />
                <ErrorMessage name="waterIntake" component="span" />
              </div>
              <div className={styles.saveButtonBlok}>
                <button type="submit" className={styles.saveButton}>
                  Save
                </button>
              </div>
            </Form>
          )}
        </Formik>
        <Toaster />
      </div>
    </div>
  );
};
export default DailyNormaModal;
