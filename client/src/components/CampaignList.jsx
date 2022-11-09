const CampaignList = ({ campaigns, me }) => {
  return (
    <div id='char-list' className='card'>
      <h2>Campaign List</h2>
      <div>
        {campaigns?.map(campaign => (
          <div key={campaign._id} className='char-list-item' style={{}}>
            <div className='char-name'>{campaign.name}</div>
            <div className='char-encounter'>{campaign.owner.username}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CampaignList;
