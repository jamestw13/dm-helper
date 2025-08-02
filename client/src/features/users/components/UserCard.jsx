import { Avatar } from '../../../components/Avatar';

export default ({ user }) => {
  return (
    <div>
      <Avatar src={user?.avatar} />
      <div style={{ display: 'grid' }}>
        <p>{user?.username}</p>
        <p>{user?.name}</p>
      </div>
    </div>
  );
};
