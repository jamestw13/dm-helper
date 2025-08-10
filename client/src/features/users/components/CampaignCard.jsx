export default ({ campaign, onClick }) => {
  return (
    <div
      style={{ background: 'var(--bg-light)', margin: '.25rem', padding: '.25rem .75rem', borderRadius: '5px' }}
      key={campaign._id}
      onClick={onClick}
    >
      <h3 className="char-name">{campaign.name}</h3>
      <p className="char-encounter">{`DM: ${campaign?.owner?.username}`}</p>
    </div>
  );
};

// // Previous campaign card implementation
