import { Navigate, useNavigate } from 'react-router-dom';
import { Card } from './Card';

const CampaignList = ({ campaigns, me }) => {
  const navigate = useNavigate();

  const handleCampaignClick = campaignId => {
    return navigate(`/campaign/${campaignId}`);
  };
  return (
    <>
      {campaigns?.map(campaign => (
        <div
          key={campaign._id}
          className='char-list-item'
          style={{ '--prim-color': '#000000', '--text-color': '#ffffff' }}
          onClick={() => handleCampaignClick(campaign._id)}
        >
          <div className='char-name'>{campaign.name}</div>
          <div className='char-encounter'>{`DM: ${campaign.owner.username}`}</div>
        </div>
      ))}
    </>
  );
};

export default CampaignList;
