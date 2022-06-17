<br />

<h3 align="center">Space Invaders</h3>

  <p align="center">
    Jogo no estilo do clássico Space Invaders de 1978
    <br />
    <a href="https://space-invaders-like.herokuapp.com">Demonstração</a>
</div>

<details>
  <ol>
    <li>
      <a href="#sobre-o-projeto">Sobre o Projeto</a>
   </li>
    <li>
      <a href="#instalacao">Instalação</a>
      </li>
  </ol>
</details>



<!-- ABOUT THE PROJECT -->
<h2 id='sobre-o-projeto'>Sobre o projeto</h2> 

Projeto desenvolvido para a disciplina de Banco de Dados II, no estilo do clássico Space Invaders


### Recursos
<p >Projeto construído com <a href='https://nodejs.org/en/'>NodeJS</a> como back-end, <a href='https://www.mongodb.com/pt-br'>MongoDB</a> como banco de dados e apenas JavaScript para o jogo em si</p>


<h2 id='instalacao'>Instalação</h2>

<p >This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.</p>

### Pré-requisitos

Primeiro passo é obter a versão mais recente do npm

  ```sh
  npm install npm@latest -g
  ```

### Instalação

1. Pegar uma chave para um banco de dados do [MongoDB](https://www.mongodb.com/pt-br)
2. Clonar o repositório
   ```sh
   git clone https://github.com/GustavoFLuz/SpaceInvader.git
   ```
3. Instalar as dependências
   ```sh
   npm install
   ```
4. Criar um arquivo `.env` na pasta principal e colocar sua chave
   ```js
   MONGODB_KEY="SUA_CHAVE"
   ```

<!-- USAGE EXAMPLES -->
## Tutorial

O objetivo do jogo consiste em obter a maior pontuação possível, movendo a sua nave desvia-se dos tiros dos aliens que vêm em hordas e atira de voltar, tentando eliminar o maior número possível
<details>
<summary>Controles</summary>
  <ul>
    <li>
      Mover : setas para a direita/esquerda ou A/D
   </li>
    <li>
      Atirar : barra de espaço
  </ul>
</details>
