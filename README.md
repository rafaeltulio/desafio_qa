# desafio_qa
Projeto de Automação de Testes - QA Challenge
## Descrição do Projeto
API construída com NodeJS utilizando o framework Express<br>
Endpoint api/pessoas<br>
Endpoint api/receitas<br>
Endpoint api/totalizadores<br>
### Pré-requisitos
Antes de começar, é bom ter um editor para trabalhar com o código como o [VSCode](https://code.visualstudio.com/).<br>
Então você vai precisar ter instalado em sua máquina as seguintes ferramentas:<br>
[Python](https://www.python.org/)<br>
[RobotFramework](https://robotframework.org/)<br>
[GIT] (https://github.com/rafaeltulio/desafio_qa.git)</br>

### Rodando a suite completa de testes de api
$ Acessar a pasta tests do projeto 

# Execute a classe de testes individual
robot -d ./results tests/pessoasAPITests.robot
robot -d ./results tests/receitasAPITests.robot
# Execute a classe de testes por tag
$ robot -d ./results -i apiTtests tests

