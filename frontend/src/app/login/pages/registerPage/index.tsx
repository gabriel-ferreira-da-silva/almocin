import React, { useContext } from 'react';
import { UserContext } from '../../../admin/context/userContext/index';
import { Box, Grid, TextField, Button, Link, Avatar, Typography, Container, CssBaseline } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { RegisterFormSchema, RegisterFormType } from '../../forms/RegisterForm'

const RegisterPage: React.FC = () => {
  const  context  = useContext(UserContext)!;
  const { register, handleSubmit, formState: { errors } } = useForm<RegisterFormType>({
    resolver: zodResolver(RegisterFormSchema),
  });

  const onSubmit = async (data: RegisterFormType) => {
    try {
      await context.service.createUser(data);
      // Handle successful registration (e.g., redirect to login)
    } catch (error) {
      // Handle registration error (e.g., show error message)
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Cadastro
        </Typography>
        <Box component="form" noValidate onSubmit={handleSubmit(onSubmit)} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                autoComplete="given-name"
                required
                fullWidth
                id="name"
                label="Nome completo"
                autoFocus
                {...register('name')}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                id="email"
                label="Email"
                autoComplete="email"
                {...register('email')}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Senha"
                type="password"
                id="password"
                autoComplete="new-password"
                {...register('password')}
                error={!!errors.password}
                helperText={errors.password?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="CEP"
                id="cep"
                autoComplete="postal-code"
                {...register('cep')}
                error={!!errors.cep}
                helperText={errors.cep?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Nome do primeiro animal de estimação"
                id="petName"
                {...register('petName')}
                error={!!errors.petName}
                helperText={errors.petName?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="Forma de pagamento"
                id="paymentMethod"
                {...register('paymentMethod')}
                error={!!errors.paymentMethod}
                helperText={errors.paymentMethod?.message}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                required
                fullWidth
                label="CPF"
                id="cpf"
                autoComplete="cpf"
                {...register('cpf')}
                error={!!errors.cpf}
                helperText={errors.cpf?.message}
              />
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Cadastrar
          </Button>
          <Grid container justifyContent="flex-end">
            <Grid item>
              <Link href="login" variant="body2">
                Já tem uma conta? Faça login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default RegisterPage;
