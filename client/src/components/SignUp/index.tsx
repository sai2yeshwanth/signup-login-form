import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import { useState } from "react"

const SignUp = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const [primaryProfile, setprimaryProfile] = useState()
    return (
        <Box sx={{ width: '100%', height: '100%' ,display:'flex',flexDirection:'column'}}>
            <Typography variant="h6">
                Sign Up
            </Typography>
            <TextField id="outlined-basic" label="User Name" sx={{m:1}} variant="outlined" />
            <TextField id="outlined-basic" label="Password" type='password' sx={{m:1}} variant="outlined" />
            <TextField id="outlined-basic" label="Confirm Password" type='password'sx={{m:1}} variant="outlined" />
            <FormControl sx={{ m: 1, minWidth: 120 }}>
                <InputLabel id="demo-select-small">Primary Profile</InputLabel>
                <Select
                    labelId="demo-select-small"
                    id="demo-select-small"
                    value={primaryProfile}
                    label="Primary Profile"
                    // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
            </FormControl>
            <Button variant="contained" sx={{m:1}}>Submit</Button>
        </Box>
    )
}

export default SignUp