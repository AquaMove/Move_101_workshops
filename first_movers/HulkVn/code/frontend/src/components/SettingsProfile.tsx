import React from 'react';

interface SettingsProfileProps {
  address?: string;
  network?: string;
  onDisconnect?: () => void;
}

export const SettingsProfile: React.FC<SettingsProfileProps> = ({
  address,
  network = 'Testnet',
  onDisconnect,
}) => {
  const shortAddr = address ? `${address.slice(0, 6)}...${address.slice(-6)}` : 'Not connected';

  const copy = async () => {
    if (!address) return;
    await navigator.clipboard.writeText(address);
    alert('Address copied!');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="card flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Profile</h2>
          <p className="text-sm text-gray-500">Manage your account and preferences</p>
        </div>
        {onDisconnect && (
          <button onClick={onDisconnect} className="btn-secondary">
            Disconnect
          </button>
        )}
      </div>

      {/* Account */}
      <div className="card space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Account</h3>
          <p className="text-sm text-gray-500">Wallet connection details</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-3 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Address</div>
            <div className="flex items-center justify-between">
              <span className="font-mono">{shortAddr}</span>
              <div className="flex items-center gap-2">
                <button onClick={copy} className="btn-secondary">Copy</button>
                {address && (
                  <a
                    className="btn-secondary"
                    href={`https://suiexplorer.com/address/${address}?network=testnet`}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Explorer
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="p-3 rounded-lg border border-gray-200">
            <div className="text-xs text-gray-500 mb-1">Network</div>
            <div className="font-medium">{network}</div>
          </div>
        </div>
      </div>

      {/* Profile form (local UI) */}
      <div className="card space-y-4">
        <div>
          <h3 className="font-semibold mb-1">Profile Info</h3>
          <p className="text-sm text-gray-500">These are app-only display fields</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="text-sm text-gray-600">Display Name</label>
            <input className="input-field mt-1" placeholder="Your name" />
          </div>
          <div>
            <label className="text-sm text-gray-600">Website</label>
            <input className="input-field mt-1" placeholder="https://..." />
          </div>
        </div>

        <div>
          <label className="text-sm text-gray-600">Bio</label>
          <textarea className="input-field mt-1 min-h-[100px]" placeholder="Tell something about you..." />
        </div>

        <div className="flex justify-end">
          <button className="btn-primary">Save</button>
        </div>
      </div>

      {/* Preferences */}
      <div className="card space-y-3">
        <div>
          <h3 className="font-semibold mb-1">Preferences</h3>
          <p className="text-sm text-gray-500">Customize your experience</p>
        </div>

        <div className="flex items-center justify-between">
          <span>Dark mode</span>
          <input type="checkbox" className="h-4 w-4" />
        </div>
        <div className="flex items-center justify-between">
          <span>Show tooltips</span>
          <input type="checkbox" className="h-4 w-4" />
        </div>
      </div>
    </div>
  );
};