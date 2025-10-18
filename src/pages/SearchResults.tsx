import React, { useEffect, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowRight, Search, FileText, Building } from 'lucide-react';
import { SOLUTIONS, INDUSTRIES, PricingTiers, Services, LEGAL } from '../utils/constants';

interface SearchResult {
  type: 'solution' | 'industry';
  title: string;
  description: string;
  path: string;
}

const SearchResults: React.FC = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q')?.toLowerCase() || '';
  const [results, setResults] = useState<SearchResult[]>([]);

  useEffect(() => {
    document.title = `Search Results for "${query}" - ReadyAI`;

    const searchResults: SearchResult[] = [
      ...SOLUTIONS.map(solution => ({
        type: 'solution' as const,
        title: solution.title,
        description: solution.description,
        path: `/solutions/${solution.id}`,
      })),
      ...INDUSTRIES.map(industry => ({
        type: 'industry' as const,
        title: industry.name,
        description: industry.description,
        path: `/industry/${industry.id}`,
      })),
      ...PricingTiers.map(tier => ({
        type: 'solution' as const,
        title: tier.name,
        description: `${tier.features.join(', ') + tier.keywords}`,
        path: '/pricing',
      })),
      ...Services.map(service => ({
        type: 'solution' as const,
        title: service.name,
        description: service.name,
        path: '/pricing',
      })),
      ...LEGAL.map(legal => ({
        type: 'solution' as const,
        title: legal.title,
        description: legal.description,
        path: `/legal/${legal.id}`,
      }))
    ].filter(result =>
      result.title.toLowerCase().includes(query) ||
      result.description.toLowerCase().includes(query)
    );

    setResults(searchResults);
  }, [query]);

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="relative bg-gradient-to-br from-primary via-primary-light to-primary-dark overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-20 w-96 h-96 bg-accent rounded-full blur-3xl"></div>
        </div>
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20">
          <div className="max-w-3xl">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center backdrop-blur-sm">
                <Search className="h-6 w-6 text-white" />
              </div>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-normal text-white">
                Search Results
              </h1>
            </div>
            <p className="font-sans text-lg md:text-xl text-white/90 leading-relaxed ml-16">
              Found <span className="font-semibold">{results.length}</span> {results.length === 1 ? 'result' : 'results'} for <span className="font-semibold">"{query}"</span>
            </p>
          </div>
        </div>
      </div>

      {/* Results Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {results.length > 0 ? (
          <div className="space-y-4">
            {results.map((result, index) => (
              <Link
                key={index}
                to={result.path}
                className="block group"
              >
                <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 hover:shadow-md hover:border-accent/30 transition-all">
                  <div className="flex justify-between items-start gap-4">
                    <div className="flex items-start gap-4 flex-1">
                      <div className="w-10 h-10 bg-gradient-to-br from-accent/10 to-accent/5 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
                        {result.type === 'solution' ? (
                          <FileText className="w-5 h-5 text-accent" />
                        ) : (
                          <Building className="w-5 h-5 text-accent" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="inline-flex items-center px-2.5 py-0.5 rounded-md text-xs font-medium bg-accent/10 text-accent">
                            {result.type === 'solution' ? 'Solution' : 'Industry'}
                          </span>
                        </div>
                        <h2 className="font-heading text-xl font-medium text-primary group-hover:text-accent mb-2 transition-colors">
                          {result.title}
                        </h2>
                        <p className="font-sans text-gray-600 leading-relaxed line-clamp-2">
                          {result.description}
                        </p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 text-accent flex-shrink-0 mt-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-md border border-gray-100 p-12">
            <div className="text-center max-w-2xl mx-auto">
              <div className="w-16 h-16 bg-gradient-to-br from-accent/10 to-accent/5 rounded-2xl flex items-center justify-center mx-auto mb-6">
                <Search className="h-8 w-8 text-accent" />
              </div>
              <h2 className="font-heading text-2xl md:text-3xl font-medium text-primary mb-4">
                No Results Found
              </h2>
              <p className="font-sans text-lg text-gray-600 mb-8 leading-relaxed">
                We couldn't find any matches for "{query}". Try adjusting your search terms or explore our solutions and industries directly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/solutions">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-accent text-white rounded-lg font-sans font-semibold hover:bg-accent-dark transition-colors shadow-md hover:shadow-lg">
                    Browse Solutions
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
                <Link to="/industry">
                  <button className="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary border-2 border-gray-200 rounded-lg font-sans font-semibold hover:border-accent transition-colors">
                    Browse Industries
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;