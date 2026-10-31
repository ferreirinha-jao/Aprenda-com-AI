# Guia Completo de Claude Code: Do Zero ao Avançado

> **Formato:** curso prático em cinco módulos. O título do arquivo inclui “5h” como estimativa de estudo; o tempo real varia conforme experiência, configuração e exercícios. Os comandos e recursos podem mudar entre versões e sistemas operativos: confirme sempre a documentação oficial do Claude Code e as opções da instalação atual.

## Para quem é este guia

Este curso destina-se a pessoas que querem usar Claude Code para compreender projetos, criar funcionalidades, corrigir defeitos e acelerar protótipos de micro-SaaS. Não é preciso começar como especialista em programação, mas ajuda conhecer terminal, Git e os conceitos básicos de aplicações web.

Ao terminar, deverá conseguir orientar uma tarefa de desenvolvimento com contexto e critérios claros, rever as alterações propostas e validar o resultado. Claude Code é um assistente de desenvolvimento; não é uma garantia de código correto nem substitui revisão, testes ou responsabilidade técnica.

## Módulo 1 — Setup e instalação

### 1.1 Prepare o ambiente

Antes de instalar qualquer ferramenta, confirme:

- Qual o sistema operativo e terminal que utiliza.
- Se o projeto já está sob controlo de versão com Git.
- Se há alterações locais por guardar. Não as descarte para “limpar” o ambiente.
- Se possui uma conta Anthropic e acesso ao Claude Code no plano ou modalidade aplicável.
- Se a política da sua organização permite usar o serviço com o código e os dados em questão.

Instale Claude Code seguindo o método de instalação oficial atual da Anthropic para o seu sistema. Não execute comandos de instalação copiados de fontes não verificadas nem use scripts que não compreende. Depois da instalação, o comando `claude` costuma iniciar a ferramenta a partir do terminal integrado, mas confirme o nome e as opções disponíveis com a documentação da versão instalada.

```bash
claude --help
```

O comando acima serve para consultar a ajuda disponível na instalação local; as opções podem variar com a versão.

### 1.2 Use o terminal integrado do VS Code

1. Abra a pasta do projeto no VS Code, não apenas um arquivo isolado.
2. Abra o terminal integrado pelo menu **Terminal → Novo Terminal**.
3. Confirme a pasta atual e, se aplicável, o estado do Git com `pwd` e `git status` (no PowerShell, use `Get-Location` e `git status`).
4. Inicie Claude Code conforme a instalação e faça autenticação seguindo o fluxo oficial apresentado pelo produto.
5. Confira a identidade e a organização da conta antes de trabalhar com repositórios privados.

Não coloque tokens, senhas ou chaves de API em prompts, código do cliente, screenshots ou commits. A autenticação deve ocorrer pelo mecanismo oficial; não invente variáveis de ambiente ou flags que não estejam documentadas para a sua instalação.

### 1.3 Integração com VS Code

Claude Code pode ser usado a partir do terminal integrado. Caso exista uma extensão oficial compatível para a sua versão, instale-a apenas a partir de uma fonte verificada e consulte as permissões que solicita. A extensão é opcional; o terminal já permite trabalhar com o projeto, conforme as capacidades instaladas.

**Exercício:** abra um repositório de teste, verifique o estado do Git e peça ao Claude Code uma descrição da estrutura sem permitir alterações. Compare o resumo com o que vê no explorador de arquivos.

## Módulo 2 — Princípios e navegação do projeto

### 2.1 Como funciona o contexto local

Claude Code pode inspecionar arquivos aos quais a sessão e as ferramentas têm acesso. Pode pesquisar nomes e texto, ler partes relevantes e usar instruções do projeto que estejam disponíveis. Isto ajuda a responder com base na estrutura real do repositório em vez de depender somente de uma descrição escrita pelo utilizador.

Isto **não significa contexto total, leitura permanente de todos os arquivos nem ausência de alucinações**. Projetos extensos podem exigir pesquisa seletiva, e informação fora do contexto disponível pode ser ignorada. O agente também pode interpretar incorretamente uma chamada, um teste ou uma convenção. Peça sempre evidências: arquivos, símbolos, testes e hipóteses por confirmar.

### 2.2 Um ciclo de trabalho confiável

1. **Orientar:** descreva o objetivo, quem usa a funcionalidade e o comportamento esperado.
2. **Inspecionar:** peça para encontrar o caminho de código relevante, os testes e as instruções locais.
3. **Planejar:** solicite uma alteração pequena, os arquivos envolvidos e os riscos.
4. **Aprovar:** reveja o plano antes de modificações amplas ou operações externas.
5. **Implementar:** faça uma alteração por vez, preservando padrões e trabalho existente.
6. **Verificar:** execute testes, lint, build ou uma reprodução manual apropriada.
7. **Rever:** inspecione o diff e confirme que a mudança corresponde ao pedido.

### 2.3 Instruções persistentes do repositório

Alguns projetos incluem arquivos de instruções para registar comandos, convenções, arquitetura e verificações importantes. Claude Code pode seguir instruções que estejam disponíveis e sejam compatíveis com a configuração, mas instruções desatualizadas também podem induzir erros. Mantenha-as curtas, específicas e revisadas.

**Exercício de navegação:**

```text
Inspecione este repositório sem editar arquivos.

1. Identifique a stack, os pontos de entrada e as instruções locais.
2. Localize os testes e comandos de validação existentes.
3. Resuma o fluxo de dados da funcionalidade [nome ou comportamento].
4. Cite os arquivos e símbolos que consultou.
5. Separe fatos observados de hipóteses e indique o que não conseguiu confirmar.
```

**Critério de conclusão:** consegue explicar o caminho de execução e apontar os arquivos de suporte sem depender apenas de um resumo genérico.

## Módulo 3 — Vibe coding na prática

### 3.1 Da ideia ao requisito

Vibe coding usa linguagem natural para orientar a criação e alteração de software. A conversa pode acelerar a exploração, mas o resultado melhora quando o pedido descreve utilizador, tarefa, estado esperado e limites técnicos. Comece por uma funcionalidade vertical pequena, não por “construir o SaaS inteiro”.

Uma especificação inicial pode responder:

- Quem vai utilizar a funcionalidade?
- Que tarefa precisa de concluir?
- Que dados são necessários e de onde vêm?
- O que deve acontecer quando falta informação ou ocorre um erro?
- Como saberemos que funcionou?
- O que está explicitamente fora do escopo?

### 3.2 Criar uma funcionalidade ou componente

Exemplo: uma lista de tarefas com pesquisa e filtro de estado. Peça primeiro ao agente para localizar a estrutura atual e propor a alteração; depois, aprove um plano que respeite o framework e os componentes já usados.

```text
Quero adicionar pesquisa por título e filtro por estado à lista de tarefas existente.

Comportamento esperado:
- A pesquisa não diferencia maiúsculas de minúsculas.
- Os filtros disponíveis são Todas, A fazer e Concluídas.
- Pesquisa e filtro devem funcionar ao mesmo tempo.
- Um estado vazio deve explicar que não existem tarefas correspondentes.

Antes de editar, localize a lista, os tipos de dados e os testes relacionados. Proponha os arquivos a alterar e um plano curto. Depois de eu aprovar, implemente seguindo os padrões do projeto, adicione testes e execute as verificações disponíveis. Não faça deploy nem altere dados reais.
```

Depois da implementação, valide pelo menos: lista com resultados, lista vazia, combinação de filtros, entrada sem correspondências e comportamento em ecrã estreito, quando aplicável.

### 3.3 Criar scripts úteis

Claude Code também pode ajudar com scripts de migração, tarefas de manutenção, validação ou geração de relatórios. Antes de executar um script que escreve ou elimina dados:

- Peça uma explicação de entradas, saídas e efeitos secundários.
- Use uma amostra ou cópia de teste.
- Prefira modo de simulação (`dry run`) quando suportado e implemente-o se necessário.
- Faça backup e peça confirmação explícita antes de operações destrutivas.

### 3.4 Limites do protótipo

Uma interface que abre no navegador não é necessariamente uma aplicação pronta para produção. Autenticação, autorização no servidor, validação de dados, proteção de segredos, acessibilidade, monitorização, backups, custos e manutenção têm de ser planeados e testados separadamente.

**Exercício:** implemente uma única funcionalidade de baixo risco num projeto de teste. Registe a hipótese, os critérios de aceitação, o diff e o resultado dos testes.

## Módulo 4 — Debugging e refatoração segura

### 4.1 Investigar antes de corrigir

Um bom pedido de debugging descreve o que aconteceu, o que era esperado e como reproduzir. Se houver uma mensagem de erro, inclua-a sem credenciais, dados pessoais ou conteúdo confidencial desnecessário.

Peça ao agente para:

1. Encontrar o ponto de entrada e seguir o fluxo relevante.
2. Distinguir factos observados de causas prováveis.
3. Propor uma hipótese testável e o menor teste que a confirme ou descarte.
4. Corrigir apenas o comportamento relacionado.
5. Executar a verificação mais próxima do código alterado.

### 4.2 Prompt para corrigir um bug

```text
Investigue este defeito sem editar ainda.

Comportamento atual: [o que acontece].
Comportamento esperado: [o que deveria acontecer].
Passos para reproduzir: [passos].
Erro observado: [mensagem sanitizada, se existir].

Localize o caminho de código relevante e os testes próximos. Explique a causa mais provável, indique as evidências e proponha um teste que reproduza o defeito. Depois da minha aprovação, implemente a menor correção possível, rode o teste novo e as verificações pertinentes. Preserve alterações locais não relacionadas.
```

### 4.3 Refatorar sem mudar comportamento

Refatoração é reorganizar o código sem alterar resultados observáveis. Antes de começar, registe o comportamento que deve continuar igual e identifique a cobertura de testes. Faça mudanças incrementais e compare os resultados antes e depois.

- Evite combinar uma refatoração ampla com novas funcionalidades.
- Não remova código só porque parece não ser usado; procure referências e confirme o fluxo.
- Compare o diff e procure mudanças acidentais em configurações ou dependências.
- Se os testes forem insuficientes, adicione caracterização do comportamento antes de reorganizar.

### 4.4 Verificação e revisão

Execute os comandos documentados pelo projeto, por exemplo testes, lint ou compilação. Não presuma que os comandos são iguais em todos os repositórios. Se uma verificação falhar, leia a saída completa e determine se o erro foi introduzido pela mudança ou já existia.

**Checklist de revisão:**

- A causa foi demonstrada, e não apenas presumida?
- A alteração cobre o caso que reproduzia o defeito?
- Foram considerados erros, valores nulos e entradas inesperadas?
- Os testes e a compilação relevantes foram executados?
- O diff contém apenas mudanças relacionadas?
- A alteração exige atualização de documentação ou migração?

## Módulo 5 — Recursos avançados e MCP

### 5.1 O que é MCP

MCP (Model Context Protocol) é um protocolo para disponibilizar ferramentas e contextos externos a aplicações de IA por meio de servidores MCP. Um servidor pode expor recursos ou ações; o que Claude Code consegue fazer depende da configuração, do servidor, das permissões concedidas e da versão instalada.

MCP não é uma conexão automática nem uma autorização universal para controlar serviços. Antes de configurar um servidor, verifique a origem, o código ou documentação, as permissões, os dados que serão transmitidos e como os segredos são guardados. Use o mecanismo de configuração oficial para a versão atual do Claude Code; não copie configurações de exemplo sem compreender cada campo.

### 5.2 Ligar um fluxo a N8N ou a uma API

Uma integração com N8N pode permitir que um fluxo seja acionado ou consultado por uma ferramenta compatível, mas exige que alguém configure o servidor, o fluxo, a autenticação e os limites. Não exponha uma instância de automação publicamente sem controlo de acesso. Para APIs externas, use credenciais com privilégios mínimos e mantenha-as fora do repositório e do contexto visível.

Antes de permitir ações, determine:

- Que ferramentas ou endpoints são necessários e quais ficam proibidos.
- Que tipo de dados pode sair do projeto e para que finalidade.
- Quais ações são apenas leitura e quais alteram sistemas externos.
- Quando é obrigatória uma confirmação humana.
- Como registar e investigar erros sem armazenar dados sensíveis em excesso.
- Como revogar o acesso e rodar credenciais.

### 5.3 Fluxos agênticos com limites

Um fluxo com várias etapas pode analisar um pedido, consultar uma fonte, preparar uma alteração e verificar o resultado. Para torná-lo controlável, dê-lhe um objetivo específico, ferramentas limitadas, critérios de conclusão, número máximo de tentativas e uma condição de paragem. Ações irreversíveis, pagamentos, publicação ou envio de mensagens devem exigir autorização humana apropriada.

### 5.4 Exercício seguro de desenho MCP

Sem ligar um servidor real, escreva uma especificação de integração:

```text
Quero avaliar uma integração entre Claude Code e [serviço ou fluxo N8N].

Objetivo: [tarefa única].
Dados necessários: [campos mínimos].
Ações permitidas: [lista explícita].
Ações proibidas: [lista explícita].
Autenticação: ainda não configurada.

Não tente ligar ao serviço nem criar credenciais. Desenhe a arquitetura, indique os riscos, proponha um teste com dados fictícios e liste o que preciso confirmar na documentação oficial antes de ativar a integração.
```

Só passe do desenho ao teste quando compreender a origem do servidor, as permissões e o tratamento dos dados. Comece em ambiente de teste e com dados sintéticos.

## Projeto final — uma funcionalidade de micro-SaaS

Escolha uma ideia pequena e produza uma entrega verificável:

1. Escreva o problema e o utilizador em duas frases.
2. Defina uma funcionalidade central e três critérios de aceitação.
3. Peça ao Claude Code para inspecionar o repositório e propor um plano.
4. Aprove uma alteração pequena, implemente e reveja o diff.
5. Execute testes e experimente casos de sucesso e falha.
6. Documente o que ainda falta para produção, incluindo segurança e operação.

Não integre dados reais nem publique o projeto apenas porque o protótipo funciona. Valide a necessidade com utilizadores e faça a revisão técnica adequada ao risco.

## Conclusão — velocidade com controlo

Dominar Claude Code não é aprender uma coleção de comandos mágicos. É aprender a orientar um agente com contexto suficiente, objetivos claros, permissões proporcionais e verificações independentes. Esse método pode acelerar protótipos e micro-SaaS, libertando tempo para aprender com utilizadores e melhorar o produto.

Comece com uma alteração pequena, peça inspeção antes de edição e valide cada resultado. À medida que ganha confiança, avance para tarefas maiores sem abrir mão de revisão, segurança e responsabilidade sobre o código que coloca em uso.
# Guia Completo de Claude Code: Do Zero ao Avançado

**Formato:** curso prático por módulos  
**Público:** pessoas desenvolvedoras, criadores de micro-SaaS e equipas que querem trabalhar com mais autonomia  
**Objetivo:** aprender a orientar Claude Code para entender um repositório, implementar alterações verificáveis, corrigir problemas e integrar ferramentas com limites claros.

> **Nota sobre a duração:** os módulos formam uma trilha de estudo que pode ser distribuída por cerca de cinco horas. O tempo real varia conforme a experiência, a instalação, o projeto e os exercícios. Não é uma promessa de domínio ou de entrega de software pronto para produção em cinco horas.

## O que é Claude Code

Claude Code é uma ferramenta de desenvolvimento assistido por IA que pode trabalhar com código e outros arquivos de um projeto. Dependendo do ambiente e das permissões, pode ajudar a inspecionar ficheiros, responder a perguntas sobre o repositório, propor alterações, editar código e executar comandos ou testes.

A mudança prática está em aproximar raciocínio e ação: em vez de copiar trechos isolados para uma conversa, você pode orientar o agente no contexto de um projeto. Ainda assim, a ferramenta não conhece ficheiros que não consegue aceder, não mantém necessariamente todo o repositório no contexto ativo e pode cometer erros. O trabalho continua a exigir revisão, testes e decisões humanas.

## Antes de começar

- Use um repositório de teste ou uma cópia de trabalho e confirme que as alterações existentes estão guardadas ou registadas no controlo de versão.
- Não coloque senhas, tokens, chaves privadas nem dados reais de clientes nos prompts.
- Instale Claude Code apenas através dos canais oficiais da Anthropic e confira os requisitos atuais para o seu sistema operativo.
- A instalação, o método de autenticação, a disponibilidade do editor e os limites de uso podem depender do sistema, da conta e do plano.
- Trabalhe inicialmente num projeto sem dados sensíveis e não autorize comandos cujo efeito não compreenda.

## Módulo 1 — Setup e instalação

### 1.1 Preparar o ambiente

Claude Code pode ser usado a partir do terminal e, conforme a versão e configuração disponíveis, integrado ao fluxo do VS Code. No Windows, verifique a documentação oficial para escolher o ambiente suportado pela versão atual, como instalação nativa, WSL ou outro terminal compatível. Não misture instruções de macOS/Linux com PowerShell sem confirmar que se aplicam ao seu ambiente.

Instale a ferramenta seguindo o método indicado pela Anthropic para a sua plataforma. Se a documentação da versão escolhida recomendar o instalador npm, confirme previamente que o Node.js requerido está instalado e use o pacote oficial:

```sh
npm install -g @anthropic-ai/claude-code
```

Não execute um comando de instalação copiado de uma fonte não oficial. Se a Anthropic indicar outro instalador para o seu sistema, siga essa instrução em vez do exemplo acima.

### 1.2 Confirmar a instalação e autenticar

Abra um terminal na pasta do projeto e confirme que o comando está disponível:

```sh
claude --version
```

Inicie Claude Code a partir do diretório em que pretende trabalhar:

```sh
cd caminho/para/o-projeto
claude
```

Na primeira utilização, siga o fluxo de autenticação apresentado pela ferramenta e autentique-se usando uma conta ou método autorizado pela Anthropic. Não cole credenciais na conversa nem as grave em ficheiros do repositório. Para ambientes de equipa, confirme com a administração quais contas, políticas e limites de uso se aplicam.

### 1.3 Ligar o fluxo ao VS Code

Abra o mesmo diretório como workspace no VS Code e use o terminal integrado ou a extensão oficial, se estiver disponível e for apropriada para a sua configuração. A integração de editor pode apresentar diffs e contexto de forma mais cómoda; ela não substitui a inspeção do que será alterado.

Antes de aceitar uma alteração, confirme:

- qual repositório e ramo estão abertos;
- que ficheiros têm alterações locais;
- qual é a pasta de trabalho autorizada;
- que o agente não está a operar sobre dados de produção por engano.

### Exercício do módulo

Abra um projeto de exemplo sem informação privada e peça ao Claude Code que descreva a stack, os diretórios principais e os comandos de teste encontrados. Nesta primeira tarefa, peça explicitamente **para não editar ficheiros**.

## Módulo 2 — Princípios e navegação pelo projeto

### Como funciona o contexto local

Claude Code pode ler ficheiros do projeto que estejam acessíveis e que sejam relevantes para a tarefa, de acordo com a ferramenta, as permissões e o ambiente. Isso permite perguntas mais específicas do que uma conversa sem contexto local. Não significa que todo o projeto esteja permanentemente carregado na conversa ou que cada resposta tenha considerado cada ficheiro.

Um repositório pode conter ficheiros ignorados, diretórios excluídos, dependências enormes ou documentos que não devem ser consultados. O contexto ativo também tem limites. Peça ao agente que identifique quais ficheiros analisou e confirme afirmações importantes no código ou nos testes.

### Orientações do projeto

Instruções de projeto, como um ficheiro `CLAUDE.md` quando suportado pelo fluxo utilizado, podem explicar comandos, arquitetura, convenções e limites. Mantenha-as concisas e atualizadas. Não as trate como controlo de segurança: segredos e permissões devem ser protegidos por mecanismos próprios do sistema e do ambiente.

### Navegação sem alterações

Comece com um pedido de inspeção:

```text
Analise o repositório sem alterar ficheiros.
Identifique a stack, o ponto de entrada, os módulos relacionados com [funcionalidade]
e os comandos de teste e lint definidos no projeto.
Explique de onde concluiu cada ponto e indique o que não conseguiu confirmar.
```

Depois, aprofunde a área responsável pelo comportamento em questão. Evite pedir uma revisão genérica de todo o projeto quando existe um sintoma específico: localizar o caminho de código mais próximo costuma produzir uma resposta mais verificável.

### Exercício do módulo

Escolha uma funcionalidade pequena. Peça ao agente para localizar a implementação, um teste relacionado e um ponto de chamada. Compare as referências apresentadas com os ficheiros reais antes de avançar.

## Módulo 3 — Vibe coding na prática

“Vibe coding” é uma forma conversacional de orientar desenvolvimento. Para obter resultados úteis, transforme a intenção numa especificação que possa ser revista: utilizador, tarefa, entradas, resultado, estados de erro e critérios de aceitação.

### Criar uma funcionalidade

Use este padrão de pedido:

1. **Contexto:** descreva a aplicação e a área relevante.
2. **Resultado:** explique o que o utilizador deve conseguir fazer.
3. **Limites:** indique o que não deve mudar e quais dependências podem ser usadas.
4. **Plano:** peça uma proposta de implementação antes da edição.
5. **Validação:** determine como testar sucesso, erro e casos limite.

Exemplo para criar um filtro numa lista:

```text
Quero adicionar filtros por estado e data à lista de pedidos.

Comportamento esperado:
- Os filtros podem ser usados em conjunto.
- Limpar filtros restaura a lista completa.
- O estado vazio explica que não há resultados para a seleção atual.

Primeiro localize a lista, a origem dos dados e os testes existentes. Não altere ficheiros ainda. Proponha os ficheiros que pretende modificar e os casos de teste. Depois de eu aprovar, implemente a menor alteração possível, sem adicionar dependências se a stack atual já resolver o problema.
```

### Criar componentes ou scripts do zero

Antes de gerar um componente, confirme os padrões de estilo, acessibilidade, tratamento de erros e organização do projeto. Para scripts de manutenção, peça modo de simulação (*dry run*) quando for possível e exija uma explicação sobre entradas, saídas e efeitos colaterais.

Não autorize scripts que eliminem, enviem ou alterem dados em massa sem compreender a operação. Faça primeiro uma execução em dados sintéticos ou num ambiente de teste.

### Iterar por fatias pequenas

Implemente primeiro um fluxo vertical mínimo, como formulário, validação e confirmação. Depois amplie com estados de carregamento, falha, permissões e acessibilidade. Revise cada diff antes de pedir a próxima funcionalidade; isso torna mais fácil identificar a origem de regressões.

### Exercício do módulo

Implemente uma melhoria pequena numa aplicação de exemplo, como filtrar uma lista ou validar um formulário. Registe o comportamento anterior, aprove o plano, reveja o diff e execute os testes definidos no projeto.

## Módulo 4 — Debugging e refatoração segura

### Investigar antes de corrigir

Um bom fluxo de debugging começa com uma reprodução clara. Forneça a mensagem de erro, passos para reproduzir, comportamento esperado e observado, e o ambiente relevante. Peça hipóteses ordenadas e um teste que ajude a distingui-las, em vez de solicitar uma correção imediata sem diagnóstico.

```text
Investigue este bug antes de editar.

Passos: [passos mínimos para reproduzir]
Esperado: [comportamento correto]
Observado: [comportamento atual e erro, se existir]

Localize o caminho de execução relevante e os testes relacionados. Explique a causa mais provável, cite os ficheiros envolvidos e proponha um teste que falhe antes da correção. Não altere ficheiros até eu aprovar o plano.
```

### Corrigir com evidência

Depois de confirmar a causa, peça uma alteração pequena e um teste de regressão. O teste deve demonstrar o problema antes e o comportamento esperado depois. Se uma verificação falhar, leia o erro completo e determine se revela um defeito na mudança, no teste ou no ambiente.

### Refatorar sem mudar comportamento por acidente

Refatoração deve preservar contratos e comportamento observável. Defina a razão, os módulos dentro do âmbito e os testes que protegem o resultado. Evite combinar renomeações extensas, mudanças de arquitetura e novas funcionalidades numa única alteração difícil de rever.

### Checklist antes de aceitar

- O diff está limitado ao objetivo?
- Há alterações a ficheiros não relacionados ou a dados que não foram autorizadas?
- Os testes cobrem o comportamento novo e um caso de falha?
- O lint, typecheck ou build disponível foi executado?
- Foram adicionadas dependências, permissões ou chamadas externas?
- A mudança altera autenticação, dados, pagamentos ou comportamento em produção?

### Exercício do módulo

Introduza um defeito simples num projeto de treino, escreva passos de reprodução e peça ao agente que diagnostique primeiro. Compare a hipótese com o teste de regressão e só depois aprove a correção.

## Módulo 5 — Recursos avançados e MCP

### O que é MCP

MCP, ou Model Context Protocol, é um protocolo que permite ligar aplicações de IA a servidores que expõem ferramentas ou recursos. Claude Code só pode usar integrações que estejam realmente configuradas e disponíveis no ambiente. MCP não cria automaticamente acesso a qualquer API e não torna uma ligação segura por si só.

A configuração exata depende do cliente, da versão, do servidor MCP e do método de autenticação. Consulte a documentação oficial do Claude Code e do servidor antes de adicionar uma integração. Não copie configurações de origem desconhecida nem grave tokens em ficheiros versionados.

### Ligar um fluxo n8n ou uma API

Há várias arquiteturas possíveis:

- Claude Code pode ajudar a escrever ou rever um workflow n8n no projeto, se os ficheiros estiverem acessíveis.
- Um servidor MCP pode disponibilizar operações de um sistema externo, se existir e estiver configurado com permissões apropriadas.
- Uma API pode ser integrada diretamente pelo software do projeto, com autenticação e validação implementadas no lado do servidor.

Essas opções não são intercambiáveis. Um workflow n8n não se torna um servidor MCP automaticamente; é preciso uma integração explícita ou uma API documentada. Não invente endpoints, payloads ou variáveis de autenticação: use a documentação real do serviço.

### Regras para integrações externas

1. Use credenciais de desenvolvimento com privilégios mínimos e, quando possível, dados de teste.
2. Guarde segredos em mecanismos locais ou variáveis de ambiente apropriados; não os inclua no código, prompts, logs ou controlo de versão.
3. Prefira operações de leitura para a primeira validação.
4. Exija confirmação antes de ações que enviem mensagens, alterem registos, criem recursos ou afetem produção.
5. Valide entradas, limites de taxa, erros e assinaturas de webhook conforme a documentação do provedor.
6. Registe apenas o mínimo necessário para auditoria e diagnóstico.
7. Remova a integração e revogue credenciais quando deixarem de ser necessárias.

### Prompt para planear uma integração

```text
Quero avaliar uma integração entre este projeto e [serviço/n8n/API] usando [MCP ou API documentada].

Não execute operações externas nem use credenciais reais.
Primeiro:
1. Inspecione a documentação local e a configuração existente.
2. Identifique servidor, ferramentas, permissões, dados trocados e efeitos colaterais.
3. Indique que informações ainda faltam e quais endpoints ou payloads não estão documentados.
4. Proponha um teste isolado com dados sintéticos e uma forma de revogar o acesso.

Aguarde aprovação antes de editar configuração, instalar dependências ou conectar uma conta.
```

### Exercício do módulo

Desenhe, sem conectar uma conta, um fluxo de teste que recebe um pedido fictício e prepara uma ação n8n simulada. Documente os dados de entrada, a saída esperada, as permissões necessárias e a condição de aprovação humana.

## Um método de trabalho para cada tarefa

| Fase | O que fazer | Verificação |
|---|---|---|
| Entender | Descrever o problema e localizar o código responsável | Confirmar ficheiros e hipóteses |
| Planear | Definir escopo, critérios e riscos | Aprovar a lista de alterações |
| Implementar | Trabalhar numa fatia pequena | Rever o diff |
| Testar | Executar testes e verificações relevantes | Confirmar resultado e limitações |
| Integrar | Rever dependências, permissões e efeitos externos | Autorizar explicitamente operações sensíveis |
| Aprender | Documentar decisões e atualizar instruções do projeto | Manter documentação concisa e sem segredos |

## Conclusão — criar micro-SaaS com mais velocidade e controlo

Dominar Claude Code não é aprender um prompt mágico. É desenvolver um método: dar contexto suficiente, escolher uma tarefa delimitada, pedir um plano, rever alterações e validar resultados. Esse método pode acelerar protótipos, micro-SaaS e trabalho de manutenção, sem confundir velocidade com qualidade ou autonomia com ausência de responsabilidade.

Comece com um projeto de treino, uma tarefa pequena e dados sintéticos. Aumente o âmbito apenas quando compreender as permissões, os riscos e os testes necessários. A velocidade sustentável vem de ciclos curtos e verificáveis: construir mais depressa, aprender com o uso e manter o controlo sobre o produto.
