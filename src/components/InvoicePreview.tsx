import React from 'react';
import { DeliveryNote } from '../types';

interface Props {
  data: DeliveryNote;
  previewRef: React.RefObject<HTMLDivElement | null>;
}

export const InvoicePreview: React.FC<Props> = ({ data, previewRef }) => {
  const subTotal = data.items.reduce((acc, item) => acc + (item.quantity * item.unitPrice), 0);
  const vatAmount = subTotal * (data.vatRate / 100);
  const totalTTC = subTotal + vatAmount;

  return (
    <div ref={previewRef} className="invoice-container font-sans text-[12px] leading-tight text-zinc-800">
      {/* Header */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex flex-col gap-2">
          {data.company.logo ? (
            <img src={data.company.logo} alt="Logo" className="w-32 h-32 object-contain" referrerPolicy="no-referrer" />
          ) : (
            <div className="w-32 h-32 bg-zinc-100 flex items-center justify-center border border-dashed border-zinc-300 rounded">
              <span className="text-zinc-400 text-[10px]">LOGO</span>
            </div>
          )}
          <div className="mt-2">
            <h2 className="font-bold text-zinc-900">{data.company.name}</h2>
            <p className="whitespace-pre-line">{data.company.address}</p>
            <p>TVA : {data.company.vat}</p>
          </div>
        </div>
        <div className="text-right">
          <h1 className="text-2xl font-bold text-zinc-900 mb-4 tracking-wider">BON DE LIVRAISON</h1>
          <div className="flex flex-col gap-1">
            <p><span className="text-zinc-500">Bon N° :</span> <span className="font-mono">{data.number}</span></p>
            <p><span className="text-zinc-500">Date :</span> {data.date}</p>
          </div>
        </div>
      </div>

      {/* Destinataire */}
      <div className="mb-8">
        <h3 className="text-blue-600 font-bold mb-2 uppercase tracking-tight">Destinataire</h3>
        <table className="w-full border-collapse border border-zinc-400">
          <tbody>
            <tr>
              <td className="border border-zinc-400 p-2 font-bold w-1/3 bg-zinc-50">Nom / Entreprise</td>
              <td className="border border-zinc-400 p-2">{data.client.name}</td>
            </tr>
            <tr>
              <td className="border border-zinc-400 p-2 font-bold bg-zinc-50">Adresse</td>
              <td className="border border-zinc-400 p-2 whitespace-pre-line">{data.client.address}</td>
            </tr>
            <tr>
              <td className="border border-zinc-400 p-2 font-bold bg-zinc-50">N° TVA</td>
              <td className="border border-zinc-400 p-2">{data.client.vat}</td>
            </tr>
            <tr>
              <td className="border border-zinc-400 p-2 font-bold bg-zinc-50">Personne de contact</td>
              <td className="border border-zinc-400 p-2">{data.client.contactPerson}</td>
            </tr>
            <tr>
              <td className="border border-zinc-400 p-2 font-bold bg-zinc-50">Téléphone / e-mail</td>
              <td className="border border-zinc-400 p-2">{data.client.phoneEmail}</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Marchandises */}
      <div className="mb-8">
        <h3 className="text-blue-600 font-bold mb-2 uppercase tracking-tight">Marchandises livrées</h3>
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-blue-900 text-white">
              <th className="p-2 text-left border border-blue-900">Description</th>
              <th className="p-2 text-left border border-blue-900 w-24">Quantité</th>
              <th className="p-2 text-right border border-blue-900 w-32">Total (€)</th>
            </tr>
          </thead>
          <tbody>
            {data.items.map((item) => (
              <tr key={item.id}>
                <td className="border border-zinc-400 p-2">{item.description}</td>
                <td className="border border-zinc-400 p-2">{item.quantity}</td>
                <td className="border border-zinc-400 p-2 text-right">{(item.quantity * item.unitPrice).toFixed(2)}</td>
              </tr>
            ))}
            {/* Empty rows to maintain structure if few items */}
            {data.items.length < 3 && Array.from({ length: 3 - data.items.length }).map((_, i) => (
              <tr key={`empty-${i}`}>
                <td className="border border-zinc-400 p-2 h-8"></td>
                <td className="border border-zinc-400 p-2 h-8"></td>
                <td className="border border-zinc-400 p-2 h-8"></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Totals */}
      <div className="mb-8 flex justify-end">
        <table className="w-1/2 border-collapse">
          <tbody>
            <tr className="bg-zinc-100">
              <td className="border border-zinc-400 p-2 font-bold">Sous-total</td>
              <td className="border border-zinc-400 p-2 text-right">{subTotal.toFixed(2)} €</td>
            </tr>
            <tr className="bg-zinc-50">
              <td className="border border-zinc-400 p-2 font-bold">TVA {data.vatRate} %</td>
              <td className="border border-zinc-400 p-2 text-right">{vatAmount.toFixed(2)} €</td>
            </tr>
            <tr className="bg-zinc-200">
              <td className="border border-zinc-400 p-2 font-bold text-lg">TOTAL TTC</td>
              <td className="border border-zinc-400 p-2 text-right font-bold text-lg">{totalTTC.toFixed(2)} €</td>
            </tr>
          </tbody>
        </table>
      </div>

      {/* Observations */}
      <div className="mb-8">
        <h3 className="text-blue-600 font-bold mb-2 uppercase tracking-tight">Observations</h3>
        <p className="p-2 border border-zinc-200 rounded min-h-[40px] italic text-zinc-600">
          {data.observations || "Aucune observation."}
        </p>
      </div>

      {/* Signatures */}
      <div className="mb-8">
        <h3 className="text-blue-600 font-bold mb-2 uppercase tracking-tight">Signatures</h3>
        <div className="grid grid-cols-2 gap-0 border border-zinc-400">
          <div className="border-r border-zinc-400 p-4 min-h-[120px]">
            <p className="font-bold mb-2">Client</p>
            <p className="text-[10px] text-zinc-500 mb-8">Nom & fonction :</p>
            <p className="text-[10px] text-zinc-500">Signature :</p>
          </div>
          <div className="p-4 min-h-[120px]">
            <p className="font-bold mb-2">Livreur</p>
            <p className="text-[10px] text-zinc-500 mb-1">Nom : <span className="text-zinc-800 font-medium">{data.deliveryPerson.name}</span></p>
            <p className="text-[10px] text-zinc-500 mb-8">TVA / Employeur : <span className="text-zinc-800 font-medium">{data.deliveryPerson.vatEmployer}</span></p>
            <p className="text-[10px] text-zinc-500">Signature :</p>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-auto pt-4 border-t border-zinc-200 flex justify-between items-center text-[10px] text-zinc-500">
        <p>Date et heure de livraison : <span className="font-mono text-zinc-800">{data.deliveryDateTime}</span></p>
      </div>
    </div>
  );
};
