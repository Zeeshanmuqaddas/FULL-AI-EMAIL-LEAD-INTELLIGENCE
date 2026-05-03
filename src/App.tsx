import { useState } from "react";
import { EmailInput } from "./components/EmailInput";
import { Dashboard } from "./components/Dashboard";
import { analyzeEmail, type LeadIntelligence } from "./lib/gemini";
import { Search, Loader2 } from "lucide-react";

export default function App() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<LeadIntelligence | null>(null);

  const handleAnalyze = async () => {
    if (!email.trim()) return;
    
    setIsLoading(true);
    setError(null);
    setResult(null);

    try {
      const data = await analyzeEmail(email);
      setResult(data);
    } catch (err) {
      console.error(err);
      setError(err instanceof Error ? err.message : "An unexpected error occurred while analyzing the email.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center gap-3">
          <div className="bg-indigo-600 p-2 rounded-lg text-white">
            <Search className="w-5 h-5" />
          </div>
          <div>
            <h1 className="font-bold text-gray-900 leading-none">Lead Intelligence Agent</h1>
            <p className="text-xs text-gray-500 font-medium">B2B Uniforms & Garments</p>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Input */}
          <div className="lg:col-span-5 space-y-4">
            <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-4 text-sm text-indigo-800">
              <p>Paste a customer email below. The AI Agent will read the email, determine if it's a valid B2B lead, score it, and extract key order intelligence based on your manufacturing parameters.</p>
            </div>
            
            <EmailInput 
              email={email} 
              setEmail={setEmail} 
              onSubmit={handleAnalyze} 
              isLoading={isLoading} 
            />

            {error && (
              <div className="p-4 bg-red-50 border border-red-100 rounded-xl text-red-600 text-sm">
                <strong>Error:</strong> {error}
              </div>
            )}
          </div>

          {/* Right Column: Output / Dashboard */}
          <div className="lg:col-span-7">
            {!result && !isLoading && (
              <div className="h-full min-h-[400px] border-2 border-dashed border-gray-200 rounded-2xl flex flex-col items-center justify-center p-8 text-center text-gray-400 bg-gray-50/50">
                <Search className="w-12 h-12 mb-4 text-gray-300" />
                <h3 className="text-lg font-medium text-gray-500 mb-2">Awaiting Email Data</h3>
                <p className="text-sm max-w-sm">Submit an email on the left to generate a structured lead intelligence report.</p>
              </div>
            )}

            {isLoading && (
              <div className="h-full min-h-[400px] border-2 border-dashed border-indigo-100 rounded-2xl flex flex-col items-center justify-center p-8 text-center bg-indigo-50/30">
                <Loader2 className="w-10 h-10 animate-spin text-indigo-500 mb-4" />
                <h3 className="text-base font-medium text-indigo-800">Analyzing lead potential...</h3>
                <p className="text-sm text-indigo-600/70 mt-1">Extracting quantities, sentiment, and urgency</p>
              </div>
            )}

            {result && !isLoading && (
              <Dashboard data={result} />
            )}
          </div>

        </div>
      </main>
    </div>
  );
}
