import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../users';
import { Card, Title, Text, Button, Dialog, Group, TextInput } from '@mantine/core';
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
      <Button
        onClick={() => {
          setDialogOpen(true);
        }}
      >
        Add Campaign
      </Button>
      {campaigns?.map(campaign => (
        <Card key={campaign._id} className="char-list-item" onClick={() => handleCampaignClick(campaign._id)}>
          <h4>{campaign.name}</h4>
          <Text>DM: {campaign.owner.username}</Text>
        </Card>
      ))}
      <Dialog
        opened={dialogOpen}
        withCloseButton
        onClose={() => setDialogOpen(false)}
        position={{ top: '15em', left: '30em' }}
      >
        <Text size="sm" mb="xs" weight={500}>
          Create a new campaign
        </Text>

        <Group align="flex-end">
          <TextInput
            value={campaignName}
            onChange={e => setCampaignName(e.target.value)}
            placeholder="campaign name"
            sx={{ flex: 1 }}
          />
          <Button onClick={createCampaign} disabled={campaignName.length < 1}>
            Create
          </Button>
        </Group>
      </Dialog>
    </PageWrapper>
  );
};

export default CampaignList;
