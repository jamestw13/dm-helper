const SheetContainer = ({ chars }) => {
  return (
    <div className='card'>
      <h2>Character Sheet</h2>
      {chars.map((char, i) => (
        <CharacterSheet character={char} key={i} />
      ))}
    </div>
  );
};

const CharacterSheet = ({ character: c }) => {
  return (
    <table style={{ backgroundColor: c.color }} className='character-table'>
      <tbody>
        <tr>
          <th style={{ backgroundColor: c.color }} colSpan={6} rowSpan={3}>
            <h3>{c.name}</h3>
          </th>
          <th>{c.class.type}</th>
          <th>{c.level}</th>
          <th colSpan={2}>{c.background}</th>
          <th colSpan={2}>{c.player}</th>
        </tr>
        <tr>
          <td>Class</td>
          <td>Level</td>
          <td colSpan={2}>Background</td>
          <td colSpan={2}>Player Name</td>
        </tr>
        <tr>
          <th colSpan={2}>{c.race}</th>
          <th colSpan={2}>{c.alignment}</th>
          <th colSpan={2}>{c.xp}</th>
        </tr>
        <tr>
          <td colSpan={6}>Character Name</td>
          <td colSpan={2}>Race</td>
          <td colSpan={2}>Alignment</td>
          <td colSpan={2}>Exp. Points</td>
        </tr>
        <tr>
          <td colSpan={2}>Strength</td>
          <th>{c.inspiration}</th>
          <td colSpan={2}>Inspiration</td>
          <th>{c.ac}</th>
          <th>
            {c.initMod > 0 && `+`}
            {c.initMod}
          </th>
          <th>{c.speed}</th>
          <th colSpan={4} rowSpan={2}>
            {c.persTraits}
          </th>
        </tr>
        <tr>
          <th colSpan={2}>{c.strMod > 0 ? `+${c.strMod}` : c.strMod}</th>
          <th>+{c.profBonus}</th>
          <td colSpan={2}>Proficiency Bonus</td>
          <td>Armor Class</td>
          <td>Initiative</td>
          <td>Speed</td>
        </tr>
        <tr>
          <td colSpan={2}>{c.str}</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.strST}</th>
          <td>Strength</td>
          <td colSpan={2}>Hit Point Maximum</td>
          <th>{c.hp}</th>
          <td colSpan={4}>Personality Traits</td>
        </tr>
        <tr>
          <td colSpan={2}>Dexterity</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.dexST}</th>
          <td>Dexterity</td>

          <th colSpan={3} rowSpan={2}>
            {c.currentHP}
          </th>
          <th colSpan={4} rowSpan={2}>
            {c.ideals}
          </th>
        </tr>
        <tr>
          <th colSpan={2}>{c.dexMod > 0 ? `+${c.dexMod}` : c.dexMod}</th>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.conST}</th>
          <td>Constitution</td>
        </tr>
        <tr>
          <td colSpan={2}>{c.dex}</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.intST}</th>
          <td>Intelligence</td>
          <td colSpan={3}>Current Hit Points</td>

          <td colSpan={4}>Ideals</td>
        </tr>
        <tr>
          <td colSpan={2}>Constitution</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.wisST}</th>
          <td>Wisdom</td>
          <td colSpan={3} rowSpan={2}>
            {c.tempHP}
          </td>
          <th colSpan={3} rowSpan={2}>
            {c.bonds}
          </th>
        </tr>
        <tr>
          <th colSpan={2}>{c.conMod > 0 ? `+${c.conMod}` : c.conMod}</th>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.chaST}</th>
          <td>Charisma</td>
        </tr>
        <tr>
          <td colSpan={2}>{c.con}</td>
          <td colSpan={3}>Saving Throws</td>
          <td colSpan={3}>Temporary Hit Points</td>
          <td colSpan={4}>Bonds</td>
        </tr>
        <tr>
          <td colSpan={2}>Intelligence</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <th colSpan={2}>{c.intMod > 0 ? `+${c.intMod}` : c.intMod}</th>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>{c.int}</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>Wisdom</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <th colSpan={2}>{c.wisMod > 0 ? `+${c.wisMod}` : c.wisMod}</th>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>{c.wis}</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>Charisma</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <th colSpan={2}>{c.chaMod > 0 ? `+${c.chaMod}` : c.chaMod}</th>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>{c.cha}</td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <th colSpan={2}>{c.passPerc}</th>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2}>
            Passive Wisdom (Perception)
          </td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={7}></td>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <input type='checkbox' />
          </td>
          <th>{c.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={3}>Skills</td>
        </tr>
      </tbody>
    </table>
  );
};

export default SheetContainer;
