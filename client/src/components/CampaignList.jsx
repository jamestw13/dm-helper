const CampaignList = ({ campaigns, me }) => {
  return (
    <div id='char-list' className='card'>
      <h2>Campaign List</h2>
      <h3>I'm the DM</h3>
      <ul>
        {campaigns?.map(campaign => {
          if (campaign.owner._id === me)
            return (
              <li key={campaign._id} className='char-list-row' style={{}}>
                {campaign.name}
              </li>
            );
        })}
      </ul>
      <h3>I'm a player</h3>
      <ul>
        {campaigns?.map(campaign => {
          if (campaign.owner._id !== me)
            return (
              <li key={campaign._id} className='char-list-row' style={{}}>
                {campaign.name}
              </li>
            );
        })}
      </ul>
    </div>
  );
};

export default CampaignList;
