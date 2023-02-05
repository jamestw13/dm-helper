import { useContext } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../../users';
import { Card, Title, Text } from '@mantine/core';
import { PageWrapper } from '../../../components';

const CampaignList = () => {
  const {
    user: { campaigns },
    loggedIn,
  } = useContext(UserContext);
  const navigate = useNavigate();

  const handleCampaignClick = campaignId => {
    return navigate(`/campaign/${campaignId}`);
  };
  return (
    <PageWrapper title="My Campaigns">
      {campaigns?.map(campaign => (
        <Card key={campaign._id} className="char-list-item" onClick={() => handleCampaignClick(campaign._id)}>
          <Title order={4}>{campaign.name}</Title>
          <Text>DM: {campaign.owner.username}</Text>
        </Card>
      ))}
    </PageWrapper>
  );
};

export default CampaignList;
