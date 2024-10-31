'use client';

import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import {
  Dumbbell,
  Users,
  UserCog,
  CreditCard,
  CalendarCheck,
  Award,
  BarChart3,
  Settings,
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

const routes = [
  {
    label: 'Dashboard',
    icon: BarChart3,
    href: '/dashboard',
  },
  {
    label: 'Members',
    icon: Users,
    href: '/members',
  },
  {
    label: 'Staff',
    icon: UserCog,
    href: '/staff',
  },
  {
    label: 'Trainers',
    icon: Award,
    href: '/trainers',
  },
  {
    label: 'Payments',
    icon: CreditCard,
    href: '/payments',
  },
  {
    label: 'Attendance',
    icon: CalendarCheck,
    href: '/attendance',
  },
  {
    label: 'Memberships',
    icon: Dumbbell,
    href: '/memberships',
  },
  {
    label: 'Settings',
    icon: Settings,
    href: '/settings',
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <div className="space-y-4 py-4 flex flex-col h-full bg-muted/50 border-r">
      <div className="px-3 py-2 flex-1">
        <Link href="/dashboard" className="flex items-center pl-3 mb-14">
          <Dumbbell className="h-8 w-8 text-primary" />
          <h1 className="text-xl font-bold ml-2">FitManager Pro</h1>
        </Link>
        <ScrollArea className="h-[calc(100vh-10rem)]">
          <div className="space-y-1">
            {routes.map((route) => (
              <Button
                key={route.href}
                variant={pathname === route.href ? 'secondary' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  pathname === route.href && 'bg-secondary'
                )}
                asChild
              >
                <Link href={route.href}>
                  <route.icon className="h-5 w-5 mr-3" />
                  {route.label}
                </Link>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}