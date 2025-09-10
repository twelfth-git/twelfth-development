Bem-vindo a base de desenvolvimento da Twelfth, uma rede integrativa entre pessoas que vivem o futebol e gostariam de um lugar para vivenciar, encontrar companhias e viver sua paixão de uma forma que nunca fizeram antes.

A nossa base de frontend é composta pelo Next.js que por sua vez é alimentada pelo React; a nossa base de backend é feita em GO, porém ainda usaremos python para termos melhores e mais desenvolvidas formas de sugestões e machine-learning
- Para "setar" seu ambiente de desenvolvimento você tem que ter baixado no seu computador o Node.js e por conseguinte o npm; também deve ter baixado no seu computador o GO ( Golang do Google ).
- O documento .env não é subido ao github por motivos de segurança, mas para que possa rodar o backend é necessário ter esse arquivo na raíz do código da pasta "go-backend"
- Para instalar o frontend é só seguir o passo a passo : cd react-frontend -> npm install -> npm run dev
- Para o backend é necessário primeiramente do arquivo .env, o pedra90zz tem acesso a ele, após estar com o arquivo na pasta raíz do código do "go-backend" é só seguir esse passo a passo: cd go-backend -> go run cmd/api/main.go
- Após atualizar o código, exclua a .env da pasta raíz do código do "go-backend" e faça o commit push no github seguindo esse passo a passo : git add . -> git commit -m "ALTERAÇÕES QUE FORAM FEITAS" -> git push origin main

MUITO IMPORTANTE!!!
NÃO SE ESQUEÇA DE EXCLUIR A PASTA .env ANTES DE ATUALIZAR O REPOSITÓRIO NO GITHUB, SE FIZER ISSO VAI CRIAR UM GRANDE ERRO DE SEGURANÇA, SEM CONTAR QUE NÃO VAI CONSEGUIR SUBIR CORRETAMENTE AS MUDANÇAS QUE VOCÊ FEZ AO REPOSITÓRIO.

Atualizado em 10/09/2025 por pedra90zz
