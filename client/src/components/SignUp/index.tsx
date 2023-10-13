import { Alert, Box, Button,  FormControl,  IconButton,  InputAdornment,  InputLabel,  OutlinedInput,  Snackbar,  TextField, Typography } from "@mui/material"
import { useState } from "react"
import { Visibility, VisibilityOff } from "@mui/icons-material"
import { createUser } from "../../apiRequest/signupLogin"

const SignUp = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const [userNameError, setUserNameError] = useState(false)
    const [emailError, setEmailError] = useState(false)
    const [passwordError, setPasswordError] = useState(false)
    // const [confirmPasswordError, setConfirmPasswordError] = useState(false)

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [message, setMessage] = useState("")
    const [openToaster, setOpenToaster] = useState(false)
    const [errorToaster, setErrorToaster] = useState(false)

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleClickShowConfirmPassword = () => setShowConfirmPassword((show) => !show);

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

    const onChangeUserName = (event: any) => {
        if (event.target.value.length > 1 || event.target.value.length < 2) {
            setUserNameError(true)
        }
        if (event.target.value.length > 2) {
            setUserNameError(false)
        }
        if (event.target.value.length === 0) {
            setUserNameError(false)
        }
        setUserName(event.target.value);
    }
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
    const onChangeConfirmPassword = (event: any) => {
        setConfirmPassword(event.target.value)
    }
    const onclickSubmit = async () => {
        if (password != confirmPassword) {
            return
        }
        const object = {
            user_name: userName,
            email: email,
            password: password,
        }
        if (object.user_name.length <= 2 || object.email.length <= 7 || object.password.length <= 4) {
            if (object.user_name.length < 3) {
                setUserNameError(true)
            }
            if (object.email.length < 8) {
                setEmailError(true)
            }
            
            if (object.password.length < 5) {
                setPasswordError(true)
            }
            return


        }
        const responCreateUser = await createUser(object)
        if (responCreateUser.message === "successfully user signed up") {
            onClickCancel()
            setMessage(responCreateUser.message)
            setOpenToaster(true)
            onClickCancel()
        }
        else {
            setMessage(responCreateUser.message)
            setErrorToaster(true)
        }
        console.log(object)

    }
    const onClickCancel = () => {
        setUserName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")
    }
    return (
        <Box sx={{ m: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>

            <Typography variant="h6" sx={{ m: 1 }} component="h2">
                Sign Up
            </Typography>
            <TextField
                id="outlined-basic"
                onChange={onChangeUserName}
                value={userName}
                label="User Name"
                sx={{ m: 1, width: '100%' }}
                variant="outlined"
                inputProps={{ maxLength: 16 }}
                size="small"
            />
            {userNameError ?
                <Typography variant="caption" display="block" sx={{ color: 'red' }} gutterBottom>
                    Please Enter valid User Name (at least 3 characters)
                </Typography>
                : ""}
            <TextField
                id="outlined-basic"
                onChange={onChangeEmail}
                value={email} label="Email"
                sx={{ m: 1, width: '100%' }}
                variant="outlined"
                inputProps={{ maxLength: 45 }}
                size="small"
            />
            {emailError ?
                <Typography variant="caption" display="block" sx={{ color: 'red' }} gutterBottom>
                    Please Enter valid email (at least 7 characters)
                </Typography>
                : ""}


           
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" size="small">
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
            <FormControl sx={{ m: 1, width: '100%' }} variant="outlined" size="small">
                <InputLabel htmlFor="outlined-adornment-password">Confirm Password</InputLabel>
                <OutlinedInput
                    id="outlined-adornment-password"
                    type={showConfirmPassword ? 'text' : 'Password'}
                    value={confirmPassword}
                    onChange={onChangeConfirmPassword}
                    endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowConfirmPassword}
                                onMouseDown={handleMouseDownConfirmPassword}
                                edge="end"
                            >
                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    }
                    label="Confirm Password"
                />
            </FormControl>
            {password != confirmPassword ? <Typography variant="caption" display="block" sx={{ color: 'red' }} gutterBottom>ConfirmPassword doesnot match</Typography> : " "}

            <Box sx={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
                <Button variant="contained" onClick={onclickSubmit}>Submit</Button>
                <Button variant="contained" onClick={onClickCancel}>Cancel</Button>

            </Box>
            <a href="/login">
                <Typography variant="caption" display="block" sx={{ m: 1 }} gutterBottom>
                    login
                </Typography>
            </a>


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

export default SignUp