import { Button } from "@/components/ui/button";

const LogoutButton = ({ onLogout, isLoading }) => {
    return (
        <Button 
            variant="destructive"
            onClick={onLogout}
            disabled={isLoading}
            className="ml-auto"
        >
            {isLoading ? 'Logging out...' : 'Log Out'}
        </Button>
    );
};

export default LogoutButton;
