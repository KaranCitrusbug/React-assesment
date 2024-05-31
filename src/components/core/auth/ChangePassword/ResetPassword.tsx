import React, { useState } from 'react';

import { useNavigate, useParams } from 'react-router-dom';
import { resetPasswordRequest } from '../../../../services/AuthService';
import { ToastSuccess, ToastFail } from '../../../../utils/ToastMessage';

const ResetPassword: React.FC = () => {
  const { token } = useParams<{ token: string  }>();
  const [newPassword, setNewPassword] = useState<string>('');
  const navigate = useNavigate();

  const handleResetPassword = async () => {
    try {
      await resetPasswordRequest(token, newPassword);
      ToastSuccess('Password reset successfully');
      navigate('/login');
    } catch (error) {
      ToastFail('Failed to reset password');
    }
  };

  return (
    <div>
      <label>New Password</label>
      <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} />
      <button onClick={handleResetPassword}>Submit</button>
    </div>
  );
};

export default ResetPassword;
