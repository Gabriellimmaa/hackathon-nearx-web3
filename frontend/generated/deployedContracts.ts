const deployedContracts = {
  "31337": [
    {
      name: "localhost",
      chainId: "31337",
      contracts: {
        Counter: {
          address: "0x5FbDB2315678afecb367f032d93F642f64180aa3",
          abi: [
            { type: "function", name: "increment", inputs: [], outputs: [], stateMutability: "nonpayable" },
            {
              type: "function",
              name: "number",
              inputs: [],
              outputs: [{ name: "", type: "uint256", internalType: "uint256" }],
              stateMutability: "view",
            },
            {
              type: "function",
              name: "setNumber",
              inputs: [{ name: "newNumber", type: "uint256", internalType: "uint256" }],
              outputs: [],
              stateMutability: "nonpayable",
            },
          ],
        },
      },
    },
  ],
} as const;

export default deployedContracts;
