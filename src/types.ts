export interface CompanyInfo {
  name: string;
  address: string;
  vat: string;
  logo?: string;
}

export interface ClientInfo {
  name: string;
  address: string;
  vat: string;
  contactPerson: string;
  phoneEmail: string;
}

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export interface DeliveryNote {
  number: string;
  date: string;
  company: CompanyInfo;
  client: ClientInfo;
  items: InvoiceItem[];
  vatRate: number;
  observations: string;
  deliveryPerson: {
    name: string;
    vatEmployer: string;
  };
  deliveryDateTime: string;
}
