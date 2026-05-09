import React from 'react';
import { useForm } from 'react-hook-form';
import { useMutation, useQuery } from '@tanstack/react-query';
import { MoveHorizontal, PackagePlus, History, AlertTriangle } from 'lucide-react';
import { getArticles, addToWarehouse, moveStock } from '../../api/api';

export default function InventoryManager() {
  const { data: articles } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  const { register, handleSubmit, reset } = useForm();

  const addMutation = useMutation({
    mutationFn: addToWarehouse,
    onSuccess: () => {
      alert('Stock añadido correctamente');
      reset();
    }
  });

  const moveMutation = useMutation({
    mutationFn: moveStock,
    onSuccess: () => {
      alert('Stock movido correctamente');
      reset();
    }
  });

  return (
    <div className="space-y-8">
      <h1 className="text-2xl font-bold">Gestión de Inventario</h1>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Add to Warehouse Form */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-xl">
          <div className="flex items-center gap-3 mb-6 text-blue-400">
            <PackagePlus size={24} />
            <h2 className="text-xl font-semibold text-slate-200">Añadir a Almacén</h2>
          </div>
          <form onSubmit={handleSubmit((data) => addMutation.mutate(data))} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Artículo</label>
              <select {...register('articleId')} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:ring-2 focus:ring-blue-500">
                {articles?.data.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Almacén ID</label>
                <input type="number" {...register('warehouseId')} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Cantidad</label>
                <input type="number" {...register('quantity')} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:ring-2 focus:ring-blue-500" />
              </div>
            </div>
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-xl transition-all mt-4">
              Actualizar Stock
            </button>
          </form>
        </div>

        {/* Move Stock Form */}
        <div className="bg-[#1e293b] p-6 rounded-2xl border border-slate-700 shadow-xl">
          <div className="flex items-center gap-3 mb-6 text-purple-400">
            <MoveHorizontal size={24} />
            <h2 className="text-xl font-semibold text-slate-200">Transferir Stock</h2>
          </div>
          <form onSubmit={handleSubmit((data) => moveMutation.mutate(data))} className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm text-slate-400">Artículo</label>
              <select {...register('articleId')} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:ring-2 focus:ring-purple-500">
                {articles?.data.map(a => <option key={a.id} value={a.id}>{a.name}</option>)}
              </select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Origen (Almacén ID)</label>
                <input type="number" {...register('fromWarehouseId')} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
              <div className="space-y-2">
                <label className="text-sm text-slate-400">Destino (Almacén ID)</label>
                <input type="number" {...register('toWarehouseId')} className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 text-slate-200 outline-none focus:ring-2 focus:ring-purple-500" />
              </div>
            </div>
            <button className="w-full bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 rounded-xl transition-all mt-4">
              Ejecutar Transferencia
            </button>
          </form>
        </div>
      </div>

      {/* Low Stock Alerts */}
      <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl">
        <div className="flex items-center gap-3 mb-4 text-red-400">
          <AlertTriangle size={20} />
          <h3 className="font-bold">Alertas de Stock Bajo</h3>
        </div>
        <p className="text-slate-400 text-sm">No hay alertas críticas en este momento.</p>
      </div>
    </div>
  );
}