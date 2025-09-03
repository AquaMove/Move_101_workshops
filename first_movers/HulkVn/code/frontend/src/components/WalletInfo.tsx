import { useCurrentAccount, useSuiClient, useDisconnectWallet } from '@mysten/dapp-kit';
import { useState, useEffect } from 'react';
import { ConnectButton } from "@mysten/dapp-kit";

export function WalletInfo() {
  const account = useCurrentAccount();
  const client = useSuiClient();
  const { mutate: disconnect } = useDisconnectWallet();
  const [balance, setBalance] = useState<string>('0');
  const [showDetails, setShowDetails] = useState(false);

  useEffect(() => {
    if (account?.address) {
      client.getBalance({
        owner: account.address,
        coinType: '0x2::sui::SUI'
      }).then(result => {
        setBalance(result.totalBalance);
      });
    }
  }, [account, client]);

  // Khi chưa connect, hiển thị ConnectButton
  if (!account) {
    return (
      <ConnectButton />
    );
  }

  // Khi đã connect, hiển thị address và dropdown
  return (
    <div className="relative">
      <button 
        onClick={() => setShowDetails(!showDetails)}
        className="px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200"
      >
        {account.address.slice(0, 6)}...{account.address.slice(-4)}
      </button>
      
      {showDetails && (
        <div className="absolute top-full right-0 mt-2 bg-white border rounded-lg shadow-lg p-3 min-w-64 z-50">
          <div className="text-sm">
            <div className="font-medium mb-2">Wallet Info</div>
            <div className="text-gray-600 mb-1">
              <span className="font-mono break-all">{account.address}</span>
            </div>
            <div className="text-gray-600">
              Balance: <span className="font-medium">{parseInt(balance) / 1000000000} SUI</span>
            </div>
            <div className="flex space-x-2 mt-2">
              <button 
                onClick={() => {
                  navigator.clipboard.writeText(account.address);
                  setShowDetails(false);
                }}
                className="flex-1 px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 text-xs"
              >
                Copy Address
              </button>
              <button 
                onClick={() => {
                  disconnect();
                  setShowDetails(false);
                }}
                className="flex-1 px-3 py-1 bg-red-100 text-red-700 rounded hover:bg-red-200 text-xs"
              >
                Disconnect
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}