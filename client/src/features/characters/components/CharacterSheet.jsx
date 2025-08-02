import { useEffect, useState } from 'react';
import { useQuery } from '@apollo/client';

import { QUERY_CHARACTER } from '../';

import { characterValues } from '../formInitialValues';
import './character-sheet.css';
import { PageWrapper } from '../../../components';

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
          <div style={{ alignSelf: 'center', justifySelf: 'center' }}>
            <p className="label">Character Name</p>
            <input type="text" onChange={() => {}} value={form['name']} />
          </div>
          <div className="basics">
            <div>
              <p className="label">Class</p>
              <input type="text" onChange={() => {}} value={form['class']} />
            </div>
            <div>
              <p className="label">Level</p>
              <input type="number" onChange={() => {}} value={form['level']} />
            </div>
            <div>
              <p className="label">Background</p>
              <input type="text" onChange={() => {}} value={form['background']} />
            </div>

            <div>
              <p className="">Race</p>
              <input type="text" onChange={() => {}} value={form['race']} />
            </div>
            <div>
              <p className="label">Alignment</p>
              <select onChange={() => {}} value={form['alignment']}>
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
                  <option key={index} onChange={() => {}} value={alignment}>
                    {alignment}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <p className="label">Experience Points</p>
              <input type="number" onChange={() => {}} value={form['xp']} />
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

                <p type="number">{form['strMod']}</p>
                <p type="number">{form['str']}</p>
              </div>
              <div className="ability-score">
                <p>Dexterity</p>
                <p type="number">{form['dexMod']}</p>
                <p type="number">{form['dex']}</p>
              </div>
              <div className="ability-score">
                <p>Constitution</p>
                <p type="number">{form['conMod']}</p>
                <p type="number">{form['con']}</p>
              </div>
              <div className="ability-score">
                <p>Intelligence</p>
                <p type="number">{form['intMod']}</p>
                <p type="number">{form['int']}</p>
              </div>
              <div className="ability-score">
                <p>Wisdom</p>
                <p type="number">{form['wisMod']}</p>
                <p type="number">{form['wis']}</p>
              </div>
              <div className="ability-score">
                <p>Charisma</p>
                <p type="number">{form['chaMod']}</p>
                <p type="number">{form['cha']}</p>
              </div>
            </div>
            <div>
              <div className="label-left">
                <input type="number" onChange={() => {}} value={form['inspiration']} />
                <p>Inspiration</p>
              </div>
              <div className="label-left">
                <input type="number" onChange={() => {}} value={form['profBonus']} />
                <p>Proficiency Bonus</p>
              </div>

              {/* Saving Throws Block */}
              <div className="saving-throws">
                <p className="title">Saving Throws</p>

                <div className="saving-throw">
                  <input type="checkbox" onChange={() => {}} value={form['strSTProf']} />
                  <input type="number" onChange={() => {}} value={form['strSTProf']} />
                  <p>Strength</p>
                </div>
                <div className="saving-throw">
                  <input type="checkbox" onChange={() => {}} value={form['dexSTProf']} />
                  <input type="number" onChange={() => {}} value={form['dexSTProf']} />
                  <p>Dexterity</p>
                </div>
                <div className="saving-throw">
                  <input type="checkbox" onChange={() => {}} value={form['conSTProf']} />
                  <input type="number" onChange={() => {}} value={form['conSTProf']} />
                  <p>Constitution</p>
                </div>

                <div className="saving-throw">
                  <input type="checkbox" onChange={() => {}} value={form['intSTProf']} />
                  <input type="number" onChange={() => {}} value={form['intSTProf']} />
                  <p>Intelligence</p>
                </div>
                <div className="saving-throw">
                  <input type="checkbox" onChange={() => {}} value={form['wisSTProf']} />
                  <input type="number" onChange={() => {}} value={form['wisSTProf']} />
                  <p>Wisdom</p>
                </div>
                <div className="saving-throw">
                  <input type="checkbox" onChange={() => {}} value={form['chaSTProf']} />
                  <input type="number" onChange={() => {}} value={form['chaSTProf']} />
                  <p>Charisma</p>
                </div>
              </div>

              <div className="skills">
                <div className="skill">
                  <p className="title">Skills</p>
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillAcrobatics']} />
                  <p>
                    Acrobatics
                    <span>Dex</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillAniHand']} />
                  <p>
                    Animal Handling
                    <span>Wis</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillArcana']} />
                  <p>
                    Arcana
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillAth']} />
                  <p>
                    Athletics
                    <span>Str</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillDecep']} />
                  <p>
                    Deception
                    <span>Cha</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillHist']} />
                  <p>
                    History
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillInsight']} />
                  <p>
                    Insight
                    <span>Wis</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillIntim']} />
                  <p>
                    Intimidation
                    <span>Cha</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillInvest']} />
                  <p>
                    Investigation
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillMedicine']} />
                  <p>
                    Medicine
                    <span>Wis</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillNature']} />
                  <p>
                    Nature
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillPercep']} />
                  <p>
                    Perception
                    <span>Wis</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillPerform']} />
                  <p>
                    Performance
                    <span>Cha</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillPersuasion']} />
                  <p>
                    Persuasion
                    <span>Cha</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillReligion']} />
                  <p>
                    Religion
                    <span>Int</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillSleightHand']} />
                  <p>
                    Sleight of Hand
                    <span>Dex</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillStealth']} />
                  <p>
                    Stealth
                    <span>Dex</span>
                  </p>
                </div>
                <div className="skill">
                  <input type="checkbox" onChange={() => {}} value={form['']} />
                  <input type="number" onChange={() => {}} value={form['skillSurvival']} />
                  <p>
                    Survival
                    <span>Wis</span>
                  </p>
                </div>
              </div>
            </div>

            <div style={{ gridColumn: 'span 2' }} className="label-left">
              <input type="number" onChange={() => {}} value={form['passPercep']} />
              <p>Passive Wisdom (Perception)</p>
            </div>
            <div style={{ gridColumn: 'span 2' }}>
              <textarea onChange={() => {}} value={form['otherProfs'] || ''}></textarea>
              <p>Other Proficiencies and Languages</p>
            </div>
          </div>

          {/* Center Column */}
          <div className="center-column">
            <div className="ac-init-spd">
              <div>
                <input type="number" onChange={() => {}} value={form['ac']} />
                <p>Armor Class</p>
              </div>
              <div>
                <input type="number" onChange={() => {}} value={form['initMod']} />
                <p>Initiative</p>
              </div>
              <div>
                <input type="tArea" onChange={() => {}} value={form['speed']} />
                <p>Speed</p>
              </div>
            </div>

            <div className="hit-points">
              <p>Hit Points</p>

              <div className="label-left">
                <input type="number" onChange={() => {}} value={form['currentHP']} />
                <p>Hit Point Maximum</p>
              </div>
              <div className="label-left">
                <input type="number" onChange={() => {}} value={form['maxHP']} />
                <p>Current Hit Points</p>
              </div>
              <div className="label-left">
                <input type="number" onChange={() => {}} value={form['tempHP']} />
                <p>Temporary Hit Points</p>
              </div>
            </div>
            <div className="hit-dice-saves">
              <div>
                <p>Hit Dice</p>
                <div className="label-left">
                  <input type="text" onChange={() => {}} value={form['totalHD']} />
                  <p>Total Hit Dice</p>
                </div>
                <div className="label-left">
                  <input type="text" onChange={() => {}} value={form['currentHD']} />
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
                <input type="text" onChange={() => {}} value={form['atkName']} />
                <input type="text" onChange={() => {}} value={form['atkBonus']} />
                <input type="text" onChange={() => {}} value={form['atkDamType']} />
              </div>
              <div className="attack">
                <input type="text" onChange={() => {}} value={form['atkName']} />
                <input type="text" onChange={() => {}} value={form['atkBonus']} />
                <input type="text" onChange={() => {}} value={form['atkDamType']} />
              </div>
              <div className="attack">
                <input type="text" onChange={() => {}} value={form['atkName']} />
                <input type="text" onChange={() => {}} value={form['atkBonus']} />
                <input type="text" onChange={() => {}} value={form['atkDamType']} />
              </div>
              <textarea rows="3" className="attack-notes" onChange={() => {}} value={form['atkNotes'] || ''} />
            </div>

            <div className="equipment">
              <div className="money">
                <input type="number" onChange={() => {}} value={form['copperP']} />
                <p>CP</p>
                <input type="number" onChange={() => {}} value={form['silverP']} />
                <p>SP</p>
                <input type="number" onChange={() => {}} value={form['electrumP']} />
                <p>EP</p>
                <input type="number" onChange={() => {}} value={form['goldP']} />
                <p>GP</p>
                <input type="number" onChange={() => {}} value={form['platinumP']} />
                <p>PP</p>
              </div>
              <textarea onChange={() => {}} value={form['equipmentNotes'] || ''} />
            </div>
          </div>

          {/* Right Column */}
          <div className="right-column">
            <div>
              <p className="title">Personality Traits</p>
              <textarea onChange={() => {}} value={form['persTraits'] || ''} />
            </div>
            <div>
              <p className="title">Ideals</p>
              <textarea onChange={() => {}} value={form['ideals'] || ''} />
            </div>
            <div>
              <p className="title">Bonds</p>
              <textarea onChange={() => {}} value={form['bonds'] || ''} />
            </div>
            <div>
              <p className="title">Flaws</p>
              <textarea onChange={() => {}} value={form['flaws'] || ''} />
            </div>
            <div>
              <p className="title">Features and Traits</p>
              <textarea onChange={() => {}} value={form['fsAndTs'] || ''} />
            </div>
          </div>
        </div>
      </div>
    </PageWrapper>
  );
};

export default CharacterSheet;
