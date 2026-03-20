"use client";
import dynamic from "next/dynamic";
const UserMap = dynamic(() => import("./UserMap"), {
    ssr: false,
});
export default function UserModal({ user, onClose }) {
    if (!user) {
        return null;
    }

    return (

        <div onClick={onClose} className="fixed inset-0 flex items-center justify-center bg-black/50 z-50">
            <div
                className="bg-white p-6 rounded-xl w-full max-w-lg shadow-lg relative"
                onClick={(e) => e.stopPropagation()}
            >

                {/* HEADER */}
                <div className="flex items-center gap-4 mb-4">
                    <img src={user.image} className="w-16 h-16 rounded-full" />

                    <div>
                        <p className="font-bold">{user.firstName} {user.lastName}</p>
                        <p className="text-sm text-gray-500">{user.email}</p>
                    </div>
                </div>

                {/* GRID */}
                <div className="grid grid-cols-2 gap-2 text-sm">
                    <p><strong>Idade:</strong> {user.age}</p>
                    <p><strong>Telefone:</strong> {user.phone}</p>
                    <p><strong>Cidade:</strong> {user.address.city}</p>
                    <p><strong>Empresa:</strong> {user.company.name}</p>
                    <p><strong>Departamento:</strong> {user.company.department}</p>
                </div>

                {/* MAPA */}
                <div className="mt-4">
                    <UserMap user={user} />
                </div>

                {/* BOTÃO */}
                <button
                    onClick={onClose}
                    className="absolute top-3 right-3 p-2 rounded-full hover:bg-gray-200 transition duration-200"
                >
                   X
                </button>

            </div>
        </div>

    )
}