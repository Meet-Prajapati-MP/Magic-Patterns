import React from 'react';
import { Download, Share2 } from 'lucide-react';
import { Button } from '../ui/Button';
interface InvoicePreviewProps {
  data: {
    id: string;
    date: string;
    dueDate: string;
    seller: {
      name: string;
      address: string;
      gstin?: string;
      email: string;
    };
    buyer: {
      name: string;
      address: string;
      gstin?: string;
      email: string;
    };
    items: Array<{
      desc: string;
      qty: number;
      rate: number;
    }>;
    subtotal: number;
    tax: number;
    total: number;
    notes?: string;
  };
  showActions?: boolean;
}
export function InvoicePreview({
  data,
  showActions = true
}: InvoicePreviewProps) {
  // Handle undefined data
  if (!data) {
    return (
      <div className="bg-white border border-slate-200 rounded-lg shadow-sm p-8">
        <p className="text-slate-500 text-center">No invoice data available</p>
      </div>);

  }
  return (
    <div className="bg-white border border-slate-200 rounded-lg shadow-sm overflow-hidden">
      {showActions &&
      <div className="bg-slate-50 border-b border-slate-200 p-4 flex justify-end space-x-2">
          <Button
          variant="outline"
          size="sm"
          leftIcon={<Download className="h-4 w-4" />}>

            Download PDF
          </Button>
          <Button
          variant="outline"
          size="sm"
          leftIcon={<Share2 className="h-4 w-4" />}>

            Share
          </Button>
        </div>
      }

      <div className="p-8 md:p-12">
        {/* Header */}
        <div className="flex justify-between items-start mb-12">
          <div>
            <div className="h-10 w-10 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
              <span className="text-white font-bold text-xl">T</span>
            </div>
            <h1 className="text-2xl font-bold text-slate-900">INVOICE</h1>
            <p className="text-slate-500">#{data.id}</p>
          </div>
          <div className="text-right">
            <h3 className="font-bold text-slate-900">{data.seller.name}</h3>
            <p className="text-sm text-slate-500 whitespace-pre-line">
              {data.seller.address}
            </p>
            {data.seller.gstin &&
            <p className="text-sm text-slate-500">
                GSTIN: {data.seller.gstin}
              </p>
            }
            <p className="text-sm text-slate-500">{data.seller.email}</p>
          </div>
        </div>

        {/* Bill To & Details */}
        <div className="flex flex-col md:flex-row justify-between mb-12 gap-8">
          <div>
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">
              Bill To
            </p>
            <h3 className="font-bold text-slate-900">{data.buyer.name}</h3>
            <p className="text-sm text-slate-500 whitespace-pre-line">
              {data.buyer.address}
            </p>
            {data.buyer.gstin &&
            <p className="text-sm text-slate-500">
                GSTIN: {data.buyer.gstin}
              </p>
            }
            <p className="text-sm text-slate-500">{data.buyer.email}</p>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-4">
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                Invoice Date
              </p>
              <p className="font-medium text-slate-900">{data.date}</p>
            </div>
            <div>
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                Due Date
              </p>
              <p className="font-medium text-slate-900">{data.dueDate}</p>
            </div>
            <div className="col-span-2">
              <p className="text-xs font-bold text-slate-400 uppercase mb-1">
                Amount Due
              </p>
              <p className="text-2xl font-bold text-blue-600">
                ₹{data.total.toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Items Table */}
        <div className="mb-12">
          <table className="w-full">
            <thead>
              <tr className="border-b-2 border-slate-100">
                <th className="text-left py-3 text-xs font-bold text-slate-400 uppercase">
                  Description
                </th>
                <th className="text-right py-3 text-xs font-bold text-slate-400 uppercase">
                  Qty
                </th>
                <th className="text-right py-3 text-xs font-bold text-slate-400 uppercase">
                  Rate
                </th>
                <th className="text-right py-3 text-xs font-bold text-slate-400 uppercase">
                  Amount
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {data.items.map((item, i) =>
              <tr key={i}>
                  <td className="py-4 text-sm text-slate-900 font-medium">
                    {item.desc}
                  </td>
                  <td className="py-4 text-right text-sm text-slate-600">
                    {item.qty}
                  </td>
                  <td className="py-4 text-right text-sm text-slate-600">
                    ₹{item.rate.toLocaleString()}
                  </td>
                  <td className="py-4 text-right text-sm text-slate-900 font-bold">
                    ₹{(item.qty * item.rate).toLocaleString()}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Totals */}
        <div className="flex justify-end mb-12">
          <div className="w-64 space-y-3">
            <div className="flex justify-between text-sm text-slate-600">
              <span>Subtotal</span>
              <span>₹{data.subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-sm text-slate-600">
              <span>Tax (18%)</span>
              <span>₹{data.tax.toLocaleString()}</span>
            </div>
            <div className="flex justify-between text-lg font-bold text-slate-900 pt-3 border-t border-slate-200">
              <span>Total</span>
              <span>₹{data.total.toLocaleString()}</span>
            </div>
          </div>
        </div>

        {/* Notes */}
        {data.notes &&
        <div className="bg-slate-50 p-4 rounded-lg">
            <p className="text-xs font-bold text-slate-400 uppercase mb-2">
              Notes
            </p>
            <p className="text-sm text-slate-600">{data.notes}</p>
          </div>
        }
      </div>
    </div>);

}