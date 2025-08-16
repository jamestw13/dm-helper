import { useState } from "react";
import { Avatar } from "../../../components/Avatar";
import "../../friends/User.css";

export default ({ user, options }) => {
  const [showOptionsPopover, setShowOptionsPopover] = useState(false);
  return (
    <div
      style={{
        display: "flex",
        gap: "1rem",
        background: "var(--bg-light)",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <div style={{ display: "flex", gap: "1rem", alignItems: "center" }}>
        <Avatar src={user?.avatar} />

        <p>{user?.username}</p>
      </div>
      {options && (
        <>
          <button
            className="standard"
            id="user-card-options-button"
            onClick={() => setShowOptionsPopover((x) => !x)}
          >
            {showOptionsPopover && (
              <div id="user-card-options-container">
                <div id="user-card-options">{options}</div>
              </div>
            )}
            ...
          </button>
        </>
      )}
    </div>
  );
};
