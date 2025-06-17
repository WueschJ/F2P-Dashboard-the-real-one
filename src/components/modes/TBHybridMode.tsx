
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FavorResults } from '@/components/FavorResults';
import { Favor } from '@/types/favor';

export const TBHybridMode: React.FC = () => {
  const [askerName, setAskerName] = useState('');
  const [secondPerson, setSecondPerson] = useState('');
  const [results, setResults] = useState<Favor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunRecommendation = async () => {
    if (!askerName.trim() || !secondPerson.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const mockResults: Favor[] = [
        {
          id: '1',
          title: 'Facilitate a hybrid collaboration combining mentorship and partnership opportunities.',
          justification: 'Your unique position allows you to create value for both parties through a combination of knowledge transfer and strategic partnership facilitation.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: '2',
          title: 'Create a mixed-format engagement combining advisory services with networking opportunities.',
          justification: 'Your diverse network and advisory experience enable you to provide multifaceted value through both direct guidance and strategic connections.',
          isExpanded: false,
          isMailHighlighted: false
        }
      ];
      setResults(mockResults);
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
          />
        </div>

        <Button 
          onClick={handleRunRecommendation}
          disabled={!askerName.trim() || !secondPerson.trim() || isLoading}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2"
        >
          {isLoading ? 'Processing...' : 'Run F2P Recommendation'}
        </Button>
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
