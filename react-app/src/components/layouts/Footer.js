import React from 'react';

const footerStyle = {
  textAlign: 'center',
  backgroundColor: '#163550',
  color: 'white',
  padding: '10px',
  position: 'fixed',
  bottom: '0',
  width: '100%',
};

function Footer() {
  return (
    <footer  style={footerStyle}>
      <p>&copy; Shruti Sharma</p>
    </footer>
  );
}

export default Footer;

