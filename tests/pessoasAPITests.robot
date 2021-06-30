*** Settings ***
Documentation   Documentação de API: Suite de Testes para validar a API
Resource        resourcesPage.robot
Suite Setup     Autenticar API

*** Variables ***
${uri_pessoas}     /api/pessoas/

*** Test Cases ***
Cenário 01: GET Lista todas as pessoas
    [tags]  apiTests
    Listar todas as pessoas cadastradas
    Conferir o status code   200
    Conferir o reason   OK
#   Validar response

Cenário 02: GET Lista pessoa informando numero do ID
    [tags]  apiTests
    Informar o ID numero "1"
    Conferir o status code   200
    Conferir o reason   OK
#   Validar response

Cenário 03: POST Cadastrar pessoas
    [tags]  apiTests
    Dado que informo os dados da requisicao
    Conferir o status code   200
    Conferir o reason   OK
#   Validar response

*** Keywords ***
Listar todas as pessoas cadastradas
    &{PARAMS}       Create Dictionary       pagina=0    tamanho=10
    ${RESPOSTA}     Get On Session          urlAPI     ${uri_pessoas}       params=${PARAMS}
    Log             Lista de Produtos: ${RESPOSTA.text}   
    Set Global Variable   ${RESPOSTA}

Informar o ID numero "${ID}"
    ${RESPOSTA}     Get On Session          urlAPI     ${uri_pessoas}${ID} 
    Log             Lista de Produtos: ${RESPOSTA.text}   
    Set Global Variable   ${RESPOSTA}

Dado que informo os dados da requisicao
    &{data}         Create Dictionary   id=1    nome=João da Silva      dataNascimento=2000-01-01       cpf=464.589.520-66      ativo=true      meta=1000.00        
    ${response}     POST On Session     urlAPI         ${uri_pessoas}     json=${data} 
    
### Conferir o status code do retorno pessoas == status 200
Conferir o status code
    [Arguments]     ${STATUS_CODE_DESEJADO}
    Should Be Equal As Integers      ${RESPOSTA.status_code}     ${STATUS_CODE_DESEJADO}
    Log             ${RESPOSTA.status_code}

Conferir o reason
    [Arguments]     ${REASON_DESEJADO}
    Should Be Equal As Strings      ${RESPOSTA.reason}      ${REASON_DESEJADO}
    Log             ${RESPOSTA.reason}