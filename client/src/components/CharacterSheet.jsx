import { useQuery } from '@apollo/client';
import { Checkbox, Table } from '@mantine/core';
import { QUERY_CHARACTER } from '../utils/queries';

const CharacterSheet = ({ charId }) => {
  // const charData = [];
  const { data: charData } = useQuery(QUERY_CHARACTER, {
    variables: { _id: charId },
  });

  const c = charData?.character;
  return (
    <Table withBorder withColumnBorders>
      <tbody>
        <tr>
          <th style={{ backgroundColor: c?.color }} colSpan={6} rowSpan={3}>
            <h3>{c?.name}</h3>
          </th>
          <th>{c?.class}</th>
          <th>{c?.level}</th>
          <th colSpan={2}>{c?.background}</th>
          <th colSpan={2}>{c?.user.firstname}</th>
        </tr>
        <tr>
          <td>Class</td>
          <td>Level</td>
          <td colSpan={2}>Background</td>
          <td colSpan={2}>Player Name</td>
        </tr>
        <tr>
          <th colSpan={2}>{c?.race}</th>
          <th colSpan={2}>{c?.alignment}</th>
          <th colSpan={2}>{c?.xp}</th>
        </tr>
        <tr>
          <td colSpan={6}>Character Name</td>
          <td colSpan={2}>Race</td>
          <td colSpan={2}>Alignment</td>
          <td colSpan={2}>Exp. Points</td>
        </tr>
        <tr>
          <td colSpan={2}>Strength</td>
          <th>{c?.inspiration}</th>
          <td colSpan={2}>Inspiration</td>
          <th>{c?.ac}</th>
          <th>
            {c?.initMod > 0 && `+`}
            {c?.initMod}
          </th>
          <th>{c?.speed}</th>
          <th colSpan={4} rowSpan={2}>
            {c?.persTraits}
          </th>
        </tr>
        <tr>
          <th colSpan={2}>{c?.strMod > 0 ? `+${c?.strMod}` : c?.strMod}</th>
          <th>+{c?.profBonus}</th>
          <td colSpan={2}>Proficiency Bonus</td>
          <td>Armor Class</td>
          <td>Initiative</td>
          <td>Speed</td>
        </tr>
        <tr>
          <td colSpan={2}>{c?.str}</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.strST}</th>
          <td>Strength</td>
          <td colSpan={2}>Hit Point Maximum</td>
          <th>{c?.hp}</th>
          <td colSpan={4}>Personality Traits</td>
        </tr>
        <tr>
          <td colSpan={2}>Dexterity</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.dexST}</th>
          <td>Dexterity</td>

          <th colSpan={3} rowSpan={2}>
            {c?.currentHP}
          </th>
          <th colSpan={4} rowSpan={2}>
            {c?.ideals}
          </th>
        </tr>
        <tr>
          <th colSpan={2}>{c?.dexMod > 0 ? `+${c?.dexMod}` : c?.dexMod}</th>
          <td>
            <Checkbox />
          </td>
          <th>{c?.conST}</th>
          <td>Constitution</td>
        </tr>
        <tr>
          <td colSpan={2}>{c?.dex}</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.intST}</th>
          <td>Intelligence</td>
          <td colSpan={3}>Current Hit Points</td>

          <td colSpan={4}>Ideals</td>
        </tr>
        <tr>
          <td colSpan={2}>Constitution</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.wisST}</th>
          <td>Wisdom</td>
          <td colSpan={3} rowSpan={2}>
            {c?.tempHP}
          </td>
          <th colSpan={3} rowSpan={2}>
            {c?.bonds}
          </th>
        </tr>
        <tr>
          <th colSpan={2}>{c?.conMod > 0 ? `+${c?.conMod}` : c?.conMod}</th>
          <td>
            <Checkbox />
          </td>
          <th>{c?.chaST}+2*</th>
          <td>Charisma</td>
        </tr>
        <tr>
          <td colSpan={2}>{c?.con}</td>
          <td colSpan={3}>Saving Throws</td>
          <td colSpan={3}>Temporary Hit Points</td>
          <td colSpan={4}>Bonds</td>
        </tr>
        <tr>
          <td colSpan={2}>Intelligence</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <th colSpan={2}>{c?.intMod > 0 ? `+${c?.intMod}` : c?.intMod}</th>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>{c?.int}</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>Wisdom</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <th colSpan={2}>{c?.wisMod > 0 ? `+${c?.wisMod}` : c?.wisMod}</th>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>{c?.wis}</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>Charisma</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <th colSpan={2}>{c?.chaMod > 0 ? `+${c?.chaMod}` : c?.chaMod}</th>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2}>{c?.cha}</td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <th colSpan={2}>{c?.passPerc}</th>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={2}>
            Passive Wisdom (Perception)
          </td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={2} rowSpan={7}></td>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <Checkbox />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td>
            <Checkbox type='checkbox' />
          </td>
          <th>{c?.SP}</th>
          <td></td>
        </tr>
        <tr>
          <td colSpan={3}>Skills</td>
        </tr>
      </tbody>
    </Table>
  );
};

export default CharacterSheet;
