const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const bodyParser = require('body-parser')


const app = express()

app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()) 
app.use(cors())

let dbPessoas = { pagina: 0, tamanho: 10, numeroRegistros: 3, registros: [
    { id: 1, nome: 'João da Silva', dataNascimento: '2000-01-01', cpf: '123.456.789/00', ativo: true, meta: 1000 },
    { id: 2, nome: 'Maria da Silva', dataNascimento: '1998-01-01', cpf: '987.654.321/00', ativo: true, meta: 1000 },
    { id: 3, nome: 'José da Silva', dataNascimento: '2010-09-27', cpf: null, ativo: false, meta: 0.50 }
]}

let db = [
    { id: 1, nome: 'João da Silva', dataNascimento: '2000-01-01', cpf: '123.456.789/00', ativo: true, meta: 1000 },
  
]

// Lista todas as pessoas
app.get('/api/pessoas', (req, res) => {
    return res.json(dbPessoas);
})

// Listar um único ID 
app.get('/api/pessoas/:id', (req, res) => {
    return res.json(db)
})

app.put('/api/pessoas/:id', (req, res) => {
    return res.json(db)
})

app.post('/api/pessoas', (req, res, next) => {
    //Variaveis utilizadas
    let postNome = req.body.nome;
    let postData = req.body.dataNascimento;
    let postCPF = req.body.cpf;
    let postAtivo = req.body.ativo;
    let postMeta = req.body.meta;
    var postId = parseInt(dbPessoas.numeroRegistros) + 1;
    //Pega o horario atual
    const yourDate = new Date()
    //Faz a checagem se o cpf é valido
    var cpfChecado = checagemCPF(postCPF);
    //Verifica se tem campo vazio
    if ((postNome != undefined) && (postData != undefined) && (postAtivo != undefined) && (postMeta != undefined)) {
        //verifica se tem menos de 50 char
        if ((postNome.length <= 50) && (typeof postNome === 'string')) {
            //Faz a checagem se a data nao e do futuro
            if (formatDate(yourDate) > postData) {
                //valida o cpf
                if ((cpfChecado == true) || (postCPF === '')) {
                    //não deixa a meta ser negativa
                    if (parseInt(postMeta) > 0) {
                        res.status(201).send({
                            id: postId,
                            nome: req.body.nome,
                            data: req.body.dataNascimento,
                            CPF: req.body.cpf,
                            ativo: req.body.ativo,
                            meta: req.body.meta,
                        })
                    }
                    else {
                        res.status(400).send('Meta invalida');
                    }
                }
                else {
                    res.status(400).send('CPF nvalido');
                }
            }
            else {
                res.status(400).send('Data inserida invalida');
            }
        }
        else {
            res.status(400).send('Nome invalido');
        }
    } else {
        res.status(400).send('Campo(s) obrigatório faltando');
    }
    res.status(201).send();
});

// BD receitas
let dbReceitas = { pagina: 0, tamanho: 10, numeroRegistros: 2, registros: [
    { id: 1, pessoaId: 1, data: '2021-01-12', valor: '1100.99'},
    { id: 2, pessoaId: 1, data: '2021-01-15', valor: '2500'},
]}

let dbID = [
    { id: 1, pessoaId: 1, data: '2021-01-12', valor: '1100.99'},
]

// Get Lista todas as receitas
app.get('/api/receitas', (req, res) => {
    return res.json(dbReceitas);
})

app.get('/api/receitas/:id', (req, res) => {
    return res.json(dbID);
})


app.post('/api/receitas', (req, res, next) => {
    let postPessoaId = req.body.pessoaId;
    let postData = req.body.data;
    let postValor = req.body.valor;
    var postPessoaId2 = parseInt(postPessoaId);
    //puxa a data local
    const yourDate = new Date()
    //checa se tem algum campo obrigatorio nao sendo usado
    if ((postPessoaId != undefined) && (postData != undefined) && (postValor != undefined)) {
        //checa se esse id existe
        if ((postPessoaId2 > 0) && (postPessoaId2 <= dbPessoas.numeroRegistros)) {
            //checa se o horario nao é do futuro
            if (formatDate(yourDate) > postData) {
                //checa se o valor é positivo
                if (parseInt(postValor) > 0) {
                    res.status(201).send({
                        id: parseInt(req.body.pessoaId),
                        data: req.body.data,
                        valor: parseInt(req.body.valor),
                    })
                } else {
                    res.status(400).send('Valor negativo');
                }
            } else {
                res.status(400).send('Data invalida');
            }
        } else {
            res.status(400).send('Id não encontrado');
        }
    } else {
        res.status(400).send('Campo(s) obrigatório faltando');
    }
});

//Delete
app.delete('/api/receitas/:id', (req, res, next) => {
    res.status(201).send(
        'Deletado com sucesso'
    )
});

//Funcao que identa do jeito pedido
function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}
//Funcao que pega o cpf e checa se e valido ou nao
function checagemCPF(postCPF) {
    var aux1 = parseInt(postCPF.charAt(0));
    var aux2 = parseInt(postCPF.charAt(1));
    var aux3 = parseInt(postCPF.charAt(2));
    var aux4 = parseInt(postCPF.charAt(4));
    var aux5 = parseInt(postCPF.charAt(5));
    var aux6 = parseInt(postCPF.charAt(6));
    var aux7 = parseInt(postCPF.charAt(8));
    var aux8 = parseInt(postCPF.charAt(9));
    var aux9 = parseInt(postCPF.charAt(10));
    var verifica = parseInt(postCPF.charAt(12));
    var multiplica = ((aux1 * 10) + (aux2 * 9) + (aux3 * 8) + (aux4 * 7) + (aux5 * 6) + (aux6 * 5) + (aux7 * 4) + (aux8 * 3) + (aux9 * 2))
    multiplica = ((multiplica * 10) % 11)
    if (multiplica == verifica) {
        return true;
    } else {
        return false;
    }
}

app.listen(8081, () => {
    console.log('Express started at http://localhost:8081')
})
