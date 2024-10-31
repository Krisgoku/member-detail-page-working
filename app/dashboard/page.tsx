'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Users,
  DollarSign,
  TrendingUp,
  Calendar,
  ArrowUpRight,
  ArrowDownRight,
} from 'lucide-react';

export default function DashboardPage() {
  const stats = [
    {
      title: 'Total Members',
      value: '2,850',
      icon: Users,
      trend: '+12.5%',
      trendUp: true,
    },
    {
      title: 'Revenue',
      value: '$45,231',
      icon: DollarSign,
      trend: '+8.2%',
      trendUp: true,
    },
    {
      title: 'Active Memberships',
      value: '1,950',
      icon: TrendingUp,
      trend: '-3.1%',
      trendUp: false,
    },
    {
      title: 'Today\'s Attendance',
      value: '245',
      icon: Calendar,
      trend: '+4.9%',
      trendUp: true,
    },
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold tracking-tight mb-6">Dashboard</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {stat.title}
              </CardTitle>
              <stat.icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="flex items-center text-sm">
                {stat.trendUp ? (
                  <ArrowUpRight className="h-4 w-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="h-4 w-4 text-red-500 mr-1" />
                )}
                <span className={stat.trendUp ? 'text-green-500' : 'text-red-500'}>
                  {stat.trend}
                </span>
                <span className="text-muted-foreground ml-1">from last month</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}