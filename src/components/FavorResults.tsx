
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { Favor } from '@/types/favor';

interface FavorResultsProps {
  results: Favor[];
  setResults: (results: Favor[]) => void;
}

export const FavorResults: React.FC<FavorResultsProps> = ({ results, setResults }) => {
  const toggleExpand = (id: string) => {
    setResults(results.map(favor => 
      favor.id === id ? { ...favor, isExpanded: !favor.isExpanded } : favor
    ));
  };

  const toggleMail = (id: string) => {
    setResults(results.map(favor => 
      favor.id === id ? { ...favor, isMailHighlighted: !favor.isMailHighlighted } : favor
    ));
  };

  const removeFavor = (id: string) => {
    setResults(results.filter(favor => favor.id !== id));
  };

  return (
    <div className="space-y-4">
      {results.map((favor, index) => (
        <Card key={favor.id} className="border border-gray-200 hover:shadow-md transition-shadow">
          <CardContent className="p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div 
                  className="flex items-center cursor-pointer" 
                  onClick={() => toggleExpand(favor.id)}
                >
                  <span className="text-sm font-medium text-blue-600 mr-2">
                    Favor #{index + 1}:
                  </span>
                  <h4 className="text-sm text-gray-900 flex-1 leading-relaxed">
                    {favor.title}
                  </h4>
                  {favor.isExpanded ? (
                    <ChevronUp className="w-4 h-4 text-gray-400 ml-2" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-gray-400 ml-2" />
                  )}
                </div>
                
                {favor.isExpanded && (
                  <div className="mt-3 p-3 bg-gray-50 rounded-md">
                    <p className="text-sm text-gray-700 leading-relaxed">
                      {favor.justification}
                    </p>
                  </div>
                )}
              </div>
              
              <div className="flex items-center ml-4 space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => toggleMail(favor.id)}
                  className={`p-2 transition-colors ${
                    favor.isMailHighlighted 
                      ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                      : 'text-gray-400 hover:text-gray-600'
                  }`}
                >
                  <svg 
                    width="16" 
                    height="16" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="2" 
                    strokeLinecap="round" 
                    strokeLinejoin="round"
                  >
                    <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/>
                    <polyline points="22,6 12,13 2,6"/>
                  </svg>
                </Button>
                
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removeFavor(favor.id)}
                  className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
