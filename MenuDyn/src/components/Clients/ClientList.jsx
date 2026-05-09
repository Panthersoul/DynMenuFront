import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, User, Mail, Phone } from 'lucide-react';
import { getClients } from '../../api/api';

export default function ClientList() {
  const { data, isLoading } = useQuery({
    queryKey: ['clients'],
    queryFn: getClients
  });

  if (isLoading) return <div className="text-center py-10 text-slate-400">Cargando clientes...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Clientes</h1>
        <Link to="/clients/new" className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Nuevo Cliente
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {data?.data.map((client) => (
          <div key={client.id} className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 hover:border-blue-500/50 transition-all group shadow-lg">
            <div className="flex justify-between items-start mb-4">
              <div className="bg-blue-500/10 p-3 rounded-xl text-blue-400">
                <User size={24} />
              </div>
              <Link to={`/clients/edit/${client.clientId}`} className="text-slate-500 hover:text-blue-400 transition-colors">
                <Edit size={18} />
              </Link>
            </div>
            <h3 className="text-lg font-bold text-slate-200 mb-1">{client.clientName} {client.clientSurname}</h3>
            <p className="text-slate-400 text-sm mb-4">ID: {client.clientId || 'N/A'}</p>
            
            <div className="space-y-2 border-t border-slate-700 pt-4">
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Mail size={14} />
                <span>{client.clientMail || 'Sin email'}</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-400">
                <Phone size={14} />
                <span>{client.clientPhone || 'Sin teléfono'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}