let history = JSON.parse(localStorage.getItem("usdtHistory")) || [];
let connectedWallet = "";

const contractAddress = "0x20E51228B1C6592ab34cC73ae0e31aC779008a2b";
const abi = [
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "approve",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "burn",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"stateMutability": "nonpayable",
		"type": "constructor"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "allowance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientAllowance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "balance",
				"type": "uint256"
			},
			{
				"internalType": "uint256",
				"name": "needed",
				"type": "uint256"
			}
		],
		"name": "ERC20InsufficientBalance",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "approver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidApprover",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "receiver",
				"type": "address"
			}
		],
		"name": "ERC20InvalidReceiver",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "sender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSender",
		"type": "error"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "ERC20InvalidSpender",
		"type": "error"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "spender",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Approval",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "amount",
				"type": "uint256"
			}
		],
		"name": "mint",
		"outputs": [],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transfer",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": true,
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"indexed": true,
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"indexed": false,
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "Transfer",
		"type": "event"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "from",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "to",
				"type": "address"
			},
			{
				"internalType": "uint256",
				"name": "value",
				"type": "uint256"
			}
		],
		"name": "transferFrom",
		"outputs": [
			{
				"internalType": "bool",
				"name": "",
				"type": "bool"
			}
		],
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "owner",
				"type": "address"
			},
			{
				"internalType": "address",
				"name": "spender",
				"type": "address"
			}
		],
		"name": "allowance",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [
			{
				"internalType": "address",
				"name": "account",
				"type": "address"
			}
		],
		"name": "balanceOf",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "decimals",
		"outputs": [
			{
				"internalType": "uint8",
				"name": "",
				"type": "uint8"
			}
		],
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "name",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "symbol",
		"outputs": [
			{
				"internalType": "string",
				"name": "",
				"type": "string"
			}
		],
		"stateMutability": "view",
		"type": "function"
	},
	{
		"inputs": [],
		"name": "totalSupply",
		"outputs": [
			{
				"internalType": "uint256",
				"name": "",
				"type": "uint256"
			}
		],
		"stateMutability": "view",
		"type": "function"
	}
];

async function connectWallet() {
  if (window.ethereum) {
    try {
      const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
      connectedWallet = accounts[0];
      document.getElementById("wallet").value = connectedWallet;

      const chainId = await window.ethereum.request({ method: 'eth_chainId' });
      if (chainId !== "0xaa36a7") {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: "0xaa36a7" }]
        });
      }

      alert("🔗 Wallet connected: " + connectedWallet);
    } catch (err) {
      alert("❌ Connection error or rejected by user.");
    }
  } else {
    alert("🦊 Please install MetaMask.");
    window.open("https://metamask.io/download/", "_blank");
  }
}

async function generateUSDT() {
  const amount = parseInt(document.getElementById("amount").value);
const network = document.getElementById("network").value;
const wallet = document.getElementById("wallet").value;
const burn = parseInt(document.getElementById("burnDays").value);
const date = new Date().toLocaleString();


  if (!wallet || amount < 10000 || amount > 1000000 || burn < 365 || burn > 1000) {
    alert("⚠️ Please enter all fields correctly!");
    return;
  }

  try {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, abi, signer);

   const parsedAmount = ethers.utils.parseUnits(amount.toString(), 6); // because now decimals = 6
const tx = await contract.mint(wallet, parsedAmount);
await tx.wait();


               // 👈 waits for confirmation

    const transaction = { amount, network, wallet, burn, date };
    history.push(transaction);
    localStorage.setItem("usdtHistory", JSON.stringify(history));
    updateStats();

    alert("✅ Flash USDT minted successfully!");
  } catch (err) {
    console.error("❌ Error:", err);
    alert("❌ Minting failed or rejected.");
  }
}


function updateStats() {
  const total = history.reduce((sum, tx) => sum + parseInt(tx.amount), 0);
  const today = new Date().toDateString();
  const todayCount = history.filter(tx => new Date(tx.date).toDateString() === today).length;

  const totalEl = document.getElementById("totalUSDT");
  const txCountEl = document.getElementById("txCount");
  const todayEl = document.getElementById("generatedToday");

  if (totalEl && txCountEl && todayEl) {
    totalEl.textContent = total.toLocaleString();
    txCountEl.textContent = history.length;
    todayEl.textContent = todayCount;
  }
}
function showHistory() {
  const historyData = history.map(tx => `
    <tr>
      <td>${tx.amount || "—"}</td>
      <td>${tx.network || "—"}</td>
      <td>${tx.wallet ? tx.wallet.slice(0, 6) + "..." + tx.wallet.slice(-4) : "—"}</td>
      <td>${tx.burn || "—"}</td>
      <td>${tx.date || new Date().toLocaleString()}</td>
    </tr>
  `).join("");

  const html = `
    <h2>📜 Transaction History</h2>
    <table class="history-table">
      <thead>
        <tr>
          <th>Amount</th>
          <th>Network</th>
          <th>Wallet</th>
          <th>Burn (days)</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody>${historyData || '<tr><td colspan="5">No transactions yet.</td></tr>'}</tbody>
    </table>
    <p><strong>Total Generated:</strong> ${history.reduce((sum, tx) => sum + parseInt(tx.amount || 0), 0).toLocaleString()} USDT</p>
    <p><strong>Total Transactions:</strong> ${history.length}</p>
  `;

  document.querySelector(".main").innerHTML = html;
}


function showSettings() {
  const amount = document.getElementById("amount").value || "—";
  const network = document.getElementById("network").value || "—";
  const wallet = document.getElementById("wallet").value || "—";
  const burn = document.getElementById("burnDays").value || "—";

  const html = `
    <h2>⚙️ Current Settings</h2>
    <div class="settings-card">
      <p><strong>Amount:</strong> ${amount} USDT</p>
      <p><strong>Network:</strong> ${network}</p>
      <p><strong>Wallet:</strong> ${wallet}</p>
      <p><strong>Burn Period:</strong> ${burn} days</p>
    </div>
  `;

  document.querySelector(".main").innerHTML = html;
}

function showHome() {
  location.reload();
}

window.onload = () => {
  try {
    updateStats();
  } catch (err) {
    console.warn("Stats not loaded, missing DOM elements.");
  }
};
