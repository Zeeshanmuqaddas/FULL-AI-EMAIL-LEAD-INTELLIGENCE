import { motion } from "motion/react";
import { Send, Loader2 } from "lucide-react";

interface EmailInputProps {
  email: string;
  setEmail: (val: string) => void;
  onSubmit: () => void;
  isLoading: boolean;
}

export function EmailInput({ email, setEmail, onSubmit, isLoading }: EmailInputProps) {
  return (
    <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
      <h2 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-4">
        Input Raw Email
      </h2>
      <div className="relative">
        <textarea
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Paste the raw email content here (including subject, headers, signature, etc.)..."
          className="w-full min-h-[300px] p-4 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-500 transition-all resize-y font-mono text-sm text-gray-700 disabled:opacity-50"
          disabled={isLoading}
        />
        
        <div className="mt-4 flex justify-end">
          <button
            onClick={onSubmit}
            disabled={!email.trim() || isLoading}
            className="flex items-center gap-2 px-6 py-3 bg-indigo-600 hover:bg-indigo-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white font-medium rounded-xl transition-colors shadow-sm"
          >
            {isLoading ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin" />
                Analyzing...
              </>
            ) : (
              <>
                <Send className="w-5 h-5" />
                Extract Intelligence
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
