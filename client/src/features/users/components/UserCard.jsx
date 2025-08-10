import { Avatar } from '../../../components/Avatar';

export default ({ user }) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', background: 'var(--bg-light)' }}>
      <Avatar src={user?.avatar} />
      <div style={{ display: 'grid' }}>
        <p>{user?.username}</p>
        <p>{user?.name}</p>
      </div>
    </div>
  );
};
