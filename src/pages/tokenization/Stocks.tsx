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
  Activity
} from 'lucide-react';

const Stocks = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('market_cap');

  // 代币化股票数据（参考 CoinGecko 数据）
  const tokenizedStocks = [
    {
      id: 1,
      name: 'Tesla',
      symbol: 'TSLA',
      tokenSymbol: 'TSLA',
      price: 248.50,
      change24h: 2.34,
      change7d: -5.67,
      change30d: 12.45,
      volume24h: 1250000000,
      marketCap: 789000000000,
      category: 'Technology',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'backed.fi',
      description: 'Tesla Inc. 代币化股票'
    },
    {
      id: 2,
      name: 'Apple',
      symbol: 'AAPL',
      tokenSymbol: 'AAPL',
      price: 189.25,
      change24h: -1.23,
      change7d: 3.45,
      change30d: 8.92,
      volume24h: 890000000,
      marketCap: 2950000000000,
      category: 'Technology',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'ondo.fi',
      description: 'Apple Inc. 代币化股票'
    },
    {
      id: 3,
      name: 'Microsoft',
      symbol: 'MSFT',
      tokenSymbol: 'MSFT',
      price: 378.85,
      change24h: 0.87,
      change7d: -2.15,
      change30d: 6.78,
      volume24h: 650000000,
      marketCap: 2810000000000,
      category: 'Technology',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'dinari',
      description: 'Microsoft Corporation 代币化股票'
    },
    {
      id: 4,
      name: 'Amazon',
      symbol: 'AMZN',
      tokenSymbol: 'AMZN',
      price: 145.67,
      change24h: -0.45,
      change7d: 1.89,
      change30d: 4.56,
      volume24h: 420000000,
      marketCap: 1520000000000,
      category: 'Technology',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'backed.fi',
      description: 'Amazon.com Inc. 代币化股票'
    },
    {
      id: 5,
      name: 'Google',
      symbol: 'GOOGL',
      tokenSymbol: 'GOOGL',
      price: 142.30,
      change24h: 1.56,
      change7d: -1.23,
      change30d: 9.87,
      volume24h: 380000000,
      marketCap: 1780000000000,
      category: 'Technology',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'ondo.fi',
      description: 'Alphabet Inc. Class A 代币化股票'
    },
    {
      id: 6,
      name: 'Meta',
      symbol: 'META',
      tokenSymbol: 'META',
      price: 485.20,
      change24h: 3.21,
      change7d: 5.67,
      change30d: 15.43,
      volume24h: 290000000,
      marketCap: 1230000000000,
      category: 'Technology',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'dinari',
      description: 'Meta Platforms Inc. 代币化股票'
    },
    {
      id: 7,
      name: 'NVIDIA',
      symbol: 'NVDA',
      tokenSymbol: 'NVDA',
      price: 875.28,
      change24h: -2.15,
      change7d: 8.92,
      change30d: 25.67,
      volume24h: 450000000,
      marketCap: 2150000000000,
      category: 'Technology',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'backed.fi',
      description: 'NVIDIA Corporation 代币化股票'
    },
    {
      id: 8,
      name: 'Netflix',
      symbol: 'NFLX',
      tokenSymbol: 'NFLX',
      price: 485.50,
      change24h: 0.78,
      change7d: -3.45,
      change30d: 7.89,
      volume24h: 180000000,
      marketCap: 215000000000,
      category: 'Technology',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'ondo.fi',
      description: 'Netflix Inc. 代币化股票'
    },
    {
      id: 9,
      name: 'PayPal',
      symbol: 'PYPL',
      tokenSymbol: 'PYPL',
      price: 58.90,
      change24h: -1.45,
      change7d: 2.34,
      change30d: -5.67,
      volume24h: 120000000,
      marketCap: 68000000000,
      category: 'Financial',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'dinari',
      description: 'PayPal Holdings Inc. 代币化股票'
    },
    {
      id: 10,
      name: 'Square',
      symbol: 'SQ',
      tokenSymbol: 'SQ',
      price: 45.67,
      change24h: 2.89,
      change7d: -1.23,
      change30d: 3.45,
      volume24h: 95000000,
      marketCap: 28000000000,
      category: 'Financial',
      exchanges: ['Uniswap', 'SushiSwap', '1inch'],
      issuer: 'backed.fi',
      description: 'Block Inc. 代币化股票'
    }
  ];

  // 格式化数字
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

  // 过滤和排序数据
  const filteredAndSortedStocks = tokenizedStocks
    .filter(stock => {
      const matchesSearch = stock.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.symbol.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           stock.issuer.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesSearch;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'market_cap':
          return b.marketCap - a.marketCap;
        case 'volume':
          return b.volume24h - a.volume24h;
        case 'change24h':
          return b.change24h - a.change24h;
        case 'name':
          return a.name.localeCompare(b.name);
        default:
          return 0;
      }
    });

  // 获取变化颜色
  const getChangeColor = (change: number) => {
    return change >= 0 ? 'text-green-600' : 'text-red-600';
  };

  // 获取变化图标
  const getChangeIcon = (change: number) => {
    return change >= 0 ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />;
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">代币化股票</h1>
          <p className="text-gray-600">
            追踪传统股票在区块链上的代币化版本，实现24/7交易和全球流动性
          </p>
        </div>

        {/* 统计概览 */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">总市值</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatNumber(tokenizedStocks.reduce((sum, stock) => sum + stock.marketCap, 0))}
              </div>
              <div className="text-sm text-gray-500">所有代币化股票</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">24小时交易量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {formatVolume(tokenizedStocks.reduce((sum, stock) => sum + stock.volume24h, 0))}
              </div>
              <div className="text-sm text-gray-500">总交易量</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">股票数量</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{tokenizedStocks.length}</div>
              <div className="text-sm text-gray-500">代币化股票</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">平均涨幅</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-600">
                +{(tokenizedStocks.reduce((sum, stock) => sum + stock.change24h, 0) / tokenizedStocks.length).toFixed(2)}%
              </div>
              <div className="text-sm text-gray-500">24小时平均</div>
            </CardContent>
          </Card>
        </div>

        {/* 搜索和筛选 */}
        <Card className="mb-6">
          <CardContent className="pt-6">
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                  <Input
                    placeholder="搜索股票名称、代码或发行商 (backed.fi, ondo.fi, dinari)..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-10"
                  />
                </div>
              </div>
              <div className="flex gap-2">
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-[140px]">
                    <BarChart3 className="h-4 w-4 mr-2" />
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="market_cap">按市值排序</SelectItem>
                    <SelectItem value="volume">按交易量排序</SelectItem>
                    <SelectItem value="change24h">按24h涨跌排序</SelectItem>
                    <SelectItem value="name">按名称排序</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 股票列表 */}
        <Card>
          <CardHeader>
            <CardTitle>代币化股票列表</CardTitle>
            <CardDescription>
              显示 {filteredAndSortedStocks.length} 个代币化股票
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">股票</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">价格</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">24h</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">7d</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">30d</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">24h交易量</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">市值</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">发行商</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAndSortedStocks.map((stock) => (
                    <tr 
                      key={stock.id} 
                      className="border-b hover:bg-gray-50 cursor-pointer transition-colors"
                      onClick={() => navigate(`/tokenization/stocks/${stock.id}`)}
                    >
                      <td className="py-3 px-4">
                        <div>
                          <div className="font-medium text-gray-900">{stock.name}</div>
                          <div className="text-sm text-gray-500">{stock.symbol}</div>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right font-medium text-gray-900">
                        ${stock.price.toFixed(2)}
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className={`flex items-center justify-end gap-1 ${getChangeColor(stock.change24h)}`}>
                          {getChangeIcon(stock.change24h)}
                          <span className="font-medium">
                            {stock.change24h >= 0 ? '+' : ''}{stock.change24h.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className={`flex items-center justify-end gap-1 ${getChangeColor(stock.change7d)}`}>
                          {getChangeIcon(stock.change7d)}
                          <span className="font-medium">
                            {stock.change7d >= 0 ? '+' : ''}{stock.change7d.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right">
                        <div className={`flex items-center justify-end gap-1 ${getChangeColor(stock.change30d)}`}>
                          {getChangeIcon(stock.change30d)}
                          <span className="font-medium">
                            {stock.change30d >= 0 ? '+' : ''}{stock.change30d.toFixed(2)}%
                          </span>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        {formatVolume(stock.volume24h)}
                      </td>
                      <td className="py-3 px-4 text-right text-gray-900">
                        {formatNumber(stock.marketCap)}
                      </td>
                      <td className="py-3 px-4">
                        <Badge variant="secondary" className="text-xs">
                          {stock.issuer}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>

        {/* 关于代币化股票 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
              关于代币化股票
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-medium text-gray-900 mb-2">什么是代币化股票？</h4>
                <p className="text-sm text-gray-600">
                  代币化股票是传统股票在区块链上的数字表示，允许投资者24/7交易传统股票，
                  无需等待传统市场开盘时间。每个代币代表传统股票的一股。
                </p>
              </div>
              <div>
                <h4 className="font-medium text-gray-900 mb-2">主要优势</h4>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• 24/7 全天候交易</li>
                  <li>• 全球流动性</li>
                  <li>• 降低交易成本</li>
                  <li>• 快速结算</li>
                </ul>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stocks;
