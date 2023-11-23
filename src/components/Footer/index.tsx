import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.container}>
      <a href='https://github.com/ayubtalha'>
        <div className={styles.inner}>@Talha Ayub - Software Engineer</div>
      </a>
    </footer>
  );
};

export default Footer;
