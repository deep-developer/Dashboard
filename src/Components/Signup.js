import { Grid, Container, Stack, TextField, Button, Checkbox, FormGroup, FormControlLabel } from '@mui/material'
import React, { useState } from 'react';
import SignupBg from '../assets/signup.jpg'
import { Link, useNavigate } from 'react-router-dom';
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../utils/firebase';

const Signup = () => {
  const navigate = useNavigate();
    const signupForm = {
        fullname: '',
        phone: '',
        email: '',
        password: ''
    }

    const signupFormError = {
        fullname: {
            state: false,
            message: ""
        },
        phone: {
            state: false,
            message: ""
        },
        email: {
            state: false,
            message: ""
        }, 
        password: {
            state: false,
            message: ""
        }
    }

  const [ input, setInput ] = useState(signupForm);
  const [ error, setError ] = useState(signupFormError);
  const [checked, setChecked ] = useState(false)
  const [ submitButtonDisabled, setSubmitButtonDisabled ] = useState(false);
  const [ errorMessage, setErrorMessage ] = useState("");

  const fullnameValidation = (e) => {
    const input = e.target;
    const key = input.name;
    const isRequired = required(input);
    return setError((oldData) => {
        return {
          ...oldData,
            [key]: isRequired
        }
    })
  }

  const phoneValidation = (e) => {
    const input = e.target;
    const key = input.name;
    const isRequired = required(input);
    const isPhone = phoneSyntax(input);
    return setError((oldData) => {
        return {
          ...oldData,
            [key]: (isRequired.state && isRequired) || isPhone
        }
    })
  }

  const emailValidation = (e) => {
    const input = e.target;
    const key = input.name;
    const isRequired = required(input);
    const isEmail = emailSyntax(input);
    return setError((oldData) => {
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
    return setError((oldData) => {
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

  const phoneSyntax = (input) => {
    const value = input.value.trim();
    const regExp = /^(0|91)?[6-9][0-9]{9}$/g;
    if(regExp.test(value)){
        return {
            state: false,
            message: ''
        }
    }
    else{
        return {
            state: true,
            message: 'Invalid phone number'
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
            setError((oldData) => {
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

  const register = (e) => {
    e.preventDefault();
    const isValid = validateOnsubmit();
    if(isValid){
        setSubmitButtonDisabled(true);
        createUserWithEmailAndPassword(auth, input.email, input.password)
        .then(async (res) => {
            setSubmitButtonDisabled(false);
            const user = res.user;
            await updateProfile(user, {
                displayName: input.fullname
            })
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
                        <img src={SignupBg} alt="login-bg" width="100%" height="100%" />
                    </Stack>
                </Grid>
                <Grid item xs={12} sm={6} alignItems="center" justifyContent="center" sx={{ minHeight: '100%' }}>
                    <h1>Register</h1>
                        <form onSubmit={register}>
                            <Stack direction="column" spacing={3}>
                                <TextField
                                error={error.fullname.state}
                                helperText={error.fullname.message}
                                label="Fullname" 
                                variant='outlined'
                                name="fullname"
                                value={input.fullname}
                                onChange={updateValue}
                                onBlur={fullnameValidation}
                                onInput={fullnameValidation}
                                />
                                <TextField
                                label="Phone" 
                                variant='outlined'
                                type="text"
                                name="phone"
                                value={input.phone}
                                onChange={updateValue}
                                error={error.phone.state}
                                helperText={error.phone.message}
                                onBlur={phoneValidation}
                                onInput={phoneValidation}
                                />
                                <TextField
                                label="Email" 
                                variant='outlined'
                                name="email"
                                value={input.email}
                                onChange={updateValue}
                                error={error.email.state}
                                helperText={error.email.message}
                                onBlur={emailValidation}
                                onInput={emailValidation}
                                />
                                <TextField
                                label="Password" 
                                variant='outlined'
                                type="password"
                                name="password"
                                value={input.password}
                                onChange={updateValue}
                                error={error.password.state}
                                helperText={error.password.message}
                                onBlur={passwordValidation}
                                onInput={passwordValidation}
                                />
                                
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <FormGroup>
                                        <FormControlLabel control={<Checkbox checked={checked} onChange={() => setChecked(!checked)} />} label="I accept terms & conditions" />
                                    </FormGroup>
                                        <Button disabled= {
                                            error.fullname.state || error.phone.state || error.email.state || error.password.state || !checked || submitButtonDisabled
                                        } 
                                        type="submit" 
                                        variant="contained" 
                                        color="primary"
                                        >
                                            Signup
                                        </Button>
                                </Stack>
                                <Stack direction="row" justifyContent="center" alignItems="center">
                                    <h5>{errorMessage}</h5>
                                </Stack>
                                <Stack direction="row" justifyContent="start" alignItems="center">
                                    <Link to="/">Already have an Account</Link>
                                </Stack>
                            </Stack>
                        </form>
                </Grid>
            </Grid>
        </Container>
    </>
  )
}

export default Signup
