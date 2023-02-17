<p>Este é um projeto front-end completo que estou desenvolvendo, a aplicação possui um sistema de login usando token JWT, também possui módulos para clientes, fornecedores e indicações, cada módulo possuindo sua própria página, tabela, search, CRUD. O front está consultando uma api construída com Node js e Express.</p>
<h1>Tela de Login</h1>
<p>Sobre o login, o projeto está sendo construído usando a biblioteca formik, não só no login mas em todo o CRUD mais a dentro da aplicaçâo. A princípio o login conta com tratamento de senha e nome de usuário onde cada erro ao logar será indicado por uma toast notification.</p>
<image src="https://github.com/GabrielTrigueiro/front-LBS-backup/blob/master/images/login.png"/>
<image src="https://github.com/GabrielTrigueiro/front-LBS-backup/blob/master/images/ex%20erro1.png"/>
<image src="https://github.com/GabrielTrigueiro/front-LBS-backup/blob/master/images/ex%20erro2.png"/>

<h1>Lista de Clientes</h1>
<p>Aqui será mostrado em uma tabela todos os clientes cadastrados na empresa, cada cliente tem suas informações que podem ser conferidas em detalhes do cliente, e cada cliente tem uma cor de status indicando se ele está ativo ou não, esse status é fornecido pela API atravé de uma regra de negócio que leva em consideração o tempo que o cliente está sem comprar nada da empresa. Cada cliente possui um menu lateral que possibilita sua edição ou exclusâo, na mesma página é possível fazer um cadastro de um novo cliente e procurar em todos os clientes presentes no banco de dados através do search.</p>
<image src="https://github.com/GabrielTrigueiro/front-LBS-backup/blob/master/images/lista%20clientes.png"/>
