import { useQuery } from '@apollo/client';
import { Box, Select, Checkbox, Grid, Group, TextInput, Textarea, NumberInput, Text, Stack, Flex } from '@mantine/core';
import { QUERY_CHARACTER } from '../../global/utils/queries';
import { useForm } from '@mantine/form';
import { useEffect } from 'react';
import { characterValues } from '../formInitialValues';

const CustomInput = props => {
  return (
    <Box
      sx={{
        display: 'flex',

        flexDirection: props.labelPos,
        gap: '.5em',

        alignItems: 'stretch',
      }}
    >
      {props.checked && <Checkbox />}
      {props.type === 'num' && (
        <NumberInput
          hideControls
          sx={{ width: !props.fullWidth && '3em' }}
          value={props.value}
          onChange={props.onChange}
        />
      )}
      {props.type === 'text' && <TextInput value={props.value} onChange={props.onChange} />}
      {props.type === 'select' && <Select data={props.data} value={props.value} onChange={props.onChange} />}
      {props.type === 'tArea' && <Textarea data={props.data} value={props.value} onChange={props.onChange} />}
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
    initialValues: characterValues,
  });

  useEffect(() => {
    if (c) form.setValues({ ...c, user: `${c.user.firstname} ${c.user.lastname}` });
  }, [c]);

  return (
    <>
      {/* Details Block */}
      <Grid gutter="xs">
        <Grid.Col span={6}>
          <CustomInput type="text" label="Character Name" labelPos="column" {...form.getInputProps('name')} />
        </Grid.Col>
        <Grid.Col span={1}>
          <CustomInput
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
            {...form.getInputProps('class')}
          />
        </Grid.Col>
        <Grid.Col span={1}>
          <CustomInput type="num" label="Level" labelPos="column" {...form.getInputProps('level')} />
        </Grid.Col>
        <Grid.Col span={2}>
          <CustomInput type="text" label="Background" labelPos="column" {...form.getInputProps('background')} />
        </Grid.Col>
        <Grid.Col span={2}>
          <CustomInput type="text" label="Player" labelPos="column" {...form.getInputProps('user')} />
        </Grid.Col>
        <Grid.Col span={6}></Grid.Col>
        <Grid.Col span={2}>
          <CustomInput
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
            {...form.getInputProps('race')}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <CustomInput
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
            {...form.getInputProps('alignment')}
          />
        </Grid.Col>
        <Grid.Col span={2}>
          <CustomInput type="num" fullWidth label="Experience Points" labelPos="column" {...form.getInputProps('xp')} />
        </Grid.Col>
      </Grid>

      <Grid>
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
              <Grid gutter={0}>
                <Grid.Col span={12}>
                  <CustomInput type="num" size="xs" label="Inspiration" {...form.getInputProps('inspiration')} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <CustomInput type="num" size="xs" label="Proficiency Bonus" {...form.getInputProps('profBonus')} />
                </Grid.Col>
                <Grid.Col span={12}>
                  <CustomInput type="num" label="Passive Wisdom (Perception)" {...form.getInputProps('passPercep')} />
                </Grid.Col>
              </Grid>

              {/* Saving Throws Block */}
              <Box>
                <h5> Saving Throws</h5>
                <CustomInput type="num" label="Strength" checked {...form.getInputProps('strSTProf')} />
                <CustomInput type="num" label="Dexterity" checked {...form.getInputProps('dexSTProf')} />
                <CustomInput checked type="num" label="Constitution" {...form.getInputProps('conSTProf')} />
                <CustomInput checked type="num" label="Intelligence" {...form.getInputProps('intSTProf')} />
                <CustomInput checked type="num" label="Wisdom" {...form.getInputProps('wisSTProf')} />
                <CustomInput checked type="num" label="Charisma" {...form.getInputProps('chaSTProf')} />
              </Box>

              <Box>
                <h5> Skills</h5>
                <CustomInput checked type="num" label="Acrobatics" {...form.getInputProps('skillAcrobatics')} />
                <CustomInput checked type="num" label="Animal Handling" {...form.getInputProps('skillAniHand')} />
                <CustomInput checked type="num" label="Arcana" {...form.getInputProps('skillArcana')} />
                <CustomInput checked type="num" label="Athletics" {...form.getInputProps('skillAth')} />
                <CustomInput checked type="num" label="Deception" {...form.getInputProps('skillDecep')} />
                <CustomInput checked type="num" label="History" {...form.getInputProps('skillHist')} />
                <CustomInput checked type="num" label="Insight" {...form.getInputProps('skillInsight')} />
                <CustomInput checked type="num" label="Intimidation" {...form.getInputProps('skillIntim')} />
                <CustomInput checked type="num" label="Investigation" {...form.getInputProps('skillInvest')} />
                <CustomInput checked type="num" label="Medicine" {...form.getInputProps('skillMedicine')} />
                <CustomInput checked type="num" label="Nature" {...form.getInputProps('skillNature')} />
                <CustomInput checked type="num" label="Perception" {...form.getInputProps('skillPercep')} />
                <CustomInput checked type="num" label="Performance" {...form.getInputProps('skillPerform')} />
                <CustomInput checked type="num" label="Persuasion" {...form.getInputProps('skillPersuasion')} />
                <CustomInput checked type="num" label="Religion" {...form.getInputProps('skillReligion')} />
                <CustomInput checked type="num" label="Sleight of Hand" {...form.getInputProps('skillSleightHand')} />
                <CustomInput checked type="num" label="Stealth" {...form.getInputProps('skillStealth')} />
                <CustomInput checked type="num" label="Survival" {...form.getInputProps('skillSurvival')} />
              </Box>
            </Grid.Col>
          </Grid>
        </Grid.Col>

        {/* Center Column */}
        <Grid.Col span={4}>
          <Grid gutter="xs">
            <Grid.Col span={4}>
              <CustomInput type="num" label="Armor Class" labelPos="column-reverse" {...form.getInputProps('ac')} />
            </Grid.Col>
            <Grid.Col span={4}>
              <CustomInput type="num" label="Initiative" labelPos="column-reverse" {...form.getInputProps('initMod')} />
            </Grid.Col>
            <Grid.Col span={4}>
              <CustomInput type="tArea" label="Speed" labelPos="column-reverse" {...form.getInputProps('speed')} />
            </Grid.Col>
            <Grid.Col span={12}>
              <Text>Hit Points</Text>
            </Grid.Col>
            <Grid.Col span={4}>
              <CustomInput
                type="num"
                size="xs"
                label="Current"
                labelPos="column-reverse"
                {...form.getInputProps('currentHP')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <CustomInput
                type="num"
                size="xs"
                label="Max"
                labelPos="column-reverse"
                {...form.getInputProps('maxHP')}
              />
            </Grid.Col>
            <Grid.Col span={4}>
              <CustomInput
                type="num"
                size="xs"
                label="Temporary"
                labelPos="column-reverse"
                {...form.getInputProps('tempHP')}
              />
            </Grid.Col>

            <Grid.Col span={6}>
              <Text>Hit Dice</Text>

              <CustomInput
                type="text"
                size="xs"
                label="Total"
                labelPos="row-reverse"
                {...form.getInputProps('totalHD')}
              />
              <CustomInput
                type="text"
                size="xs"
                label="Current"
                labelPos="row-reverse"
                {...form.getInputProps('currentHD')}
              />
            </Grid.Col>
            <Grid.Col span={6}>
              <Text>Death Saves</Text>
              <Group>
                <Text>Successes</Text>
                <Checkbox />
                <Checkbox />
                <Checkbox />
              </Group>
              <Group>
                <Text>Failures</Text>
                <Checkbox />
                <Checkbox />
                <Checkbox />
              </Group>
            </Grid.Col>
          </Grid>

          <Stack>
            <Flex justify="space-between" span={4}>
              <Text>Name</Text>
              <Text>ATK Bonus</Text>
              <Text>Name/Type</Text>
            </Flex>
            <Flex justify="space-between">
              <CustomInput type="text" {...form.getInputProps('atkName')} />
              <CustomInput type="text" {...form.getInputProps('atkBonus')} />
              <CustomInput type="text" {...form.getInputProps('atkDamType')} />
            </Flex>
            <Flex justify="space-between">
              <CustomInput type="text" {...form.getInputProps('atkName')} />
              <CustomInput type="text" {...form.getInputProps('atkBonus')} />
              <CustomInput type="text" {...form.getInputProps('atkDamType')} />
            </Flex>
            <Flex justify="space-between">
              <CustomInput type="text" {...form.getInputProps('atkName')} />
              <CustomInput type="text" {...form.getInputProps('atkBonus')} />
              <CustomInput type="text" {...form.getInputProps('atkDamType')} />
            </Flex>
            <CustomInput
              type="tArea"
              label="Attack Notes"
              labelPos="column-reverse"
              {...form.getInputProps('atkNotes')}
            />
          </Stack>
          <Flex justify="center">
            <CustomInput type="num" label="CP" labelPos="column-reverse" {...form.getInputProps('copperP')} />
            <CustomInput type="num" label="SP" labelPos="column-reverse" {...form.getInputProps('silverP')} />
            <CustomInput type="num" label="EP" labelPos="column-reverse" {...form.getInputProps('electrumP')} />
            <CustomInput type="num" label="GP" labelPos="column-reverse" {...form.getInputProps('goldP')} />
            <CustomInput type="num" label="PP" labelPos="column-reverse" {...form.getInputProps('platinumP')} />
          </Flex>
          <CustomInput
            type="tArea"
            label="Equipment"
            labelPos="column-reverse"
            {...form.getInputProps('equipmentNotes')}
          />
        </Grid.Col>

        {/* Right Column */}
        <Grid.Col span={4}>
          <CustomInput
            type="tArea"
            label="Personality Traits"
            labelPos="column-reverse"
            autosize
            {...form.getInputProps('persTraits')}
          />{' '}
          <CustomInput
            type="tArea"
            label="Ideals"
            labelPos="column-reverse"
            autosize
            {...form.getInputProps('ideals')}
          />
          <CustomInput type="tArea" label="Bonds" labelPos="column-reverse" autosize {...form.getInputProps('bonds')} />
          <CustomInput type="tArea" label="Flaws" labelPos="column-reverse" autosize {...form.getInputProps('flaws')} />
          <CustomInput
            type="tArea"
            label="Features & Traits"
            labelPos="column-reverse"
            autosize
            {...form.getInputProps('fsAndTs')}
          />
          <CustomInput
            type="tArea"
            label="Other Proficiencies & Languages"
            labelPos="column-reverse"
            autosize
            {...form.getInputProps('otherProfs')}
          />
        </Grid.Col>
      </Grid>
    </>
  );
};

export default CharacterSheet;
