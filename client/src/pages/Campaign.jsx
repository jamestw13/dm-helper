import { useEffect, useState } from 'react';

import { EncounterTracker } from '../components/EncounterTracker';
import CharacterList from '../components/CharacterList';
import { Section } from '../components/Section';
import CharacterSheet from '../components/CharacterSheet';
import EncounterForm from '../components/EncounterForm';
import { Link, useParams } from 'react-router-dom';
import { useLazyQuery, useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN, QUERY_ENCOUNTER } from '../utils/queries';
import Card from '../components/Card';

import './Campaign.css';
import PageWrapper from '../components/PageWrapper';

function Campaign() {
  const { campaignId } = useParams();
  const { data: campaignData, loading: campaignLoading } = useQuery(
    QUERY_CAMPAIGN,
    {
      variables: { _id: campaignId },
    }
  );
  const [queryEncounter, { data: encounterData, loading: encounterLoading }] =
    useLazyQuery(QUERY_ENCOUNTER);

  const campaign = campaignData?.campaign || {};
  const [chars, setChars] = useState([]);
  const [activeEncounter, setActiveEncounter] = useState({});
  const [encounterFormOpen, setEncouterFormOpen] = useState(false);

  useEffect(() => {
    campaignData?.campaign && setChars(campaignData.campaign.characters);
  }, [campaignData]);

  useEffect(() => {
    setActiveEncounter(encounterData?.encounter);
  }, [encounterData]);
  // const loggedIn = Auth.loggedIn();

  return (
    <PageWrapper title={campaign.name} className='campaign-container'>
      {campaignLoading ? (
        <div>Loading</div>
      ) : (
        <section className='campaign-container'>
          <Section title='Characters' collapsable>
            {campaign?.characters?.map((char, i) => (
              <Card
                key={i}
                lineOne={char.name}
                lineTwo={`Player: ${char.user.firstname}`}
                handleCardClick={() => {}}
                colorOne={char.primaryColor}
                colorTwo={char.secondaryColor}
              />
            ))}
          </Section>
          <Section title='Encounter List' collapsable>
            <button>New Encounter</button>
            {campaign?.encounters?.map((enc, i) => (
              <Card
                key={i}
                lineOne={enc.title}
                handleCardClick={() => {
                  queryEncounter({ variables: { _id: enc._id } });
                }}
              />
            ))}
          </Section>
          <Section title='Encounter Tracker' collapsable startOpen={true}>
            {encounterLoading && <div>Loading...</div>}
            <EncounterTracker chars={chars} activeEncounter={activeEncounter} />
          </Section>
          <Section title='Character Sheet' collapsable startOpen={false}>
            {chars.length > 0 && (
              <CharacterSheet chars={chars.filter(char => char.viewSheet)} />
            )}
          </Section>
        </section>
        // <EncounterForm setActiveEncounter={setActiveEncounter} chars={chars} />
      )}
    </PageWrapper>
  );
}

export default Campaign;
