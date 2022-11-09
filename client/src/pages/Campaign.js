import { useEffect, useState } from 'react';

import { EncounterTracker } from '../components/EncounterTracker';
import CharacterList from '../components/CharacterList';
import Sheet from './Sheet';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_CAMPAIGN } from '../utils/queries';

import './Campaign.css';

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
  useEffect(() => {
    campaignData?.campaign && setChars(campaignData.campaign.characters);
  }, [campaignData]);

  // const loggedIn = Auth.loggedIn();
  return (
    <main>
      <Link to='/profile'>Go back</Link>
      <div>{campaign.name}</div>

      <div className='campaign-container'>
        <EncounterTracker chars={chars} />
        <CharacterList chars={chars} setChars={setChars} />
        {/* {chars.length > 0 && (
          <Sheet chars={chars.filter(char => char.viewSheet)} />
        )} */}
      </div>
    </main>
  );
}

export default Campaign;
