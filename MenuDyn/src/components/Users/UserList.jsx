import React from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { Link } from 'react-router-dom';
import { Plus, Edit, Trash2, Shield } from 'lucide-react';
import { getUsers, deleteUser } from '../../api/api';

export default function UserList() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ['users'],
    queryFn: getUsers
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: () => {
      queryClient.invalidateQueries(['users']);
    }
  });

  if (isLoading) return <div className="text-center py-10 text-slate-400">Cargando usuarios...</div>;

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usuarios del Sistema</h1>
        <Link to="/users/new" className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 transition-colors">
          <Plus size={18} /> Nuevo Usuario
        </Link>
      </div>

      <div className="bg-[#1e293b] rounded-2xl border border-slate-700 overflow-hidden shadow-xl">
        <table className="w-full text-left">
          <thead className="bg-slate-800/50 text-slate-400 text-sm uppercase">
            <tr>
              <th className="px-6 py-4 font-medium">ID</th>
              <th className="px-6 py-4 font-medium">Usuario</th>
              <th className="px-6 py-4 font-medium">Privilegios</th>
              <th className="px-6 py-4 font-medium text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-700">
            {data?.data.map((user) => (
              <tr key={user.userId} className="hover:bg-slate-800/30 transition-colors">
                <td className="px-6 py-4 text-slate-400">{user.userId}</td>
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-indigo-500/10 flex items-center justify-center text-indigo-400 font-bold">
                      {user.userName?.charAt(0).toUpperCase()}
                    </div>
                    <span className="font-medium text-slate-200">{user.userName}</span>
                  </div>
                </td>
                <td className="px-6 py-4">
                    <span className={`flex items-center gap-1 text-sm ${
                      user.userPrivileges <= 2 ? 'text-green-500' :
                      user.userPrivileges <= 3 ? 'text-yellow-400' :
                      user.userPrivileges <= 4 ? 'text-amber-400' :
                      
                      
                      user.userPrivileges > 6 ? 'text-blue-400' :
                      'text-red-700' 
                    }`}>
                      <Shield size={14} /> Nivel {user.userPrivileges}
                    </span>
                  </td>
                <td className="px-6 py-4 text-right space-x-3">
                  <Link to={`/users/edit/${user.userId}`} className="text-blue-400 hover:text-blue-300 inline-block">
                    <Edit size={18} />
                  </Link>
                  <button 
                    onClick={() => { if(confirm('¿Eliminar usuario?')) deleteMutation.mutate(user.userId) }}
                    className="text-red-400 hover:text-red-300"
                  >
                    <Trash2 size={18} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}