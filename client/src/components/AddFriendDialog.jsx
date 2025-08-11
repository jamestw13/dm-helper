import { useState } from "react";
import { useMutation } from "@apollo/client";
import { ADD_FRIEND_REQUEST } from "../features/friends/services/friendServices";

const AddFriendDialog = ({ handleCloseDialog }) => {
  const [friendIdentifier, setFriendIdentifier] = useState("");
  const [addFriend] = useMutation(ADD_FRIEND_REQUEST, {
    variables: { friendIdentifier },
  });
  return (
    <>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          gap: "5rem",
          marginBottom: "1rem",
        }}
      >
        <p style={{ gridColumn: "span 2" }}>
          Enter your friend's username or email to send a friendship request
        </p>
        <button className="standard" onClick={handleCloseDialog}>
          Close
        </button>
      </div>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "2fr 1fr",
          gap: "1em",
        }}
      >
        <div
          style={{
            display: "grid",
            gridColumn: "span 2",
            gridTemplateColumns: "subgrid",
          }}
        >
          <div style={{ display: "grid" }}>
            <p>Username or Email Address</p>
            <input
              type="text"
              value={friendIdentifier}
              onChange={(e) => setFriendIdentifier(e.target.value)}
              placeholder="Username or Email"
            />
          </div>
          <button
            className="standard"
            onClick={addFriend}
            disabled={friendIdentifier === ""}
          >
            Send Request
          </button>
        </div>
      </div>
    </>
  );
};

export default AddFriendDialog;
