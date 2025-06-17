
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Menu, Clock } from 'lucide-react';

interface HistorySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ isOpen, onToggle }) => {
  const historyItems = [
    { id: 1, mode: 'PB1', asker: 'marie tai', timestamp: '2 hours ago' },
    { id: 2, mode: 'PB2', asker: 'john doe', timestamp: '1 day ago' },
    { id: 3, mode: 'TB1', asker: 'sarah wilson', timestamp: '2 days ago' },
    { id: 4, mode: 'PB1', asker: 'mike johnson', timestamp: '3 days ago' },
  ];

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden"
          onClick={onToggle}
        />
      )}
      
      {/* Sidebar */}
      <div className={`fixed left-0 top-0 h-full w-64 bg-white border-r border-gray-200 z-50 transform transition-transform duration-300 ${
        isOpen ? 'translate-x-0' : '-translate-x-full'
      }`}>
        <div className="p-4 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-lg font-semibold text-gray-900 flex items-center">
            <Clock className="w-5 h-5 mr-2" />
            History
          </h2>
          <Button variant="ghost" size="sm" onClick={onToggle}>
            <X className="w-4 h-4" />
          </Button>
        </div>
        
        <ScrollArea className="h-[calc(100vh-80px)]">
          <div className="p-2">
            {historyItems.map((item) => (
              <div 
                key={item.id}
                className="p-3 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors mb-2"
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm font-medium text-blue-600">{item.mode}</span>
                  <span className="text-xs text-gray-500">{item.timestamp}</span>
                </div>
                <p className="text-sm text-gray-700 truncate">Asker: {item.asker}</p>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>
      
      {/* Toggle button when sidebar is closed */}
      {!isOpen && (
        <Button
          variant="outline"
          size="sm"
          className="fixed left-4 top-4 z-50"
          onClick={onToggle}
        >
          <Menu className="w-4 h-4" />
        </Button>
      )}
    </>
  );
};
