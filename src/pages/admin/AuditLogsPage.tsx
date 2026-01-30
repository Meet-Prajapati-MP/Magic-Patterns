import React from 'react';
import { AdminLayout } from '../../components/layout/AdminLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { Search, Filter, Download } from 'lucide-react';
import { Button } from '../../components/ui/Button';
export function AuditLogsPage() {
  const logs = [
  {
    id: 1,
    action: 'User Login',
    user: 'rajesh@example.com',
    ip: '192.168.1.1',
    time: 'Just now',
    status: 'success'
  },
  {
    id: 2,
    action: 'Invoice Created',
    user: 'rajesh@example.com',
    ip: '192.168.1.1',
    time: '5 mins ago',
    status: 'success'
  },
  {
    id: 3,
    action: 'Payment Failed',
    user: 'amit@example.com',
    ip: '10.0.0.5',
    time: '1 hour ago',
    status: 'failure'
  },
  {
    id: 4,
    action: 'Settings Updated',
    user: 'admin@trustopay.in',
    ip: '172.16.0.1',
    time: '2 hours ago',
    status: 'success'
  }];

  return (
    <AdminLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold text-slate-900">
            System Audit Logs
          </h1>
          <Button variant="outline" leftIcon={<Download className="h-4 w-4" />}>
            Export Logs
          </Button>
        </div>

        <Card>
          <div className="p-4 border-b border-slate-200 flex gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search logs..."
                className="w-full pl-9 pr-4 py-2 text-sm border border-slate-300 rounded-md" />

            </div>
            <Button variant="outline" leftIcon={<Filter className="h-4 w-4" />}>
              Filter
            </Button>
          </div>

          <CardContent className="p-0">
            <table className="w-full text-sm text-left">
              <thead className="bg-slate-50 text-slate-500 font-medium">
                <tr>
                  <th className="px-6 py-3">Action</th>
                  <th className="px-6 py-3">User</th>
                  <th className="px-6 py-3">IP Address</th>
                  <th className="px-6 py-3">Time</th>
                  <th className="px-6 py-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {logs.map((log) =>
                <tr key={log.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4 font-medium text-slate-900">
                      {log.action}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{log.user}</td>
                    <td className="px-6 py-4 font-mono text-xs text-slate-500">
                      {log.ip}
                    </td>
                    <td className="px-6 py-4 text-slate-500">{log.time}</td>
                    <td className="px-6 py-4">
                      <span
                      className={`text-xs font-medium px-2 py-1 rounded ${log.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>

                        {log.status.toUpperCase()}
                      </span>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </CardContent>
        </Card>
      </div>
    </AdminLayout>);

}