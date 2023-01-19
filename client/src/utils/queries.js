import { gql } from '@apollo/client';

export const QUERY_USER = gql`
  query user($_id: ID!) {
    user(_id: $_id) {
      _id
      username
      email
      firstname
      lastname
      avatar
      friends {
        _id
        username
        firstname
        lastname
      }
      characters {
        _id
        name
        primaryColor
        secondaryColor
        isNPC

        campaign {
          name
        }
      }
      campaigns {
        _id
        name
        owner {
          _id
          username
        }
      }
    }
  }
`;

export const QUERY_USERS = gql`
  {
    users {
      _id
      username
      email
    }
  }
`;

export const QUERY_CAMPAIGN = gql`
  query campaign($_id: ID) {
    campaign(_id: $_id) {
      name
      owner {
        username
        firstname
        lastname
      }
      players {
        firstname
        lastname
        avatar
        characters {
          _id
          name
          campaign {
            _id
          }
        }
      }
      characters {
        _id
        name
        class
        race

        primaryColor
        secondaryColor
        isNPC

        user {
          firstname
        }
      }
      encounters {
        _id
        title
        progress
        description
        characters {
          name
        }
      }
    }
  }
`;

export const QUERY_ENCOUNTER = gql`
  query encounter($_id: ID) {
    encounter(_id: $_id) {
      title
      characters {
        character {
          _id
          name
          ac
          currentHP
          primaryColor
        }
        initiative
      }
      effects {
        caster {
          name
          primaryColor
        }
        target {
          name
          primaryColor
        }
        startRound
        endRound
        startTurn
        endTurn
        effectName
        effectDescription
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

export const QUERY_ME = gql`
  {
    me {
      _id
      username
      email
      firstname
      lastname
      avatar
      friends {
        _id
        username
        firstname
        lastname
      }
      characters {
        _id
        name
        primaryColor
        secondaryColor
        isNPC

        campaign {
          name
        }
      }
      campaigns {
        _id
        name
        owner {
          _id
          username
        }
      }
    }
  }
`;
