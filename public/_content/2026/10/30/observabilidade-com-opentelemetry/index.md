---
title: Observabilidade - logs, métricas e traces com OpenTelemetry
date: '2026-10-30T09:00:00-03:00'
slug: observabilidade-com-opentelemetry
description: "A diferença entre monitorar e observar, o papel de logs, métricas e traces, como o OpenTelemetry padronizou a coleta desses dados e por onde começar a instrumentar uma aplicação."
tags:
- observabilidade
- engenharia de software
- infraestrutura
---

Monitorar é saber que algo está errado: o alerta toca porque a taxa de erros passou de 5%. Observar é conseguir descobrir **por que** está errado sem precisar subir uma versão nova com mais logs. Quanto mais um sistema se espalha por serviços, filas e funções, mais essa diferença pesa, porque nenhuma pessoa consegue ter o caminho de uma requisição inteira na cabeça.

## Os três sinais

- **Logs** são registros de eventos: "pedido 123 criado", "falha ao chamar o gateway de pagamento". São ótimos para detalhe e ruins para visão geral. Logs estruturados, em JSON com campos fixos, são muito mais fáceis de filtrar do que frases soltas.
- **Métricas** são números agregados ao longo do tempo: requisições por segundo, latência no percentil 99, uso de memória. São baratas de guardar e boas para alertas e painéis, mas não dizem qual requisição específica falhou.
- **Traces** (rastros) mostram o caminho de uma requisição pelo sistema. Cada etapa é um *span*, com início, duração e atributos, e todos os spans da mesma requisição compartilham um identificador. É o trace que responde "a requisição demorou 3 segundos; 2,8 foram esperando aquele serviço de estoque".

Os três ficam muito mais úteis quando estão ligados: um log que carrega o identificador do trace permite sair de um erro no log para o caminho completo da requisição que o causou.

## O que é o OpenTelemetry

Durante anos, cada ferramenta de monitoramento tinha seu próprio agente e sua própria biblioteca. Trocar de fornecedor significava reinstrumentar a aplicação inteira. O **OpenTelemetry** nasceu em 2019, da fusão de dois projetos abertos (OpenTracing e OpenCensus), e hoje é mantido pela CNCF, a mesma fundação do Kubernetes. Ele define:

- **APIs e SDKs** para as principais linguagens, para gerar traces, métricas e logs.
- **Instrumentação automática** para bibliotecas comuns (frameworks HTTP, clientes de banco, filas), que gera spans sem alterar o código da aplicação.
- **O protocolo OTLP**, um formato padrão para enviar esses dados.
- **O Collector**, um serviço que recebe os dados, filtra, enriquece, faz amostragem e envia para um ou mais destinos.

A consequência prática é que a instrumentação deixa de depender do fornecedor. A aplicação fala OpenTelemetry; trocar onde os dados são guardados e visualizados vira mudança de configuração no Collector.

## Como o trace atravessa serviços

Quando o serviço A chama o serviço B, o identificador do trace precisa ir junto. O padrão W3C Trace Context define o cabeçalho HTTP `traceparent` para isso, e as bibliotecas do OpenTelemetry o propagam automaticamente nas chamadas instrumentadas. Em filas e eventos, o mesmo contexto vai nos metadados da mensagem. Se um serviço no meio do caminho não propaga o contexto, o trace se parte em dois e perde boa parte do valor.

## Por onde começar

1. **Ative a instrumentação automática** num serviço importante. Só isso já mostra as chamadas HTTP e as consultas ao banco de cada requisição.
2. **Suba um Collector** entre a aplicação e o destino, mesmo que no começo ele só repasse os dados. Ele é o ponto onde você vai controlar custo depois.
3. **Adicione atributos de negócio** aos spans: id do cliente, plano, tipo de operação. É isso que permite perguntar "a lentidão afeta todo mundo ou só um tipo de cliente?".
4. **Coloque o id do trace nos logs.** É uma mudança pequena com retorno grande.
5. **Cuide do volume.** Guardar todos os traces de um sistema movimentado fica caro rápido. Amostragem, por exemplo guardando todos os traces com erro e uma fração dos bem-sucedidos, resolve a maior parte do problema.
6. **Não mande dado sensível.** Senhas, tokens e dados pessoais não devem virar atributo de span nem linha de log.

## Fechando

Observabilidade não é uma ferramenta que se compra, e sim uma propriedade do sistema: a capacidade de responder perguntas que ninguém previu. O OpenTelemetry não resolve isso sozinho, mas tira do caminho a parte chata, que é amarrar o código a um fornecedor, e deixa o time concentrado nas perguntas que importam.
