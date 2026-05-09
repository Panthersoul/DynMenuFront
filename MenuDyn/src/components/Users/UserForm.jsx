import React from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useParams } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Save, ArrowLeft, User, Shield } from 'lucide-react';
import { getUser, createUser, updateUser } from '../../api/api';

export default function UserForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const isEdit = Boolean(id);

  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const { isLoading: isFetching } = useQuery({
    queryKey: ['user', id],
    queryFn: async () => {
      const response = await getUser(id);
      reset(response.data);
      return response.data;
    },
    enabled: isEdit,
  });

  const mutation = useMutation({
    mutationFn: (data) => isEdit ? updateUser(id, data) : createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
      navigate('/users');
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
        <h1 className="text-2xl font-bold">{isEdit ? 'Editar Usuario' : 'Nuevo Usuario'}</h1>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="bg-[#1e293b] p-8 rounded-2xl border border-slate-700 shadow-xl space-y-6">
        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <User size={16} /> Nombre de Usuario
            </label>
            <input
              {...register('userName', { required: 'El nombre de usuario es obligatorio' })}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Ej: admin_dyn"
            />
            {errors.userName && <p className="text-red-400 text-xs">{errors.userName.message}</p>}
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium text-slate-400 flex items-center gap-2">
              <Shield size={16} /> Privilegios (Nivel)
            </label>
            <input
              type="number"
              {...register('userPrivileges', { required: 'Los privilegios son obligatorios' })}
              className="w-full bg-[#0f172a] border border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-indigo-500 outline-none transition-all"
              placeholder="Ej: 1"
            />
          </div>
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={mutation.isLoading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-800 text-white font-bold py-3 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-indigo-900/20"
          >
            <Save size={20} />
            {mutation.isLoading ? 'Guardando...' : 'Guardar Usuario'}
          </button>
        </div>
      </form>
    </div>
  );
}