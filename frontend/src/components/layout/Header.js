import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <div>
      <ul style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
        <Link to="/">Home</Link>
        <Link to="/Login">Login</Link>
      </ul>
    </div>
  );
};

export default Header;
