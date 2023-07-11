import { useState, useEffect } from 'react';
import './estilo.css';

function App() {
  const [inputNome, setInputNome] = useState('');
  const [inputPreco, setInputPreco] = useState('');
  const [produtos, setProdutos] = useState([]);

  useEffect(() => { //pega os produtos do local storage e joga na state produtos fazendo a conversão, isso ao iniciar a pagina
    const produtosStorage = localStorage.getItem('produtos');
    if (produtosStorage) {
      setProdutos(JSON.parse(produtosStorage));
    }
  }, []);

  useEffect(() => { //salva os produtos em local storage sempre que há uma alteração em produtos
    localStorage.setItem('produtos', JSON.stringify(produtos));
  }, [produtos]);

  function nomeProduto(e) { // salva o nome do produto que foi digitado no state 'nome do produto'
    setInputNome(e.target.value);
  }

  function precoProduto(e) { //salva o preço do produto que foi digitado no state 'preço do produto'
    setInputPreco(e.target.value);
  }

  function cadastrar(e) { // função que cadastra o produto na tabela ao clicar no botão "cadastrar"
    e.preventDefault();

    if (inputNome === '' || inputPreco === '') {
      alert('Campo nome ou campo preço não pode ficar vazio!');
    } else {
      const novoProduto = {
        codigo: Math.floor(Math.random() * 99999999),
        nome: inputNome,
        preco: inputPreco,
      };

      setProdutos([...produtos, novoProduto]);

      setInputNome('');
      setInputPreco('');
    }
  }

  return (
    <div>
      {/* topo */}
      <header>
        <div className='logo'>
          <h2>Cadastre aqui seu produto</h2>
        </div>
        <nav>
          <a href='X'> Home</a>
          <a href='X'>Contatos</a>
          <a href='X'>Sobre</a>
          <a href='X'>Consultar</a>
        </nav>
      </header>
      {/* fim topo */}

      {/* corpo do site */}
      <div className='corpo'>
        {/* inicio preço e produto */}
        <div className='inserir_produto'>
          <form>
            <label>Nome do produto:</label>
            <input id='nome' value={inputNome} onChange={nomeProduto} type='text' placeholder='ex: bola' /> <br />

            <label>Preço do produto:</label>
            <input id='preco' value={inputPreco} onChange={precoProduto} type='number' placeholder='ex: 50,00' />

            <button onClick={cadastrar}>Cadastrar</button>
          </form>
        </div>
        {/* fim preço e produto */}

        {/* inicio tabela */}
        <div className='tabela'>
          <h2>Produtos já cadastrados</h2>
          <table id='tabela'>
            <thead>
              <tr>
                <th>Preço</th>
                <th>Produto</th>
                <th>Código</th>
              </tr>
            </thead>
            <tbody>
              {produtos.map((produto) => ( //função map que percorre o state produto e faz a exibição dos mesmos na tabela
                <tr key={produto.codigo}>
                  <td>{produto.nome}</td>
                  <td>{produto.preco}</td>
                  <td>{produto.codigo}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {/* fim tabela */}
      </div>
      {/* fim corpo do site */}
    </div>
  );
}

export default App;
