import React from 'react';
import { NBFCLayout } from '../../components/layout/NBFCLayout';
import { Card, CardContent } from '../../components/ui/Card';
import { Button } from '../../components/ui/Button';
import { Download } from 'lucide-react';
export function NBFCReportsPage() {
  return (
    <NBFCLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold text-slate-900">Reports</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
          'Portfolio Summary',
          'Disbursement Report',
          'Collections Report',
          'Vintage Analysis',
          'Risk Report'].
          map((report) =>
          <Card key={report}>
              <CardContent className="p-6">
                <h3 className="font-bold text-slate-900 mb-2">{report}</h3>
                <p className="text-sm text-slate-500 mb-4">
                  Generate comprehensive report for analysis.
                </p>
                <Button
                variant="outline"
                className="w-full"
                leftIcon={<Download className="h-4 w-4" />}>

                  Download PDF
                </Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </NBFCLayout>);

}