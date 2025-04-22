import { useForm } from 'react-hook-form';
import { loginSchema, LoginSchema } from '../../lib/schemas/loginSchema';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount } from '../../lib/hooks/useAccount';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import { Link, useLocation, useNavigate } from 'react-router';

export default function LoginForm() {
  const { loginUser } = useAccount();
  const navigate = useNavigate();
  const location = useLocation();

  const {
    handleSubmit,
    control,
    formState: { isValid, isSubmitting }
  } = useForm<LoginSchema>({
    mode: 'onTouched',
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = async (data: LoginSchema) => {
    await loginUser.mutateAsync(data, {
      onSuccess: () => {
        navigate(location.state?.from || '/activities');
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
    </Paper>
  );
}
