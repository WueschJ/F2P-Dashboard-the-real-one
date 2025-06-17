
import React from 'react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { X, Menu, Clock } from 'lucide-react';
import { HistoryItem } from '@/types/history';

interface HistorySidebarProps {
  isOpen: boolean;
  onToggle: () => void;
  historyItems: HistoryItem[];
  onHistoryItemClick: (item: HistoryItem) => void;
  selectedHistoryItem: HistoryItem | null;
}

export const HistorySidebar: React.FC<HistorySidebarProps> = ({ 
  isOpen, 
  onToggle, 
  historyItems, 
  onHistoryItemClick,
  selectedHistoryItem 
}) => {
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
            {historyItems.length === 0 ? (
              <div className="p-3 text-sm text-gray-500 text-center">
                No history yet
              </div>
            ) : (
              historyItems.map((item) => (
                <div 
                  key={item.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors mb-2 ${
                    selectedHistoryItem?.id === item.id 
                      ? 'bg-blue-50 border border-blue-200' 
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => onHistoryItemClick(item)}
                >
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm font-medium text-blue-600">{item.mode}</span>
                    <span className="text-xs text-gray-500">{item.timestamp}</span>
                  </div>
                  <p className="text-sm text-gray-700 truncate">Asker: {item.asker}</p>
                  {item.secondPerson && (
                    <p className="text-xs text-gray-500 truncate">+ {item.secondPerson}</p>
                  )}
                  <p className="text-xs text-gray-500 mt-1">{item.results.length} favors</p>
                </div>
              ))
            )}
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
