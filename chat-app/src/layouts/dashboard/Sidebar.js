
import React from "react";
import { useTheme } from "@mui/material/styles";

import { Box, Divider, IconButton, Stack } from "@mui/material";
import AntSwitch from "../../components/AntSwitch";

import Logo from "../../assets/Images/logo.ico";

import useSettings from "../../hooks/useSettings";
import { Nav_Buttons, Nav_Setting } from "../../data";

import ProfileMenu from "./ProfileMenu";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { UpdateTab } from "../../redux/slices/app";

const getPath = (index) => {
  switch (index) {
    case 0:
      return "/app";

    case 1:
      return "/group";

    case 2:
      return "/call";

    case 3:
      return "/settings";

    default:
      break;
  }
};

const SideBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();

  const { tab } = useSelector((state) => state.app);

  const navigate = useNavigate();

  const { onToggleMode } = useSettings();

  const selectedTab = tab;

  const handleChangeTab = (index) => {
    dispatch(UpdateTab({ tab: index }));
    navigate(getPath(index));
  };

  return (
    <Box
      sx={{
        height: "100vh",
        width: 100,

        backgroundColor:
          theme.palette.mode === "light"
            ? "#F0F4FA"
            : theme.palette.background.paper,
        boxShadow: "0px 0px 2px rgba(0, 0, 0, 0.25)",
      }}
    >
      <Stack
        py={3}
        alignItems={"center"}
        justifyContent="space-between"
        sx={{ height: "100%" }}
      >
        <Stack alignItems={"center"} spacing={4}>
          <Box
            sx={{
              height: 64,
              width: 64,
              borderRadius: 1.5,
              backgroundColor: theme.palette.primary.main,
            }}
            p={1}
          >
            <img src={Logo} alt="Tawk" />
          </Box>
          <Stack
            sx={{ width: "max-content" }}
            direction="column"
            alignItems={"center"}
            spacing={3}
          >
            {Nav_Buttons.map((el) => {
              return el.index == selectedTab ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
            <Divider sx={{ width: 48 }} />
            {Nav_Setting.map((el) => {
              return el.index == selectedTab ? (
                <Box
                  sx={{
                    backgroundColor: theme.palette.primary.main,
                    borderRadius: 1.5,
                  }}
                  p={1}
                >
                  <IconButton
                    onClick={() => {
                      handleChangeTab(el.index);
                    }}
                    sx={{ width: "max-content", color: "#ffffff" }}
                  >
                    {el.icon}
                  </IconButton>
                </Box>
              ) : (
                <IconButton
                  onClick={() => {
                    handleChangeTab(el.index);

                    // dispatch(UpdateTab(el.index));
                  }}
                  sx={{
                    width: "max-content",
                    color:
                      theme.palette.mode === "light"
                        ? "#080707"
                        : theme.palette.text.primary,
                  }}
                >
                  {el.icon}
                </IconButton>
              );
            })}
          </Stack>
        </Stack>
        <Stack spacing={4}>
          <AntSwitch
            defaultChecked={theme.palette.mode === "dark"}
            onChange={onToggleMode}
          />
          {/* Profile Menu */}
          <ProfileMenu />
        </Stack>
      </Stack>
    </Box>
  );
};

export default SideBar;



// import {
//   Avatar,
//   Box,
//   Divider,
//   IconButton,
//   Menu,
//   MenuItem,
//   Stack,
//   useTheme,
// } from "@mui/material";
// import { Gear } from "phosphor-react";
// import React, { useState } from "react";
// import { Nav_Buttons, Profile_Menu } from "../../data";
// import useSettings from "../../hooks/useSettings";
// import { faker } from "@faker-js/faker";
// import Logo from "../../assets/Images/logo.png";
// import AntSwitch from "../../components/AntSwitch";
// import { Navigate, useNavigate } from "react-router-dom";
// import { LogoutUser } from "../../redux/slices/auth";
// import { useDispatch } from "react-redux";

// const getPath = (index) => {
//   switch (index) {
//     case 0:
//       return "/app";
//     case 1:
//       return "/group";
//     case 2:
//       return "/call";
//     case 3:
//       return "/settings";
//     default:
//       break;
//   }
// };

// const getMenuPath = (index) => {
//   switch (index) {
//     case 0:
//       return "/profile";
//     case 1:
//       return "/settings";
//     case 2:
//       // todo => update the token and set isAuthenticate to false
//       return "/auth/login";
//     default:
//       break;
//   }
// };

// const Sidebar = () => {
//   const dispatch = useDispatch();
//   const theme = useTheme();
//   const navigate = useNavigate();
//   const [selected, setSelected] = useState(0);
//   const { onToggleMode } = useSettings();

//   const [anchorEl, setAnchorEl] = React.useState(null);
//   const open = Boolean(anchorEl);
//   const handleClick = (event) => {
//     setAnchorEl(event.currentTarget);
//   };
//   const handleClose = () => {
//     setAnchorEl(null);
//   };

//   return (
//     <Box
//       p={2}
//       sx={{
//         backgroundColor: theme.palette.background.paper,
//         boxShadow: "0px 0px 2px rgba(0,0,0,0.25)",
//         height: "100vh",
//         width: 100,
//       }}
//     >
//       <Stack
//         direction="column"
//         alignItems={"center"}
//         sx={{ height: "100%" }}
//         spacing={3}
//         justifyContent="space-between"
//       >
//         <Stack alignItems={"center"} spacing={4}>
//           <Box
//             sx={{
//               background: theme.palette.primary.main,
//               height: 64,
//               width: 64,
//               borderRadius: 1.5,
//             }}
//           >
//             <img src={Logo} alt={"Chat App Logo"} />
//           </Box>

//           <Stack
//             spacing={3}
//             sx={{ width: "max-content" }}
//             direction="column"
//             alignItems="center"
//           >
//             {Nav_Buttons.map((el) =>
//               el.index === selected ? (
//                 <Box
//                   sx={{
//                     backgroundColor: theme.palette.primary.main,
//                     borderRadius: 1.5,
//                   }}
//                 >
//                   <IconButton
//                     sx={{ width: "max-content", color: "#fff" }}
//                     key={el.index}
//                   >
//                     {el.icon}{" "}
//                   </IconButton>
//                 </Box>
//               ) : (
//                 <IconButton
//                   onClick={() => {
//                     setSelected(el.index);
//                     navigate(getPath(el.index));
//                   }}
//                   sx={{
//                     width: "max-content",
//                     color:
//                       theme.palette.mode === "light"
//                         ? "#000"
//                         : theme.palette.text.primary,
//                   }}
//                   key={el.index}
//                 >
//                   {" "}
//                   {el.icon}{" "}
//                 </IconButton>
//               )
//             )}

//             <Divider sx={{ width: "48px" }} />

//             {selected === 3 ? (
//               <Box
//                 p={1}
//                 sx={{
//                   backgroundColor: theme.palette.primary.main,
//                   borderRadius: 1.5,
//                 }}
//               >
//                 <IconButton sx={{ width: "max-content", color: "#fff" }}>
//                   <Gear />
//                 </IconButton>
//               </Box>
//             ) : (
//               <IconButton
//                 onClick={() => {
//                   setSelected(3);
//                   navigate(getPath(3));
//                 }}
//                 sx={{
//                   width: "max-content",
//                   color:
//                     theme.palette.mode === "light"
//                       ? "#000"
//                       : theme.palette.text.primary,
//                 }}
//               >
//                 <Gear />
//               </IconButton>
//             )}
//           </Stack>
//         </Stack>
//         <Stack spacing={4}>
//           <AntSwitch
//             onChange={() => {
//               onToggleMode();
//             }}
//           />
//           <Avatar
//             id="basic-button"
//             aria-controls={open ? "basic-menu" : undefined}
//             aria-haspopup="true"
//             aria-expanded={open ? "true" : undefined}
//             onClick={handleClick}
//             src={faker.image.avatar()}
//           />
//           <Menu
//             id="basic-menu"
//             anchorEl={anchorEl}
//             open={open}
//             onClose={handleClose}
//             MenuListProps={{
//               "aria-labelledby": "basic-button",
//             }}
//             anchorOrigin={{
//               vertical: "bottom",
//               horizontal: "right",
//             }}
//             transformOrigin={{
//               vertical: "bottom",
//               horizontal: "left",
//             }}
//           >
//             <Stack spacing={1} px={1}>
//               {Profile_Menu.map((el, index) => (
//                 <MenuItem
//                   onClick={() => {
//                     handleClick();
//                   }}
//                 >
//                   <Stack
//                     onClick={() => {
//                       if (index === 2) {
//                         //if idx is 2 then  dispatch logout
//                         dispatch(LogoutUser());
//                       } else {
//                         navigate(getMenuPath(index));
//                       }
//                     }}
//                     sx={{ width: 100 }}
//                     direction="row"
//                     alignItems={"center"}
//                     justifyContent="space-between"
//                   >
//                     <span>{el.title} </span>
//                     {el.icon}
//                   </Stack>
//                 </MenuItem>
//               ))}
//             </Stack>
//           </Menu>
//         </Stack>
//       </Stack>
//     </Box>
//   );
// };

// export default Sidebar;
