# Product Requirements Document: Jogo da Velha (Implementação Básica)

## Problem Statement

Precisamos de uma versão digital funcional, simples e robusta do clássico Jogo da Velha (Tic-Tac-Toe). O objetivo neste momento não é inovar nas regras, mas sim estabelecer uma base sólida de código e arquitetura que permita, no futuro, a adição de mecânicas avançadas e complexas (os "esteroides").

## Solution

Uma aplicação web simples contendo o Jogo da Velha tradicional (tabuleiro 3x3). O jogo será jogado localmente (dois jogadores no mesmo dispositivo, alternando turnos entre "X" e "O"). A aplicação deve identificar automaticamente condições de vitória, derrota ou empate e permitir o reinício da partida. O foco deve ser a separação clara entre a lógica de estado do jogo e a interface do usuário.

## User Stories

1. Como jogador, eu quero ver um tabuleiro de 3x3 na tela, para que eu saiba onde posso realizar minhas jogadas.
2. Como jogador (X ou O), eu quero poder clicar em um espaço vazio do tabuleiro para marcar meu símbolo, para que eu possa fazer meu movimento no meu turno.
3. Como jogador, eu quero que o sistema impeça que eu jogue em uma casa que já foi preenchida, para que as regras do jogo sejam mantidas.
4. Como jogador, eu quero que o símbolo mude automaticamente (de X para O e vice-versa) a cada jogada bem-sucedida, para que possamos alternar os turnos sem configuração manual.
5. Como jogador, eu quero que o jogo anuncie imediatamente quando um jogador alinhar 3 símbolos (horizontal, vertical ou diagonal), para que saibamos quem venceu a partida.
6. Como jogador, eu quero que o jogo anuncie um "Empate" (Velha) quando todas as 9 casas estiverem preenchidas e ninguém tiver vencido, para que saibamos que a partida terminou sem vencedores.
7. Como jogador, eu quero ter um botão de "Reiniciar Jogo", para que eu possa limpar o tabuleiro e começar uma nova partida sem precisar recarregar a página inteira.
8. Como jogador, eu quero que o jogo pare de aceitar cliques no tabuleiro assim que alguém vencer ou houver um empate, para que o estado final da partida seja preservado até que o jogo seja reiniciado.

## Implementation Decisions

- **Arquitetura (Separação de Preocupações):** 
  - O código será dividido em no mínimo dois módulos principais: `GameState` (Lógica e Estado) e `UI` (Interface e Eventos).
- **Módulo `GameState` (Deep Module):**
  - Manterá o estado atual do tabuleiro (ex: um array de 9 posições).
  - Controlará de quem é o turno atual (`X` ou `O`).
  - Terá uma interface simples exposta: `makeMove(position)`, `getBoard()`, `getWinner()`, `isDraw()`, `reset()`.
  - Este módulo não deve ter nenhum conhecimento do DOM (Document Object Model) ou de elementos visuais.
- **Módulo `UI` (Interface):**
  - Ficará responsável por renderizar o estado retornado por `GameState`.
  - Capturará eventos de clique (DOM) e chamará `GameState.makeMove()`.
- **Stack:** A definir (pode ser Vanilla JS/TS ou um framework simples como React/Vue, mas a lógica do `GameState` deve ser framework-agnostic).

## Testing Decisions

- Testes devem focar no comportamento externo do módulo, não nos detalhes de implementação interna.
- **Módulo a ser testado exaustivamente:** `GameState`.
- **Casos de teste obrigatórios:**
  - Garantir que todas as 8 condições de vitória (3 horizontais, 3 verticais, 2 diagonais) são detectadas corretamente para ambos os jogadores.
  - Garantir que um empate é detectado quando o tabuleiro enche sem vencedores.
  - Garantir que não é possível sobrescrever uma jogada existente.
  - Garantir que os turnos alternam corretamente.
  - Garantir que a função de reinício limpa o tabuleiro e reseta o turno.
- *Prior Art:* Testes unitários padrão utilizando frameworks como Jest ou Vitest (a depender do ecossistema escolhido para a implementação).

## Out of Scope

- Regras especiais, power-ups ou qualquer mecânica classificada como "esteroides".
- Multijogador online (via rede/websockets).
- Inteligência Artificial (jogar contra o computador).
- Animações complexas e sons.
- Persistência de placar entre recarregamentos de página (banco de dados ou localStorage).

## Further Notes

- Manter a interface (UI) o mais limpa e agnóstica possível para facilitar refatorações quando a fase 2 ("Esteroides") começar.
- O array representando o tabuleiro pode ser bidimensional (`[3][3]`) ou unidimensional (`[9]`). A implementação unidimensional geralmente é mais simples de iterar para checar vitórias.