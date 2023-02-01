import { gql } from '@apollo/client';

export const QUERY_CHARACTERS = gql`
  {
    characters {
      _id
      name
      primaryColor
      secondaryColor
      isNPC
      user {
        username
      }
      campaign {
        name
      }
    }
  }
`;

export const QUERY_CHARACTER = gql`
  query character($_id: ID!) {
    character(_id: $_id) {
      _id
      name
      race
      class
      level
      alignment
      hitDice
      background
      str
      dex
      con
      int
      wis
      cha
      speed
      strMod
      dexMod
      conMod
      intMod
      wisMod
      chaMod
      profBonus
      initMod
      initiative
      hp
      ac
      currentHP
      maxHP
      tempHP
      totalHD
      currentHD
      dstS1
      dstS2
      dstS3
      dstF1
      dstF2
      dstF3
      atkName
      atkBonus
      atkDamType
      atkNotes
      copperP
      silverP
      electrumP
      goldP
      platinumP
      equipmentNotes
      persTraits
      ideals
      bonds
      flaws
      fsAndTs
      otherProfs
      passPercep
      strSTProf
      dexSTProf
      conSTProf
      intSTProf
      wisSTProf
      chaSTProf
      strSTmod
      dexSTmod
      conSTmod
      intSTmod
      wisSTmod
      chaSTmod
      skillAcrobatics
      skillAniHand
      skillArcana
      skillAth
      skillDecep
      skillHist
      skillInsight
      skillIntim
      skillInvest
      skillMedicine
      skillNature
      skillPercep
      skillPerform
      skillPersuasion
      skillReligion
      skillSleightHand
      skillStealth
      skillSurvival

      skillProfAcrobatics
      skillProfAniHand
      skillProfArcana
      skillProfAth
      skillProfDecep
      skillProfHist
      skillProfInsight
      skillProfIntim
      skillProfInvest
      skillProfMedicine
      skillProfNature
      skillProfPercep
      skillProfPerform
      skillProfPersuasion
      skillProfReligion
      skillProfSleightHand
      skillProfStealth
      skillProfSurvival

      primaryColor
      secondaryColor
      isNPC

      campaign {
        _id
        name
      }
      user {
        firstname
        lastname
      }
    }
  }
`;

export const ADD_CHARACTER = gql`
  mutation addCharacter($character: CharacterInput!) {
    addCharacter(character: $character) {
      _id
      name
      user {
        _id
      }
    }
  }
`;
