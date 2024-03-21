import { createWallet } from 'wagmi';

// Criar uma instância da carteira
const wallet = createWallet();

// Conectar-se à carteira MetaMask (ou outra carteira suportada)
await wallet.connect('metamask');

// Verificar se a carteira está conectada
if (wallet.isConnected()) {
    // Obter o endereço da carteira MetaMask
    const address = await wallet.getAddress();

    // Obter os tokens ERC-721 (NFTs) vinculados ao endereço da carteira
    const nfts = await wallet.getERC721Tokens(address);