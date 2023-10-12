import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from "@mui/material"
import React, { useState } from "react"

const Login = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    
    return (
        <Box sx={{ width: '100%', height: '100%' ,display:'flex',flexDirection:'column'}}>
            <Typography variant="h6">
                Login
            </Typography>
            <TextField id="outlined-basic" label="User Name" value={userName} sx={{m:1}} variant="outlined" />
            <TextField id="outlined-basic" label="Password" value={password} type='password' sx={{m:1}} variant="outlined" />
            
            <Button variant="contained" sx={{m:1}}>Submit</Button>
        </Box>
    )
}
export default Login