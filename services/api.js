  export async function getData(){
    const response = await fetch("https://dummyjson.com/users");
    if(!response.ok){
        throw new Error("Erro ao buscar os dados");
    }
    const data = await response.json();

  return data;
}


  
  
 