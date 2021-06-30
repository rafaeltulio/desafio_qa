*** Settings ***
Documentation   Documentação de API: Suite de Testes para validar a API
Resource        resourcesPage.robot
Suite Setup     Autenticar API

*** Variables ***
${uri_receitas}     /api/receitas/

*** Test Cases ***
Cenário 01: GET Lista todas as receitas
    [tags]  apiTests
    Listar todas as receitas cadastradas
    Conferir o status code   200
    Conferir o reason   OK
#   Validar response

Cenário 02: GET Lista receita informando numero do ID
    [tags]  apiTests
    Informar o ID da receita numero "1"
    Conferir o status code   200
    Conferir o reason   OK
#   Validar response

Cenário 03: POST Cadastrar receitas
    [tags]  apiTests
    Dado que informo os dados da requisicao para cadastrar a receita
    Conferir o status code   200
    Conferir o reason   OK
#   Validar response

*** Keywords ***
Listar todas as receitas cadastradas
    &{PARAMS}       Create Dictionary       pagina=0    tamanho=10
    ${RESPOSTA}     Get On Session          urlAPI     ${uri_receitas}       params=${PARAMS}
    Log             Lista de Produtos: ${RESPOSTA.text}   
    Set Global Variable   ${RESPOSTA}

Informar o ID da receita numero "${ID_RECEITA}"
    ${RESPOSTA}     Get On Session          urlAPI     ${uri_receitas}${ID_RECEITA} 
    Log             Lista de Produtos: ${RESPOSTA.text}   
    Set Global Variable   ${RESPOSTA}

Dado que informo os dados da requisicao para cadastrar a receita
    &{data}         Create Dictionary   pessoaId=1    data=2021-02-15     valor=2500.00 
    ${response}     POST On Session     urlAPI        ${uri_receitas}     json=${data} 
    
### Conferir o status code da receita == status 200
Conferir o status code
    [Arguments]     ${STATUS_CODE_DESEJADO}
    Should Be Equal As Integers      ${RESPOSTA.status_code}     ${STATUS_CODE_DESEJADO}
    Log             ${RESPOSTA.status_code}

Conferir o reason
    [Arguments]     ${REASON_DESEJADO}
    Should Be Equal As Strings      ${RESPOSTA.reason}      ${REASON_DESEJADO}
    Log             ${RESPOSTA.reason}