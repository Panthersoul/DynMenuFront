import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Save, ArrowLeft } from 'lucide-react';
import { createClient, updateClient } from '../../api/api';

export default function ClientForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  const { register, handleSubmit, formState: { errors } } = useForm();

  const mutation = useMutation({
    mutationFn: (data) => isEdit ? updateClient(id, data) : createClient(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['clients']);
      navigate('/clients');
    }
  });

  const onSubmit = (data) => mutation.mutate(data);

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Editar Cliente' : 'Nuevo Cliente'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Nombre</label>
            <input
              {...register('clientName', { required: 'El nombre es obligatorio' })}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Apellido</label>
            <input
              {...register('clientSurname', { required: 'El apellido es obligatorio' })}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Email</label>
            <input
              type="email"
              {...register('clientMail')}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Teléfono</label>
            <input
              {...register('clientPhone')}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-emerald-500 outline-none transition-all"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full bg-emerald-600 hover:bg-emerald-700 disabled:bg-emerald-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-900/20"
          >
            <Save size={20} />
            {mutation.isLoading ? 'Guardando...' : 'Guardar Cliente'}
          </button>
        </div>
      </form>
    </div>
  );
}