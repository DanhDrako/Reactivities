import { useNavigate, useSearchParams } from 'react-router';
import { useAccount } from '../../lib/hooks/useAccount';
import {
  resetPasswordSchema,
  ResetPasswordSchema
} from '../../lib/schemas/resetPasswordSchema';
import { Typography } from '@mui/material';
import AccountFormWrapper from './AccountFormWrapper';
import TextInput from '../../app/shared/components/TextInput';
import { zodResolver } from '@hookform/resolvers/zod';
import { LockOpen } from '@mui/icons-material';

export default function ResetPasswordForm() {
  const [params] = useSearchParams();
  const { resetPassword } = useAccount();
  const navigate = useNavigate();

  const email = params.get('email');
  const code = params.get('code');

  if (!email || !code)
    return <Typography>Invalid reset password code</Typography>;

  const onSubmit = async (data: ResetPasswordSchema) => {
    try {
      await resetPassword.mutateAsync(
        { email, resetCode: code, newPassword: data.newPassword },
        {
          onSuccess: () => {
            navigate('/login');
          }
        }
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <AccountFormWrapper<ResetPasswordSchema>
      title="Reset your password"
      submitButtonText="Reset password"
      onSubmit={onSubmit}
      resolver={zodResolver(resetPasswordSchema)}
      icon={<LockOpen fontSize="large" />}
    >
      <TextInput type="password" label="New password" name="newPassword" />
      <TextInput
        type="password"
        label="Confirm password"
        name="confirmPassword"
      />
    </AccountFormWrapper>
  );
}
