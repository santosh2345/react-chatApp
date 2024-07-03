import { Stack, Typography } from '@mui/material'
import React from 'react'
import VerifyForm from '../../sections/auth/VerifyForm'

const Verify = () => {

  // verify component that will render the verify form
  return (
    <>
     <Stack spacing={2} sx={{ mb: 5, position: "relative" }}>

    <Typography variant='h4'>
        Please Verify OTP
    </Typography>
    <Typography variant='body2'>
        Sent to email (santosh@gmail.com)
    </Typography>
     </Stack>
     {/* verify form  */}
     <VerifyForm />
    </>
  )
}

export default Verify