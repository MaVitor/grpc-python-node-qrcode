// node-server/server.js

// 1. Importa as bibliotecas necessárias
const grpc = require('@grpc/grpc-js');
const protoLoader = require('@grpc/proto-loader');
const qrcode_lib = require('qrcode');

// 2. Define o caminho para o nosso contrato .proto e a porta do servidor
const PROTO_PATH = '../proto/qrcode.proto';
const PORT = 50051;

// 3. Carrega o arquivo .proto
const packageDefinition = protoLoader.loadSync(PROTO_PATH, {
    keepCase: true,
    longs: String,
    enums: String,
    defaults: true,
    oneofs: true
});

// Carrega o pacote gRPC a partir da definição do proto
const qrCodeProto = grpc.loadPackageDefinition(packageDefinition).qrcode;

/**
 * 4. Implementa a função 'Generate' que foi definida no serviço do .proto
 * (call: dados da requisição; callback: função para enviar a resposta)
 */
function generate(call, callback) {
    console.log(`Pedido recebido para gerar QR Code com o conteúdo: "${call.request.content}"`);

    // Usa a biblioteca 'qrcode' para gerar a imagem como um Buffer (bytes)
    qrcode_lib.toBuffer(call.request.content, { width: call.request.size }, (err, buffer) => {
        if (err) {
            // Se der erro, envia um erro gRPC de volta para o cliente
            console.error("Falha ao gerar QR Code:", err);
            callback({
                code: grpc.status.INTERNAL,
                details: "Erro ao gerar QR Code"
            });
            return;
        }
        // Se der certo, envia a resposta com os bytes da imagem
        console.log("QR Code gerado com sucesso! Enviando para o cliente...");
        callback(null, { image_data: buffer });
    });
}

/**
 * 5. Função principal que cria e inicia o servidor gRPC
 */
function main() {
    const server = new grpc.Server();
    // Adiciona nosso serviço e sua implementação ('generate') ao servidor
    server.addService(qrCodeProto.QrCodeGenerator.service, { generate: generate });

    // O servidor vai "escutar" em todas as interfaces de rede na porta definida
    server.bindAsync(`0.0.0.0:${PORT}`, grpc.ServerCredentials.createInsecure(), (err, port) => {
        if (err) {
            console.error('Falha ao iniciar o servidor:', err);
            return;
        }
        server.start();
        console.log(`Servidor gRPC rodando na porta ${port}`);
    });
}

main();