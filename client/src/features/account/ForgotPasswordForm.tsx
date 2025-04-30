import { useNavigate } from 'react-router';
import { useAccount } from '../../lib/hooks/useAccount';
import { FieldValues } from 'react-hook-form';
import AccountFormWrapper from './AccountFormWrapper';
import TextInput from '../../app/shared/components/TextInput';
import { LockOpen } from '@mui/icons-material';

export default function ForgotPasswordForm() {
  const { forgotPassword } = useAccount();
  const navigate = useNavigate();

  const onSubmit = async (data: FieldValues) => {
    try {
      await forgotPassword.mutateAsync(data.email, {
        onSuccess: () => {
          navigate('/login');
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AccountFormWrapper
      title="Please enter your email address"
      icon={<LockOpen fontSize="large" />}
      submitButtonText="Request password reset link"
      onSubmit={onSubmit}
    >
      <TextInput
        rules={{ required: true }}
        label="Email address"
        name="email"
        type="email"
      />
    </AccountFormWrapper>
  );
}
