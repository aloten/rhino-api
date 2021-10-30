import React, { useEffect, useState } from 'react';

const Error = ({ msg }) => {
  const [message, setMessage] = useState(msg);

  useEffect(() => {
    if (msg !== '') {
      setMessage(msg);
      setTimeout(() => {
        setMessage('');
      }, 5000);
    }
  }, [msg]);

  return (
    <div>
      {message && (
        <div className='alert alert-danger'>
          <strong>Error!</strong> {message}
        </div>
      )}
    </div>
  );
};

export default Error;
