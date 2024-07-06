import { useEffect, useState } from "react";
import axios from "axios";
import './produto.css'

export function Produto(){
    const url = "http://localhost:8080/produto"
    
    const [id, setId] = useState(0)
    const [nome, setNome] = useState('')
    const [preco, setPreco] = useState()
    const [quantidade, setQuantidade] = useState()
    const [data, setData] = useState([])
    const [error, setError] = useState()
    const [classBtnInserir, setClassBtnInserir] = useState('Inserir')
    const [classBtnShow, setClassBtnShow] = useState('sumir')

    // Listar
    useEffect(() => {
        axios.get(url)
        .then( response => setData(response.data) )
    }, [data, setData])

    // Cadastrar
    const Inserir = (e) => {
        e.preventDefault()

        if(!nome){
            alert("Preencha o Campo de Nome do Produto!")
            return false;
        } if(!preco){
            alert("Preencha o Campo de Valor do Produto!")
            return false;
        } if(!quantidade){
            alert("Preencha o Campo de Quantidade do Produto!")
            return false;
        }

        axios.post(url, {
            nome,
            preco,
            quantidade
        })
        .then( () => {
            alert("Produto" + nome + "cadastrado com sucesso !")
            setNome(''), setPreco(''), setQuantidade('')
        })
        .catch( (error) => {
            console.log('erro: ' + error)
        })
    }

    const Remover = (id, nome) => {
        console.log(nome);
        const res = window.confirm("Deseja realmente excluir o Produto: " + nome + " ?")

        // 
        if(res === true){
            axios.delete(`${url}/${id}`)
            return false
        }
    }

    // Carrega campos
    const CarregaCampos = (id, nome, preco, quantidade) => {
        setClassBtnInserir('sumir')
        setClassBtnShow('')

        setId(id)
        setNome(nome)
        setPreco(preco)
        setQuantidade(quantidade)
    }

    // Alterar
    const Alterar = (e) => {
        e.preventDefault()

        const res = window.confirm('Deseja realmente alterar ?')

        if(res){
            axios.put(`${url}/${id}`, {
                nome,
                preco,
                quantidade
            })
            .then(() => {
                alert("Produto alterado com sucesso")
                setId(), setNome(''), setPreco(0), setQuantidade(0)
                
                setClassBtnInserir('')
                setClassBtnShow('sumir')
            })
            .catch((error) => {
                console.log("Erro: " + error);
            })
        }

        return false
    }

    // Cancelar
    const Cancelar = (e) => {
        e.preventDefault()

        setId(0)
        setNome('')
        setPreco(0)
        setQuantidade(0)
        setClassBtnInserir('')
        setClassBtnShow('sumir')
    }

    return(
        <div className="container">
            <div className="flex bg-dark py-10 mt-3 mb-3 justify-center">
                <h1 className="text-white font-bold text-3xl">Cadastro de Produto</h1>
            </div>
            
            <form className="mb-3 bg-zinc-300 py-3 p-3">
                <div className="row mb-3">
                    <div className="col">
                        <input
                            disabled
                            type="text"
                            value={id}
                            placeholder="Código"
                            className="form-control text-center"
                            onChange={e => setId(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="text"
                            value={nome}
                            placeholder="Produto"
                            className="form-control text-center"
                            onChange={e => setNome(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            value={preco}
                            placeholder="Valor do Produto"
                            className="form-control text-center"
                            onChange={e => setPreco(e.target.value)}
                        />
                    </div>
                    <div className="col">
                        <input
                            type="number"
                            value={quantidade}
                            placeholder="Quantidade"
                            className="form-control text-center"
                            onChange={e => setQuantidade(e.target.value)}
                        />
                    </div>
                </div>

                <button className={`btn btn-success text-white ${classBtnInserir}`} onClick={ Inserir }>Inserir</button>
                <button className={`btn btn-warning text-white mr-3 ${classBtnShow}`} onClick={ Alterar }>Alterar</button>
                <button className={`btn btn-danger text-white ${classBtnShow}`} onClick={ Cancelar }>Cancelar</button> 
            </form>

            <table className="table">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Produto</th>
                        <th>Valor</th>
                        <th>Quantidade</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item) => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nome}</td>
                            <td>{item.preco}</td>
                            <td>{item.quantidade}</td>
                            <td className="d-flex gap-2">
                                <button className="btn btn-outline-warning" onClick={ () => CarregaCampos( item.id, item.nome, item.preco, item.quantidade ) }>
                                    Alterar
                                </button>
                                <button className="btn btn-outline-danger" onClick={ () => Remover(item.id, item.nome)}>
                                    Apagar
                                </button>
                            </td>
                        </tr>   
                    ))}
                </tbody>
            </table>
        </div>
    )
}