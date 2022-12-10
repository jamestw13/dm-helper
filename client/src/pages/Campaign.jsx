import { useEffect, useState } from 'react';

import { EncounterTracker } from '../components/EncounterTracker';
import CharacterList from '../components/CharacterList';
import { Section } from '../components/Section';
import CharacterSheet from '../components/CharacterSheet';
import EncounterForm from '../components/EncounterForm';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';

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

  const campaign = campaignData?.campaign || {};
  const [chars, setChars] = useState([]);
  const [activeEncounter, setActiveEncounter] = useState({});
  const [encounterFormOpen, setEncouterFormOpen] = useState(false);

  useEffect(() => {
    campaignData?.campaign && setChars(campaignData.campaign.characters);
  }, [campaignData]);

  // const loggedIn = Auth.loggedIn();
  return (
    <PageWrapper title={campaign.name} className='campaign-container'>
      <section className='campaign-container'>
        <Section title='Characters' collapsable>
          <CharacterList chars={chars} setChars={setChars} />
        </Section>
        <Section title='Encounter List' collapsable>
          <button>New Encounter</button>
          {campaign?.encounters?.map((enc, i) => (
            <div key={i} onClick={() => setActiveEncounter(enc)}>
              <div>{enc.title}</div>
              {/* <div>{JSON.stringify(enc)}</div> */}
            </div>
          ))}
        </Section>
        <Section title='Encounter Tracker' collapsable startOpen={false}>
          <EncounterTracker chars={chars} activeEncounter={activeEncounter} />
        </Section>
        <Section title='Character Sheet' collapsable startOpen={false}>
          {chars.length > 0 && (
            <CharacterSheet chars={chars.filter(char => char.viewSheet)} />
          )}
        </Section>
      </section>
      <EncounterForm setActiveEncounter={setActiveEncounter} chars={chars} />
    </PageWrapper>
  );
}

export default Campaign;
