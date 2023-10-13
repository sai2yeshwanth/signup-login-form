import { Visibility, VisibilityOff } from "@mui/icons-material"
import { Alert, Box, Button, FormControl, FormHelperText, IconButton, InputAdornment, InputLabel, OutlinedInput, Snackbar, TextField, Typography } from "@mui/material"
import React, { useState } from "react"
import Cookies from "js-cookie"
import { loginUser } from "../../apiRequest/signupLogin"

const Login = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const [message, setMessage] = useState("")
    const [openToaster, setOpenToaster] = useState(false)
    const [errorToaster, setErrorToaster] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleMouseDownConfirmPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }

        setOpenToaster(false);
        setErrorToaster(false);
    };


    const onChangeEmail = (event: any) => {
        if (event.target.value.length > 1 || event.target.value.length < 7) {
            setEmailError(true)
        }
        if (event.target.value.length > 7) {
            setEmailError(false)
        }
        if (event.target.value.length === 0) {
            setEmailError(false)
        }
        setEmail(event.target.value)
    }
    const onChangePassword = (event: any) => {
        if (event.target.value.length > 1 || event.target.value.length < 4) {
            setPasswordError(true)
        }
        if (event.target.value.length > 4) {
            setPasswordError(false)
        }
        if (event.target.value.length === 0) {
            setPasswordError(false)
        }
        setPassword(event.target.value)
    }
    
    const onclickSubmit = async () => {

        const object = {
            email: email,
            password: password,
        }
        if (object.email.length <= 7 || object.password.length <= 4)  {
            if (object.email.length < 8) {
                setEmailError(true)
            }
            
            if (object.password.length < 5) {
                setPasswordError(true)
            }
            return


        }
        const responLogin :any= await loginUser(object)
        if (responLogin.token) {
            onSubmitSuccess(responLogin.token)
            onClickCancel()
            setMessage(responLogin.message)
            setOpenToaster(true)
            onClickCancel()
        }
        else {
            setMessage(responLogin.message)
            setErrorToaster(true)
        }
        console.log(object)

    }
    const onClickCancel = () => {
        setEmail("")
        setPassword("")
    }

    // on submit success 
    const onSubmitSuccess = (jwtToken:string) => {
        Cookies.set('jwt_token', jwtToken ,{
            expires: 30,
          })
          window.location.replace('/')
        
    } 
    return (
        <Box sx={{ m: 1, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>

            <Box sx={{ display: 'flex', flexDirection: 'column', }}>
                <Typography variant="h6" sx={{ m: 1 }} component="h2">
                    Login
                </Typography>

                <TextField
                    id="outlined-basic"
                    onChange={onChangeEmail}
                    value={email} label="Email"
                    sx={{ m: 1,minWidth:'35%' }}
                    size="small"
                    variant="outlined"
                    inputProps={{ maxLength: 45 }}
                />
                {emailError ?
                    <Typography variant="caption" display="block" sx={{ color: 'red' }} gutterBottom>
                        Please Enter valid email (at least 7 characters)
                    </Typography>
                    : ""}
                <FormControl sx={{ m: 1, minWidth:'35%' }} size="small" variant="outlined">
                    <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
                    <OutlinedInput
                        id="outlined-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        value={password}
                        onChange={onChangePassword}
                        inputProps={{ maxLength: 15 }}

                        endAdornment={

                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={handleClickShowPassword}
                                    onMouseDown={handleMouseDownPassword}
                                    edge="end"
                                >
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                </IconButton>
                            </InputAdornment>
                        }
                        label="Password"

                    />
                </FormControl>
                {passwordError ? <Typography variant="caption" display="block" sx={{ color: 'red' }} gutterBottom>
                    "Please Enter password (at least 4 characters )"</Typography> : null}

                <Box sx={{display:'flex',justifyContent:'space-around'}}>
                    <Button variant="contained" onClick={onclickSubmit} size="small">Submit</Button>
                    <Button variant="contained" onClick={onClickCancel} size="small">Cancel</Button>

                </Box>
               <a href="/signup">
               <Typography variant="caption" display="block"  sx={{ m: 1 }} gutterBottom>
                    sign up
                </Typography>
               </a>
                
            </Box>
            <Snackbar open={openToaster} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
                    {message}!
                </Alert>
            </Snackbar>
            <Snackbar open={errorToaster} autoHideDuration={6000} onClose={handleClose}>
                <Alert onClose={handleClose} severity="error" sx={{ width: '100%' }}>
                    {message}!
                </Alert>
            </Snackbar>
        </Box>

    )
}

export default Login