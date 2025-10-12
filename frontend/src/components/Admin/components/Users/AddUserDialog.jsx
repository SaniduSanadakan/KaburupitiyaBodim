import { useState } from 'react';
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUser from './AddUser';

export default function AddUserDialog({ onUserAdded }) {
  const [isOpen, setIsOpen] = useState(false);

  const handleUserAdded = () => {
    if (onUserAdded) {
      onUserAdded();
    }
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button>Add User</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Add New User</DialogTitle>
          <DialogDescription>
            Fill in the user details below to create a new account.
          </DialogDescription>
        </DialogHeader>
        <div className="py-4">
          <AddUser 
            onUserAdded={handleUserAdded}
            onClose={() => setIsOpen(false)}
          />
        </div>
      </DialogContent>
    </Dialog>
  );
}
