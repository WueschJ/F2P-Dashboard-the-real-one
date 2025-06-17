
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FavorResults } from '@/components/FavorResults';
import { Favor } from '@/types/favor';
import { HistoryItem } from '@/types/history';

interface PB1ModeProps {
  onAddToHistory: (item: HistoryItem) => void;
  selectedHistoryItem: HistoryItem | null;
}

export const PB1Mode: React.FC<PB1ModeProps> = ({ onAddToHistory, selectedHistoryItem }) => {
  const [askerName, setAskerName] = useState('');
  const [results, setResults] = useState<Favor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedHistoryItem && selectedHistoryItem.mode === 'PB1') {
      setAskerName(selectedHistoryItem.asker);
      setResults(selectedHistoryItem.results);
    } else {
      setAskerName('');
      setResults([]);
    }
  }, [selectedHistoryItem]);

  const handleRunRecommendation = async () => {
    if (!askerName.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newFavors: Favor[] = [
        {
          id: `pb1-${Date.now()}-1`,
          title: 'Looking for introductions to senior executives at leading AI research labs in Germany for potential collaborations or investments.',
          justification: 'Based on your network analysis, you have strong connections in the AI research community and have previously facilitated similar introductions. This favor aligns with your expertise in technology partnerships.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `pb1-${Date.now()}-2`,
          title: 'Seeking recommendations for experienced software architects familiar with distributed systems.',
          justification: 'Your background in enterprise software development and your network of technical professionals makes you an ideal person to provide quality recommendations in this area.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `pb1-${Date.now()}-3`,
          title: 'Need advice on scaling team culture in a rapidly growing startup environment.',
          justification: 'Given your leadership experience and successful track record with organizational growth, your insights would be valuable for someone facing similar challenges.',
          isExpanded: false,
          isMailHighlighted: false
        }
      ];
      
      setResults(newFavors);
      
      // Add to history
      const historyItem: HistoryItem = {
        id: `pb1-${Date.now()}`,
        mode: 'PB1',
        asker: askerName,
        timestamp: new Date().toLocaleString(),
        results: newFavors
      };
      
      onAddToHistory(historyItem);
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="asker" className="text-sm font-medium text-gray-700">
            Asker
          </Label>
          <Input
            id="asker"
            placeholder="Enter a name"
            value={askerName}
            onChange={(e) => setAskerName(e.target.value)}
            className="w-full"
            disabled={!!selectedHistoryItem}
          />
        </div>

        {!selectedHistoryItem && (
          <Button 
            onClick={handleRunRecommendation}
            disabled={!askerName.trim() || isLoading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
          >
            {isLoading ? 'Processing...' : 'Run F2P Recommendation'}
          </Button>
        )}
      </div>

      {results.length > 0 && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-4">
            F2P Favor Approval Dashboard
          </h3>
          <div className="bg-gray-50 p-4 rounded-lg mb-4">
            <p className="text-sm text-gray-600">
              <span className="font-medium">Favor Type:</span> PB1
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Asker:</span> {askerName}
            </p>
          </div>
          <FavorResults results={results} setResults={setResults} />
        </div>
      )}
    </div>
  );
};
