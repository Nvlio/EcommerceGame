import ClienteDB from "../Conexão/DBClient.js"
import Autenticador from "../Funcões/autenticar.js"

export default class ClienteMod{
    
    #cpf
    #nome
    #telefone
    #senha
    #email
    #endereco

    constructor(CPF,Nome,Telefone,Senha,Email,Endereco){
        this.#cpf=CPF;
        this.#nome=Nome;
        this.#telefone=Telefone
        this.#senha=Senha
        this.#email=Email
        this.#endereco=Endereco
    };

    ToJSON(){
        return({
            cpf:this.#cpf,
            nome:this.#nome,
            telefone:this.#telefone,
            senha:this.#senha,
            email:this.#email,
            endereco:this.#endereco
        })
    }

    async Pegar(){
        const dataBase = new ClienteDB()
        const resp = await dataBase.GET()
        return resp
    };

    async PegarValor(){
        const dataBase = new ClienteDB()
        const resp = await dataBase.GETVAL(this.#cpf)
        return resp
    };

    async Inserir(tipo){
        const dataBase = new ClienteDB()
        let resp;
        let tokenAutenticacao
        const autentica = new Autenticador()
        if(tipo){
            resp= await dataBase.Login(this.#email,this.#senha)
            tokenAutenticacao = await autentica.autenticar(resp)


        }else{
            resp = await dataBase.POST(this.#cpf,this.#nome,this.#telefone,this.#senha,this.#email,this.#endereco)
        }
        console.log(resp)
        if(resp.resp){
            return {'resposta':resp.resp,'token':tokenAutenticacao}
        }else{
            return {'resposta':resp,'token':tokenAutenticacao}
        }
        
    };

    async Atualizar(nome,telefone,senha,email,endereco){
        const dataBase = new ClienteDB()
        const resp = await dataBase.PUT(this.#cpf,nome,telefone,senha,email,endereco)
        return resp.resp
    };

    async Excluir(){
        const dataBase = new ClienteDB()
        const resp = await dataBase.DELETE(this.#cpf)
        return resp
    };

}