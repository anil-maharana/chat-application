import React, { useState } from "react";
import "./Room.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import ListItemText from "@mui/material/ListItemText";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Stack from "@mui/material/Stack";
import NewRoom from "./NewRoom";
import { ListItemButton } from "@mui/material";
import { stringAvatar } from "../layouts/ColouredAvatar";
import EditRoom from "./EditRoom";
import DeleteRoom from "./DeleteRoom";
import { Typography } from "@mui/material";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeNotification } from "../../redux/actions/notification";
import { getRoomById } from "../../redux/actions/room";

import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";

import ListItemIcon from "@mui/material/ListItemIcon";
const RoomList = (props) => {
  const {
    onRoomSelection,
    notifications,
    removeNotification,
    rooms,
    selectedRoom,
    getRoomById,
  } = props;
  const [addChannelDialog, setAddChannelDialog] = useState(false);
  const [editChannelDialog, setEditChannelDialog] = useState(false);
  const [deleteChannelDialog, setDeleteChannelDialog] = useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleListItemClick = (event, room, index) => {
    onRoomSelection(room);
    getRoomById(room._id);
    removeNotification(room._id);
  };
  const handleAddChannel = async (val) => {
    setAddChannelDialog(false);
  };
  const handleEditChannel = async (val) => {
    setEditChannelDialog(false);
  };
  const handleDeleteChannel = async (val) => {
    setDeleteChannelDialog(false);
  };
  
  return (
    <>
      <div className="rooms">
        <div className="roomsAreadHeader">
          <div className="roomsAreadHeader__left">
            <h2>Rooms</h2>
          </div>
          <div className="roomsAreadHeader__right">
            <IconButton
              edge="end"
              aria-label="Add"
              onClick={() => setAddChannelDialog(true)}
            >
              <AddIcon />
            </IconButton>
          </div>
        </div>
        <div className="rooms__list">
          {rooms.length > 0 ? (
            <List>
              {rooms.map((room, index) => (
                <ListItem
                  key={room._id}
                  secondaryAction={
                    <Stack direction="row" alignItems="center" spacing={1}>
                      <IconButton
                        aria-label="more"
                        id="long-button"
                        aria-controls="long-menu"
                        aria-expanded={open ? "true" : undefined}
                        aria-haspopup="true"
                        onClick={(event) => {
                          setAnchorEl(event.currentTarget);
                          getRoomById(room._id);
                        }}
                      >
                        <MoreVertIcon />
                      </IconButton>
                      <Menu
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleClose}
                        onClick={handleClose}
                        PaperProps={{
                          elevation: 0,
                          sx: {
                            overflow: "visible",
                            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
                            mt: 1.5,
                            "& .MuiAvatar-root": {
                              width: 32,
                              height: 32,
                              ml: -0.5,
                              mr: 1,
                            },
                            "&:before": {
                              content: '""',
                              display: "block",
                              position: "absolute",
                              top: 0,
                              right: 14,
                              width: 10,
                              height: 10,
                              bgcolor: "background.paper",
                              transform: "translateY(-50%) rotate(45deg)",
                              zIndex: 0,
                            },
                          },
                        }}
                        transformOrigin={{
                          horizontal: "right",
                          vertical: "top",
                        }}
                        anchorOrigin={{
                          horizontal: "right",
                          vertical: "bottom",
                        }}
                      >
                        <MenuItem
                          onClick={() => {
                            setEditChannelDialog(true);
                          }}
                        >
                          <ListItemIcon>
                            <EditIcon fontSize="small" />
                          </ListItemIcon>
                          Edit
                        </MenuItem>
                        <MenuItem
                          onClick={() => {
                            setDeleteChannelDialog(true);
                          }}
                        >
                          <ListItemIcon>
                            <DeleteIcon fontSize="small" />
                          </ListItemIcon>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Stack>
                  }
                  disablePadding
                >
                  <ListItemButton
                    selected={selectedRoom._id === room._id}
                    onClick={(event) => handleListItemClick(event, room, index)}
                  >
                    <ListItemAvatar>
                      <Avatar
                        {...stringAvatar(room.roomName)}
                        variant="square"
                      />
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        <Typography
                          type="body2"
                          style={{
                            fontWeight: `${
                              notifications.filter((n) => n.room == room._id)
                                .length > 0
                                ? "bold"
                                : "normal"
                            }`,
                          }}
                        >
                          {room.roomName}
                        </Typography>
                      }
                      secondary={room.roomType}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          ) : (
            <div
              style={{
                padding: "8px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span style={{ margin: "8px", padding: "8px" }}>
                No Rooms Available.
              </span>
            </div>
          )}
        </div>
      </div>
      {addChannelDialog && (
        <NewRoom
          isAddChannelDialogOpen={addChannelDialog}
          onAddChannelDialogClose={(val) => handleAddChannel(val)}
        />
      )}
      {editChannelDialog && selectedRoom && (
        <EditRoom
          isEditChannelDialogOpen={editChannelDialog}
          onEditChannelDialogClose={(val) => handleEditChannel(val)}
        />
      )}
      {deleteChannelDialog && selectedRoom && (
        <DeleteRoom
          isDeleteRoomDialogOpen={deleteChannelDialog}
          onDeleteRoomDialogClose={(val) => handleDeleteChannel(val)}
        />
      )}
    </>
  );
};

RoomList.propTypes = {
  notifications: PropTypes.array.isRequired,
  onRoomSelection: PropTypes.func.isRequired,
  removeNotification: PropTypes.func.isRequired,
  rooms: PropTypes.array.isRequired,
  selectedRoom: PropTypes.object.isRequired,
};
const mapStateToProps = (state) => ({
  notifications: state.notification,
  rooms: state.room.myRooms,
  selectedRoom: state.room.selectedRoom,
});
export default connect(mapStateToProps, { removeNotification, getRoomById })(
  RoomList
);
