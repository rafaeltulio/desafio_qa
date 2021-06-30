*** Settings ***
Documentation   Documentaçaõ da API: Resource util para API
Library         RequestsLibrary
Library         Collections   
Library         String
Library         OperatingSystem

*** Variables ***
${base_url}     http://localhost:8081

*** Keywords ***
Autenticar API
    ${HEADERS}          Create Dictionary       Connection=keep-alive      Accept-Encoding=gzip, deflate, br
    Create Session      urlAPI              ${base_url}    headers=${HEADERS}
   