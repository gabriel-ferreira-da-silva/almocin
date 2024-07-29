import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockResetIcon from '@mui/icons-material/LockReset';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { useContext, useState } from 'react';
import { ForgotPasswordContext } from '../../context/ForgetPasswordContext/index'; // Ajuste o caminho conforme necessário
import { ForgotPasswordType } from '../../forms/ForgotPasswordForm'; // Ajuste o caminho conforme necessário

export default function EsqueceuSenhaPage() {
  const { service } = useContext(ForgotPasswordContext); // Obtendo o serviço do contexto
  const [formData, setFormData] = useState<ForgotPasswordType>({
    email: '',
    petName: '',
    newPassword: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prevData => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    await service.requestForgotPassword(formData);
    alert('Senha redefinida com sucesso!');
    setError(null)
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
          <LockResetIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Esquecer Senha
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            name="email"
            label="Email"
            autoComplete="email"
            autoFocus
            value={formData.email}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="petName"
            label="Nome do Primeiro Pet"
            autoComplete="off"
            value={formData.petName}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="newPassword"
            label="Nova Senha"
            type="password"
            autoComplete="new-password"
            value={formData.newPassword}
            onChange={handleChange}
            error={!!error}
            helperText={error}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Redefinir Senha
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="/login" variant="body2">
                Lembrei a senha? Voltar para o login
              </Link>
            </Grid>
            <Grid item>
              <Link href="/cadastro" variant="body2">
                {"Não tem uma conta? Cadastre-se"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}
