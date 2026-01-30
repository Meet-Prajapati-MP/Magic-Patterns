import React from 'react';
import { NBFCLayout } from '../../components/layout/NBFCLayout';
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle } from
'../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
export function NBFCSettingsPage() {
  return (
    <NBFCLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Settings</h1>

        <Card>
          <CardHeader>
            <CardTitle>Fee Structure</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input label="Processing Fee (%)" defaultValue="2.5" />
            <Input label="Interest Rate (%)" defaultValue="0" />
            <Input label="Late Payment Fee (₹/day)" defaultValue="100" />
            <Button>Save Changes</Button>
          </CardContent>
        </Card>
      </div>
    </NBFCLayout>);

}