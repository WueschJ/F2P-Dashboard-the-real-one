
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FavorResults } from '@/components/FavorResults';
import { Favor } from '@/types/favor';
import { HistoryItem } from '@/types/history';

interface TB2ModeProps {
  onAddToHistory: (item: HistoryItem) => void;
  selectedHistoryItem: HistoryItem | null;
}

export const TB2Mode: React.FC<TB2ModeProps> = ({ onAddToHistory, selectedHistoryItem }) => {
  const [askerName, setAskerName] = useState('');
  const [secondPerson, setSecondPerson] = useState('');
  const [results, setResults] = useState<Favor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Random names for display
  const randomNames = [
    "Stephan Peters", "Matthew Wild", "Maria Soprano",
    "Jennifer Davis", "Michael Chen", "Sarah Johnson"
  ];

  useEffect(() => {
    if (selectedHistoryItem && selectedHistoryItem.mode === 'TB2') {
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
        // Favors for asker to provide to second person
        {
          id: `tb2-${Date.now()}-1`,
          title: 'Organize a knowledge sharing session between two technical teams on best practices.',
          justification: 'Your ability to facilitate cross-team collaboration and technical knowledge transfer makes you ideal for organizing this type of learning exchange.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `tb2-${Date.now()}-2`,
          title: 'Coordinate a joint technical workshop on emerging technologies and industry trends.',
          justification: 'Your understanding of both parties\' technical interests and your event coordination skills position you well to create valuable learning opportunities.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `tb2-${Date.now()}-3`,
          title: 'Facilitate a collaborative code review session between different development teams.',
          justification: 'Your technical expertise and diplomatic skills make you perfect for fostering productive cross-team code collaboration and learning.',
          isExpanded: false,
          isMailHighlighted: false
        },
        // Favors for second person to provide to asker
        {
          id: `tb2-${Date.now()}-4`,
          title: 'Provide technical mentorship and advanced development guidance.',
          justification: 'The second person\'s expertise in advanced technical concepts can significantly accelerate your professional development and project capabilities.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `tb2-${Date.now()}-5`,
          title: 'Share insights on technical architecture and system design best practices.',
          justification: 'Their experience with complex system architectures can provide valuable guidance for your current and future technical challenges.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: `tb2-${Date.now()}-6`,
          title: 'Offer access to specialized tools and technical resources from their expertise.',
          justification: 'Their knowledge of specialized development tools and resources can enhance your technical toolkit and improve project efficiency.',
          isExpanded: false,
          isMailHighlighted: false
        }
      ];
      
      setResults(newFavors);
      
      // Add to history
      const historyItem: HistoryItem = {
        id: `tb2-${Date.now()}`,
        mode: 'TB2',
        asker: askerName,
        secondPerson: secondPerson,
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
              <span className="font-medium">Favor Type:</span> TB2
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Asker:</span> {askerName}
            </p>
            <p className="text-sm text-gray-600">
              <span className="font-medium">Second Person:</span> {secondPerson}
            </p>
            
            <div className="mt-3 grid grid-cols-1 lg:grid-cols-2 gap-4">
              <div>
                <p className="text-xs font-medium text-gray-700 mb-1">{askerName} → {secondPerson}:</p>
                <div className="space-y-1">
                  {randomNames.slice(0, 3).map((name, index) => (
                    <p key={index} className="text-xs text-gray-600">
                      {index + 1}. {name}
                    </p>
                  ))}
                </div>
              </div>
              
              <div>
                <p className="text-xs font-medium text-gray-700 mb-1">{secondPerson} → {askerName}:</p>
                <div className="space-y-1">
                  {randomNames.slice(3, 6).map((name, index) => (
                    <p key={index} className="text-xs text-gray-600">
                      {index + 1}. {name}
                    </p>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-3">
                {askerName} → {secondPerson}
              </h4>
              <FavorResults results={leftColumnFavors} setResults={(updatedFavors) => {
                const newResults = [...updatedFavors, ...rightColumnFavors];
                setResults(newResults);
              }} />
            </div>
            
            <div>
              <h4 className="text-lg font-medium text-gray-800 mb-3">
                {secondPerson} → {askerName}
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
