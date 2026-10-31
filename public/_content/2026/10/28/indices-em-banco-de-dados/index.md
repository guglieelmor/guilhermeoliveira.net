---
title: Índices em banco de dados - por que aquela consulta ficou lenta
date: '2026-10-28T09:00:00-03:00'
slug: indices-em-banco-de-dados
description: "Como um índice B-tree funciona, como ler um plano de execução com EXPLAIN, por que a ordem das colunas num índice composto importa e quando um índice atrapalha em vez de ajudar."
tags:
- banco de dados
- performance
- engenharia de software
---

Toda aplicação tem uma consulta que funcionava bem com mil linhas e começou a demorar segundos com um milhão. Na maioria das vezes, a causa não é o banco nem o servidor, e sim um índice que falta, ou um índice que existe mas não está sendo usado. Entender como os índices funcionam resolve boa parte desses casos sem trocar de tecnologia.

## O que é um índice

Sem índice, para achar os pedidos de um cliente o banco precisa ler a tabela inteira e testar linha por linha. Isso é uma **varredura sequencial** (*sequential scan*), e o custo cresce junto com a tabela.

Um índice é uma estrutura separada, mantida pelo banco, que guarda os valores de uma ou mais colunas em ordem, cada um apontando para a linha correspondente. O tipo mais comum é a **B-tree**, uma árvore balanceada em que cada busca percorre poucos níveis, mesmo com milhões de registros. É o mesmo princípio do índice remissivo de um livro: em vez de ler tudo, você vai direto à página.

## Leia o plano antes de adivinhar

Todo banco relacional mostra como pretende executar uma consulta. No PostgreSQL:

```sql
EXPLAIN ANALYZE
SELECT * FROM pedidos WHERE cliente_id = 42;
```

O `EXPLAIN` mostra o plano escolhido; com `ANALYZE`, o banco executa a consulta de verdade e mostra o tempo e o número real de linhas em cada etapa. Se aparecer `Seq Scan on pedidos` numa tabela grande com um filtro que devolve poucas linhas, é um bom candidato a índice:

```sql
CREATE INDEX idx_pedidos_cliente ON pedidos (cliente_id);
```

Rodando o `EXPLAIN ANALYZE` de novo, o plano deve passar a mostrar um `Index Scan`. Medir antes e depois é o que separa otimização de superstição.

## A ordem das colunas importa

Um índice composto em `(cliente_id, criado_em)` é ordenado primeiro por cliente e, dentro de cada cliente, por data. Por isso ele serve para:

- `WHERE cliente_id = 42`
- `WHERE cliente_id = 42 AND criado_em > '2026-01-01'`
- `WHERE cliente_id = 42 ORDER BY criado_em DESC`

Mas não ajuda muito em `WHERE criado_em > '2026-01-01'` sozinho, porque as datas estão espalhadas entre todos os clientes. A regra prática: colunas comparadas por igualdade vêm primeiro, e a coluna de intervalo ou de ordenação vem depois.

## Quando o índice existe e não é usado

- **Função sobre a coluna.** `WHERE LOWER(email) = 'ana@exemplo.com'` não usa um índice em `email`. A saída é criar um índice sobre a expressão, `CREATE INDEX ON usuarios (LOWER(email))`, ou guardar o valor já normalizado.
- **Curinga no começo.** `LIKE 'ana%'` pode usar uma B-tree; `LIKE '%ana'` não, porque não há um prefixo para procurar. Para busca por trechos de texto, existem índices próprios, como os de trigramas ou de busca textual.
- **Tipos diferentes.** Comparar uma coluna de texto com um número força uma conversão e pode impedir o uso do índice.
- **Filtro pouco seletivo.** Se a condição devolve metade da tabela, ler a tabela inteira em sequência costuma ser mais rápido do que pular de um lado para o outro pelo índice. O planejador sabe disso e ignora o índice de propósito.

## Índice não é de graça

Cada índice ocupa espaço e precisa ser atualizado a cada `INSERT`, `UPDATE` e `DELETE`. Numa tabela que recebe muita escrita, dez índices "por garantia" deixam as gravações mais lentas sem acelerar nada. Vale revisar de tempos em tempos quais índices nunca são usados; no PostgreSQL, a view `pg_stat_user_indexes` mostra quantas vezes cada um foi lido.

## Fechando

O caminho para uma consulta lenta é quase sempre o mesmo: rodar o `EXPLAIN ANALYZE`, entender onde está o custo, criar ou ajustar o índice certo e medir de novo. Raramente o problema pede um banco novo; quase sempre pede ler o plano que o banco já está mostrando.
