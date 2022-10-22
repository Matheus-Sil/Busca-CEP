import{useState} from 'react';
import{FiSearch} from 'react-icons/fi';
import'./style.css';

import api from './services/api';

function App() {

  const[input, setInput] = useState('')
  const[cep,setCep] = useState({});

  async function conteudoInput(){
    //01001000/json/

    if(input === ''){
      alert("Preencha com algum CEP")
      return;
    }

    try{
      const response = await api.get(`${input}/json`);
      setCep(response.data)
      setInput("");

    }

    catch{
      alert("Ops, erro ao buscar o cep, por favor verifique se está correto.")
      setInput("")
    }
  }



  return (
    <div className="container">
      <h1 className="title">Buscador de CEP</h1>

      <div className="containerInput" >
        <input type="text" 
        placeholder="Digite o cep..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
        
        />
        
        <button onClick={conteudoInput}>
          <FiSearch size={25} color="#ffff"/>
        </button>
       </div>

       {Object.keys(cep).length > 0 && (
        <main className="main">

          <h2>CEP: {cep.cep} </h2>
          <sapn>{cep.logradouro}</sapn>
          <sapn>{cep.complemento}</sapn>
          <span>{cep.bairro}</span>
          <span>{cep.localidade} - {cep.uf}</span>

        </main>
        
       )}
     
    </div>

    
  );
}

export default App;
