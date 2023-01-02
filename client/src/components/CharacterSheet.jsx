import { useQuery } from '@apollo/client';
import { Box, Select, Checkbox, Grid, Group, Table, TextInput, Textarea, NumberInput, Text } from '@mantine/core';
import { QUERY_CHARACTER } from '../utils/queries';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';

const CustomInput = props => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: `${props.labelPos === 'bottom' ? 'column' : 'row'}`,
        gap: '.5em',

        alignItems: 'stretch',
      }}
    >
      {props.checked && <Checkbox />}
      {props.type === 'num' && (
        <NumberInput
          hide
          hideControls
          sx={{ width: !props.fullWidth && '3em' }}
          value={props.value}
          onChange={props.onChange}
        />
      )}
      {props.type === 'text' && <TextInput value={props.value} onChange={props.onChange} />}
      {props.type === 'select' && <Select data={props.data} value={props.value} onChange={props.onChange} />}
      <Text align="center">{props.label}</Text>
    </Box>
  );
};

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
      {/* Details Block */}
      <Grid gutter="xs">
        <Grid.Col span={6}>
          <CustomInput type="text" label="Character Name" labelPos="bottom" {...form.getInputProps('name')} />
        </Grid.Col>
        <Grid.Col span={1}>
          {/* <Select searchable size="xs" label="Class" data={['Cleric', 'Barbarian']} {...form.getInputProps('class')} /> */}
          <CustomInput
            type="select"
            label="Class"
            labelPos="bottom"
            data={['Cleric', 'Barbarian']}
            {...form.getInputProps('class')}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          {/* <NumberInput min={1} max={25} size="xs" label="Level" {...form.getInputProps('level')} /> */}
          <CustomInput type="num" label="Level" labelPos="bottom" {...form.getInputProps('level')} />
        </Grid.Col>
        <Grid.Col span={2}>
          {/* <TextInput size="xs" label="Background" {...form.getInputProps('background')} /> */}
          <CustomInput type="text" label="Background" labelPos="bottom" {...form.getInputProps('background')} />
        </Grid.Col>
        <Grid.Col span={2}>
          {/* <TextInput size="xs" disabled label="Player" {...form.getInputProps('user')} /> */}
          <CustomInput type="text" label="Player" labelPos="bottom" {...form.getInputProps('user')} />
        </Grid.Col>
        <Grid.Col span={6}></Grid.Col>
        <Grid.Col span={2}>
          <CustomInput
            type="select"
            size="xs"
            searchable
            label="Race"
            labelPos="bottom"
            data={['Warforged', 'Dwarf', 'Elf', 'Human']}
            {...form.getInputProps('race')}
          />
          {/* <Select
            size="xs"
            searchable
            label="Race"
            data={['Warforged', 'Dwarf', 'Elf', 'Human']}
            {...form.getInputProps('race')}
          /> */}
        </Grid.Col>
        <Grid.Col span={2}>
          <CustomInput
            type="select"
            label="Alignment"
            labelPos="bottom"
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
          {/* <Select
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
          /> */}
        </Grid.Col>
        <Grid.Col span={2}>
          <CustomInput type="num" fullWidth label="Experience Points" labelPos="bottom" {...form.getInputProps('xp')} />
          {/* <NumberInput min={0} size="xs" label="Experience Points" {...form.getInputProps('xp')} /> */}
        </Grid.Col>
      </Grid>

      <Grid sx={{ border: '1px solid white' }}>
        {/* Left Column */}
        <Grid.Col span={4}>
          <Grid gutter="xs">
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
              <Grid>
                {/* <NumberInput size="xs" label="Inspiration" {...form.getInputProps('inspiration')} /> */}
                {/* <NumberInput size="xs" label="Proficiency Bonus" {...form.getInputProps('profBonus')} /> */}
                <CustomInput type="num" size="xs" label="Inspiration" {...form.getInputProps('inspiration')} />
                <CustomInput type="num" size="xs" label="Proficiency Bonus" {...form.getInputProps('profBonus')} />
                <CustomInput type="num" label="Passive Wisdom (Perception)" {...form.getInputProps('wisMod')} />
              </Grid>

              {/* Saving Throws Block */}
              <Box>
                <h5> Saving Throws</h5>
                <Box display="flex">
                  {/* <Checkbox {...form.getInputProps('strSTProf')} /> */}
                  {/* <NumberInput size="xs" label="Strength" {...form.getInputProps('strSTProf')} /> */}
                  <CustomInput type="num" label="Strength" checked {...form.getInputProps('strSTProf')} />
                </Box>
                <Box>
                  {/* <Checkbox {...form.getInputProps('dexSTProf')} /> */}
                  {/* <NumberInput size="xs" label="Dexterity" {...form.getInputProps('dexSTProf')} /> */}
                  <CustomInput type="num" label="Dexterity" checked {...form.getInputProps('dexSTProf')} />
                </Box>
                <Group>
                  {/* <Checkbox {...form.getInputProps('conSTProf')} /> */}
                  {/* <NumberInput size="xs" checked label="Constitution" {...form.getInputProps('conSTProf')} /> */}
                  <CustomInput checked type="num" label="Constitution" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('intSTProf')} /> */}
                  {/* <NumberInput size="xs" label="Intelligence" {...form.getInputProps('intSTProf')} /> */}
                  <CustomInput checked type="num" label="Intelligence" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('wisSTProf')} /> */}
                  {/* <NumberInput size="xs" label="Wisdom" {...form.getInputProps('wisSTProf')} /> */}
                  <CustomInput checked type="num" label="Wisdom" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('chaSTProf')} /> */}
                  {/* <NumberInput size="xs" label="Charisma" {...form.getInputProps('chaSTProf')} /> */}
                  <CustomInput checked type="num" label="Charisma" {...form.getInputProps('conSTProf')} />
                </Group>
              </Box>

              <Box>
                <h5> Skills</h5>

                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Acrobatics" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Acrobatics" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Animal Handling" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Animal Handling" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Arcana" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Arcana" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Athletics" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Athletics" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Deception" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Deception" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="History" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="History" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Insight" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Insight" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Intimidation" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Intimidation" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Investigation" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Investigation" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Medicine" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Medicine" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Nature" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Nature" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Perception" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Perception" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Performance" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Performance" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Persuasion" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Persuasion" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Religion" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Religion" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Sleight of Hand" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Sleight of Hand" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Stealth" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Stealth" {...form.getInputProps('conSTProf')} />
                </Group>
                <Group>
                  {/* <Checkbox {...form.getInputProps('')} /> */}
                  {/* <NumberInput size="xs" label="Survival" {...form.getInputProps('')} /> */}
                  <CustomInput checked type="num" label="Survival" {...form.getInputProps('conSTProf')} />
                </Group>
              </Box>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        {/* Center Column */}
        <Grid.Col span={4}>
          <Grid gutter="xs">
            <Grid.Col span={4}>
              <NumberInput size="xs" label="Armor Class" {...form.getInputProps('ac')} />
            </Grid.Col>
            <Grid.Col span={4}>
              <NumberInput size="xs" label="Initiative" {...form.getInputProps('init')} />
            </Grid.Col>
            <Grid.Col span={4}>
              <Textarea size="xs" label="Speed" {...form.getInputProps('speed')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <h5>Hit Points</h5>
            </Grid.Col>
            <Grid.Col span={12}>
              <NumberInput size="xs" label="Max " {...form.getInputProps('maxHP')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <NumberInput size="xs" label="Current" {...form.getInputProps('currentHP')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <NumberInput size="xs" label="Temporary" {...form.getInputProps('tempHP')} />
            </Grid.Col>

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

        {/* Right Column */}
        <Grid.Col span={4}>
          <Textarea label="Personality Traits" autosize {...form.getInputProps('persTraits')}></Textarea>
          <Textarea label="Ideals" autosize {...form.getInputProps('ideals')}></Textarea>
          <Textarea label="Bonds" autosize {...form.getInputProps('bonds')}></Textarea>
          <Textarea label="Flaws" autosize {...form.getInputProps('flaws')}></Textarea>
          <Textarea label="Features & Traits" autosize {...form.getInputProps('fsAndTs')} />
          <Textarea label="Other Proficiencies & Languages" autosize {...form.getInputProps('otherProfs')} />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default CharacterSheet;
