
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FavorResults } from '@/components/FavorResults';
import { Favor } from '@/types/favor';
import { HistoryItem } from '@/types/history';

interface TBHybridModeProps {
  onAddToHistory: (item: HistoryItem) => void;
  selectedHistoryItem: HistoryItem | null;
}

export const TBHybridMode: React.FC<TBHybridModeProps> = ({ onAddToHistory, selectedHistoryItem }) => {
  const [askerName, setAskerName] = useState('');
  const [results, setResults] = useState<Favor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (selectedHistoryItem && selectedHistoryItem.mode === 'TB_HYBRID') {
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
        // Favors for asker to provide to other person
        {
          id: `tbhybrid-${Date.now()}-1`,
          title: 'Facilitate a hybrid collaboration combining mentorship and partnership opportunities.',
          justification: 'Your unique position allows you to create value for both parties through a combination of knowledge transfer and strategic partnership facilitation.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `tbhybrid-${Date.now()}-2`,
          title: 'Create a mixed-format engagement combining advisory services with networking opportunities.',
          justification: 'Your diverse network and advisory experience enable you to provide multifaceted value through both direct guidance and strategic connections.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `tbhybrid-${Date.now()}-3`,
          title: 'Design a comprehensive program mixing skill development with strategic business guidance.',
          justification: 'Your holistic approach to professional development and business strategy makes you ideal for creating comprehensive growth programs that address multiple needs.',
          isExpanded: false,
          isMailHighlighted: false
        },
        // Favors for other person to provide to asker
        {
          id: `tbhybrid-${Date.now()}-4`,
          title: 'Provide specialized industry insights and market analysis for strategic planning.',
          justification: 'The other person\'s deep industry knowledge and analytical skills can offer valuable market perspectives to inform your strategic decisions.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `tbhybrid-${Date.now()}-5`,
          title: 'Share technical expertise and best practices from their domain experience.',
          justification: 'Their specialized technical background and proven methodologies can significantly enhance your current projects and capabilities.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `tbhybrid-${Date.now()}-6`,
          title: 'Offer access to their professional network and strategic partnerships.',
          justification: 'Their established connections and partnership relationships can open new opportunities and accelerate your business development efforts.',
          isExpanded: false,
          isMailHighlighted: false
        }
      ];
      
      setResults(newFavors);
      
      // Add to history
      const historyItem: HistoryItem = {
        id: `tbhybrid-${Date.now()}`,
        mode: 'TB_HYBRID',
        asker: askerName,
        timestamp: new Date().toLocaleString(),
        results: newFavors
      };
      
      onAddToHistory(historyItem);
      setIsLoading(false);
    }, 1500);
  };

  const leftColumnFavors = results.slice(0, 3);
  const rightColumnFavors = results.slice(3, 6);

  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="asker" className="text-sm font-medium text-gray-700">
            Asker
          </Label>
          <Input
            id="asker"
            placeholder="Enter person's name"
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
              <span className="font-medium">Favor Type:</span> TB_HYBRID
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Asker:</span> {askerName}
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-3">
                {askerName} → Other Person
              </h4>
              <FavorResults results={leftColumnFavors} setResults={(updatedFavors) => {
                const newResults = [...updatedFavors, ...rightColumnFavors];
                setResults(newResults);
              }} />
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-3">
                Other Person → {askerName}
              </h4>
              <FavorResults results={rightColumnFavors} setResults={(updatedFavors) => {
                const newResults = [...leftColumnFavors, ...updatedFavors];
                setResults(newResults);
              }} />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
