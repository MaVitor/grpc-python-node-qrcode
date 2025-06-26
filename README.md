# Serviço de Geração de QR Code com gRPC (Node.js e Python)

Este projeto é um estudo de caso que demonstra a comunicação entre dois microserviços escritos em linguagens diferentes (Node.js e Python) utilizando a tecnologia gRPC.

O serviço consiste em um cliente que solicita a geração de um QR Code a partir de um texto ou link, e um servidor que processa o pedido, gera a imagem correspondente e a devolve para o cliente.

## Tecnologias Utilizadas

  * **gRPC:** Framework de alta performance para Chamada de Procedimentos Remotos (RPC).
  * **Protocol Buffers (Protobuf):** Mecanismo para serialização de dados estruturados, usado para definir o contrato de comunicação.
  * **Node.js:** Ambiente de execução para o servidor.
  * **Python:** Linguagem de programação para o cliente.

## Arquitetura

A arquitetura do projeto é um modelo Cliente-Servidor simples, onde o gRPC atua como a camada de comunicação.

```
+----------------------+             +-----------------------+
|                      |             |                       |
|  Cliente (Python)    |  <--------> |  Servidor (Node.js)   |
|  (Pede o QR Code)    |    gRPC     |  (Gera e envia a imagem)|
|                      |             |                       |
+----------------------+             +-----------------------+
```

O "contrato" que define os métodos e as estruturas de mensagem que podem ser trocadas entre eles está formalizado no arquivo `proto/qrcode.proto`.

## Configuração e Instalação

Siga os passos abaixo para configurar e executar o projeto em sua máquina local.

### 1\. Pré-requisitos

  * **Python 3.8+** instalado.
  * **Node.js 18+** instalado.

### 2\. Estrutura de Pastas

O projeto utiliza a seguinte estrutura de diretórios:

```
/qr_code_service
├── proto/
│   └── qrcode.proto
├── python-client/
└── node-server/
```

### 3\. Configurando o Cliente (Python)

Primeiro, vamos preparar o ambiente e as dependências do cliente.

```bash
# Navegue para a pasta do cliente
cd python-client

# Crie um ambiente virtual
python -m venv venv

# Ative o ambiente virtual
# No Windows:
.\venv\Scripts\activate
# No macOS/Linux:
# source venv/bin/activate

# Instale as dependências do Python
pip install grpcio grpcio-tools qrcode[pil]
```

### 4\. Gerando o Código gRPC (Stub do Cliente)

O gRPC utiliza um compilador (`protoc`) para gerar código a partir do arquivo de contrato `.proto`.

O comando abaixo lê o arquivo `qrcode.proto` e cria automaticamente os arquivos base em Python (`qrcode_pb2.py` e `qrcode_pb2_grpc.py`) dentro da pasta `python-client`.

```bash
# Execute este comando a partir da pasta raiz (qr_code_service)
python -m grpc_tools.protoc -I ./proto --python_out=./python_client --grpc_python_out=./python_client --pyi_out=./python_client ./proto/qrcode.proto
```

### 5\. Configurando o Servidor (Node.js)

Agora, vamos preparar o ambiente e as dependências do servidor.

```bash
# Navegue para a pasta do servidor
cd node-server

# Inicialize o projeto Node.js e instale as dependências
npm init -y
npm install @grpc/grpc-js @grpc/proto-loader qrcode
```

## Como Executar o Projeto 🚀

Para ver a aplicação funcionando, você precisará de **dois terminais** abertos simultaneamente.

#### **Terminal 1: Iniciar o Servidor**

```bash
# Navegue até a pasta do servidor
cd node_server

# Inicie o servidor Node.js
node server.js
```

Você deverá ver a mensagem: `Servidor gRPC rodando na porta 50051`. Deixe este terminal aberto.

#### **Terminal 2: Iniciar o Cliente**

```bash
# Navegue até a pasta do cliente
cd python-client

# Ative o ambiente virtual (se não estiver ativo)
.\venv\Scripts\activate

# Inicie o cliente Python
python client.py
```

O programa irá pedir que você digite um texto e o tamanho da imagem. Após fornecer os dados, o cliente se comunicará com o servidor e um arquivo **`qrcode_gerado.png`** será salvo na pasta `python-client`. ✅