import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useAccount } from '../../lib/hooks/useAccount';
import { Box, Button, Paper, Typography } from '@mui/material';
import { LockOpen } from '@mui/icons-material';
import TextInput from '../../app/shared/components/TextInput';
import {
  registerSchema,
  RegisterSchema
} from '../../lib/schemas/registerSchema';
import { Link } from 'react-router';

export default function RegisterForm() {
  const { registerUser } = useAccount();

  const {
    control,
    handleSubmit,
    setError,
    formState: { isValid, isSubmitting }
  } = useForm<RegisterSchema>({
    mode: 'onTouched',
    resolver: zodResolver(registerSchema)
  });

  const onSubmit = async (data: RegisterSchema) => {
    await registerUser.mutateAsync(data, {
      onError: (errors) => {
        if (Array.isArray(errors)) {
          errors.forEach((err) => {
            if (err.includes('Email')) setError('email', { message: err });
            else if (err.includes('Password'))
              setError('password', { message: err });
          });
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
        <Typography variant="h4">Register</Typography>
      </Box>
      <TextInput name="email" control={control} label="Email" />
      <TextInput name="displayName" control={control} label="Display Name" />
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
        Register
      </Button>
      <Typography sx={{ textAlign: 'center' }}>
        Already have an account?
        <Typography
          component={Link}
          to="/login"
          color="primary"
          sx={{ ml: 2, fontWeight: 'bold' }}
        >
          Sign up
        </Typography>
      </Typography>
    </Paper>
  );
}
