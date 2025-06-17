
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { HistorySidebar } from '@/components/HistorySidebar';
import { FavorResults } from '@/components/FavorResults';
import { PB1Mode } from '@/components/modes/PB1Mode';
import { PB2Mode } from '@/components/modes/PB2Mode';
import { TB1Mode } from '@/components/modes/TB1Mode';
import { TB2Mode } from '@/components/modes/TB2Mode';
import { TBHybridMode } from '@/components/modes/TBHybridMode';

const Index = () => {
  const [selectedMode, setSelectedMode] = useState<string>('');
  const [isHistoryOpen, setIsHistoryOpen] = useState(true);

  const renderModeComponent = () => {
    switch (selectedMode) {
      case 'PB1':
        return <PB1Mode />;
      case 'PB2':
        return <PB2Mode />;
      case 'TB1':
        return <TB1Mode />;
      case 'TB2':
        return <TB2Mode />;
      case 'TB_HYBRID':
        return <TBHybridMode />;
      default:
        return (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Please select an approach to get started</p>
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex w-full">
      <HistorySidebar isOpen={isHistoryOpen} onToggle={() => setIsHistoryOpen(!isHistoryOpen)} />
      
      <div className={`flex-1 transition-all duration-300 ${isHistoryOpen ? 'ml-64' : 'ml-0'}`}>
        <div className="p-6 max-w-4xl mx-auto">
          <Card className="bg-white shadow-sm">
            <CardHeader>
              <CardTitle className="text-2xl font-semibold text-gray-900">
                Recommend Favor to People
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="approach" className="text-sm font-medium text-gray-700">
                  Approach
                </Label>
                <Select value={selectedMode} onValueChange={setSelectedMode}>
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
        </div>
      </div>
    </div>
  );
};

export default Index;
