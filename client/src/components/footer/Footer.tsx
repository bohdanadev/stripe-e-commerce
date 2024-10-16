import './footer.styles.scss';

const Footer = () => {
  const year = new Date().getFullYear();
  return (
    <div className='footer' style={{ padding: '2rem 0.5rem 2rem' }}>
      {year} © Bags Store
    </div>
  );
};

export default Footer;
