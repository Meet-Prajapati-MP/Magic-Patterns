import React from 'react';
import { CheckCircle, Circle, Clock, Mail, Eye, DollarSign } from 'lucide-react';
interface TimelineItem {
  id: string;
  type: 'created' | 'sent' | 'viewed' | 'payment' | 'reminder';
  title: string;
  description?: string;
  date: string;
  time: string;
}
interface TimelineProps {
  items: TimelineItem[];
}
export function Timeline({ items }: TimelineProps) {
  const getIcon = (type: TimelineItem['type']) => {
    switch (type) {
      case 'created':
        return <Circle className="h-5 w-5 text-slate-400" />;
      case 'sent':
        return <Mail className="h-5 w-5 text-blue-500" />;
      case 'viewed':
        return <Eye className="h-5 w-5 text-amber-500" />;
      case 'payment':
        return <DollarSign className="h-5 w-5 text-green-500" />;
      case 'reminder':
        return <Clock className="h-5 w-5 text-purple-500" />;
      default:
        return <Circle className="h-5 w-5" />;
    }
  };
  return (
    <div className="flow-root">
      <ul className="-mb-8">
        {items.map((item, itemIdx) =>
        <li key={item.id}>
            <div className="relative pb-8">
              {itemIdx !== items.length - 1 ?
            <span
              className="absolute top-4 left-4 -ml-px h-full w-0.5 bg-slate-200"
              aria-hidden="true" /> :

            null}
              <div className="relative flex space-x-3">
                <div
                className={`h-8 w-8 rounded-full flex items-center justify-center ring-8 ring-white bg-slate-50`}>

                  {getIcon(item.type)}
                </div>
                <div className="flex min-w-0 flex-1 justify-between space-x-4 pt-1.5">
                  <div>
                    <p className="text-sm font-medium text-slate-900">
                      {item.title}
                    </p>
                    {item.description &&
                  <p className="text-sm text-slate-500">
                        {item.description}
                      </p>
                  }
                  </div>
                  <div className="whitespace-nowrap text-right text-sm text-slate-500">
                    <time dateTime={item.date}>{item.date}</time>
                    <p className="text-xs">{item.time}</p>
                  </div>
                </div>
              </div>
            </div>
          </li>
        )}
      </ul>
    </div>);

}