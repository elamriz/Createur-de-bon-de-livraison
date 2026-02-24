import React, { useState, useRef } from 'react';
import { DeliveryNote } from './types';
import { InvoiceForm } from './components/InvoiceForm';
import { InvoicePreview } from './components/InvoicePreview';
import { Download, FileText, Settings, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import jsPDF from 'jspdf';
import { toJpeg } from 'html-to-image';

const INITIAL_DATA: DeliveryNote = {
  number: 'BL-2025-001',
  date: new Date().toISOString().split('T')[0],
  company: {
    name: 'Hind Pâtiss SRL',
    address: 'Rue du Korenbeek 81A\n1080 Bruxelles',
    vat: 'BE0792.992.420',
    logo: 'https://picsum.photos/seed/bakery/200/200',
  },
  client: {
    name: 'Centre médical Mettewie',
    address: 'Bd Louis Mettewie 37, 1080 Molenbeek-Saint-Jean',
    vat: 'BE0425260272',
    contactPerson: 'Secretariat',
    phoneEmail: '02 610 15 00',
  },
  items: [
    {
      id: '1',
      description: 'Assortiment pâtisseries orientales (boîte 500 g)',
      quantity: 1,
      unitPrice: 15.99,
    },
  ],
  vatRate: 6,
  observations: 'Livraison effectuée sans anomalie.',
  deliveryPerson: {
    name: 'Zakariyae El Amri',
    vatEmployer: 'BE0745539822',
  },
  deliveryDateTime: new Date().toLocaleString('fr-FR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).replace(',', ' à'),
};

export default function App() {
  const [data, setData] = useState<DeliveryNote>(INITIAL_DATA);
  const [activeTab, setActiveTab] = useState<'edit' | 'preview'>('edit');
  const [isGenerating, setIsGenerating] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);

  const generatePDF = async () => {
    if (!previewRef.current) return;
    setIsGenerating(true);
    
    try {
      // Use html-to-image which is more stable in restricted environments
      const imgData = await toJpeg(previewRef.current, {
        quality: 0.95,
        pixelRatio: 2,
        backgroundColor: '#ffffff',
      });
      
      const pdf = new jsPDF('p', 'mm', 'a4');
      const pdfWidth = pdf.internal.pageSize.getWidth();
      
      // Create a temporary image to get dimensions safely
      const img = new Image();
      await new Promise((resolve, reject) => {
        img.onload = resolve;
        img.onerror = reject;
        img.src = imgData;
      });

      const imgWidth = img.width || 1;
      const imgHeight = img.height || 1;
      const pdfHeight = (imgHeight * pdfWidth) / imgWidth;
      
      // Ensure pdfHeight is a valid number
      const finalHeight = isFinite(pdfHeight) ? pdfHeight : 297;

      pdf.addImage(imgData, 'JPEG', 0, 0, pdfWidth, finalHeight);
      pdf.save(`Bon_Livraison_${data.number}.pdf`);
    } catch (error) {
      console.error('Error generating PDF:', error);
      alert('Une erreur est survenue lors de la génération du PDF. Veuillez réessayer.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-50 flex flex-col">
      {/* Header */}
      <header className="bg-white border-b border-zinc-200 px-6 py-4 sticky top-0 z-30 shadow-sm">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
              <FileText size={22} />
            </div>
            <div>
              <h1 className="text-lg font-bold text-zinc-900 leading-none">Bon de Livraison</h1>
              <p className="text-xs text-zinc-500 mt-1">Générateur professionnel</p>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-zinc-100 p-1 rounded-xl">
            <button
              onClick={() => setActiveTab('edit')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'edit' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <Settings size={16} />
              Édition
            </button>
            <button
              onClick={() => setActiveTab('preview')}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeTab === 'preview' 
                  ? 'bg-white text-blue-600 shadow-sm' 
                  : 'text-zinc-500 hover:text-zinc-700'
              }`}
            >
              <Eye size={16} />
              Aperçu
            </button>
          </div>

          <button
            onClick={generatePDF}
            disabled={isGenerating}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 text-white px-5 py-2.5 rounded-xl font-semibold transition-all shadow-lg shadow-blue-100 active:scale-95"
          >
            {isGenerating ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
              <Download size={18} />
            )}
            {isGenerating ? 'Génération...' : 'Télécharger PDF'}
          </button>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Column: Form (Visible on mobile/tablet when 'edit' is active, or always on desktop) */}
        <div className={`lg:col-span-5 ${activeTab === 'preview' ? 'hidden lg:block' : 'block'}`}>
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-900">Configuration</h2>
              <div className="text-[10px] uppercase tracking-widest font-bold text-zinc-400 flex items-center gap-1">
                Auto-save <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></div>
              </div>
            </div>
            <InvoiceForm data={data} onChange={setData} />
          </div>
        </div>

        {/* Right Column: Preview */}
        <div className={`lg:col-span-7 ${activeTab === 'edit' ? 'hidden lg:block' : 'block'}`}>
          <div className="sticky top-24">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-bold text-zinc-900">Aperçu du document</h2>
              <div className="flex items-center gap-2 text-xs text-zinc-500">
                A4 Portrait <ChevronRight size={14} /> 210 x 297 mm
              </div>
            </div>
            
            <div className="overflow-auto max-h-[calc(100vh-180px)] rounded-2xl border border-zinc-200 bg-zinc-200/50 p-8 shadow-inner">
              <div className="origin-top scale-[0.6] sm:scale-[0.8] md:scale-100 transition-transform">
                <InvoicePreview data={data} previewRef={previewRef} />
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Mobile Floating Action Button */}
      <div className="lg:hidden fixed bottom-6 right-6 z-40">
        <button
          onClick={generatePDF}
          disabled={isGenerating}
          className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white shadow-2xl shadow-blue-400 active:scale-90 transition-transform"
        >
          {isGenerating ? (
            <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          ) : (
            <Download size={24} />
          )}
        </button>
      </div>
    </div>
  );
}
