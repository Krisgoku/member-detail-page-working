'use client';

import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { ImagePlus } from 'lucide-react';
import { Member } from './members-table';
import { UploadButton } from '@/utils/uploadthing';
import { useToast } from '@/components/ui/use-toast';

interface EditMemberDialogProps {
  member: Member;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

export function EditMemberDialog({
  member,
  open,
  onOpenChange,
}: EditMemberDialogProps) {
  const [photoUrl, setPhotoUrl] = useState(member.photo);
  const { toast } = useToast();

  const handleSave = async () => {
    // TODO: Implement save functionality
    toast({
      title: 'Success',
      description: 'Member details updated successfully',
    });
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Edit Member</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label>Photo</Label>
            <div className="flex items-center gap-4">
              <img
                src={photoUrl}
                alt={member.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <UploadButton
                endpoint="memberImage"
                onClientUploadComplete={(res) => {
                  setPhotoUrl(res[0].url);
                  toast({
                    title: 'Success',
                    description: 'Photo uploaded successfully',
                  });
                }}
                onUploadError={(error: Error) => {
                  toast({
                    title: 'Error',
                    description: error.message,
                    variant: 'destructive',
                  });
                }}
              />
            </div>
          </div>
          <div className="grid gap-2">
            <Label htmlFor="name">Full Name</Label>
            <Input id="name" defaultValue={member.name} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" defaultValue={member.email} />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="membership">Membership Type</Label>
            <Select defaultValue={member.membershipType.toLowerCase()}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="basic">Basic</SelectItem>
                <SelectItem value="premium">Premium</SelectItem>
                <SelectItem value="vip">VIP</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave}>Save Changes</Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}