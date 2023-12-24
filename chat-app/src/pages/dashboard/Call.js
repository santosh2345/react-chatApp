// import React, { useState } from "react";
// import {
//   Box,
//   Stack,
//   Typography,
//   Link,
//   IconButton,
//   Divider,
// } from "@mui/material";
// import { MagnifyingGlass, Plus } from "phosphor-react";
// import Search from "../../components/Search/Search";
// import SearchIconWrapper from "../../components/Search/SearchIconWrapper";
// import StyledInputBase from "../../components/Search/StyledBaseInput";
// import { SimpleBarStyle } from "../../components/Scrollbar";
// import { useTheme } from "@mui/material/styles";
// import { CallLogElement } from "../../components/CallElement";
// import { CallLogs } from "../../data";
// import StartCall from "../../sections/Dashboard/StartCall";

// const Call = () => {
//   const theme = useTheme();

//   const [openDialog, setOpenDialog] = useState(false);

//   const handleCloseDialog = () => {
//     setOpenDialog(false);
//   };
//   return (
//     <>
//       <Stack direction={"row"} sx={{ width: "100%" }}>
//         {/* LEft part */}
//         <Box
//           sx={{
//             height: "100vh",
//             backgroundColor: (theme) =>
//               theme.palette.mode === "light"
//                 ? "#F8FAFF"
//                 : theme.palette.background,
//             width: 320,
//             boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
//           }}
//         >
//           <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
//             <Stack>
//               <Typography variant="h5">Call Logs</Typography>
//             </Stack>

//             <Stack sx={{ width: "100%" }}>
//               <Search>
//                 <SearchIconWrapper>
//                   <MagnifyingGlass color="#709CE6" />
//                 </SearchIconWrapper>
//                 <StyledInputBase
//                   placeholder="search..."
//                   inputProps={{ "aria-label": "search" }}
//                 />
//               </Search>
//             </Stack>
//             <Stack
//               direction="row"
//               justifyContent={"space-between"}
//               alignItems="center"
//             >
//               <Typography variant="subtitle2" component={Link}>
//                 Start conversation
//               </Typography>
//               <IconButton
//                 onClick={() => {
//                   setOpenDialog(true);
//                 }}
//               >
//                 <Plus style={{ color: theme.palette.primary.main }} />
//               </IconButton>
//             </Stack>
//             <Divider />
//             <Stack
//               spacing={3}
//               sx={{ flexGrow: 1, overflowY: "scroll", height: "100%" }}
//             >
//               <SimpleBarStyle timeout={500} clickOnTrack={false}>
//                 <Stack spacing={2.5}>
//                   {/*  */}

//                   {/* Call Logs */}

//                   {CallLogs.map((el) => (
//                     <CallLogElement {...el} />
//                   ))}
//                 </Stack>
//               </SimpleBarStyle>
//             </Stack>
//           </Stack>
//         </Box>

//         {/* Right part */}
//         {/* todo => reuse the conversation component  */}
//       </Stack>
//       {openDialog && (
//         <StartCall open={openDialog} handleClose={handleCloseDialog} />
//       )}
//     </>
//   );
// };

// export default Call;

import {
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
  Link,
} from "@mui/material";
import { MagnifyingGlass, Phone } from "phosphor-react";
import React, { useEffect, useState } from "react";
import {
  Search,
  SearchIconWrapper,
  StyledInputBase,
} from "../../components/Search";

import { useTheme } from "@mui/material/styles";
import { SimpleBarStyle } from "../../components/Scrollbar";
import { CallLogElement } from "../../components/CallElement";
import StartCall from "../../sections/Dashboard/StartCall";
import { useDispatch, useSelector } from "react-redux";
import { FetchCallLogs } from "../../redux/slices/app";

const Call = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchCallLogs());
  }, []);
  const { call_logs } = useSelector((state) => state.app);
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };
  const theme = useTheme();
  return (
    <>
      <Stack direction="row" sx={{ width: "100%" }}>
        {/* Left */}

        <Box
          sx={{
            overflowY: "scroll",

            height: "100vh",
            width: 340,
            backgroundColor: (theme) =>
              theme.palette.mode === "light"
                ? "#F8FAFF"
                : theme.palette.background,

            boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
          }}
        >
          <Stack p={3} spacing={2} sx={{ maxHeight: "100vh" }}>
            <Stack
              alignItems={"center"}
              justifyContent="space-between"
              direction="row"
            >
              <Typography variant="h5">Call Log</Typography>
            </Stack>

            <Stack sx={{ width: "100%" }}>
              <Search>
                <SearchIconWrapper>
                  <MagnifyingGlass color="#709CE6" />
                </SearchIconWrapper>
                <StyledInputBase
                  placeholder="Search…"
                  inputProps={{ "aria-label": "search" }}
                />
              </Search>
            </Stack>

            <Stack
              justifyContent={"space-between"}
              alignItems={"center"}
              direction={"row"}
            >
              <Typography variant="subtitle2" sx={{}} component={Link}>
                Start a conversation
              </Typography>
              <IconButton onClick={handleOpenDialog}>
                <Phone style={{ color: theme.palette.primary.main }} />
              </IconButton>
            </Stack>
            <Divider />
            <Stack sx={{ flexGrow: 1, overflow: "scroll", height: "100%" }}>
              <SimpleBarStyle timeout={500} clickOnTrack={false}>
                <Stack spacing={2.4}>
                  {call_logs.map((el, idx) => {
                    return <CallLogElement key={idx} {...el} />;
                  })}
                </Stack>
              </SimpleBarStyle>
            </Stack>
          </Stack>
        </Box>
      </Stack>
      {openDialog && (
        <StartCall open={openDialog} handleClose={handleCloseDialog} />
      )}
    </>
  );
};

export default Call;
