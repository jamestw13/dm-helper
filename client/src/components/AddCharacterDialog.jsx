import { useMutation } from "@apollo/client";

import { ADD_CHARACTER } from "../features/characters/index";
import { useState } from "react";
import { useParams } from "react-router-dom";
const AddCharacterDialog = ({ handleCloseDialog }) => {
  const { userId: userParam } = useParams();

  const [characterName, setCharacterName] = useState("");
  const [addCharacter] = useMutation(ADD_CHARACTER, {
    variables: { character: { name: characterName, user: userParam } },
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
        <p style={{ gridColumn: "span 2" }}>Enter your character's name</p>
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
            <p>Character Name</p>
            <input
              type="text"
              value={characterName}
              onChange={(e) => setCharacterName(e.target.value)}
              placeholder="Username or Email"
            />
          </div>
          <button
            className="standard"
            onClick={addCharacter}
            disabled={characterName === ""}
          >
            Create
          </button>
        </div>
      </div>
    </>
  );
};

export default AddCharacterDialog;
