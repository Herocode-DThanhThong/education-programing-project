// Vendor
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import AddPhotoAlternateIcon from "@mui/icons-material/AddPhotoAlternate";
import SearchIcon from "@mui/icons-material/Search";
import TagIcon from "@mui/icons-material/Tag";
import { Avatar } from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Input from "@mui/material/Input";
import { useAppDispatch, useAppSelector } from "common/hooks";
import { idUser, userName } from "common/services/authService/authSlice";
import { friends } from "common/services/friendService/friendSlice";
import { postActions } from "common/services/postService/postSlice";
import { user } from "common/services/settingService/settingSlice";
import { useState } from "react";
import { NotificationToReceiver, PostDetailsType, UserFriend } from "types";
import { ModalCreatePost } from "./ModalCreatePost";
import ModalHastag from "./ModalHastag";
import { ModalSearchPost } from "./ModalSearchPost";
interface Props {
  sendNotificationToReceiver: (data: NotificationToReceiver) => void;
}

const CreatePost = ({ sendNotificationToReceiver }: Props) => {
  // Hooks
  const [openModalHashTag, setOpenModalHashTag] = useState(false);
  const [openModalSearchPost, setOpenModalSearchPost] = useState(false);
  const [openModalCreatePost, setOpenModalCreatePost] = useState(false);

  const dispatch = useAppDispatch();
  const userNameLoggedIn = useAppSelector(userName);
  const idUserLoggedIn = useAppSelector(idUser);
  const friendsData = useAppSelector(friends);
  const userData = useAppSelector(user);

  const handleCreateNewPost = (params: {
    content: string;
    imageUrls: Array<String>;
  }) => {
    // Create new post
    createNewPostSubmit(params);
  };

  const createNewPostSubmit = (dataNewPost: {
    content: string;
    imageUrls: Array<String>;
  }): void => {
    const inputValue = {
      content: dataNewPost.content,
      postImageUrl: "",
      imageUrls: dataNewPost.imageUrls,
      user: {
        id: idUserLoggedIn as number,
        userName: userNameLoggedIn as string,
      },
      isPostShared: false,
    };
    dispatch(
      postActions.createPostRequest({
        createPostRequest: inputValue,
        sendNotify: (post: PostDetailsType) => {
          sendNewPostNotificationToFriends(post);
        },
      })
    );
  };

  const sendNewPostNotificationToFriends = (post: PostDetailsType) => {
    if (friendsData) {
      // Get all user friends
      const userFriends: Array<UserFriend> = friendsData.map((f, _) => {
        if (f.userFrom.id === idUserLoggedIn) {
          return {
            id: f.userTo.id,
            userName: f.userTo.userName,
            firstName: f.userTo.firstName,
            lastName: f.userTo.lastName,
            email: f.userTo.email,
            imageUrl: f.userTo.imageUrl,
          };
        }

        return {
          id: f.userFrom.id,
          userName: f.userFrom.userName,
          firstName: f.userFrom.firstName,
          lastName: f.userFrom.lastName,
          email: f.userFrom.email,
          imageUrl: f.userFrom.imageUrl,
        };
      });

      // Send notify
      userFriends.forEach((u, _) => {
        sendNotificationToReceiver({
          post,
          userFrom: {
            id: idUserLoggedIn as number,
            userName: userNameLoggedIn as string,
          },
          userTo: {
            id: u.id as number,
            userName: u.userName as string,
          },
          storeInDB: true,
          typeNotify: "NEW_POST",
          action: "NEW_POST_ACTION",
        });
      });
    }
  };

  return (
    <div className="post-wrapper">
      {/* Create-Post */}
      <div className="post-top">
        {/* Start Input create post */}
        <div className="user-img">
          {userData?.imageUrl ? (
            <Avatar
              sx={{ m: 1, bgcolor: "orange", margin: "auto" }}
              alt="avatar"
              src={userData.imageUrl}
            />
          ) : (
            <AccountCircleOutlinedIcon style={{ fontSize: "35px" }} />
          )}
        </div>
        <Input
          autoFocus
          placeholder={`Đăng bài, ${userNameLoggedIn}`}
          className="input"
          disableUnderline
          onClick={() => setOpenModalCreatePost(true)}
        />
        {/* End Input create post */}
      </div>

      <Divider variant="fullWidth" style={{ margin: "10px 10px 0 10px" }} />

      {/* Start Create-Post-Icon Video Photo Feeling */}
      <div
        className="post-bottom"
        style={{
          display: "flex",
          justifyContent: "space-between",
          marginTop: "10px",
        }}
      >
        <Button
          onClick={() => setOpenModalHashTag(true)}
          variant="text"
          startIcon={<TagIcon color="primary" />}
          style={{
            textTransform: "none",
          }}
        >
          Hash tag
        </Button>
        <Button
          variant="text"
          startIcon={<AddPhotoAlternateIcon style={{ color: "green" }} />}
          style={{
            textTransform: "none",
          }}
          onClick={() => setOpenModalCreatePost(true)}
        >
          Hình ảnh
        </Button>

        <Button
          onClick={() => setOpenModalSearchPost(true)}
          variant="text"
          startIcon={<SearchIcon style={{ color: "orange" }} />}
          style={{
            textTransform: "none",
          }}
        >
          Tìm kiếm
        </Button>
      </div>

      {/* End Create-Post-Icon Video Photo Feeling */}
      {openModalHashTag && (
        <ModalHastag onClose={() => setOpenModalHashTag(false)} />
      )}

      {openModalSearchPost && (
        <ModalSearchPost onClose={() => setOpenModalSearchPost(false)} />
      )}

      {openModalCreatePost && (
        <ModalCreatePost
          onClose={() => setOpenModalCreatePost(false)}
          onSubmit={handleCreateNewPost}
        />
      )}
    </div>
  );
};

export default CreatePost;
