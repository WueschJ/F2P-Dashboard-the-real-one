
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ScrollArea } from '@/components/ui/scroll-area';
import { HistorySidebar } from '@/components/HistorySidebar';
import { FavorResults } from '@/components/FavorResults';
import { PB1Mode } from '@/components/modes/PB1Mode';
import { PB2Mode } from '@/components/modes/PB2Mode';
import { TB1Mode } from '@/components/modes/TB1Mode';
import { TB2Mode } from '@/components/modes/TB2Mode';
import { TBHybridMode } from '@/components/modes/TBHybridMode';
import { HistoryItem } from '@/types/history';
import { Favor } from '@/types/favor';

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);
  const [historyItems, setHistoryItems] = useState<HistoryItem[]>([]);
  const [selectedHistoryItem, setSelectedHistoryItem] = useState<HistoryItem | null>(null);
  const [allResults, setAllResults] = useState<Array<{
    id: string;
    mode: string;
    asker: string;
    secondPerson?: string;
    timestamp: string;
    favors: Favor[];
  }>>([]);

  const addToHistory = (item: HistoryItem) => {
    setHistoryItems(prev => [item, ...prev]);
    
    // Add results to the global results list
    const resultEntry = {
      id: item.id,
      mode: item.mode,
      asker: item.asker,
      secondPerson: item.secondPerson,
      timestamp: item.timestamp,
      favors: item.results
    };
    
    setAllResults(prev => [resultEntry, ...prev]);
  };

  const onHistoryItemClick = (item: HistoryItem) => {
    setSelectedHistoryItem(item);
    setSelectedMode(item.mode);
  };

  const updateResults = (resultId: string, updatedFavors: Favor[]) => {
    setAllResults(prev => prev.map(result => 
      result.id === resultId ? { ...result, favors: updatedFavors } : result
    ));
  };

  const renderModeComponent = () => {
    const key = selectedHistoryItem ? selectedHistoryItem.id : 'new';
    
    switch (selectedMode) {
      case 'PB1':
        return <PB1Mode key={key} onAddToHistory={addToHistory} selectedHistoryItem={selectedHistoryItem} />;
      case 'PB2':
        return <PB2Mode key={key} onAddToHistory={addToHistory} selectedHistoryItem={selectedHistoryItem} />;
      case 'TB1':
        return <TB1Mode key={key} onAddToHistory={addToHistory} selectedHistoryItem={selectedHistoryItem} />;
      case 'TB2':
        return <TB2Mode key={key} onAddToHistory={addToHistory} selectedHistoryItem={selectedHistoryItem} />;
      case 'TB_HYBRID':
        return <TBHybridMode key={key} onAddToHistory={addToHistory} selectedHistoryItem={selectedHistoryItem} />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Please select an approach to get started</p>
          </div>
        );
    }
  };

  const handleModeChange = (newMode: string) => {
    setSelectedMode(newMode);
    setSelectedHistoryItem(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <HistorySidebar 
        isOpen={isHistoryOpen} 
        onToggle={() => setIsHistoryOpen(!isHistoryOpen)}
        historyItems={historyItems}
        onHistoryItemClick={onHistoryItemClick}
        selectedHistoryItem={selectedHistoryItem}
      />
      
      <div className={`flex-1 transition-all duration-300 ${isHistoryOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6 max-w-4xl mx-auto">
          <Card className="bg-white shadow-sm mb-6">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Recommend Favor to People
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="approach" className="text-sm font-medium text-gray-700">
                  Approach
                </label>
                <Select value={selectedMode} onValueChange={handleModeChange}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select an approach" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PB1">PB1</SelectItem>
                    <SelectItem value="PB2">PB2</SelectItem>
                    <SelectItem value="TB1">TB1</SelectItem>
                    <SelectItem value="TB2">TB2</SelectItem>
                    <SelectItem value="TB_HYBRID">TB_HYBRID</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {renderModeComponent()}
            </CardContent>
          </Card>

          {allResults.length > 0 && (
            <Card className="bg-white shadow-sm">
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-900">
                  All F2P Favor Results
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ScrollArea className="h-[600px] pr-4">
                  <div className="space-y-6">
                    {allResults.map((result) => (
                      <div key={result.id} className="border-b border-gray-200 pb-6 last:border-b-0">
                        <div className="bg-gray-50 p-4 rounded-lg mb-4">
                          <div className="flex items-center justify-between mb-2">
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Favor Type:</span> {result.mode}
                            </p>
                            <p className="text-xs text-gray-500">{result.timestamp}</p>
                          </div>
                          <p className="text-sm text-gray-600">
                            <span className="font-medium">Asker:</span> {result.asker}
                          </p>
                          {result.secondPerson && (
                            <p className="text-sm text-gray-600">
                              <span className="font-medium">Second Person:</span> {result.secondPerson}
                            </p>
                          )}
                        </div>
                        <FavorResults 
                          results={result.favors} 
                          setResults={(updatedFavors) => updateResults(result.id, updatedFavors)} 
                        />
                      </div>
                    ))}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

export default Index;
