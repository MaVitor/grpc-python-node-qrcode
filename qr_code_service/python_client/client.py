# python-client/client.py

import grpc

# Importa os módulos que o protoc GEROU para nós na pasta python_client
import qrcode_pb2
import qrcode_pb2_grpc

def run():
    # Endereço do servidor que vamos criar daqui a pouco
    server_address = 'localhost:50051'
    print(f"Tentando conectar ao servidor em {server_address}...")
    
    # Cria um canal de comunicação com o servidor
    with grpc.insecure_channel(server_address) as channel:
        # Cria o "stub", que é o nosso cliente remoto
        stub = qrcode_pb2_grpc.QrCodeGeneratorStub(channel)
        
        # Pede ao usuário o texto e o tamanho
        content = input("Digite o texto ou link para o QR Code: ")
        try:
            size = int(input("Digite o tamanho da imagem em pixels (ex: 256): "))
        except ValueError:
            print("Tamanho inválido. Usando 256 por padrão.")
            size = 256
        
        # Cria a mensagem de requisição, usando a estrutura definida no .proto
        request = qrcode_pb2.QrCodeRequest(content=content, size=size)
        
        print("\nEnviando pedido ao servidor...")
        # Chama a função 'Generate' no servidor e aguarda a resposta
        response = stub.Generate(request)
        
        # Salva os bytes da imagem recebida em um arquivo .png
        output_filename = "qrcode_gerado.png"
        with open(output_filename, "wb") as f:
            f.write(response.image_data)
            
        print(f"✅ Sucesso! QR Code salvo como '{output_filename}' na pasta 'python_client'")

if __name__ == '__main__':
    run()