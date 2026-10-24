---
title: Agentes de IA no desenvolvimento - o que muda quando o assistente passa a executar
date: '2026-10-06T09:00:00-03:00'
slug: agentes-de-ia-no-desenvolvimento
description: "Dos autocompletes aos agentes que leem o repositório, rodam testes e abrem pull requests: o que esses sistemas fazem bem, onde erram e como um time pode adotá-los sem perder o controle do código."
tags:
- inteligência artificial
- engenharia de software
- produtividade
---

Durante alguns anos, "IA para programar" significou autocompletar: o editor sugeria a próxima linha e a gente aceitava ou ignorava. A mudança mais recente é de natureza, não de grau. Os **agentes de código** recebem um objetivo, leem o repositório, editam vários arquivos, rodam comandos, observam o resultado e tentam de novo. O assistente deixou de sugerir e passou a executar.

## O que é, na prática, um agente de código

Um agente é um modelo de linguagem dentro de um laço: ele planeja um passo, chama uma ferramenta (ler um arquivo, buscar no código, rodar os testes, executar um comando no terminal), recebe a saída e decide o próximo passo. O que diferencia um agente útil de um brinquedo é justamente esse retorno do ambiente. Sem rodar os testes, o modelo só imagina que o código funciona; rodando, ele descobre que não funciona e corrige.

Na prática isso aparece de três formas:

- **No editor**, como um modo que altera vários arquivos de uma vez a partir de um pedido.
- **No terminal**, como uma ferramenta de linha de comando que trabalha dentro do repositório local.
- **Na nuvem**, como um serviço que recebe uma tarefa (uma issue, por exemplo) e devolve um pull request.

## Onde eles vão bem

Tarefas com começo, meio e fim verificáveis são o terreno natural: escrever testes para um módulo existente, migrar uma API depreciada em dezenas de arquivos, corrigir um bug com passo a passo de reprodução, atualizar dependências e ajustar o que quebrou. Também ajudam muito a **entender código alheio**: perguntar "onde esse valor é calculado?" num repositório grande economiza uma tarde de busca.

## Onde eles erram

Os erros mais comuns não são de sintaxe, são de julgamento:

- **Resolver o problema errado** quando o pedido é vago.
- **Contornar em vez de corrigir**, por exemplo silenciando um teste que falha.
- **Inventar** uma função ou um parâmetro de biblioteca que não existe.
- **Exagerar no escopo**, refatorando o que ninguém pediu.

Todos têm a mesma origem: o agente otimiza para "a tarefa parece concluída", e cabe ao time definir o que concluído significa.

## Como adotar sem perder o controle

O que tem funcionado melhor em times é tratar o agente como um colega novo e rápido, que precisa de contexto e revisão:

1. **Testes primeiro.** Um repositório com boa suíte de testes é o que transforma o agente de gerador de palpites em ferramenta confiável.
2. **Instruções no repositório.** Um arquivo com as convenções do projeto (como rodar, como testar, o que não tocar) é lido pelo agente a cada tarefa.
3. **Tarefas pequenas.** Um pull request de 50 linhas é revisável; um de 3.000 não é, venha de quem vier.
4. **Permissões explícitas.** O agente não precisa de acesso a produção nem às credenciais do time para escrever um teste.
5. **Revisão humana obrigatória.** O autor do pull request continua responsável pelo que entra na `main`.

## E a carreira de quem programa?

A pergunta que sempre aparece em sala é se vale a pena aprender a programar. A minha resposta curta: vale mais do que antes. Escrever código ficou mais barato, mas **ler, avaliar e decidir** ficou mais valioso. Quem sabe dizer por que uma solução está errada, ou por que uma arquitetura não vai aguentar o próximo ano, consegue tirar proveito real de um agente. Quem não sabe, aceita o primeiro resultado que compila.
