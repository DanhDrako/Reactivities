import { Password } from '@mui/icons-material';
import {
  changePasswordSchema,
  ChangePasswordSchema
} from '../../lib/schemas/changePasswordSchema';
import AccountFormWrapper from './AccountFormWrapper';
import { zodResolver } from '@hookform/resolvers/zod';
import TextInput from '../../app/shared/components/TextInput';
import { useAccount } from '../../lib/hooks/useAccount';

export default function ChangePasswordForm() {
  const { changePassword } = useAccount();
  const onSubmit = async (data: ChangePasswordSchema) => {
    try {
      await changePassword.mutateAsync(data);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <AccountFormWrapper<ChangePasswordSchema>
      title="Change password"
      icon={<Password fontSize="large" />}
      onSubmit={onSubmit}
      submitButtonText="Update Password"
      resolver={zodResolver(changePasswordSchema)}
      reset={true}
    >
      <TextInput
        type="password"
        label="Current password"
        name="currentPassword"
      />
      <TextInput type="password" label="New password" name="newPassword" />
      <TextInput
        type="password"
        label="Confirm password"
        name="confirmPassword"
      />
    </AccountFormWrapper>
  );
}
