
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FavorResults } from '@/components/FavorResults';
import { Favor } from '@/types/favor';

export const TB2Mode: React.FC = () => {
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
          title: 'Organize a knowledge sharing session between two technical teams on best practices.',
          justification: 'Your ability to facilitate cross-team collaboration and technical knowledge transfer makes you ideal for organizing this type of learning exchange.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: '2',
          title: 'Coordinate a joint technical workshop on emerging technologies and industry trends.',
          justification: 'Your understanding of both parties\' technical interests and your event coordination skills position you well to create valuable learning opportunities.',
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
              <span className="font-medium">Favor Type:</span> TB2
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
