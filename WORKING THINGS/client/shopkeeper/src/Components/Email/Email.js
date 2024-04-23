import React from 'react';
import EmailForm from './EmailForm';

const App = () => {


  return (
    <div>
      <h1>Email Sending</h1>
      <EmailForm condition={true} recipientEmail="vikeyrathod007@gmail.com" />
    </div>
  );
};

export default App;
