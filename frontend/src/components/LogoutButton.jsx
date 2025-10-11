import { Button } from '@/components/ui/button';
import { useAuth } from '../context/AuthCTX';
import { useNavigate } from 'react-router-dom';

export default function LogoutButton({ className, variant = 'ghost', children }) {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Button 
      onClick={handleLogout}
      variant={variant}
      className={className}
    >
      {children || 'Logout'}
    </Button>
  );
}
