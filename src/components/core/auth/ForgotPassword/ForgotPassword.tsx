import React, { useState } from 'react';

import { forgotPasswordRequest } from '../../../../services/AuthService';
import { ToastSuccess, ToastFail } from '../../../../utils/ToastMessage';

const ForgotPassword: React.FC = () => {
  const [email, setEmail] = useState<string>('');

  const handleForgotPassword = async () => {
    try {
     await forgotPasswordRequest(email);
      ToastSuccess('Password reset email sent successfully');
    } catch (error) {
      ToastFail('Failed to send password reset email');
    }
  };

  return (
    <div>
      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <button onClick={handleForgotPassword}>Submit</button>
    </div>
  );
};

export default ForgotPassword;
