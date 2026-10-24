---
title: Passkeys - como funciona o login sem senha que já está no seu celular
date: '2026-10-14T09:00:00-03:00'
slug: passkeys-e-o-fim-das-senhas
description: "O que é uma passkey, por que ela resiste a phishing, como o WebAuthn funciona por baixo e o que considerar antes de adotar passkeys num sistema próprio."
tags:
- segurança
- autenticação
- desenvolvimento web
---

Senha é um segredo que o usuário inventa, esquece, reutiliza e digita em qualquer página que pareça a certa. Boa parte dos incidentes de segurança começa aí: vazamento de uma base, reutilização em outro serviço, phishing bem feito. As **passkeys** propõem trocar esse segredo compartilhado por um par de chaves criptográficas, e já estão disponíveis nos principais sistemas operacionais, navegadores e gerenciadores de senha.

## O que é uma passkey

Uma passkey é uma credencial do padrão **WebAuthn/FIDO2**. No cadastro, o dispositivo do usuário gera um par de chaves:

- a **chave privada** fica no dispositivo ou no gerenciador de senhas e nunca é enviada;
- a **chave pública** vai para o servidor.

No login, o servidor manda um desafio aleatório, o dispositivo assina esse desafio com a chave privada (depois de desbloquear com digital, rosto ou PIN) e o servidor confere a assinatura com a chave pública. Não há segredo trafegando nem guardado no servidor: se a base vazar, o atacante leva só chaves públicas, que não servem para entrar em lugar nenhum.

## Por que resiste a phishing

Esse é o ponto mais importante e o menos comentado. A passkey fica **vinculada ao domínio** em que foi criada. Uma página falsa em `banco-seguro-login.com` simplesmente não consegue pedir a passkey de `banco.com.br`, porque o navegador não entrega. Com senha e até com código SMS, a defesa depende de o usuário perceber o golpe; com passkey, quem confere é o navegador.

## Sincronizada ou presa ao aparelho

Existem dois tipos:

- **Sincronizadas**: ficam no gerenciador do sistema ou de terceiros e aparecem em todos os aparelhos da mesma conta. Resolvem o medo de perder o celular.
- **Vinculadas ao dispositivo**: ficam numa chave de segurança física ou num único aparelho. São mais restritas, preferidas em ambientes corporativos de alto risco.

Também é possível usar uma passkey do celular para entrar num computador que não tem nenhuma, lendo um QR code. A comunicação usa Bluetooth para provar que os dois aparelhos estão perto.

## Adotando num sistema próprio

Do lado do desenvolvedor, o navegador expõe `navigator.credentials.create()` para o cadastro e `navigator.credentials.get()` para o login, e o servidor valida as respostas. A recomendação é não implementar a verificação na mão: há bibliotecas maduras para Node.js, PHP, Python e outras linguagens. Alguns cuidados:

1. **Comece como opção, não como obrigação.** Ofereça "criar uma passkey" depois do login tradicional.
2. **Use o preenchimento automático** (*conditional UI*), para a passkey aparecer na própria caixa de login.
3. **Planeje a recuperação de conta.** O elo mais fraco passa a ser o "esqueci meu acesso"; ele precisa ser tão seguro quanto o resto.
4. **Permita várias passkeys por usuário** e mostre onde cada uma foi criada, para a pessoa poder revogar a de um aparelho perdido.

## Fechando

Passkeys não acabam com todo o problema de identidade, mas eliminam as duas maiores fontes de dor: senhas fracas reutilizadas e phishing. Para quem desenvolve, é uma das raras melhorias de segurança que também deixam o login mais rápido para o usuário.
