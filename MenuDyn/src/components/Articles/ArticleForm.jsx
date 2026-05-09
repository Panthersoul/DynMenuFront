import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Save, ArrowLeft } from 'lucide-react';
import { getArticle, createArticle, updateArticle } from '../../api/api';

export default function ArticleForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { isLoading: isFetching } = useQuery({
    queryKey: ['article', id],
    queryFn: async () => {
      const response = await getArticle(id);
      reset(response.data);
      return response.data;
    },
    enabled: isEdit,
  });

  const mutation = useMutation({
    mutationFn: (data) => isEdit ? updateArticle(id, data) : createArticle(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['articles']);
      navigate('/articles');
    }
  });

  const onSubmit = (data) => mutation.mutate(data);

  if (isFetching) return <div className="text-center py-10 text-slate-400">Cargando datos...</div>;

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center gap-4">
        <button onClick={() => navigate(-1)} className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 transition-colors">
          <ArrowLeft size={20} />
        </button>
        <h1 className="text-2xl font-bold">{isEdit ? 'Editar Artículo' : 'Nuevo Artículo'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-xl space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Nombre del Artículo</label>
            <input
              {...register('artName', { required: 'El nombre es obligatorio' })}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ej: Hamburguesa Clásica"
            />
            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
            {errors.name && <p className="text-red-400 text-xs">{errors.name.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Código</label>
            <input
              {...register('artCode', { required: 'El código es obligatorio' })}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="Ej: ART-001"
            />
            {errors.code && <p className="text-red-400 text-xs">{errors.code.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Precio ($)</label>
            <input
              type="number"
              step="0.01"
              {...register('artSalePrice', { required: 'El precio es obligatorio' })}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="0.00"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400">Categoría ID</label>
            <input
              type="number"
              {...register('categoryId')}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
              placeholder="1"
            />
          </div>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium text-slate-400">Descripción</label>
          <textarea
            {...register('artDescription')}
            rows="3"
            className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-blue-500 outline-none transition-all"
            placeholder="Detalles del artículo..."
          ></textarea>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900/20"
          >
            <Save size={20} />
            {mutation.isLoading ? 'Guardando...' : 'Guardar Artículo'}
          </button>
        </div>
      </form>
    </div>
  );
}