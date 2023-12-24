import React from 'react'
import { Box, Stack } from '@mui/material';
import Header from './Header';
import Footer from './Footer';
import Message from './Message';

const Conversations = () => {

  return (
    <Stack height={"100%"} maxHeight={"100vh"} width={"auto"}>
      {/* chat header */}
      <Header />
      {/* msg */}
      <Box width={"100%"} sx={{ flexGrow: 1, height:"100%", overflowY:"scroll" }}>
        <Message menu={true} />
      </Box>
      {/* chat footer */}
      <Footer />
    </Stack>
  )
}

export default Conversations;