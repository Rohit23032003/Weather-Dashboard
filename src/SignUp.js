import React, { useState } from 'react';
import { TextField, Button, Grid, Typography, Box, Container, IconButton, InputAdornment, Paper } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import { useNavigate } from 'react-router-dom'; // Assuming you use React Router for navigation
import { auth, db } from './Auth'; // Import your Firebase config
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

const theme = createTheme();

const SignUp = () => {
  const navigate = useNavigate();
  const [isSignUp, setIsSignUp] = useState(true);
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUpClick = async () => {
    setError('');
    if (username === '' || email === '' || password === '' || (isSignUp && confirmPassword === '')) {
      setError('Please fill all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      await setDoc(doc(db, 'users', user.uid), {
        username,
        email,
      });
      navigate('/login');
    } catch (error) {
      setError(error.message || 'Signup failed');
      console.error('Error signing up:', error);
    }
  };

  const handleLoginClick = async () => {
    setError('');
    if (email === '' || password === '') {
      setError('Please fill all required fields');
      return;
    }

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      const userDoc = await getDoc(doc(db, 'users', user.uid));
      if (userDoc.exists()) {
        // const userData = userDoc.data();
        navigate(`/login/${user.uid}`);
      } else {
        setError('No user data found');
      }
    } catch (error) {
      setError(error.message || 'Login failed');
      console.error('Error logging in:', error);
    }
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
    setError(''); // Reset error message when toggling forms
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs" >
        <Box
        className="signup-form" 
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent:'center'
          }}
        >
          <Paper elevation={20} sx={{ padding: 3, mt: 3, width: '100%' }}>
            <Typography component="h1" variant="h5">
              Welcome to Weather-Dashboard
            </Typography>
            <Box component="form" noValidate sx={{marginTop:5}}>
              <Grid container spacing={2}>
                {isSignUp && (
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="username"
                      label="Username"
                      name="username"
                      autoComplete="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </Grid>
                )}
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    variant="outlined"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    autoComplete="new-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={handlePasswordVisibility}
                            edge="end"
                          >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>
                {isSignUp && (
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="confirmPassword"
                      label="Confirm Password"
                      type={showConfirmPassword ? 'text' : 'password'}
                      id="confirmPassword"
                      autoComplete="new-password"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={handleConfirmPasswordVisibility}
                              edge="end"
                            >
                              {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                )}
              </Grid>
              <Button
                fullWidth
                variant="contained"
                sx={{ mt: 3, mb: 2 }}
                onClick={isSignUp ? handleSignUpClick : handleLoginClick}
                style={{ backgroundColor: isSignUp ? 'blue' : 'default' }}
              >
                {isSignUp ? 'Sign Up' : 'Login'}
              </Button>
              <Grid container justifyContent="flex-end">
                <Grid item>
                  <Button variant="text" onClick={toggleForm}>
                    {isSignUp ? 'Login' : 'Sign Up'}
                  </Button>
                </Grid>
              </Grid>
            </Box>
            {error && (
              <Typography color="error" variant="body2" sx={{ mt: 2 }}>
                {error}
              </Typography>
            )}
          </Paper>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default SignUp;
