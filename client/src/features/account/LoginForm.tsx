import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../../lib/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount } from '../../lib/hooks/useAccount';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { Link, useLocation, useNavigate } from 'react-router';
import { useState } from 'react';
import { MessageAPI } from '../../lib/util/constants';
import { toast } from 'react-toastify';

export default function LoginForm() {
  const [notVerified, setNotVerified] = useState(false);
  const { loginUser, resendConfirmationEmail } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    control,
    watch,
    formState: { isValid, isSubmitting }
  } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema)
  });

  const email = watch('email');
  const handleResendEmail = async () => {
    try {
      await resendConfirmationEmail.mutateAsync({ email });
      setNotVerified(false);
    } catch (err) {
      console.log(err);
      toast.error('Problem sending email - please check email address');
    }
  };

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || '/activities');
      },
      onError: (error) => {
        if (error.message === MessageAPI.NotAllowed) {
          setNotVerified(true);
        }
      }
    });
  };

  return (
    <Paper
      component="form"
      onSubmit={handleSubmit(onSubmit)}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        p: 3,
        gap: 3,
        maxWidth: 'mid',
        mx: 'auto',
        borderRadius: 3
      }}
    >
      <Box
        display="flex"
        alignItems="center"
        justifyContent="center"
        gap={3}
        color="secondary.main"
      >
        <LockOpen fontSize="large" />
        <Typography variant="h4">Sign in</Typography>
      </Box>
      <TextInput name="email" control={control} label="Email" />
      <TextInput
        name="password"
        control={control}
        label="Password"
        type="password"
      />
      <Button
        type="submit"
        disabled={!isValid || isSubmitting}
        variant="contained"
        size="large"
      >
        Login
      </Button>
      {notVerified ? (
        <Box display="flex" flexDirection="column" justifyContent="center">
          <Typography textAlign="center" color="error">
            Your email has not been verified. You can click the button the
            re-send the verification email
          </Typography>
          <Button
            disabled={resendConfirmationEmail.isPending}
            onClick={handleResendEmail}
          >
            Re=send email link
          </Button>
        </Box>
      ) : (
        <Box display="flex" alignItems="center" justifyContent="center" gap={3}>
          <Typography>
            Forgot password? Click <Link to="/forgot-password">here</Link>
          </Typography>
          <Typography sx={{ textAlign: 'center' }}>
            Don't have an account?
            <Typography
              component={Link}
              to="/register"
              color="primary"
              sx={{ ml: 2, fontWeight: 'bold' }}
            >
              Sign up
            </Typography>
          </Typography>
        </Box>
      )}
    </Paper>
  );
}
