import { Grid, Container, Stack, TextField, Button, Checkbox, FormGroup, FormControlLabel } from '@mui/material'
import React, { useState } from 'react';
import LoginBg from '../assets/login.jpg'
import { Link,useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/firebase';

const Login = () => {
  const navigate = useNavigate();

  const loginForm = {
    email: '',
    password: ''
  }

  const loginFormError = {
    email: {
        state: false,
        message: ''
    }, 
    password: {
        state: false,
        message: ''
    }
  }

  const [ input, setInput ] = useState(loginForm); 
  const [ loginError, setLoginError ] = useState(loginFormError);
  const [ submitButtonDisabled, setSubmitButtonDisabled ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");
  const [ checked, setChecked ] = useState(false);

  const usernameValidation = (e) => {
    const input = e.target;
    const key = input.name;
    const isRequired = required(input);
    const isEmail = emailSyntax(input);
    return setLoginError((oldData) => {
        return {
          ...oldData,
            [key]: (isRequired.state && isRequired) || isEmail
        }
    })
  }

  const passwordValidation = (e) => {
    const input = e.target;
    const key = input.name;
    const isRequired = required(input);
    const isPassword = passwordSyntax(input)
    return setLoginError((oldData) => {
        return {
          ...oldData,
            [key]: (isRequired.state && isRequired) || isPassword
        }
    })
  }

  const required = (input) => {
    const value = input.value.trim();
    if(value.length === 0) {
        return {
           state: true,
           message: "This field is required"
        }
    }
    else {
        return {
            state: false,
            message: ""
         }
    }
  }

  const emailSyntax = (input) => {
    const value = input.value.trim();
    const regExp = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    if(regExp.test(value)){
        return {
            state: false,
            message: ''
        }
    }
    else {
        return {
            state: true,
            message: "Email is not valid"
        }
    }
  }


  const passwordSyntax = (input) => {
    const value = input.value.trim();
    const regExp = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/g
    if(regExp.test(value)){
        return {
            state: false,
            message: ''
        }
    }
    else{
        return {
            state: true,
            message: "Password must contains minimum eight characters, at least one letter, one number and one special character"
        }
    }
  }

  const updateValue = (e) => {
    const input = e.target;
    const key = input.name;
    const value = input.value;
    return setInput((oldData) => {
        return {
            ...oldData,
            [key]: value
        }
    })
  }

  const validateOnsubmit = () => {
    let valid = true;  
    for( let key in input ){   
        if(input[key].length === 0 ){
            valid = false;
            setLoginError((oldData) => {
                return {
                    ...oldData,
                    [key]: {
                        state: true,
                        message: "This field is required"
                    }
                }
            })
        }
    }
    return valid;
  }


  const userLogin = (e) => {
    e.preventDefault();
    const isValid = validateOnsubmit();
    if(isValid){
        setSubmitButtonDisabled(true);
        signInWithEmailAndPassword(auth, input.email, input.password)
        .then(async (res) => {
            console.log(res)
            setSubmitButtonDisabled(false);
            navigate('/dashboard')
        })
        .catch((err) => {
            setSubmitButtonDisabled(false);
            setErrorMessage(err.message)
        })
    }
  }

  return (
    <>
        <Container>
            <Grid container color="primary" alignItems="center" justifyContent="center" sx={{ minHeight: '100vh' }}>
                <Grid item xs={12} sm={6}>
                    <Stack direction="row" justifyContent={'center'} alignItems={'center'}>
                        <img src={LoginBg} alt="login-bg" width="100%" height="100%" />
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} alignItems="center" justifyContent="center" sx={{ minHeight: '100%' }}>
                    <h1>Login</h1>
                        <form onSubmit={userLogin}>
                            <Stack direction="column" spacing={3}>
                                <TextField
                                error={loginError.email.state}
                                helperText={loginError.email.message}
                                label="Username" 
                                variant='outlined'
                                name="email"
                                onChange={updateValue}
                                onBlur={usernameValidation}
                                onInput={usernameValidation}
                                />
                                <TextField
                                error={loginError.password.state}
                                helperText={loginError.password.message}
                                label="Password" 
                                variant='outlined'
                                name="password"
                                onChange={updateValue}
                                onBlur={passwordValidation}
                                onInput={passwordValidation}
                                />
                                
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="Remember me" />
                                    </FormGroup>
                                    <Button 
                                        disabled={
                                            loginError.email.state || loginError.password.state || !checked || submitButtonDisabled
                                        }
                                        type="submit" 
                                        variant="contained" 
                                        color="primary"
                                        >
                                            Login
                                        </Button>
                                </Stack>
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    <h5>{errorMessage}</h5>
                                </Stack>
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Link to="/signup">Create Account</Link>
                                    <Link to="/">Forgot Password</Link>
                                </Stack>
                            </Stack>
                        </form>
                </Grid>
            </Grid>
        </Container>
    </>
  )
}

export default Login
