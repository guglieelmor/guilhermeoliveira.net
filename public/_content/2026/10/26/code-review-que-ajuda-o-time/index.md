---
title: Code review - como revisar código sem travar o time
date: '2026-10-26T09:00:00-03:00'
slug: code-review-que-ajuda-o-time
description: "Para que serve uma revisão de código, o que vale olhar com atenção, o que deixar para as ferramentas e como escrever comentários que melhoram o código sem desgastar quem escreveu."
tags:
- engenharia de software
- liderança técnica
- produtividade
---

Code review é uma das práticas mais comuns em times de software e uma das menos discutidas. Quase todo time revisa pull requests, mas poucos combinam o que estão procurando. O resultado aparece de duas formas: revisões que viram carimbo ("LGTM" em dois minutos num PR de mil linhas) ou revisões que viram gargalo, com PRs parados por dias esperando opinião sobre nome de variável.

## Para que serve, afinal

A revisão tem três objetivos, nessa ordem:

1. **Manter a saúde do código.** A pergunta central não é "está perfeito?", e sim "o código fica melhor do que estava depois desse PR?". Se fica, o PR deve entrar, mesmo que não seja do jeito que o revisor faria.
2. **Espalhar conhecimento.** Quem revisa aprende uma parte do sistema que não conhecia, e quem escreveu recebe contexto que talvez não tivesse. Num time onde só uma pessoa entende o módulo de pagamentos, a revisão é a forma mais barata de mudar isso.
3. **Pegar defeitos.** Revisão pega bugs, mas é pior nisso do que testes. Ela é boa em achar erros de lógica e de design que nenhum teste foi escrito para cobrir.

## O que olhar com atenção

- **Comportamento.** O código faz o que a descrição diz? E nos casos de borda: lista vazia, valor nulo, duas requisições ao mesmo tempo, falha de rede no meio da operação?
- **Design.** A mudança está no lugar certo? Cria uma abstração que vai ser usada uma vez só? Duplica algo que já existe em outro módulo?
- **Testes.** Os testes falhariam se o código estivesse errado? Teste que só aumenta a cobertura sem verificar nada dá falsa segurança.
- **Segurança e dados.** Entrada do usuário chegando numa consulta, segredo em log, migração que trava uma tabela grande em produção.
- **Legibilidade.** Daqui a seis meses, alguém sem contexto entende por que isso foi feito? Se não, falta um nome melhor ou um comentário explicando o porquê.

## O que deixar para as máquinas

Formatação, ordem de imports, ponto e vírgula, aspas simples ou duplas: tudo isso deveria estar num formatador e num linter rodando no CI. Cada comentário humano sobre estilo é tempo tirado das perguntas que só uma pessoa consegue fazer. Se o time discute o mesmo detalhe de estilo toda semana, a solução é uma regra automática, não mais um comentário.

## PRs pequenos revisam melhor

A qualidade da revisão cai rápido com o tamanho do PR. Em duzentas linhas, o revisor lê com cuidado; em duas mil, passa os olhos e aprova. Quebrar uma entrega grande em partes menores (primeiro o refactor, depois a feature, depois a limpeza) dá mais trabalho para quem escreve e economiza muito para o time. Uma descrição curta dizendo o que mudou, por quê, e como testar também ajuda mais do que parece.

## Comentários que ajudam

- **Diga o peso do comentário.** Prefixos simples resolvem: "bloqueante:", "sugestão:", "nit:" (detalhe que não impede o merge), "pergunta:". Assim quem recebe sabe o que precisa mudar e o que é opcional.
- **Comente o código, não a pessoa.** "Essa função faz duas coisas" em vez de "você misturou tudo aqui".
- **Explique o motivo.** "Isso pode gerar N+1 consultas quando a lista crescer" ensina; "muda isso" só manda.
- **Elogie o que está bom.** Não por educação, mas porque reforça o padrão que o time quer repetir.

## Tempo de resposta importa

Um PR esperando revisão é trabalho parado e mudança de contexto para quem escreveu. Vale combinar uma expectativa, por exemplo uma primeira resposta no mesmo dia útil, mesmo que seja só "vejo amanhã de manhã". Revisar rápido não significa revisar mal; significa tratar a revisão como parte do trabalho, não como interrupção.

## Fechando

Uma boa cultura de revisão não depende de revisores implacáveis, e sim de acordos claros: o que é bloqueante, o que é automático, quanto tempo um PR pode esperar. Com isso combinado, a revisão deixa de ser um pedágio e vira o lugar onde o time aprende junto.
