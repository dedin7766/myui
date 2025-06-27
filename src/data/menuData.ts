// src/data/menuData.ts

// 'export' memastikan variabel ini bisa diimpor oleh file lain.
export const menuData = [
  { id: '1', label: 'Transfer', icon: 'swap-horizontal', color: '#3498db', screen: 'TransferScreen' },
  { id: '2', label: 'Listrik PLN', icon: 'flash', color: '#f1c40f', screen: 'PLNScreen' },
  { id: '3', label: 'Pulsa/Data', icon: 'signal-cellular-3', color: '#2ecc71', screen: 'TopUpScreen' },
  { id: '4', label: 'Donasi', icon: 'hand-heart', color: '#e74c3c', screen: 'DonationScreen' },
  { id: '5', label: 'Voucher Game', icon: 'gamepad-variant', color: '#9b59b6', screen: 'GameVoucherScreen' },
  { id: '6', label: 'E-Money', icon: 'wallet-outline', color: '#1abc9c', screen: 'EMoneyScreen' },
  { id: '7', label: 'Investasi', icon: 'chart-line', color: '#34495e', screen: 'InvestmentScreen' },
  { id: '8', label: 'Lainnya', icon: 'dots-grid', color: '#7f8c8d', screen: 'MenuAppScreen' },
];