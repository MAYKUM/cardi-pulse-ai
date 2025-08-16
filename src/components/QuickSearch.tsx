import React, { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Search, User, FileText, Calendar, Filter, Clock, TrendingUp, MapPin } from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'patient' | 'appointment' | 'document' | 'imaging' | 'lab';
  title: string;
  subtitle: string;
  metadata: string;
  relevance: number;
  timestamp: string;
}

export const QuickSearch: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const mockResults: SearchResult[] = [
    {
      id: '1',
      type: 'patient',
      title: 'John Carter',
      subtitle: 'Age 58, Male',
      metadata: 'MRN: 12345 • Last visit: 2024-01-15',
      relevance: 95,
      timestamp: '2024-01-15T10:30:00Z'
    },
    {
      id: '2',
      type: 'document',
      title: 'Echocardiogram Report',
      subtitle: 'John Carter - Cardiology',
      metadata: 'PDF • 2.3 MB • Dr. Smith',
      relevance: 88,
      timestamp: '2024-01-14T14:20:00Z'
    },
    {
      id: '3',
      type: 'appointment',
      title: 'Follow-up Consultation',
      subtitle: 'Maria Lopez - Cardiology',
      metadata: 'Today 2:30 PM • Room 205',
      relevance: 82,
      timestamp: '2024-01-15T14:30:00Z'
    },
    {
      id: '4',
      type: 'lab',
      title: 'Lipid Panel Results',
      subtitle: 'Ahmed Khan - Lab Results',
      metadata: 'Completed • Abnormal values detected',
      relevance: 76,
      timestamp: '2024-01-15T09:15:00Z'
    },
    {
      id: '5',
      type: 'imaging',
      title: 'Chest X-Ray',
      subtitle: 'Sophia Rossi - Radiology',
      metadata: 'DICOM • 15.8 MB • Pending review',
      relevance: 70,
      timestamp: '2024-01-14T16:45:00Z'
    }
  ];

  const searchFilters = [
    { id: 'patient', name: 'Patients', icon: User, color: 'bg-blue-100 text-blue-800' },
    { id: 'appointment', name: 'Appointments', icon: Calendar, color: 'bg-green-100 text-green-800' },
    { id: 'document', name: 'Documents', icon: FileText, color: 'bg-purple-100 text-purple-800' },
    { id: 'imaging', name: 'Imaging', icon: MapPin, color: 'bg-orange-100 text-orange-800' },
    { id: 'lab', name: 'Lab Results', icon: TrendingUp, color: 'bg-red-100 text-red-800' }
  ];

  const recentSearches = [
    'John Carter ECG results',
    'Appointment today',
    'Lab results pending',
    'MRI brain protocol',
    'Diabetes patients'
  ];

  useEffect(() => {
    if (searchQuery.length > 2) {
      setIsSearching(true);
      
      // Simulate search delay
      const timer = setTimeout(() => {
        const filteredResults = mockResults.filter(result => {
          const matchesQuery = result.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               result.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
                               result.metadata.toLowerCase().includes(searchQuery.toLowerCase());
          
          const matchesFilter = selectedFilters.length === 0 || selectedFilters.includes(result.type);
          
          return matchesQuery && matchesFilter;
        });
        
        setResults(filteredResults);
        setIsSearching(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setResults([]);
      setIsSearching(false);
    }
  }, [searchQuery, selectedFilters]);

  const toggleFilter = (filterId: string) => {
    setSelectedFilters(prev => 
      prev.includes(filterId)
        ? prev.filter(id => id !== filterId)
        : [...prev, filterId]
    );
  };

  const getTypeIcon = (type: string) => {
    const filter = searchFilters.find(f => f.id === type);
    return filter?.icon || FileText;
  };

  const getTypeColor = (type: string) => {
    const filter = searchFilters.find(f => f.id === type);
    return filter?.color || 'bg-gray-100 text-gray-800';
  };

  const handleQuickSearch = (query: string) => {
    setSearchQuery(query);
    searchInputRef.current?.focus();
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Quick Search</h1>
          <p className="text-muted-foreground">Find patients, appointments, documents, and more</p>
        </div>
        <div className="text-sm text-muted-foreground">
          {results.length > 0 && `${results.length} results found`}
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className="flex items-center gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                ref={searchInputRef}
                placeholder="Search patients, appointments, documents..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 h-12"
              />
            </div>
            <Popover>
              <PopoverTrigger asChild>
                <Button variant="outline" size="lg">
                  <Filter className="mr-2 h-4 w-4" />
                  Filters
                  {selectedFilters.length > 0 && (
                    <Badge variant="secondary" className="ml-2">
                      {selectedFilters.length}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-56">
                <div className="space-y-2">
                  <h4 className="font-medium text-sm">Filter by type</h4>
                  {searchFilters.map((filter) => {
                    const Icon = filter.icon;
                    return (
                      <div key={filter.id} className="flex items-center space-x-2">
                        <input
                          type="checkbox"
                          id={filter.id}
                          checked={selectedFilters.includes(filter.id)}
                          onChange={() => toggleFilter(filter.id)}
                          className="rounded"
                        />
                        <label
                          htmlFor={filter.id}
                          className="text-sm flex items-center gap-2 cursor-pointer"
                        >
                          <Icon className="h-4 w-4" />
                          {filter.name}
                        </label>
                      </div>
                    );
                  })}
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </CardHeader>
      </Card>

      <Tabs defaultValue="results" className="space-y-6">
        <TabsList>
          <TabsTrigger value="results">Search Results</TabsTrigger>
          <TabsTrigger value="recent">Recent Searches</TabsTrigger>
          <TabsTrigger value="saved">Saved Searches</TabsTrigger>
        </TabsList>

        <TabsContent value="results" className="space-y-4">
          {isSearching ? (
            <Card>
              <CardContent className="p-8">
                <div className="flex items-center justify-center">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <span className="ml-2 text-muted-foreground">Searching...</span>
                </div>
              </CardContent>
            </Card>
          ) : searchQuery.length <= 2 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">Start typing to search</h3>
                <p className="text-muted-foreground">Enter at least 3 characters to begin searching</p>
              </CardContent>
            </Card>
          ) : results.length === 0 ? (
            <Card>
              <CardContent className="p-8 text-center">
                <Search className="h-12 w-12 mx-auto mb-4 text-muted-foreground opacity-50" />
                <h3 className="text-lg font-medium mb-2">No results found</h3>
                <p className="text-muted-foreground">Try adjusting your search terms or filters</p>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-3">
              {results.map((result) => {
                const Icon = getTypeIcon(result.type);
                
                return (
                  <Card key={result.id} className="hover:bg-muted/50 cursor-pointer transition-colors">
                    <CardContent className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-lg">
                          <Icon className="h-5 w-5 text-primary" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium truncate">{result.title}</h3>
                            <Badge className={getTypeColor(result.type)}>
                              {result.type}
                            </Badge>
                            <div className="text-xs text-muted-foreground">
                              {Math.round(result.relevance)}% match
                            </div>
                          </div>
                          <p className="text-sm text-muted-foreground truncate">{result.subtitle}</p>
                          <p className="text-xs text-muted-foreground">{result.metadata}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="text-xs text-muted-foreground">
                            {new Date(result.timestamp).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </TabsContent>

        <TabsContent value="recent" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Searches</CardTitle>
              <CardDescription>Your recent search queries</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {recentSearches.map((search, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-between p-2 hover:bg-muted rounded-lg cursor-pointer"
                    onClick={() => handleQuickSearch(search)}
                  >
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{search}</span>
                    </div>
                    <Button size="sm" variant="ghost">
                      <Search className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="saved" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Saved Searches</CardTitle>
              <CardDescription>Bookmark frequently used searches</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center py-8 text-muted-foreground">
                <Search className="h-12 w-12 mx-auto mb-4 opacity-50" />
                <p>No saved searches yet</p>
                <p className="text-sm">Save searches you use frequently for quick access</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};