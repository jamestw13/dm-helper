import { getTextColor } from '../utils/helpers';

const Card = ({ lineOne, lineTwo, colorOne = 'var(--bg)', colorTwo = 'var(--bg-light)', handleCardClick }) => {
  return (
    <div
      className="char-list-item"
      style={{
        '--prim-color': colorOne,
        '--scnd-color': colorTwo,
        '--text-color': getTextColor(colorOne),
      }}
      onClick={handleCardClick}
    >
      <div className="char-name">{lineOne}</div>
      <div className="char-encounter">{lineTwo}</div>
    </div>
  );
};
export default Card;
