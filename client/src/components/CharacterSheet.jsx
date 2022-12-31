import { useQuery } from '@apollo/client';
import { Box, Select, Checkbox, Grid, Group, Table, TextInput, Textarea, NumberInput } from '@mantine/core';
import { QUERY_CHARACTER } from '../utils/queries';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

const CharacterSheet = ({ charId }) => {
  // const charData = [];
  const { data: charData } = useQuery(QUERY_CHARACTER, {
    variables: { _id: charId },
  });

  const c = charData?.character;

  const form = useForm({
    initialValues: {
      name: '',
      class: '',
      level: 0,
      background: '',
      user: '',
    },
  });

  useEffect(() => {
    if (c) form.setValues({ ...c, user: `${c.user.firstname} ${c.user.lastname}` });
  }, [c]);

  return (
    <>
      <Grid gutter="xs">
        {/* Details Block */}
        <Grid.Col span={6}>
          <TextInput size="lg" label="Character Name" {...form.getInputProps('name')} />
        </Grid.Col>
        <Grid.Col span={1}>
          <Select searchable size="xs" label="Class" data={['Cleric', 'Barbarian']} {...form.getInputProps('class')} />
        </Grid.Col>
        <Grid.Col span={1}>
          <NumberInput min={1} max={25} size="xs" label="Level" {...form.getInputProps('level')} />
        </Grid.Col>
        <Grid.Col span={2}>
          <TextInput size="xs" label="Background" {...form.getInputProps('background')} />
        </Grid.Col>
        <Grid.Col span={2}>
          <TextInput size="xs" disabled label="Player" {...form.getInputProps('user')} />
        </Grid.Col>
        <Grid.Col span={6}></Grid.Col>
        <Grid.Col span={2}>
          <Select
            size="xs"
            searchable
            label="Race"
            data={['Warforged', 'Dwarf', 'Elf', 'Human']}
            {...form.getInputProps('race')}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <Select
            searchable
            size="xs"
            label="Alignment"
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
            {...form.getInputProps('alignment')}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <NumberInput min={0} size="xs" label="Experience Points" {...form.getInputProps('xp')} />
        </Grid.Col>

        {/* Roll Column */}
        <Grid.Col span={4}>
          <Grid>
            {/* Ability Scores Block */}
            <Grid.Col span={4}>
              <NumberInput size="xs" label="Strength" {...form.getInputProps('strMod')} />
              <NumberInput size="xs" {...form.getInputProps('str')} />
              <NumberInput size="xs" label="Dexterity" {...form.getInputProps('dexMod')} />
              <NumberInput size="xs" {...form.getInputProps('dex')} />
              <NumberInput size="xs" label="Constitution" {...form.getInputProps('conMod')} />
              <NumberInput size="xs" {...form.getInputProps('con')} />
              <NumberInput size="xs" label="Intelligence" {...form.getInputProps('intMod')} />
              <NumberInput size="xs" {...form.getInputProps('int')} />
              <NumberInput size="xs" label="Wisdom" {...form.getInputProps('wisMod')} />
              <NumberInput size="xs" {...form.getInputProps('wis')} />
              <NumberInput size="xs" label="Charisma" {...form.getInputProps('chaMod')} />
              <NumberInput size="xs" {...form.getInputProps('cha')} />
            </Grid.Col>

            <Grid.Col span={8}>
              <NumberInput size="xs" label="Inspiration" {...form.getInputProps('inspiration')} />
              <NumberInput size="xs" label="Proficiency Bonus" {...form.getInputProps('profBonus')} />
              {/* Saving Throws Block */}

              <Box>
                <h5> Saving Throws</h5>
                <Group>
                  <Checkbox {...form.getInputProps('strSTProf')} />
                  <NumberInput size="xs" label="Strength" {...form.getInputProps('strSTProf')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('dexSTProf')} />
                  <NumberInput size="xs" label="Dexterity" {...form.getInputProps('dexSTProf')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('conSTProf')} />
                  <NumberInput size="xs" label="Constitution" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('intSTProf')} />
                  <NumberInput size="xs" label="Intelligence" {...form.getInputProps('intSTProf')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('wisSTProf')} />
                  <NumberInput size="xs" label="Wisdom" {...form.getInputProps('wisSTProf')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('chaSTProf')} />
                  <NumberInput size="xs" label="Charisma" {...form.getInputProps('chaSTProf')} />
                </Group>
              </Box>

              <Box>
                <h5> Skills</h5>

                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Acrobatics" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Animal Handling" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Arcana" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Athletics" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Deception" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="History" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Insight" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Intimidation" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Investigation" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Medicine" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Nature" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Perception" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Performance" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Persuasion" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Religion" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Sleight of Hand" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Stealth" {...form.getInputProps('')} />
                </Group>
                <Group>
                  <Checkbox {...form.getInputProps('')} />
                  <NumberInput size="xs" label="Survival" {...form.getInputProps('')} />
                </Group>
              </Box>
            </Grid.Col>
          </Grid>
          <NumberInput label="Passive Wisdom (Perception)" {...form.getInputProps('wisMod')} />
          <Textarea label="Other Proficiencies & Languages" autosize {...form.getInputProps('otherProfs')} />
        </Grid.Col>

        {/* Stats Column */}
        <Grid.Col span={4}>
          <Grid>
            <Grid.Col span={4}>
              <NumberInput size="xs" label="Armor Class" {...form.getInputProps('ac')} />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput size="xs" label="Initiative" {...form.getInputProps('init')} />
            </Grid.Col>
            <Grid.Col span={4}>
              <TextInput size="xs" label="Speed" {...form.getInputProps('speed')} />
            </Grid.Col>
          </Grid>
          <h5>Hit Points</h5>
          <NumberInput size="xs" label="Max " {...form.getInputProps('maxHP')} />
          <NumberInput size="xs" label="Current" {...form.getInputProps('currentHP')} />
          <NumberInput size="xs" label="Temporary" {...form.getInputProps('tempHP')} />
          <Grid>
            <Grid.Col span={6}>
              <h5>Hit Dice</h5>
              <TextInput size="xs" label="Total" {...form.getInputProps('totalHD')} />
              <TextInput size="xs" label="Current" {...form.getInputProps('currentHD')} />
            </Grid.Col>
            <Grid.Col span={6}>
              <h5>Death Saves</h5>
              <Group>
                <h6>Successes</h6>
                <Checkbox />
                <Checkbox />
                <Checkbox />
                <h6>Failures</h6>
                <Checkbox />
                <Checkbox />
                <Checkbox />
              </Group>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        {/* Background Column */}
        <Grid.Col span={4}>
          <Textarea label="Personality Traits" autosize {...form.getInputProps('persTraits')}></Textarea>
          <Textarea label="Ideals" autosize {...form.getInputProps('ideals')}></Textarea>
          <Textarea label="Bonds" autosize {...form.getInputProps('bonds')}></Textarea>
          <Textarea label="Flaws" autosize {...form.getInputProps('flaws')}></Textarea>
          <Textarea label="Features & Traits" autosize {...form.getInputProps('fsAndTs')} />
        </Grid.Col>
      </Grid>

      <Table>
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
              <Checkbox type="checkbox" />
            </td>
            <th>{c?.SP}</th>
            <td></td>
          </tr>
          <tr>
            <td colSpan={3}>Skills</td>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default CharacterSheet;
