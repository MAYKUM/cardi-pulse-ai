import { LogOut, User, Settings, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/contexts/AuthContext";
import { useNavigate } from "react-router-dom";

interface UserProfileDropdownProps {
  children: React.ReactNode;
}

export function UserProfileDropdown({ children }: UserProfileDropdownProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logout();
  };

  const handleSettings = () => {
    const basePath = user?.type === 'cardio' ? '/cardiology' : 
                     user?.type === 'neurology' ? '/neurology' :
                     user?.type === 'ophthalmology' ? '/ophthalmology' :
                     user?.type === 'orthopedics' ? '/orthopedics' :
                     '/general-medicine';
    navigate(`${basePath}/settings`);
  };

  const getDepartmentName = () => {
    switch (user?.type) {
      case 'cardio': return 'Cardiology';
      case 'neurology': return 'Neurology';
      case 'ophthalmology': return 'Ophthalmology';
      case 'orthopedics': return 'Orthopedics';
      default: return 'General Medicine';
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        {children}
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{user?.name || 'Doctor'}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {getDepartmentName()}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={handleSettings}>
            <Settings className="mr-2 h-4 w-4" />
            <span>Settings</span>
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}