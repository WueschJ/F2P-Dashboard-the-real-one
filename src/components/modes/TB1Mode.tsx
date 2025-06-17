
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { FavorResults } from '@/components/FavorResults';
import { Favor } from '@/types/favor';

export const TB1Mode: React.FC = () => {
  const [askerName, setAskerName] = useState('');
  const [results, setResults] = useState<Favor[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleRunRecommendation = async () => {
    if (!askerName.trim()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      const mockResults: Favor[] = [
        {
          id: '1',
          title: 'Provide mentorship for junior developers transitioning to senior roles in tech companies.',
          justification: 'Your technical leadership experience and successful career progression makes you an excellent mentor for developers looking to advance their careers.',
          isExpanded: false,
          isMailHighlighted: false
        },
        {
          id: '2',
          title: 'Share insights on building resilient engineering teams in high-growth environments.',
          justification: 'Your experience scaling engineering teams and implementing best practices positions you well to help others facing similar organizational challenges.',
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
            placeholder="Enter a name"
            value={askerName}
            onChange={(e) => setAskerName(e.target.value)}
            className="w-full"
          />
        </div>

        <Button 
          onClick={handleRunRecommendation}
          disabled={!askerName.trim() || isLoading}
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
              <span className="font-medium">Favor Type:</span> TB1
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
