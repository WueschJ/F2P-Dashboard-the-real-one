
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FavorResults } from '@/components/FavorResults';
import { Favor } from '@/types/favor';
import { HistoryItem } from '@/types/history';

interface PB2ModeProps {
  onAddToHistory: (item: HistoryItem) => void;
  selectedHistoryItem: HistoryItem | null;
}

export const PB2Mode: React.FC<PB2ModeProps> = ({ onAddToHistory, selectedHistoryItem }) => {
  const [askerName, setAskerName] = useState('');
  const [secondPerson, setSecondPerson] = useState('');
  const [results, setResults] = useState<Favor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedHistoryItem && selectedHistoryItem.mode === 'PB2') {
      setAskerName(selectedHistoryItem.asker);
      setSecondPerson(selectedHistoryItem.secondPerson || '');
      setResults(selectedHistoryItem.results);
    } else {
      setAskerName('');
      setSecondPerson('');
      setResults([]);
    }
  }, [selectedHistoryItem]);

  const handleRunRecommendation = async () => {
    if (!askerName.trim() || !secondPerson.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const newFavors: Favor[] = [
        {
          id: `pb2-${Date.now()}-1`,
          title: 'Facilitate a partnership discussion between two fintech companies for payment processing integration.',
          justification: 'Your connections to both parties and understanding of fintech partnerships makes you uniquely positioned to facilitate this collaboration. Both parties would benefit from your neutral perspective.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `pb2-${Date.now()}-2`,
          title: 'Coordinate a joint research proposal between academic institutions in machine learning.',
          justification: 'Given your academic network and research background, you can help align the research interests of both parties and facilitate a successful collaboration.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `pb2-${Date.now()}-3`,
          title: 'Organize a strategic alliance meeting between two complementary technology startups.',
          justification: 'Your experience in business development and understanding of both companies\' market positions makes you ideal for facilitating this potential partnership.',
          isExpanded: false,
          isMailHighlighted: false
        }
      ];
      
      setResults(newFavors);
      
      // Add to history
      const historyItem: HistoryItem = {
        id: `pb2-${Date.now()}`,
        mode: 'PB2',
        asker: askerName,
        secondPerson: secondPerson,
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
            placeholder="Enter first person's name"
            value={askerName}
            onChange={(e) => setAskerName(e.target.value)}
            className="w-full"
            disabled={!!selectedHistoryItem}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="secondPerson" className="text-sm font-medium text-gray-700">
            Second Person
          </Label>
          <Input
            id="secondPerson"
            placeholder="Enter second person's name"
            value={secondPerson}
            onChange={(e) => setSecondPerson(e.target.value)}
            className="w-full"
            disabled={!!selectedHistoryItem}
          />
        </div>

        {!selectedHistoryItem && (
          <Button 
            onClick={handleRunRecommendation}
            disabled={!askerName.trim() || !secondPerson.trim() || isLoading}
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
              <span className="font-medium">Favor Type:</span> PB2
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Asker:</span> {askerName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Second Person:</span> {secondPerson}
            </p>
          </div>
          <FavorResults results={results} setResults={setResults} />
        </div>
      )}
    </div>
  );
};
