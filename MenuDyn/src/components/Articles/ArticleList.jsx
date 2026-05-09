import React, { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Search } from 'lucide-react';
import { getArticles } from '../../api/api';

export default function ArticleList() {
  const [search, setSearch] = useState('');

  const { data, isLoading, error } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  const filtered = data?.data.filter((article) =>
    article.artName?.toLowerCase().includes(search.toLowerCase()) ||
    article.artCode?.toLowerCase().includes(search.toLowerCase())
  );

  if (isLoading) return <div className="text-center py-10">Cargando artículos...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Artículos</h1>
        <Link to="/articles/new" className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Nuevo Artículo
        </Link>
      </div>

      <div className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden">
        <div className="p-4 border-b border-slate-700 flex items-center gap-3">
          <Search className="text-slate-400" size={20} />
          <input
            type="text"
            placeholder="Buscar artículos..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent border-none focus:ring-0 text-slate-200 w-full outline-none"
          />
        </div>
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-slate-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">Nombre</th>
              <th className="px-6 py-4 font-medium">Código</th>
              <th className="px-6 py-4 font-medium">Precio</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {filtered?.length > 0 ? (
              filtered.map((article) => (
                <tr key={article.artId} className="hover:bg-slate-800/30 transition-colors">
                  <td className="px-6 py-4 font-medium text-slate-200">{article.artName}</td>
                  <td className="px-6 py-4 text-slate-400">{article.artCode}</td>
                  <td className="px-6 py-4 text-emerald-400 font-medium">${article.artSalePrice}</td>
                  <td className="px-6 py-4 text-right space-x-3">
                    <Link to={`/articles/edit/${article.artId}`} className="text-blue-400 hover:text-blue-300 inline-block">
                      <Edit size={18} />
                    </Link>
                    <button className="text-red-400 hover:text-red-300">
                      <Trash2 size={18} />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="px-6 py-10 text-center text-slate-500">
                  No se encontraron artículos
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}