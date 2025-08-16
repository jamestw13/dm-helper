import { useContext, useEffect, useRef, useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { useParams, Navigate, useNavigate } from "react-router-dom";

import { QUERY_ME, QUERY_USER, UserContext } from "..";
import {
  CONFIRM_FRIEND_REQUEST,
  CANCEL_FRIEND_REQUEST,
  REMOVE_FRIEND,
} from "../../friends/services/friendServices";

import { PageWrapper } from "../../../components";
import Auth from "../../../utils/auth";
import UserCard from "./UserCard";
import CharacterCard from "./CharacterCard";
import CampaignCard from "./CampaignCard";
import AddFriendDialog from "../../../components/AddFriendDialog";
import AddCharacterDialog from "../../../components/AddCharacterDialog";

const Profile = () => {
  const { userId: userParam } = useParams();
  const { user, loggedIn } = useContext(UserContext);

  const dialogRef = useRef(null);
  const [dialogForm, setDialogForm] = useState({ type: "", data: {} });

  const [confirmRequest] = useMutation(CONFIRM_FRIEND_REQUEST);
  const [rejectRequest] = useMutation(CANCEL_FRIEND_REQUEST);
  const [removeFriend] = useMutation(REMOVE_FRIEND);

  if (!loggedIn) return <Navigate to="/" />;
  const navigate = useNavigate();

  const {
    loading,
    data: userData,
    refetch,
  } = useQuery(
    Auth.getProfile().data._id === userParam ? QUERY_ME : QUERY_USER,
    {
      variables: { _id: userParam },
    }
  );

  const handleFriendClick = (userId) => {
    navigate(`/${userId}`);
  };

  const handleCharacterClick = (charId) => {
    navigate(`/sheet/${charId}`);
  };

  const handleCampaignClick = (campaignId) => {
    return navigate(`/campaign/${campaignId}`);
  };

  const handleOpenAddFriendDialog = () => {
    setDialogForm({ type: "addFriend", data: {} });
    if (dialogRef.current) {
      dialogRef.current?.showModal();
    }
  };
  const handleOpenAddCharacterDialog = () => {
    setDialogForm({ type: "addCharacter", data: {} });
    if (dialogRef.current) {
      dialogRef.current?.showModal();
    }
  };

  const handleCloseDialog = () => {
    dialogRef?.current.close();
  };

  if (!user) return <div>Loading...</div>;
  return (
    <PageWrapper
      title={
        user.firstname
          ? `${user.firstname || ""} ${user.lastname || ""}`
          : user.username
      }
    >
      <div style={{ display: "grid", gap: "1rem" }}>
        <div className="section-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>My Friends</h2>
            <button className="standard" onClick={handleOpenAddFriendDialog}>
              Add Friend
            </button>
          </div>
          {user?.friends?.map((friend) => (
            <UserCard
              user={friend}
              key={friend._id}
              options={[
                <button>Add to campaign</button>,
                <button>Remove Friend</button>,
              ]}
            />
          ))}
          <h3>Friend Requests</h3>
          {user.friendRequests?.map((friend, index) => (
            <UserCard
              user={friend}
              key={friend._id}
              isRequest={true}
              onClick={() => handleFriendClick(friend._id)}
            />
          ))}
          <h3>Sent Requests</h3>
          {user.requestedFriends?.map((friend, index) => (
            <UserCard
              user={friend}
              key={friend._id}
              isRequest={true}
              onClick={() => handleFriendClick(friend._id)}
            />
          ))}
        </div>

        <div className="section-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>My Characters</h2>
            <button className="standard" onClick={handleOpenAddCharacterDialog}>
              Add Character
            </button>
          </div>
          {user?.characters?.map((char) => (
            <CharacterCard
              character={char}
              key={char._id}
              onClick={handleCharacterClick}
            />
          ))}
        </div>

        <div className="section-container">
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <h2>My Campaigns</h2>
            <button className="standard" onClick={() => {}}>
              Add Campaign
            </button>
          </div>
          {user?.campaigns?.map((campaign) => (
            <CampaignCard
              campaign={campaign}
              key={campaign._id}
              onClick={() => handleCampaignClick(campaign._id)}
            />
          ))}
        </div>
      </div>
      <dialog ref={dialogRef}>
        {dialogForm.type === "addFriend" && (
          <AddFriendDialog handleCloseDialog={handleCloseDialog} />
        )}
        {dialogForm.type === "addCharacter" && (
          <AddCharacterDialog handleCloseDialog={handleCloseDialog} />
        )}
      </dialog>
    </PageWrapper>
  );
};

export default Profile;
