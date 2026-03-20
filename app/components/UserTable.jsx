"use client";
import UserModal from "./UserModal";

import { useState, useEffect, useMemo } from "react";

export default function UserTable({ users, loading }) {
    const [currentPage, setCurrentPage] = useState(1);
    const [selectedUser, setSelectedUser] = useState(null);
    const [search, setSearch] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [sortOrder, setSortOrder] = useState("asc");

    const usersPerPage = 10;
    const startIndex = (currentPage - 1) * usersPerPage;
    const end = startIndex + usersPerPage;

    const filteredUsers = users.filter((user) => {
        const term = debouncedSearch.toLocaleLowerCase();
        const fullName = `${user.firstName} ${user.lastName}`.trim().toLocaleLowerCase();
        const city = user.address.city.toLocaleLowerCase();

        return (
            fullName.includes(term) ||
            city.includes(term)

        );

    });

    const sortedUsers = useMemo(() => {
        return [...filteredUsers].sort((a, b) => {
            const nameA = `${a.firstName} ${a.lastName}`.toLowerCase();
            const nameB = `${b.firstName} ${b.lastName}`.toLowerCase();

            return sortOrder === "asc"
                ? nameA.localeCompare(nameB)
                : nameB.localeCompare(nameA);
        });
    }, [filteredUsers, sortOrder]);



    const paginatedUsers = sortedUsers.slice(startIndex, end);
    const totalPages = Math.ceil(filteredUsers.length / usersPerPage);
    const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

    useEffect(() => {
        setCurrentPage(1);
    }, [debouncedSearch]);

    //Debounce para otimizar a pesquisa
    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(search);
        }, 800);

        return () => clearTimeout(timer);
    }, [search]);

    return (
        
        <>
            <div className="w-full px-4 py-6">
                <h1 className="text-2xl font-bold"> Lista de Usuários</h1>
           
        

        
            {/* CAMPO DE BUSCA */}

            <div className="flex justify-end mb-4">
                <div className="relative">
                    <svg xmlns="http://www.w3.org/2000/svg"
                        className="w-5 h-5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" fill="none"
                        viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                            d="M21 21l-4.35-4.35M10 18a8 8 0 100-16 8 8 0 000 16z" />
                    </svg>



                    <input
                        type="text"
                        placeholder="Buscar por nome ou cidade"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                        className="pl-10 pr-4 py-1 border rounded-lg w-full md:w-64 
                                    focus:outline-none focus:ring-1 focus:ring-blue-500 
                                    focus:border-blue-500 transition"
                    />
                </div>
            </div>

            <div className="w-full overflow-x-auto bg-white rounded-lg shadow">

                <table className="w-full text-left">

                    <thead className="bg-gray-50 border-b">
                        <tr>
                            <th onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")} className="px-3 w-[260px] py-2 text-center cursor-pointer hover:bg-gray-100 select-none" >Nome

                                {sortOrder === "asc" ? "↑" : "↓"}
                            </th>
                            <th className="px-3 w-[300px] py-1 text-center">Email</th>
                            <th className="px-3 w-[180px] py-1 text-center">Cidade</th>
                            <th className="px-3 w-[220px] py-1 text-center">Empresa</th>
                            <th className="px-3 w-[120px] py-1 text-center">Ações</th>
                        </tr>
                    </thead>


                    <tbody className="divide-y bg-gray-50  divide-gray-200">
                        {loading ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    Carregando dados...
                                </td>
                            </tr>
                        ) : paginatedUsers.length === 0 ? (
                            <tr>
                                <td colSpan="5" className="text-center p-4 text-gray-500">
                                    Nenhum usuário encontrado
                                </td>
                            </tr>
                        ) : (
                            paginatedUsers.map((user) => (
                                <tr key={user.id} className="hover:bg-gray-100 transition duration-150">
                                    <td className="p-3">
                                        <div className="flex items-center gap-3">
                                            <img src={user.image} className="w-10 h-10 rounded-full" />
                                            <span>{user.firstName} {user.lastName}</span>
                                        </div>
                                    </td>

                                    <td className="p-3 text-center">{user.email}</td>
                                    <td className="p-3 text-center">{user.address.city}</td>
                                    <td className="p-3 text-center">{user.company.name}</td>

                                    <td className="p-3 text-center">
                                        <button
                                            onClick={() => setSelectedUser(user)}
                                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                                        >
                                            Detalhes
                                        </button>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>



                </table>


            </div>
            

            <div className="flex justify-center mt-4 gap-2 flex-wrap">
                {
                    pages.map((p) => (
                        <button key={p}
                            onClick={() => setCurrentPage(p)}
                            className={`px-3 py-1 rounded ${p === currentPage ? "bg-blue-500 text-white" : "bg-gray-200"}`}>
                            {p}
                        </button>

                    ))
                }

            </div>


            {/* MODAL */}
          
            <UserModal user={selectedUser} onClose={() => setSelectedUser(null)} />
            
            
        </div>
        </>
    );
}