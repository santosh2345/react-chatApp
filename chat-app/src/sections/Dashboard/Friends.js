import { Dialog, Tab, Tabs, DialogContent } from "@mui/material";
import { Stack } from "@mui/system";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  FriendComponent,
  FriendRequestComponent,
  UserComponent,
} from "../../components/Friends";
import {
  FetchFriendRequests,
  FetchFriends,
  FetchUsers,
} from "../../redux/slices/app";
import socket from '../../Socket'

const UserList = () => {
  const dispatch = useDispatch();
  // TODO => get all users from backend and send to fetchusers({user:{}}) so that to save to redux store
  // socket.on("")
  useEffect(() => {
    dispatch(FetchUsers());
  }, []);
  const { users } = useSelector((state) => state.app);
  console.log("users are : ",users);

  return (
    <>
      {users.map((el, idx) => {
        //render usercomponents here
        return <UserComponent key={el._id} {...el} />;
      })}
      {/* <h1>Froend</h1> */}
    </>
  );
};

const FriendsList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriends());
  }, []);
  const { friends } = useSelector((state) => state.app);

  return (
    <>
      {friends.map((el, idx) => {
        //  render friendcomponents here
        return <FriendComponent key={el._id} {...el}  /> ;
      })}
    </>
  );
};

const FriendRequestList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(FetchFriendRequests());
  }, []);
  // const { friendRequest } = useSelector((state) => state.app);
  const { friendRequests } = useSelector((state) => state.app);


  return (
    <>
      {friendRequests.map((el, idx) => {
     

        // el => {_id, sender:{_id, firstName, lastName, img, online} , receipent}
        // render friendRequestComponents here
        return (
          <FriendRequestComponent key={el._id} {...el.sender} id={el._id} />
        );
      })}
    </>
  );
};

const Friends = ({ open, handleClose }) => {
  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Dialog
      fullWidth
      maxWidth="xs"
      open={open}
      keepMounted
      onClose={handleClose}
      sx={{ p: 4 }}
    >
      <Stack p={2} sx={{ width: "100%" }}>
        <Tabs value={value} onChange={handleChange} centered>
          <Tab label="Explore" />
          <Tab label="Friends" />
          <Tab label="Request" />
        </Tabs>
      </Stack>
      {/* Dialog Content */}
      <DialogContent>
        <Stack sx={{ height: "100%" }}>
          <Stack spacing={2.5}>
            {/*  this below function is iife i.e. => immediately invoked function expression */}
            {(() => {
              switch (value) {
                case 0: //display all users
                console.log("this is called");
                  return <UserList />;
                  
                case 1: //display all friends
                console.log("this is called");

                  return <FriendsList />;
                case 2: // display all friend request
                  return <FriendRequestList />;
                default:
                console.log("this is called");

                  break;
              }
            })()}
          </Stack>
        </Stack>
      </DialogContent>
    </Dialog>
  );
};

export default Friends;
