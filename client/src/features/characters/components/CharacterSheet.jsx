import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_CHARACTER } from '../';

import { characterValues } from '../formInitialValues';

const input = props => {
  return (
    <div
      sx={{
        display: 'flex',

        flexDirection: props.labelPos,
        gap: '.5em',

        alignItems: 'stretch',
      }}
    >
      {props.checked && <input type="checkbox" />}
      {props.type === 'num' && (
        <input
          type="number"
          hideControls
          sx={{ width: !props.fullWidth && '3em' }}
          value={props.value}
          onChange={props.onChange}
        />
      )}
      {props.type === 'text' && <input type="text" value={props.value} onChange={props.onChange} />}
      {props.type === 'select' && <select data={props.data} value={props.value} onChange={props.onChange} />}
      {props.type === 'tArea' && <text data={props.data} value={props.value} onChange={props.onChange} />}
      <p align="center">{props.label}</p>
    </div>
  );
};

const CharacterSheet = ({ charId }) => {
  // const charData = [];
  const { data: charData } = useQuery(QUERY_CHARACTER, {
    variables: { _id: charId },
  });

  const c = charData?.character;

  const [form, setForm] = useState(characterValues);

  useEffect(() => {
    if (c) setForm({ ...c, user: `${c.user.firstname} ${c.user.lastname}` });
  }, [c]);

  return (
    <>
      {/* Details Block */}
      <div style={{ display: 'grid' }}>
        <div span={6}>
          <input type="text" label="Character Name" labelPos="column" value={form['name']} />
        </div>
        <div span={1}>
          <input
            type="select"
            label="Class"
            labelPos="column"
            data={[
              'Barbarian',
              'Bard',
              'Cleric',
              'Druid',
              'Fighter',
              'Monk',
              'Paladin',
              'Ranger',
              'Rogue',
              'Sorcerer',
              'Warlock',
              'Wizard',
            ]}
            value={form['class']}
          />
        </div>
        <div span={1}>
          <input type="num" label="Level" labelPos="column" value={form['level']} />
        </div>
        <div span={2}>
          <input type="text" label="Background" labelPos="column" value={form['background']} />
        </div>
        <div span={2}>
          <input type="text" label="Player" labelPos="column" value={form['user']} />
        </div>
        <div span={6}></div>
        <div span={2}>
          <input
            type="select"
            size="xs"
            searchable
            label="Race"
            labelPos="column"
            data={[
              'Human',
              'Elf',
              'Dwarf',
              'Halfling',
              'Dragonborn',
              'Gnome',
              'Half-Elf',
              'Half-Orc',
              'Tiefling',
              'Warforged',
            ]}
            value={form['race']}
          />
        </div>
        <div span={2}>
          <input
            type="select"
            label="Alignment"
            labelPos="column"
            data={[
              'Lawful Good',
              'Lawful Neutral',
              'Lawful Evil',
              'Neutral Good',
              'True Neutral',
              'Neutral Evil',
              'Chaotic Good',
              'Chaotic Neutral',
              'Chaotic Evil',
            ]}
            value={form['alignment']}
          />
        </div>
        <div span={2}>
          <input type="num" fullWidth label="Experience Points" labelPos="column" value={form['xp']} />
        </div>
      </div>

      <div style={{ display: 'grid' }}>
        {/* Left Column */}
        <div span={4}>
          <div style={{ display: 'grid' }} gutter="xs">
            {/* Ability Scores Block */}
            <div span={4}>
              <input type="number" size="xs" label="Strength" value={form['strMod']} />
              <input type="number" size="xs" value={form['str']} />
              <input type="number" size="xs" label="Dexterity" value={form['dexMod']} />
              <input type="number" size="xs" value={form['dex']} />
              <input type="number" size="xs" label="Constitution" value={form['conMod']} />
              <input type="number" size="xs" value={form['con']} />
              <input type="number" size="xs" label="Intelligence" value={form['intMod']} />
              <input type="number" size="xs" value={form['int']} />
              <input type="number" size="xs" label="Wisdom" value={form['wisMod']} />
              <input type="number" size="xs" value={form['wis']} />
              <input type="number" size="xs" label="Charisma" value={form['chaMod']} />
              <input type="number" size="xs" value={form['cha']} />
            </div>

            <div span={8}>
              <div style={{ display: 'grid' }} gutter={0}>
                <div span={12}>
                  <input type="num" size="xs" label="Inspiration" value={form['inspiration']} />
                </div>
                <div span={12}>
                  <input type="num" size="xs" label="Proficiency Bonus" value={form['profBonus']} />
                </div>
                <div span={12}>
                  <input type="num" label="Passive Wisdom (Perception)" value={form['passPercep']} />
                </div>
              </div>

              {/* Saving Throws Block */}
              <div>
                <h5> Saving Throws</h5>
                <input type="num" label="Strength" checked value={form['strSTProf']} />
                <input type="num" label="Dexterity" checked value={form['dexSTProf']} />
                <input checked type="num" label="Constitution" value={form['conSTProf']} />
                <input checked type="num" label="Intelligence" value={form['intSTProf']} />
                <input checked type="num" label="Wisdom" value={form['wisSTProf']} />
                <input checked type="num" label="Charisma" value={form['chaSTProf']} />
              </div>

              <div>
                <h5> Skills</h5>
                <input checked type="num" label="Acrobatics" value={form['skillAcrobatics']} />
                <input checked type="num" label="Animal Handling" value={form['skillAniHand']} />
                <input checked type="num" label="Arcana" value={form['skillArcana']} />
                <input checked type="num" label="Athletics" value={form['skillAth']} />
                <input checked type="num" label="Deception" value={form['skillDecep']} />
                <input checked type="num" label="History" value={form['skillHist']} />
                <input checked type="num" label="Insight" value={form['skillInsight']} />
                <input checked type="num" label="Intimidation" value={form['skillIntim']} />
                <input checked type="num" label="Investigation" value={form['skillInvest']} />
                <input checked type="num" label="Medicine" value={form['skillMedicine']} />
                <input checked type="num" label="Nature" value={form['skillNature']} />
                <input checked type="num" label="Perception" value={form['skillPercep']} />
                <input checked type="num" label="Performance" value={form['skillPerform']} />
                <input checked type="num" label="Persuasion" value={form['skillPersuasion']} />
                <input checked type="num" label="Religion" value={form['skillReligion']} />
                <input checked type="num" label="Sleight of Hand" value={form['skillSleightHand']} />
                <input checked type="num" label="Stealth" value={form['skillStealth']} />
                <input checked type="num" label="Survival" value={form['skillSurvival']} />
              </div>
            </div>
          </div>
        </div>

        {/* Center Column */}
        <div span={4}>
          <div gutter="xs">
            <div span={4}>
              <input type="num" label="Armor Class" labelPos="column-reverse" value={form['ac']} />
            </div>
            <div span={4}>
              <input type="num" label="Initiative" labelPos="column-reverse" value={form['initMod']} />
            </div>
            <div span={4}>
              <input type="tArea" label="Speed" labelPos="column-reverse" value={form['speed']} />
            </div>
            <div span={12}>
              <p>Hit Points</p>
            </div>
            <div span={4}>
              <input type="num" size="xs" label="Current" labelPos="column-reverse" value={form['currentHP']} />
            </div>
            <div span={4}>
              <input type="num" size="xs" label="Max" labelPos="column-reverse" value={form['maxHP']} />
            </div>
            <div span={4}>
              <input type="num" size="xs" label="Temporary" labelPos="column-reverse" value={form['tempHP']} />
            </div>

            <div span={6}>
              <p>Hit Dice</p>

              <input type="text" size="xs" label="Total" labelPos="row-reverse" value={form['totalHD']} />
              <input type="text" size="xs" label="Current" labelPos="row-reverse" value={form['currentHD']} />
            </div>
            <div span={6}>
              <p>Death Saves</p>
              <div>
                <p>Successes</p>
                <input type="checkbox" />
                <input type="checkbox" />
                <input type="checkbox" />
              </div>
              <div>
                <p>Failures</p>
                <input type="checkbox" />
                <input type="checkbox" />
                <input type="checkbox" />
              </div>
            </div>
          </div>

          <div style={{ display: 'grid' }}>
            <div style={{ display: 'flex' }} justify="space-between" span={4}>
              <p>Name</p>
              <p>ATK Bonus</p>
              <p>Name/Type</p>
            </div>
            <div style={{ display: 'flex' }} justify="space-between">
              <input type="text" value={form['atkName']} />
              <input type="text" value={form['atkBonus']} />
              <input type="text" value={form['atkDamType']} />
            </div>
            <div style={{ display: 'flex' }} justify="space-between">
              <input type="text" value={form['atkName']} />
              <input type="text" value={form['atkBonus']} />
              <input type="text" value={form['atkDamType']} />
            </div>
            <div style={{ display: 'flex' }} justify="space-between">
              <input type="text" value={form['atkName']} />
              <input type="text" value={form['atkBonus']} />
              <input type="text" value={form['atkDamType']} />
            </div>
            <input type="tArea" label="Attack Notes" labelPos="column-reverse" value={form['atkNotes']} />
          </div>
          <div style={{ display: 'flex' }} justify="center">
            <input type="num" label="CP" labelPos="column-reverse" value={form['copperP']} />
            <input type="num" label="SP" labelPos="column-reverse" value={form['silverP']} />
            <input type="num" label="EP" labelPos="column-reverse" value={form['electrumP']} />
            <input type="num" label="GP" labelPos="column-reverse" value={form['goldP']} />
            <input type="num" label="PP" labelPos="column-reverse" value={form['platinumP']} />
          </div>
          <input type="tArea" label="Equipment" labelPos="column-reverse" value={form['equipmentNotes']} />
        </div>

        {/* Right Column */}
        <div span={4}>
          <input
            type="tArea"
            label="Personality Traits"
            labelPos="column-reverse"
            autosize
            value={form['persTraits']}
          />{' '}
          <input type="tArea" label="Ideals" labelPos="column-reverse" autosize value={form['ideals']} />
          <input type="tArea" label="Bonds" labelPos="column-reverse" autosize value={form['bonds']} />
          <input type="tArea" label="Flaws" labelPos="column-reverse" autosize value={form['flaws']} />
          <input type="tArea" label="Features & Traits" labelPos="column-reverse" autosize value={form['fsAndTs']} />
          <input
            type="tArea"
            label="Other Proficiencies & Languages"
            labelPos="column-reverse"
            autosize
            value={form['otherProfs']}
          />
        </div>
      </div>
    </>
  );
};

export default CharacterSheet;
