# TechWorld

Então, essa é a primeira versão do TechWorld, o TechWorld é um CRUD feito em Angular + Sass.

# Testando localmente

```
    git clone
    cd techWorld
    npm i
    ng serve || npm start
```

## Como foi desenvolvido

Tive a brilhante ideia, ou não tão brilhante assim, de não usar o JSON server como banco de dados.
Sei que tem como salvar info no localStorage e pensei que fosse uma boa ideia usar o LocalStorage para salvar as informações. Funciona? funciona! mas acho que não valeu o tempo que passei pesquisando.

Junto com o "fake-backend.ts" interceptando as requisições http, tem dado conta do recado.

O Jason Watmore me ajudou muito com esse projeto, os tutoriais dele são incriveis confere lá: https://jasonwatmore.com/

### Reactive Forms Reactive Forms Reactive Forms Reactive Forms Reactive Forms PRA TODO LADO!!!

O próximo passo (depois de colocar um metodo "update", isso mesmo, é um CRUD sem "update") é com certeza fazer um componente de formulario reusavel. Aprender mais sobre lazy loading também pode ser uma boa

## highlights

![validators +](https://github.com/Kiryuss/techWorld/blob/master/src/assets/rdm/TechWorld-Google-Chrome-2021-01-26-00-37-47.gif?raw=true)

As validações foi algo que gastei um tempo aprendendo, o usuário VAI saber se não estiver dando certo.
