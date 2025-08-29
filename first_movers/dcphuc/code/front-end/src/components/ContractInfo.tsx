import { PACKAGE_ID, MODULE_NAME } from "../constants/contract";

export function ContractInfo() {
  return (
    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
      <h3 className="text-lg font-semibold text-blue-900 mb-2">
        Smart Contract Info
      </h3>
      <div className="space-y-2 text-sm">
        <div>
          <span className="font-medium text-blue-800">Package ID:</span>
          <span className="text-blue-700 ml-2 font-mono">{PACKAGE_ID}</span>
        </div>
        <div>
          <span className="font-medium text-blue-800">Module:</span>
          <span className="text-blue-700 ml-2">{MODULE_NAME}</span>
        </div>
        <div>
          <span className="font-medium text-blue-800">Network:</span>
          <span className="text-blue-700 ml-2">Testnet</span>
        </div>
      </div>
    </div>
  );
}
