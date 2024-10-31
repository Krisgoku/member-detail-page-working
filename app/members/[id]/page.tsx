'use client';

import { useParams } from 'next/navigation';
import { format } from 'date-fns';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { EditMemberDialog } from '@/components/members/edit-member-dialog';
import { useState } from 'react';

// Mock data - replace with API call
const getMemberDetails = (id: string) => ({
  id,
  name: 'John Doe',
  email: 'john@example.com',
  phone: '+1 (555) 000-0000',
  photo: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=80&h=80&fit=crop',
  membershipType: 'Premium',
  status: 'active',
  joinDate: '2024-01-15',
  paymentStatus: 'paid',
  lastPayment: {
    amount: 99.99,
    date: '2024-03-01',
  },
  attendance: [
    { date: '2024-03-15', checkIn: '09:00 AM', checkOut: '10:30 AM' },
    { date: '2024-03-14', checkIn: '08:45 AM', checkOut: '10:15 AM' },
  ],
});

export default function MemberDetailsPage() {
  const params = useParams();
  const memberId = params.id as string;
  const member = getMemberDetails(memberId);
  const [editDialogOpen, setEditDialogOpen] = useState(false);

  return (
    <div className="p-8">
      <div className="flex justify-between items-start mb-8">
        <div className="flex items-center gap-4">
          <Avatar className="h-20 w-20">
            <AvatarImage src={member.photo} alt={member.name} />
            <AvatarFallback>{member.name.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-3xl font-bold tracking-tight">{member.name}</h2>
            <div className="flex items-center gap-2 mt-2">
              <Badge>{member.membershipType}</Badge>
              <Badge variant={member.status === 'active' ? 'default' : 'secondary'}>
                {member.status}
              </Badge>
              <Badge
                variant={
                  member.paymentStatus === 'paid'
                    ? 'default'
                    : member.paymentStatus === 'due'
                    ? 'secondary'
                    : 'destructive'
                }
              >
                {member.paymentStatus}
              </Badge>
            </div>
          </div>
        </div>
        <Button onClick={() => setEditDialogOpen(true)}>Edit Member</Button>
      </div>

      <Tabs defaultValue="details" className="space-y-4">
        <TabsList>
          <TabsTrigger value="details">Details</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="attendance">Attendance</TabsTrigger>
        </TabsList>

        <TabsContent value="details">
          <Card>
            <CardHeader>
              <CardTitle>Member Information</CardTitle>
              <CardDescription>Personal and membership details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Email</p>
                  <p>{member.email}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Phone</p>
                  <p>{member.phone}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Join Date</p>
                  <p>{format(new Date(member.joinDate), 'PPP')}</p>
                </div>
                <div>
                  <p className="text-sm font-medium text-muted-foreground">
                    Membership Type
                  </p>
                  <p>{member.membershipType}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment History</CardTitle>
              <CardDescription>Recent payments and status</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center p-4 border rounded-lg">
                  <div>
                    <p className="font-medium">Last Payment</p>
                    <p className="text-sm text-muted-foreground">
                      {format(new Date(member.lastPayment.date), 'PPP')}
                    </p>
                  </div>
                  <p className="text-xl font-bold">${member.lastPayment.amount}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="attendance">
          <Card>
            <CardHeader>
              <CardTitle>Attendance Log</CardTitle>
              <CardDescription>Recent gym visits</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {member.attendance.map((record) => (
                  <div
                    key={record.date}
                    className="flex justify-between items-center p-4 border rounded-lg"
                  >
                    <div>
                      <p className="font-medium">
                        {format(new Date(record.date), 'PPP')}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {record.checkIn} - {record.checkOut}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <EditMemberDialog
        member={member}
        open={editDialogOpen}
        onOpenChange={setEditDialogOpen}
      />
    </div>
  );
}