import { motion } from "motion/react";
import { type LeadIntelligence } from "../lib/gemini";
import { 
  Building2, 
  User, 
  MapPin, 
  Mail, 
  Package, 
  Hash, 
  Clock, 
  Activity, 
  AlertTriangle, 
  CheckCircle2, 
  XCircle,
  ThumbsUp,
  Minus,
  ThumbsDown,
  Info
} from "lucide-react";

export function Dashboard({ data }: { data: LeadIntelligence }) {
  const getScoreColor = (score: number) => {
    if (score >= 70) return "text-emerald-500 bg-emerald-500/10 border-emerald-500/20";
    if (score >= 40) return "text-amber-500 bg-amber-500/10 border-amber-500/20";
    return "text-red-500 bg-red-500/10 border-red-500/20";
  };

  const getUrgencyColor = (urgency: string) => {
    const u = urgency.toLowerCase();
    if (u === "urgent") return "text-rose-500 bg-rose-500/10 border-rose-500/20";
    if (u === "normal") return "text-blue-500 bg-blue-500/10 border-blue-500/20";
    return "text-gray-500 bg-gray-500/10 border-gray-500/20";
  };

  const getSentimentIcon = (sentiment: string) => {
    const s = sentiment.toLowerCase();
    if (s === "positive") return <ThumbsUp className="w-4 h-4 text-emerald-500" />;
    if (s === "negative") return <ThumbsDown className="w-4 h-4 text-rose-500" />;
    return <Minus className="w-4 h-4 text-gray-400" />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="space-y-6"
    >
      {/* Top Banner: Status & Overview */}
      <div className="flex flex-col md:flex-row gap-4 justify-between items-start md:items-center bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
        <div className="flex items-center gap-4">
          <div className={`p-3 rounded-full ${data.is_lead ? "bg-emerald-100 text-emerald-600" : "bg-red-100 text-red-600"}`}>
            {data.is_lead ? <CheckCircle2 className="w-6 h-6" /> : <XCircle className="w-6 h-6" />}
          </div>
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              {data.is_lead ? "Valid Business Lead" : "Not a Lead"}
            </h2>
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm text-gray-500 font-mono uppercase tracking-wider">{data.inquiry_type.replace('_', ' ')}</span>
              <span className="w-1 h-1 rounded-full bg-gray-300"></span>
              <span className="flex items-center gap-1.5 text-sm text-gray-500 capitalize">
                {getSentimentIcon(data.sentiment)}
                {data.sentiment}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto">
          <div className={`px-4 py-2 rounded-lg border ${getScoreColor(data.lead_score)} flex flex-col items-center justify-center min-w-[100px]`}>
            <span className="text-xs font-bold uppercase tracking-wider opacity-80 mb-0.5">Lead Score</span>
            <span className="text-2xl font-black font-mono leading-none">{data.lead_score}</span>
          </div>
          
          <div className="flex flex-col gap-2">
            <span className={`px-3 py-1 rounded-full border text-xs font-semibold capitalize flex items-center gap-1.5 ${getUrgencyColor(data.urgency)}`}>
              <Clock className="w-3.5 h-3.5" />
              {data.urgency} Urgency
            </span>
            <span className={`px-3 py-1 rounded-full border text-xs font-semibold capitalize flex items-center gap-1.5 ${
                data.business_value.toLowerCase() === 'high' ? 'text-emerald-600 bg-emerald-50 border-emerald-100' : 
                data.business_value.toLowerCase() === 'medium' ? 'text-blue-600 bg-blue-50 border-blue-100' : 
                'text-gray-600 bg-gray-50 border-gray-200'
              }`}>
              <Activity className="w-3.5 h-3.5" />
              {data.business_value} Value
            </span>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Customer Details */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
            <User className="w-4 h-4" /> Customer Profile
          </h3>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400 mt-0.5"><User className="w-4 h-4" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-0.5">Contact Name</p>
                <p className="text-gray-900 font-medium">{data.customer.name}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400 mt-0.5"><Building2 className="w-4 h-4" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-0.5">Company</p>
                <p className="text-gray-900 font-medium">{data.customer.company}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400 mt-0.5"><MapPin className="w-4 h-4" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-0.5">Location</p>
                <p className="text-gray-900 font-medium">{data.customer.country}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-gray-50 rounded-lg text-gray-400 mt-0.5"><Mail className="w-4 h-4" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-0.5">Contact Info</p>
                <p className="text-gray-900 font-medium">{data.customer.contact}</p>
              </div>
            </div>
          </div>
        </div>

        {/* Order Details */}
        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm flex flex-col">
          <h3 className="text-sm font-bold uppercase tracking-wider text-gray-400 mb-6 flex items-center gap-2">
            <Package className="w-4 h-4" /> Order Details
          </h3>
          <div className="space-y-5">
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500 mt-0.5"><Package className="w-4 h-4" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-0.5">Product Category</p>
                <p className="text-gray-900 font-medium">{data.order_details.product}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500 mt-0.5"><Hash className="w-4 h-4" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-0.5">Quantity Indicated</p>
                <p className="text-gray-900 font-medium font-mono border-b border-indigo-100">{data.order_details.quantity}</p>
              </div>
            </div>
            <div className="flex items-start gap-3">
              <div className="p-2 bg-indigo-50 rounded-lg text-indigo-500 mt-0.5"><Clock className="w-4 h-4" /></div>
              <div>
                <p className="text-sm text-gray-500 font-medium mb-0.5">Timeline / Deadline</p>
                <p className="text-gray-900 font-medium">{data.order_details.timeline}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Summary & Action */}
      <div className="bg-slate-900 p-6 rounded-2xl text-white shadow-lg relative overflow-hidden">
        {/* Decorative background element */}
        <div className="absolute top-0 right-0 p-12 opacity-5 pointer-events-none">
          <Info className="w-64 h-64" />
        </div>
        
        <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">AI Executive Summary</h3>
            <p className="text-slate-200 leading-relaxed text-sm">
              {data.summary}
            </p>
          </div>
          <div className="border-t md:border-t-0 md:border-l border-slate-700/50 pt-6 md:pt-0 md:pl-8">
            <h3 className="text-xs font-bold uppercase tracking-wider text-emerald-400 mb-3 flex items-center gap-2">
              <AlertTriangle className="w-4 h-4" /> Recommended Action
            </h3>
            <p className="text-white font-medium text-lg leading-tight">
              {data.recommended_action}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
