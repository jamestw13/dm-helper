import { Card } from './Card';

const CampaignList = ({ campaigns, me }) => {
  return (
    <Card title='Campaign List'>
      <div>
        {campaigns?.map(campaign => (
          <div key={campaign._id} className='char-list-item' style={{}}>
            <div className='char-name'>{campaign.name}</div>
            <div className='char-encounter'>{`DM: ${campaign.owner.username}`}</div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default CampaignList;
