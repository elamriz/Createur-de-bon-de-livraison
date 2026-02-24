import React from 'react';
import { DeliveryNote, InvoiceItem } from '../types';
import { Plus, Trash2, Image as ImageIcon } from 'lucide-react';

interface Props {
  data: DeliveryNote;
  onChange: (data: DeliveryNote) => void;
}

export const InvoiceForm: React.FC<Props> = ({ data, onChange }) => {
  const handleChange = (path: string, value: any) => {
    const newData = { ...data };
    const parts = path.split('.');
    let current: any = newData;
    for (let i = 0; i < parts.length - 1; i++) {
      current = current[parts[i]];
    }
    current[parts[parts.length - 1]] = value;
    onChange(newData);
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: Math.random().toString(36).substr(2, 9),
      description: '',
      quantity: 1,
      unitPrice: 0,
    };
    onChange({ ...data, items: [...data.items, newItem] });
  };

  const removeItem = (id: string) => {
    onChange({ ...data, items: data.items.filter((item) => item.id !== id) });
  };

  const updateItem = (id: string, field: keyof InvoiceItem, value: any) => {
    const newItems = data.items.map((item) =>
      item.id === id ? { ...item, [field]: value } : item
    );
    onChange({ ...data, items: newItems });
  };

  return (
    <div className="space-y-8 pb-20">
      {/* Document Info */}
      <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
          Informations du Document
        </h3>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Numéro de Bon</label>
            <input
              type="text"
              value={data.number}
              onChange={(e) => handleChange('number', e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Date</label>
            <input
              type="date"
              value={data.date}
              onChange={(e) => handleChange('date', e.target.value)}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            />
          </div>
        </div>
      </section>

      {/* Company Info */}
      <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
          Votre Entreprise
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 uppercase mb-1 border-dashed border-b border-zinc-200 pb-1">Logo URL</label>
            <div className="flex gap-2">
              <input
                type="text"
                value={data.company.logo || ''}
                onChange={(e) => handleChange('company.logo', e.target.value)}
                placeholder="https://..."
                className="flex-1 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
              <div className="w-10 h-10 bg-zinc-100 rounded-lg flex items-center justify-center border border-zinc-200">
                <ImageIcon size={18} className="text-zinc-400" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Nom</label>
              <input
                type="text"
                value={data.company.name}
                onChange={(e) => handleChange('company.name', e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Adresse</label>
              <textarea
                value={data.company.address}
                onChange={(e) => handleChange('company.address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">N° TVA</label>
              <input
                type="text"
                value={data.company.vat}
                onChange={(e) => handleChange('company.vat', e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Client Info */}
      <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
          Destinataire
        </h3>
        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2">
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Nom / Entreprise</label>
              <input
                type="text"
                value={data.client.name}
                onChange={(e) => handleChange('client.name', e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Adresse</label>
              <textarea
                value={data.client.address}
                onChange={(e) => handleChange('client.address', e.target.value)}
                rows={3}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">N° TVA</label>
              <input
                type="text"
                value={data.client.vat}
                onChange={(e) => handleChange('client.vat', e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Contact</label>
              <input
                type="text"
                value={data.client.contactPerson}
                onChange={(e) => handleChange('client.contactPerson', e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div className="col-span-2">
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Téléphone / E-mail</label>
              <input
                type="text"
                value={data.client.phoneEmail}
                onChange={(e) => handleChange('client.phoneEmail', e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Items */}
      <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
            Marchandises
          </h3>
          <button
            onClick={addItem}
            className="flex items-center gap-1 text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
          >
            <Plus size={16} /> Ajouter un article
          </button>
        </div>
        <div className="space-y-4">
          {data.items.map((item) => (
            <div key={item.id} className="p-4 bg-zinc-50 rounded-xl border border-zinc-200 relative group">
              <button
                onClick={() => removeItem(item.id)}
                className="absolute -right-2 -top-2 w-8 h-8 bg-white border border-zinc-200 rounded-full flex items-center justify-center text-zinc-400 hover:text-red-500 hover:border-red-200 shadow-sm transition-all opacity-0 group-hover:opacity-100"
              >
                <Trash2 size={14} />
              </button>
              <div className="grid grid-cols-12 gap-3">
                <div className="col-span-6">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Description</label>
                  <input
                    type="text"
                    value={item.description}
                    onChange={(e) => updateItem(item.id, 'description', e.target.value)}
                    className="w-full px-2 py-1.5 bg-white border border-zinc-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Quantité</label>
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateItem(item.id, 'quantity', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-white border border-zinc-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
                <div className="col-span-4">
                  <label className="block text-[10px] font-bold text-zinc-400 uppercase mb-1">Prix Unitaire (€)</label>
                  <input
                    type="number"
                    step="0.01"
                    value={item.unitPrice}
                    onChange={(e) => updateItem(item.id, 'unitPrice', parseFloat(e.target.value) || 0)}
                    className="w-full px-2 py-1.5 bg-white border border-zinc-200 rounded focus:ring-2 focus:ring-blue-500 outline-none text-sm"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-6 pt-6 border-t border-zinc-100">
          <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Taux TVA (%)</label>
          <input
            type="number"
            value={data.vatRate}
            onChange={(e) => handleChange('vatRate', parseFloat(e.target.value) || 0)}
            className="w-24 px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>
      </section>

      {/* Observations & Delivery Person */}
      <section className="bg-white p-6 rounded-2xl border border-zinc-200 shadow-sm">
        <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
          <span className="w-1 h-6 bg-blue-600 rounded-full"></span>
          Détails de Livraison
        </h3>
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Observations</label>
            <textarea
              value={data.observations}
              onChange={(e) => handleChange('observations', e.target.value)}
              rows={2}
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none resize-none"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Nom du Livreur</label>
              <input
                type="text"
                value={data.deliveryPerson.name}
                onChange={(e) => handleChange('deliveryPerson.name', e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
            <div>
              <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">TVA / Employeur Livreur</label>
              <input
                type="text"
                value={data.deliveryPerson.vatEmployer}
                onChange={(e) => handleChange('deliveryPerson.vatEmployer', e.target.value)}
                className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
              />
            </div>
          </div>
          <div>
            <label className="block text-xs font-medium text-zinc-500 uppercase mb-1">Date et Heure de Livraison</label>
            <input
              type="text"
              value={data.deliveryDateTime}
              onChange={(e) => handleChange('deliveryDateTime', e.target.value)}
              placeholder="Ex: 13/08/2025 à 19:39"
              className="w-full px-3 py-2 bg-zinc-50 border border-zinc-200 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>
      </section>
    </div>
  );
};
