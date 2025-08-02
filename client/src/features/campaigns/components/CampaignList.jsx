import { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../../users';

import { PageWrapper } from '../../../components';
import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_CAMPAIGN } from '../services/campaignServices';

const CampaignList = () => {
  const {
    user,
    user: { campaigns },
    loggedIn,
  } = useContext(UserContext);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [campaignName, setCampaignName] = useState('');
  const navigate = useNavigate();
  const [createCampaign] = useMutation(CREATE_CAMPAIGN, { variables: { owner: user._id, name: campaignName } });

  const handleCampaignClick = campaignId => {
    return navigate(`/campaign/${campaignId}`);
  };
  return (
    <PageWrapper title="My Campaigns">
      <button
        className="standard"
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Add Campaign
      </button>
      {campaigns?.map(campaign => (
        <div key={campaign._id} className="char-list-item" onClick={() => handleCampaignClick(campaign._id)}>
          <h4>{campaign.name}</h4>
          <p>DM: {campaign.owner.username}</p>
        </div>
      ))}
      <dialog
        open={dialogOpen}
        withCloseButton
        onClose={() => setDialogOpen(false)}
        position={{ top: '15em', left: '30em' }}
      >
        <p size="sm" mb="xs" weight={500}>
          Create a new campaign
        </p>

        <div align="flex-end">
          <input
            type="text"
            value={campaignName}
            onChange={e => setCampaignName(e.target.value)}
            placeholder="campaign name"
            sx={{ flex: 1 }}
          />
          <button className="standard" onClick={createCampaign} disabled={campaignName.length < 1}>
            Create
          </button>
        </div>
      </dialog>
    </PageWrapper>
  );
};

export default CampaignList;
