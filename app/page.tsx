"use client";

import { useEffect, useState  } from "react";
import { getData } from "@/services/api";
import UserTable from "@/app/components/UserTable";

export default function Page() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const  [error, setError] = useState("");

  useEffect(() => {
    async function loadUsers() {
      try {
        setLoading(true);
       
        const data = await getData();

        await new Promise((resolve) => setTimeout(resolve, 500));
        setUsers(data.users);
      }catch(error){
        setError("Erro ao carregar dados.")

  
      }
       finally {
        setLoading(false);
      }
    }

    loadUsers();
  }, []);

  return <UserTable users={users} loading={loading} error={error}/>;
}