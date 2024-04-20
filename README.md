# Front-end do projeto de controlador de treinos 

Este pequeno projeto, intitulado controlador de treinos, compõe o MVP desenvolvido para a sprint de **Desenvolvimento Full Stack Básico** do curso de pós-graduação em Desenvolvimento Full Stack. O controlador de treinos é uma aplicação web responsável por cadastrar esportistas e registrar treinos vinculados a cada esportista. O presente documento ressalta aspectos do desenvolvimento voltados ao front-end.


---
## Visualização da aplicação

Para acessar a página web desenvolvida para o usuário, basta abrir o arquivo `index.html` através de um browser. Nela, se encontra toda a interface para cadastrar esportistas e registrar treinos vinculados.

## Conectividade com o back-end

A interação do usuário com a interface só será propriamente estabelecida caso o seguinte comando na aplicação do back-end (maiores detalhes são encontrados no README.md do back-end) esteja em execução:

```
flask run --host 0.0.0.0 --port 5001
```

## Funcionalidades oferecidas na interface

O acesso a uma das funcionalidades (esportistas ou treino) é feito pelo click em um dos botões presentes na lista de itens `<li class="redirecionadorFuncionalidade">`

### Funcionalidade de esportistas

Particularidades:
* Não é possível cadastrar mais de um esportista com o mesmo nome! Há uma restrição de chave no banco de dados;
* Apagar um esportista acarreta na remoção de seus treinos associados, caso existam.

### Funcionalidade de treinos

Particularidades:
* Só é possível registrar um treino, caso o esportista associado já tenha sido previamente registrado! Há uma restrição de integridade referencial no banco de dados;
* Não é possível registrar mais de um treino por dia de uma mesma modalidade vinculada ao mesmo esportista! Há uma restrição de chave no banco de dados;

### Documentação das APIs

A documentação das APIs se encontra disponibilizada no Swagger através do seguinte caminho: http://127.0.0.1:5001/openapi/swagger.

## Aspectos gerais

### Linguagem de programação

As linguagens utilizadas no front-end são JavaScript, CSS e HTML. Não há a utilização de frameworks/bibliotecas, material UI ou boostrap.



