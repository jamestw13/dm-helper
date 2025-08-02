import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_CHARACTER } from '../';

import { characterValues } from '../formInitialValues';
import './character-sheet.css';
import { PageWrapper } from '../../../components';

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
  const { data: charData, loading: charLoading } = useQuery(QUERY_CHARACTER, {
    variables: { _id: charId },
  });

  const c = charData?.character;

  const [form, setForm] = useState(characterValues);

  useEffect(() => {
    if (c) setForm({ ...c, user: `${c.user.firstname} ${c.user.lastname}` });
  }, [c]);

  if (charLoading) return <div>Loading...</div>;
  return (
    <PageWrapper
      title="Character Sheet"
      subtitle={
        <div>
          <p>Player:</p>
          <strong>
            {c.user.firstname} {c.user.lastname}
          </strong>
        </div>
      }
    >
      <div className="character-sheet">
        {/* Details Block */}
        <div className="header">
          <div>
            <input type="text" label="Character Name" labelPos="column" value={form['name']} />
          </div>
          <div className="basics">
            <div>
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
            <div>
              <input type="number" label="Level" labelPos="column" value={form['level']} />
            </div>
            <div>
              <input type="text" label="Background" labelPos="column" value={form['background']} />
            </div>

            <div>
              <input
                type="select"
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
            <div>
              <select label="Alignment" labelPos="column" value={form['alignment']}>
                {[
                  'Lawful Good',
                  'Lawful Neutral',
                  'Lawful Evil',
                  'Neutral Good',
                  'True Neutral',
                  'Neutral Evil',
                  'Chaotic Good',
                  'Chaotic Neutral',
                  'Chaotic Evil',
                ].map((alignment, index) => (
                  <option key={index} value={alignment}>
                    {alignment}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <input type="number" fullWidth label="Experience Points" labelPos="column" value={form['xp']} />
            </div>
          </div>
        </div>

        <div className="body">
          {/* Left Column */}
          <div className="left-column">
            <div className="ability-scores">
              {/* Ability Scores Block */}
              <div className="ability-score">
                <p>Strength</p>

                <p type="number" label="Strength">
                  {form['strMod']}
                </p>
                <p type="number">{form['str']}</p>
              </div>
              <div className="ability-score">
                <p>Dexterity</p>
                <p type="number" label="Dexterity">
                  {form['dexMod']}
                </p>
                <p type="number">{form['dex']}</p>
              </div>
              <div className="ability-score">
                <p>Constitution</p>
                <p type="number" label="Constitution">
                  {form['conMod']}
                </p>
                <p type="number">{form['con']}</p>
              </div>
              <div className="ability-score">
                <p>Intelligence</p>
                <p type="number" label="Intelligence">
                  {form['intMod']}
                </p>
                <p type="number">{form['int']}</p>
              </div>
              <div className="ability-score">
                <p>Wisdom</p>
                <p type="number" label="Wisdom">
                  {form['wisMod']}
                </p>
                <p type="number">{form['wis']}</p>
              </div>
              <div className="ability-score">
                <p>Charisma</p>
                <p type="number" label="Charisma">
                  {form['chaMod']}
                </p>
                <p type="number">{form['cha']}</p>
              </div>
            </div>
            <div>
              <div className="label-left">
                <input type="number" value={form['inspiration']} />
                <p>Inspiration</p>
              </div>
              <div className="label-left">
                <input type="number" value={form['profBonus']} />
                <p>Proficiency Bonus</p>
              </div>

              {/* Saving Throws Block */}
              <div className="saving-throws">
                <p className="title">Saving Throws</p>

                <div className="saving-throw">
                  <input type="checkbox" value={form['strSTProf']} />
                  <input type="number" label="Strength" value={form['strSTProf']} />
                  <p>Strength</p>
                </div>
                <div className="saving-throw">
                  <input type="checkbox" value={form['dexSTProf']} />
                  <input type="number" label="Dexterity" value={form['dexSTProf']} />
                  <p>Dexterity</p>
                </div>
                <div className="saving-throw">
                  <input type="checkbox" value={form['conSTProf']} />
                  <input type="number" label="Constitution" value={form['conSTProf']} />
                  <p>Constitution</p>
                </div>

                <div className="saving-throw">
                  <input type="checkbox" value={form['intSTProf']} />
                  <input type="number" label="Intelligence" value={form['intSTProf']} />
                  <p>Intelligence</p>
                </div>
                <div className="saving-throw">
                  <input type="checkbox" value={form['wisSTProf']} />
                  <input type="number" label="Wisdom" value={form['wisSTProf']} />
                  <p>Wisdom</p>
                </div>
                <div className="saving-throw">
                  <input type="checkbox" value={form['chaSTProf']} />
                  <input type="number" label="Charisma" value={form['chaSTProf']} />
                  <p>Charisma</p>
                </div>
              </div>

              <div className="skills">
                <div className="skill">
                  <p className="title">Skills</p>
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillAcrobatics']} />
                  <p>
                    Acrobatics
                    <span>Dex</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillAniHand']} />
                  <p>
                    Animal Handling
                    <span>Wis</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillArcana']} />
                  <p>
                    Arcana
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillAth']} />
                  <p>
                    Athletics
                    <span>Str</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillDecep']} />
                  <p>
                    Deception
                    <span>Cha</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillHist']} />
                  <p>
                    History
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillInsight']} />
                  <p>
                    Insight
                    <span>Wis</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillIntim']} />
                  <p>
                    Intimidation
                    <span>Cha</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillInvest']} />
                  <p>
                    Investigation
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillMedicine']} />
                  <p>
                    Medicine
                    <span>Wis</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillNature']} />
                  <p>
                    Nature
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillPercep']} />
                  <p>
                    Perception
                    <span>Wis</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillPerform']} />
                  <p>
                    Performance
                    <span>Cha</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillPersuasion']} />
                  <p>
                    Persuasion
                    <span>Cha</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillReligion']} />
                  <p>
                    Religion
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillSleightHand']} />
                  <p>
                    Sleight of Hand
                    <span>Dex</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillStealth']} />
                  <p>
                    Stealth
                    <span>Dex</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" value={form['']} />
                  <input type="number" value={form['skillSurvival']} />
                  <p>
                    Survival
                    <span>Wis</span>
                  </p>
                </div>
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }} className="label-left">
              <input type="number" label="Passive Wisdom (Perception)" value={form['passPercep']} />
              <p>Passive Wisdom (Perception)</p>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <textarea label="Passive Wisdom (Perception)" value={form['otherProfs']}></textarea>
              <p>Other Proficiencies and Languages</p>
            </div>
          </div>

          {/* Center Column */}
          <div className="center-column">
            <div className="ac-init-spd">
              <div>
                <input type="number" label="Armor Class" labelPos="column-reverse" value={form['ac']} />
                <p>Armor Class</p>
              </div>
              <div>
                <input type="number" label="Initiative" labelPos="column-reverse" value={form['initMod']} />
                <p>Initiative</p>
              </div>
              <div>
                <input type="tArea" label="Speed" labelPos="column-reverse" value={form['speed']} />
                <p>Speed</p>
              </div>
            </div>

            <div className="hit-points">
              <p>Hit Points</p>

              <div className="label-left">
                <input type="number" label="Current" labelPos="column-reverse" value={form['currentHP']} />
                <p>Hit Point Maximum</p>
              </div>
              <div className="label-left">
                <input type="number" label="Max" labelPos="column-reverse" value={form['maxHP']} />
                <p>Current Hit Points</p>
              </div>
              <div className="label-left">
                <input type="number" label="Temporary" labelPos="column-reverse" value={form['tempHP']} />
                <p>Temporary Hit Points</p>
              </div>
            </div>
            <div className="hit-dice-saves">
              <div>
                <p>Hit Dice</p>
                <div className="label-left">
                  <input type="text" label="Total" labelPos="row-reverse" value={form['totalHD']} />
                  <p>Total Hit Dice</p>
                </div>
                <div className="label-left">
                  <input type="text" label="Current" labelPos="row-reverse" value={form['currentHD']} />
                  <p>Current Hit Dice</p>
                </div>
              </div>
              <div>
                <p>Death Saves</p>
                <div className="saves">
                  <p>Successes</p>
                  <input type="checkbox" />
                  <input type="checkbox" />
                  <input type="checkbox" />
                </div>
                <div className="saves">
                  <p>Failures</p>
                  <input type="checkbox" />
                  <input type="checkbox" />
                  <input type="checkbox" />
                </div>
              </div>
            </div>

            <div className="attacks-spellcasting">
              <p className="title">Attacks & Spellcasting</p>
              <div className="attack">
                <p>Name</p>
                <p>ATK Bonus</p>
                <p>Name/Type</p>
              </div>
              <div className="attack">
                <input type="text" value={form['atkName']} />
                <input type="text" value={form['atkBonus']} />
                <input type="text" value={form['atkDamType']} />
              </div>
              <div className="attack">
                <input type="text" value={form['atkName']} />
                <input type="text" value={form['atkBonus']} />
                <input type="text" value={form['atkDamType']} />
              </div>
              <div className="attack">
                <input type="text" value={form['atkName']} />
                <input type="text" value={form['atkBonus']} />
                <input type="text" value={form['atkDamType']} />
              </div>
              <textarea rows="3" className="attack-notes" value={form['atkNotes']} />
            </div>

            <div className="equipment">
              <div className="money">
                <input type="number" value={form['copperP']} />
                <p>CP</p>
                <input type="number" value={form['silverP']} />
                <p>SP</p>
                <input type="number" value={form['electrumP']} />
                <p>EP</p>
                <input type="number" value={form['goldP']} />
                <p>GP</p>
                <input type="number" value={form['platinumP']} />
                <p>PP</p>
              </div>
              <textarea value={form['equipmentNotes']} />
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <div>
              <p className="title">Personality Traits</p>
              <textarea label="Personality Traits" autosize value={form['persTraits']} />
            </div>
            <div>
              <p className="title">Ideals</p>
              <textarea label="Ideals" autosize value={form['ideals']} />
            </div>
            <div>
              <p className="title">Bonds</p>
              <textarea label="Bonds" autosize value={form['bonds']} />
            </div>
            <div>
              <p className="title">Flaws</p>
              <textarea label="Flaws" autosize value={form['flaws']} />
            </div>
            <div>
              <p className="title">Features and Traits</p>
              <textarea label="Features & Traits" autosize value={form['fsAndTs']} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CharacterSheet;
