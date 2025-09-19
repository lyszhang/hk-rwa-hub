import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  TrendingDown, 
  Search, 
  BarChart3,
  DollarSign,
  Activity,
  Users,
  ExternalLink,
  Copy
} from 'lucide-react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip as ChartTooltip,
  Legend,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

// 注册 Chart.js 组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  ChartTooltip,
  Legend,
  Filler
);

const Stocks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('totalValue');
  const [filterBy, setFilterBy] = useState('all');
  const [blockchainFilter, setBlockchainFilter] = useState('all');

  // 股票代币化数据（参考 RWA.xyz 数据）
  const tokenizedStocks = [
    {
      id: 1,
      name: 'Tesla (Ondo Tokenized)',
      ticker: 'TSLAon',
      platform: 'Ondo',
      networks: ['Ethereum'],
      totalValue: 3643965,
      underlyingAsset: 'Tesla Inc. DL - 001',
      nav: 429,
      holders: 212,
      monthlyTransferVolume: 3612939,
      issuer: 'Ondo Global Markets (BVI) Limited',
      domicile: 'British Virgin Islands',
      regulatoryFramework: 'U.S. Securities Act Reg. S Exemption',
      custodian: 'Alpaca Securities LLC',
      subscriptionFees: '0%',
      redemptionFees: '0%',
      monthlyTransferCount: 4425,
      activeAddresses: 104,
      contractAddress: '0xf6b1117ec07684d3958cad8beb1b302bfd21103f',
      change30d: 12.45
    },
    {
      id: 2,
      name: 'SPDR S&P 500 ETF (Ondo Tokenized)',
      ticker: 'SPYon',
      platform: 'Ondo',
      networks: ['Ethereum'],
      totalValue: 19775229,
      underlyingAsset: 'SPDR S&P 500 ETF Trust',
      nav: 661,
      holders: 186,
      monthlyTransferVolume: 4607909,
      issuer: 'Ondo Global Markets (BVI) Limited',
      domicile: 'British Virgin Islands',
      regulatoryFramework: 'U.S. Securities Act Reg. S Exemption',
      custodian: 'Alpaca Securities LLC',
      subscriptionFees: '0%',
      redemptionFees: '0%',
      monthlyTransferCount: 2612,
      activeAddresses: 70,
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      change30d: 6.78
    },
    {
      id: 3,
      name: 'Backed CSPX Core S&P 500',
      ticker: 'bCSPX',
      platform: 'Backed Finance (xStocks)',
      networks: ['Gnosis', 'Ethereum', 'Avalanche'],
      totalValue: 3623092,
      underlyingAsset: 'iShares Core S&P 500 UCITS ETF',
      nav: 704,
      holders: 597,
      monthlyTransferVolume: 7195878,
      issuer: 'Backed Assets GmbH',
      domicile: 'Switzerland',
      regulatoryFramework: 'Switzerland DLT Act',
      custodian: 'InCore Bank AG',
      subscriptionFees: '0.20%',
      redemptionFees: '0.20%',
      monthlyTransferCount: 946,
      activeAddresses: 106,
      contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
      change30d: 4.56
    },
    {
      id: 4,
      name: 'Alphabet xStock',
      ticker: 'GOOGLx',
      platform: 'Backed Finance (xStocks)',
      networks: ['Solana'],
      totalValue: 3197653,
      underlyingAsset: 'Alphabet Inc. Class A',
      nav: 250,
      holders: 3976,
      monthlyTransferVolume: 9474847,
      issuer: 'Backed Assets GmbH',
      domicile: 'Switzerland',
      regulatoryFramework: 'Switzerland DLT Act',
      custodian: 'InCore Bank AG',
      subscriptionFees: '0%',
      redemptionFees: '0%',
      monthlyTransferCount: 36811,
      activeAddresses: 1191,
      contractAddress: 'XsCPL9dNWBMvFtTmwcCA5v3xWPSMEBCszbQdiLLq6aN',
      change30d: 9.87
    },
    {
      id: 5,
      name: 'iShares Silver Trust (Ondo Tokenized)',
      ticker: 'SLVon',
      platform: 'Ondo',
      networks: ['Ethereum'],
      totalValue: 3099022,
      underlyingAsset: 'iShares Silver Trust',
      nav: 37.98,
      holders: 28,
      monthlyTransferVolume: 966992,
      issuer: 'Ondo Global Markets (BVI) Limited',
      domicile: 'British Virgin Islands',
      regulatoryFramework: 'U.S. Securities Act Reg. S Exemption',
      custodian: 'Alpaca Securities LLC',
      subscriptionFees: '0%',
      redemptionFees: '0%',
      monthlyTransferCount: 325,
      activeAddresses: 18,
      contractAddress: '0xf3e4872e6a4cf365888d93b6146a2baa7348f1a4',
      change30d: 15.43
    },
    {
      id: 6,
      name: 'Backed Coinbase',
      ticker: 'bCOIN',
      platform: 'Backed Finance (xStocks)',
      networks: ['Gnosis', 'Ethereum'],
      totalValue: 3231325,
      underlyingAsset: 'Coinbase Global Inc - Class A',
      nav: 321,
      holders: 47,
      monthlyTransferVolume: 49164,
      issuer: 'Backed Assets GmbH',
      domicile: 'Switzerland',
      regulatoryFramework: 'Switzerland DLT Act',
      custodian: 'InCore Bank AG',
      subscriptionFees: '0.20%',
      redemptionFees: '0.20%',
      monthlyTransferCount: 1,
      activeAddresses: 7,
      contractAddress: '0x2222222222222222222222222222222222222222',
      change30d: 25.67
    }
  ];

  // 平台统计数据
  const platformStats = [
    { platform: 'Ondo', count: 3, totalValue: 26513216, marketShare: 46.9 },
    { platform: 'Backed Finance (xStocks)', count: 3, totalValue: 10052070, marketShare: 17.8 },
    { platform: 'Securitize', count: 1, totalValue: 253736400, marketShare: 44.9 },
    { platform: 'Dinari', count: 85, totalValue: 3200000, marketShare: 0.6 },
    { platform: 'Swarm', count: 8, totalValue: 900000, marketShare: 0.2 }
  ];

  // 股票代币化月度趋势数据
  const monthlyTrendData = [
    { month: '2024-01', Ondo: 120, Backed: 85, Securitize: 95 },
    { month: '2024-02', Ondo: 135, Backed: 92, Securitize: 108 },
    { month: '2024-03', Ondo: 148, Backed: 105, Securitize: 125 },
    { month: '2024-04', Ondo: 162, Backed: 118, Securitize: 142 },
    { month: '2024-05', Ondo: 175, Backed: 132, Securitize: 158 },
    { month: '2024-06', Ondo: 188, Backed: 145, Securitize: 172 },
    { month: '2024-07', Ondo: 202, Backed: 158, Securitize: 185 },
    { month: '2024-08', Ondo: 215, Backed: 172, Securitize: 198 },
    { month: '2024-09', Ondo: 228, Backed: 185, Securitize: 212 },
  ];

  // Chart.js 配置
  const chartData = {
    labels: monthlyTrendData.map(item => item.month),
    datasets: [
      {
        label: 'Ondo',
        data: monthlyTrendData.map(item => item.Ondo),
        borderColor: 'rgb(168, 85, 247)',
        backgroundColor: 'rgba(168, 85, 247, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(168, 85, 247)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgb(168, 85, 247)',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Backed Finance',
        data: monthlyTrendData.map(item => item.Backed),
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(16, 185, 129)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgb(16, 185, 129)',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'Securitize',
        data: monthlyTrendData.map(item => item.Securitize),
        borderColor: 'rgb(59, 130, 246)',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 3,
        fill: true,
        tension: 0.4,
        pointBackgroundColor: 'rgb(59, 130, 246)',
        pointBorderColor: '#ffffff',
        pointBorderWidth: 2,
        pointRadius: 6,
        pointHoverRadius: 8,
        pointHoverBackgroundColor: 'rgb(59, 130, 246)',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    interaction: {
      mode: 'index' as const,
      intersect: false,
    },
    plugins: {
      legend: {
        position: 'top' as const,
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: $${context.parsed.y}M`;
          },
        },
      },
    },
    scales: {
      x: {
        display: true,
        title: {
          display: true,
          text: '月份',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 11,
          },
        },
      },
      y: {
        display: true,
        title: {
          display: true,
          text: '市值 (百万美元)',
          font: {
            size: 12,
            weight: 'normal' as const,
          },
        },
        grid: {
          color: 'rgba(0, 0, 0, 0.05)',
        },
        ticks: {
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return `$${value}M`;
          },
        },
      },
    },
  };

  const formatNumber = (n: number) => {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
    return `$${n}`;
  };

  const formatVolume = (n: number) => {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
    return `$${n}`;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
  };

  // 过滤和排序数据
  const filteredStocks = tokenizedStocks
    .filter(stock => {
      const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.ticker.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.underlyingAsset.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesFilter = filterBy === 'all' || stock.platform.toLowerCase().includes(filterBy.toLowerCase());
      const matchesBlockchain = blockchainFilter === 'all' || stock.networks.some(network => 
        network.toLowerCase().includes(blockchainFilter.toLowerCase())
      );
      return matchesSearch && matchesFilter && matchesBlockchain;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'totalValue':
          return b.totalValue - a.totalValue;
        case 'holders':
          return b.holders - a.holders;
        case 'monthlyTransferVolume':
          return b.monthlyTransferVolume - a.monthlyTransferVolume;
        case 'change30d':
          return b.change30d - a.change30d;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">股票代币化列表</h1>
          <p className="text-gray-600">
            探索股票代币化世界，数字资产与上市公司公开股权的挂钩。深入了解我们的股票代币化综合分析。
          </p>
        </div>

        {/* 总体统计指标 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">总价值</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatNumber(tokenizedStocks.reduce((sum, stock) => sum + stock.totalValue, 0))}
              </div>
              <div className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +87.75% 较30天前
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">月度转账量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatVolume(tokenizedStocks.reduce((sum, stock) => sum + stock.monthlyTransferVolume, 0))}
              </div>
              <div className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +11.23% 较30天前
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">月度活跃地址</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {tokenizedStocks.reduce((sum, stock) => sum + stock.activeAddresses, 0).toLocaleString()}
              </div>
              <div className="text-sm text-red-600 flex items-center mt-1">
                <TrendingDown className="w-4 h-4 mr-1" />
                -26.40% 较30天前
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">持有者</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {tokenizedStocks.reduce((sum, stock) => sum + stock.holders, 0).toLocaleString()}
              </div>
              <div className="text-sm text-green-600 flex items-center mt-1">
                <TrendingUp className="w-4 h-4 mr-1" />
                +15.10% 较30天前
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 月度趋势图表 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>股票代币化月度趋势</CardTitle>
            <CardDescription>
              不同平台的股票代币化市值增长趋势（百万美元）
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="h-[400px]">
              <Line data={chartData} options={chartOptions} />
            </div>
          </CardContent>
        </Card>

        {/* 平台排行榜 */}
        <Card className="mb-6">
          <CardHeader>
            <CardTitle>股票代币化平台排行榜</CardTitle>
            <CardDescription>按总价值排序的平台表现</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">排名</th>
                    <th className="text-left py-3 px-4">平台</th>
                    <th className="text-left py-3 px-4">RWA数量</th>
                    <th className="text-left py-3 px-4">总价值</th>
                    <th className="text-left py-3 px-4">30天变化</th>
                    <th className="text-left py-3 px-4">市场份额</th>
                  </tr>
                </thead>
                <tbody>
                  {platformStats.map((platform, index) => (
                    <tr key={platform.platform} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 font-medium">{index + 1}</td>
                      <td className="py-3 px-4 font-medium">{platform.platform}</td>
                      <td className="py-3 px-4">{platform.count}</td>
                      <td className="py-3 px-4">{formatNumber(platform.totalValue)}</td>
                      <td className="py-3 px-4">
                        <span className="text-green-600 flex items-center">
                          <TrendingUp className="w-4 h-4 mr-1" />
                          +4.21%
                        </span>
                      </td>
                      <td className="py-3 px-4">{platform.marketShare}%</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 股票代币化列表 */}
        <Card>
          <CardHeader>
            <CardTitle>股票代币化列表</CardTitle>
            <CardDescription>
              显示 {filteredStocks.length} 个结果，共 {tokenizedStocks.length} 个股票代币化产品
            </CardDescription>
          </CardHeader>
          <CardContent>
            {/* 搜索和筛选 */}
            <div className="mb-6 p-4 bg-gray-50 rounded-lg">
              <div className="flex flex-col md:flex-row gap-4">
                <div className="flex-1">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                      placeholder="搜索股票、代码或底层资产..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-10"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <Select value={sortBy} onValueChange={setSortBy}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="排序方式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="totalValue">总价值</SelectItem>
                      <SelectItem value="holders">持有者数量</SelectItem>
                      <SelectItem value="monthlyTransferVolume">月度转账量</SelectItem>
                      <SelectItem value="change30d">30天变化</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterBy} onValueChange={setFilterBy}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="筛选平台" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有平台</SelectItem>
                      <SelectItem value="ondo">Ondo</SelectItem>
                      <SelectItem value="backed">Backed Finance</SelectItem>
                      <SelectItem value="securitize">Securitize</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={blockchainFilter} onValueChange={setBlockchainFilter}>
                    <SelectTrigger className="w-[150px]">
                      <SelectValue placeholder="区块链网络" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">所有网络</SelectItem>
                      <SelectItem value="ethereum">Ethereum</SelectItem>
                      <SelectItem value="solana">Solana</SelectItem>
                      <SelectItem value="bnb">BNB Chain</SelectItem>
                      <SelectItem value="gnosis">Gnosis</SelectItem>
                      <SelectItem value="avalanche">Avalanche</SelectItem>
                      <SelectItem value="polygon">Polygon</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4">名称</th>
                    <th className="text-left py-3 px-4">代码</th>
                    <th className="text-left py-3 px-4">平台</th>
                    <th className="text-left py-3 px-4">网络</th>
                    <th className="text-left py-3 px-4">总价值</th>
                    <th className="text-left py-3 px-4">底层资产</th>
                    <th className="text-left py-3 px-4">NAV</th>
                    <th className="text-left py-3 px-4">持有者</th>
                    <th className="text-left py-3 px-4">月度转账量</th>
                    <th className="text-left py-3 px-4">30天变化</th>
                    <th className="text-left py-3 px-4">合约地址</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredStocks.map((stock) => (
                    <tr 
                      key={stock.id} 
                      className="border-b hover:bg-gray-50 cursor-pointer"
                      onClick={() => navigate(`/tokenization/stocks/${stock.id}`)}
                    >
                      <td className="py-3 px-4">
                        <div className="font-medium">{stock.name}</div>
                        <div className="text-sm text-gray-500">{stock.issuer}</div>
                      </td>
                      <td className="py-3 px-4 font-mono text-sm">{stock.ticker}</td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary">{stock.platform}</Badge>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex flex-wrap gap-1">
                          {stock.networks.map((network, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {network}
                            </Badge>
                          ))}
                        </div>
                      </td>
                      <td className="py-3 px-4 font-medium">{formatNumber(stock.totalValue)}</td>
                      <td className="py-3 px-4 text-sm">{stock.underlyingAsset}</td>
                      <td className="py-3 px-4">${stock.nav}</td>
                      <td className="py-3 px-4">{stock.holders.toLocaleString()}</td>
                      <td className="py-3 px-4">{formatVolume(stock.monthlyTransferVolume)}</td>
                      <td className="py-3 px-4">
                        <span className={`flex items-center ${
                          stock.change30d >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {stock.change30d >= 0 ? (
                            <TrendingUp className="w-4 h-4 mr-1" />
                          ) : (
                            <TrendingDown className="w-4 h-4 mr-1" />
                          )}
                          {stock.change30d >= 0 ? '+' : ''}{stock.change30d.toFixed(2)}%
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center space-x-2">
                          <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                            {stock.contractAddress.slice(0, 6)}...{stock.contractAddress.slice(-4)}
                          </code>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={(e) => {
                              e.stopPropagation();
                              copyToClipboard(stock.contractAddress);
                            }}
                          >
                            <Copy className="w-3 h-3" />
                          </Button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 关于股票代币化 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle>关于股票代币化</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              股票代币化是将传统股票转换为区块链上的数字代币的过程。这些代币代表对底层股票的所有权，
              使投资者能够以更小的金额投资于知名公司的股票，并享受区块链技术带来的透明度和流动性优势。
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <h4 className="font-semibold text-blue-900 mb-2">Ondo Finance</h4>
                <p className="text-sm text-blue-700">
                  专注于机构级代币化证券，提供高流动性和实时定价的股票代币化产品。
                </p>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <h4 className="font-semibold text-green-900 mb-2">Backed Finance</h4>
                <p className="text-sm text-green-700">
                  提供完全抵押的代币化股票，支持多个区块链网络，确保透明度和安全性。
                </p>
              </div>
              <div className="p-4 bg-purple-50 rounded-lg">
                <h4 className="font-semibold text-purple-900 mb-2">Securitize</h4>
                <p className="text-sm text-purple-700">
                  合规的代币化平台，专注于传统证券的数字化，提供完整的监管框架支持。
                </p>
              </div>
            </div>
            <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
              <h4 className="font-semibold text-yellow-900 mb-2">⚠️ 投资风险提示</h4>
              <p className="text-sm text-yellow-800">
                股票代币化投资涉及市场风险、流动性风险和技术风险。投资者应充分了解相关风险，
                并根据自身风险承受能力做出投资决策。过往表现不代表未来收益。
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stocks;