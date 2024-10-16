import { CSSProperties } from 'react';

const NotFoundPage = () => {
  const style: CSSProperties = {
    fontWeight: 'bold',
    textAlign: 'center',
  };

  return <p style={style}>Unfortunately we can't find that page</p>;
};

export default NotFoundPage;
