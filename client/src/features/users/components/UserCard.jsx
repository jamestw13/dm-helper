import { Avatar } from '../../../components/Avatar';

export default ({ user, options }) => {
  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'auto auto auto 1fr',
        gap: '1rem',
        background: 'var(--bg-light)',
        alignItems: 'center',
      }}
    >
      <Avatar src={user?.avatar} />

      <p>{user?.username}</p>
    </div>
  );
};
