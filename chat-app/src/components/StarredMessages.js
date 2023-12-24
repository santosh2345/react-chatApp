import {
    Box,
    Divider,
    Grid,
    IconButton,
    Stack,
    Tab,
    Tabs,
    Typography,
  } from "@mui/material";
  import React from "react";
  import { useTheme } from "@mui/material/styles";
  import { CaretLeft } from "phosphor-react";
  import { UpdateSidebarType } from "../redux/slices/app";
  import { useDispatch } from "react-redux";
  import { faker } from "@faker-js/faker";
  import { SHARED_DOCS, SHARED_LINKS } from "../data";
  import { DocMsg, LinkMsg } from "./Conversations/MessageTypes";
import Message from "./Conversations/Message";
  
  const StarredMessages = () => {
    const theme = useTheme();
    const dispatch = useDispatch();
  
    const [value, setValue] = React.useState(0);
  
    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
    return (
      <Box sx={{ width: 320, height: "100vh" }}>
        <Stack sx={{ height: "100%" }}>
          <Box
            sx={{
              boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
              width: "100%",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F8FAFF"
                  : theme.palette.background.paper,
            }}
          >
            <Stack
              direction="row"
              sx={{ height: "100%", p: 2 }}
              alignItems={"center"}
              spacing={3}
            >
              <IconButton
                onClick={() => {
                  dispatch(UpdateSidebarType("CONTACT"));
                }}
              >
                <CaretLeft />
              </IconButton>
              <Typography variant="subtitle2">Starred Messages</Typography>
            </Stack>
          </Box>
          <Divider />
  
          
          {/* body part  */}
          <Stack
            sx={{
              height: "100%",
              position: "relative",
              flexGrow: 1,
              overflowY: "scroll",
              backgroundColor:
                theme.palette.mode === "light"
                  ? "#F8FAFF"
                  : theme.palette.background.paper,
            }}
            p={3}
            spacing={3}
          >

            <Message menu={false} /> 
            
          </Stack>
        </Stack>
      </Box>
    );
  };
  
  export default StarredMessages;
  