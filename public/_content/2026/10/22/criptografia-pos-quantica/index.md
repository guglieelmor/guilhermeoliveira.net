---
title: Criptografia pós-quântica - por que a migração começa antes do computador quântico chegar
date: '2026-10-22T09:00:00-03:00'
slug: criptografia-pos-quantica
description: "O que um computador quântico grande quebraria, o que o NIST padronizou em 2024 e o que times de software já podem fazer hoje para não serem pegos de surpresa."
tags:
- segurança
- criptografia
- tecnologia
---

Quase toda conexão segura na internet depende de dois tipos de matemática: a dificuldade de fatorar números grandes (RSA) e a dificuldade do logaritmo discreto em curvas elípticas (ECDH, ECDSA). Em 1994, Peter Shor mostrou que um computador quântico suficientemente grande resolveria os dois problemas com eficiência. Esse computador ainda não existe. Mesmo assim, governos e empresas já estão trocando a criptografia, e o motivo é bem prático.

## "Colha agora, decifre depois"

Um atacante pode gravar hoje o tráfego cifrado e guardar até ter capacidade de decifrá-lo. Para dados que precisam continuar secretos por dez ou vinte anos (prontuários médicos, segredos industriais, dados de governo), o risco já começou. A pergunta para cada sistema não é "quando chega o computador quântico", e sim "por quanto tempo esse dado precisa continuar secreto, e quanto tempo levamos para migrar?".

## O que o quântico quebra e o que não quebra

- **Quebra:** RSA, Diffie-Hellman e criptografia de curvas elípticas, ou seja, a troca de chaves e as assinaturas digitais que usamos hoje.
- **Enfraquece, mas não quebra:** a criptografia simétrica (AES) e as funções de hash (SHA-2, SHA-3). O algoritmo de Grover reduz a segurança efetiva pela metade, e por isso a recomendação é usar chaves de 256 bits.

## O que foi padronizado

Em agosto de 2024, o NIST, órgão de padrões dos Estados Unidos, publicou os primeiros padrões pós-quânticos, depois de um processo público iniciado em 2016:

- **ML-KEM (FIPS 203)**, derivado do Kyber, para troca de chaves.
- **ML-DSA (FIPS 204)**, derivado do Dilithium, para assinaturas digitais.
- **SLH-DSA (FIPS 205)**, derivado do SPHINCS+, assinatura baseada em hash, mais lenta e com assinaturas maiores, mas apoiada em hipóteses matemáticas mais conservadoras.

Os dois primeiros se baseiam em problemas de reticulados (*lattices*), que não têm atalho quântico conhecido.

## A transição já está no seu navegador

A troca de chaves foi a primeira a migrar, justamente por causa do "colha agora, decifre depois". Navegadores e grandes CDNs já negociam conexões TLS em modo **híbrido**, que combina uma troca clássica (X25519) com uma pós-quântica (ML-KEM). Se um dos dois algoritmos tiver uma falha desconhecida, o outro ainda protege a conexão. As assinaturas e os certificados ficam para uma etapa posterior, que é mais difícil: as chaves e assinaturas pós-quânticas são bem maiores, e isso pesa em handshakes e em dispositivos pequenos.

## O que um time de software pode fazer hoje

1. **Inventariar.** Onde a aplicação usa RSA ou curvas elípticas? TLS, JWT assinado, assinatura de arquivos, VPN, SSH, integrações com terceiros.
2. **Ter agilidade criptográfica.** O algoritmo deve ser configuração, não um detalhe espalhado pelo código. A migração de SHA-1 mostrou quanto custa não ter isso.
3. **Atualizar a base.** Muito da proteção vem de graça com versões recentes de OpenSSL, de bibliotecas TLS e do próprio sistema operacional.
4. **Priorizar pelo tempo de vida do dado.** Comece pelo que precisa continuar secreto por mais tempo.

## Fechando

A criptografia pós-quântica é um raro problema de segurança em que dá para se preparar com calma, desde que a preparação comece cedo. O computador quântico pode demorar, e as migrações de criptografia sempre demoraram mais do que o planejado.
