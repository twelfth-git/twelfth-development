###  Twelfth: A Rede de Apaixonados por Futebol

Bem-vindo(a) à base de desenvolvimento da **Twelfth**! Nossa missão é construir uma comunidade integrativa para quem vive e respira futebol. Aqui, as pessoas podem encontrar companhias, vivenciar a paixão pelo esporte e criar experiências únicas. Junte-se a nós para construir a maior rede de futebol do mundo!

---

### 💻 Tecnologias Utilizadas

Nossa plataforma é desenvolvida com um conjunto de tecnologias modernas e eficientes:

-   **Frontend:**
       - ![Next.js](https://img.shields.io/badge/Next.js-black?style=for-the-badge&logo=next.js)
       - ![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react)
-   **Backend:**
       - ![Go](https://img.shields.io/badge/Go-00ADD8?style=for-the-badge&logo=go&logoColor=white)
       - ![Python](https://img.shields.io/badge/python-3670A0?style=for-the-badge&logo=python&logoColor=ffdd54) 

---

### 🚀 Configurando o Ambiente de Desenvolvimento

Para começar, certifique-se de que os seguintes programas estão instalados em seu computador:

1.  **Node.js** e **npm**: [Faça o download aqui](https://nodejs.org/en/download/)
2.  **Go (Golang)**: [Faça o download aqui](https://go.dev/doc/install)

#### Frontend

1.  Abra o terminal e navegue até a pasta do frontend:
    ```bash
    cd react-frontend
    ```
2.  Instale as dependências:
    ```bash
    npm install
    ```
3.  Inicie o servidor de desenvolvimento:
    ```bash
    npm run dev
    ```

#### Backend

1.  **Atenção!** O arquivo `.env` é necessário para rodar o backend, mas **NÃO** é subido para o GitHub por questões de segurança. Fale com **pedra90zz** para obtê-lo.
2.  Com o arquivo `.env` na pasta **`go-backend`**, navegue até o diretório:
    ```bash
    cd go-backend
    ```
3.  Inicie o servidor:
    ```bash
    go run cmd/api/main.go
    ```

---

### ⚠️ Importante: Processo de Commit e Push

Para garantir a segurança do nosso repositório, é **fundamental** que você siga estas instruções antes de fazer um commit:

1.  **EXCLUA** o arquivo `.env` da pasta **`go-backend`**.
2.  Adicione as suas alterações:
    ```bash
    git add .
    ```
3.  Faça o commit com uma mensagem clara:
    ```bash
    git commit -m "SUA MENSAGEM DESCRITIVA"
    ```
4.  Envie as alterações para o repositório:
    ```bash
    git push origin main
    ```

**LEMBRE-SE:** Nunca, em hipótese alguma, comite o arquivo `.env`. Isso pode causar uma grave falha de segurança e impedir o envio das suas alterações.

---

_Última atualização: 10/09/2025 por pedra90zz_
