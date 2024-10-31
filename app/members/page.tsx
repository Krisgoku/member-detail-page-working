'use client';

import { useState } from 'react';
import { Plus } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { MembersTable } from '@/components/members/members-table';
import { AddMemberDialog } from '@/components/members/add-member-dialog';

export default function MembersPage() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold tracking-tight">Members</h2>
        <Button onClick={() => setOpen(true)}>
          <Plus className="mr-2 h-4 w-4" />
          Add Member
        </Button>
      </div>
      <MembersTable />
      <AddMemberDialog open={open} onOpenChange={setOpen} />
    </div>
  );
}