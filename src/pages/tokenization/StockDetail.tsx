import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  TrendingUp, 
  TrendingDown, 
  DollarSign,
  Activity,
  BarChart3,
  Globe,
  ExternalLink,
  Copy,
  CheckCircle,
  AlertCircle,
  Info
} from 'lucide-react';

const StockDetail = () => {
  const { stockId } = useParams();
  const navigate = useNavigate();
  const [copied, setCopied] = useState(false);

  // 模拟股票详情数据 - 重点展示不同发行商的代币
  const stockData = {
    1: {
      id: 1,
      name: 'Tesla',
      symbol: 'TSLA',
      description: 'Tesla Inc. 代币化股票 - 多发行商比较',
      about: 'Tesla Inc. 是一家美国电动汽车和清洁能源公司，由埃隆·马斯克于2003年创立。该公司专注于电动汽车、太阳能电池板和储能系统的设计、制造和销售。',
      categories: ['代币化股票', '科技股'],
      underlyingStock: {
        name: 'Tesla Inc.',
        symbol: 'TSLA',
        price: 248.50,
        change24h: 2.34,
        marketCap: 789000000000,
        exchange: 'NASDAQ'
      },
      tokenizedVersions: [
        {
          issuer: 'Robinhood',
          tokenSymbol: 'HOOD-TSLA',
          price: 248.45,
          change24h: 2.32,
          volume24h: 12500000,
          marketCap: 125000000,
          contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
          platform: 'Ethereum',
          totalSupply: '500000',
          circulatingSupply: '450000',
          exchanges: ['Robinhood App', 'Uniswap'],
          features: ['零手续费交易', '部分股票购买', '用户友好界面'],
          fees: '0%',
          minimumInvestment: '$1',
          custody: 'Robinhood Custody',
          compliance: 'SEC 注册',
          liquidity: '高',
          lastUpdated: '2024-01-15T10:30:00Z'
        },
        {
          issuer: 'Backed Finance',
          tokenSymbol: 'bTSLA',
          price: 248.52,
          change24h: 2.35,
          volume24h: 8900000,
          marketCap: 89000000,
          contractAddress: '0xabcdef1234567890abcdef1234567890abcdef12',
          platform: 'Ethereum',
          totalSupply: '400000',
          circulatingSupply: '380000',
          exchanges: ['Uniswap', 'SushiSwap', '1inch'],
          features: ['完全抵押', '透明审计', 'DeFi 集成'],
          fees: '0.1%',
          minimumInvestment: '$100',
          custody: 'Fireblocks',
          compliance: '瑞士监管',
          liquidity: '中等',
          lastUpdated: '2024-01-15T10:30:00Z'
        },
        {
          issuer: 'Ondo Finance',
          tokenSymbol: 'OUSG',
          price: 248.48,
          change24h: 2.33,
          volume24h: 15600000,
          marketCap: 156000000,
          contractAddress: '0x9876543210fedcba9876543210fedcba98765432',
          platform: 'Ethereum',
          totalSupply: '600000',
          circulatingSupply: '520000',
          exchanges: ['Uniswap', 'Curve', 'Balancer'],
          features: ['机构级托管', '实时定价', '高流动性'],
          fees: '0.05%',
          minimumInvestment: '$50',
          custody: 'Coinbase Custody',
          compliance: '美国监管',
          liquidity: '高',
          lastUpdated: '2024-01-15T10:30:00Z'
        }
      ]
    },
    2: {
      id: 2,
      name: 'Apple',
      symbol: 'AAPL',
      description: 'Apple Inc. 代币化股票 - 多发行商比较',
      about: 'Apple Inc. 是一家美国跨国科技公司，专门从事消费电子产品、计算机软件和在线服务的设计、开发和销售。',
      categories: ['代币化股票', '科技股'],
      underlyingStock: {
        name: 'Apple Inc.',
        symbol: 'AAPL',
        price: 189.25,
        change24h: -1.23,
        marketCap: 2950000000000,
        exchange: 'NASDAQ'
      },
      tokenizedVersions: [
        {
          issuer: 'Robinhood',
          tokenSymbol: 'HOOD-AAPL',
          price: 189.20,
          change24h: -1.25,
          volume24h: 8900000,
          marketCap: 89000000,
          contractAddress: '0x1111111111111111111111111111111111111111',
          platform: 'Ethereum',
          totalSupply: '500000',
          circulatingSupply: '470000',
          exchanges: ['Robinhood App', 'Uniswap'],
          features: ['零手续费交易', '部分股票购买', '用户友好界面'],
          fees: '0%',
          minimumInvestment: '$1',
          custody: 'Robinhood Custody',
          compliance: 'SEC 注册',
          liquidity: '高',
          lastUpdated: '2024-01-15T10:30:00Z'
        },
        {
          issuer: 'Backed Finance',
          tokenSymbol: 'bAAPL',
          price: 189.28,
          change24h: -1.20,
          volume24h: 6700000,
          marketCap: 67000000,
          contractAddress: '0x2222222222222222222222222222222222222222',
          platform: 'Ethereum',
          totalSupply: '400000',
          circulatingSupply: '360000',
          exchanges: ['Uniswap', 'SushiSwap', '1inch'],
          features: ['完全抵押', '透明审计', 'DeFi 集成'],
          fees: '0.1%',
          minimumInvestment: '$100',
          custody: 'Fireblocks',
          compliance: '瑞士监管',
          liquidity: '中等',
          lastUpdated: '2024-01-15T10:30:00Z'
        },
        {
          issuer: 'Ondo Finance',
          tokenSymbol: 'OUSG',
          price: 189.30,
          change24h: -1.18,
          volume24h: 11200000,
          marketCap: 112000000,
          contractAddress: '0x3333333333333333333333333333333333333333',
          platform: 'Ethereum',
          totalSupply: '600000',
          circulatingSupply: '580000',
          exchanges: ['Uniswap', 'Curve', 'Balancer'],
          features: ['机构级托管', '实时定价', '高流动性'],
          fees: '0.05%',
          minimumInvestment: '$50',
          custody: 'Coinbase Custody',
          compliance: '美国监管',
          liquidity: '高',
          lastUpdated: '2024-01-15T10:30:00Z'
        }
      ]
    }
  };

  const stock = stockData[stockId as keyof typeof stockData];

  if (!stock) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">股票未找到</h1>
          <Button onClick={() => navigate('/tokenization/stocks')}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            返回股票列表
          </Button>
        </div>
      </div>
    );
  }

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
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* 返回按钮 */}
      <div className="mb-6">
        <Button 
          variant="outline" 
          onClick={() => navigate('/tokenization/stocks')}
          className="mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          返回股票列表
        </Button>
      </div>

      {/* 股票基本信息 */}
      <div className="mb-8">
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="text-3xl font-bold">{stock.name}</CardTitle>
                <CardDescription className="text-lg">{stock.symbol} - {stock.description}</CardDescription>
              </div>
              <div className="text-right">
                <div className="text-2xl font-bold">${stock.underlyingStock.price}</div>
                <div className={`flex items-center gap-1 ${stock.underlyingStock.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                  {stock.underlyingStock.change24h >= 0 ? (
                    <TrendingUp className="h-4 w-4" />
                  ) : (
                    <TrendingDown className="h-4 w-4" />
                  )}
                  <span>{stock.underlyingStock.change24h >= 0 ? '+' : ''}{stock.underlyingStock.change24h}%</span>
                </div>
                <div className="text-sm text-gray-500">{stock.underlyingStock.exchange}</div>
              </div>
            </div>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4">{stock.about}</p>
            <div className="flex gap-2">
              {stock.categories.map((category, index) => (
                <Badge key={index} variant="outline">{category}</Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* 代币化版本比较 */}
      <Tabs defaultValue="comparison" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="comparison">发行商比较</TabsTrigger>
          <TabsTrigger value="details">详细信息</TabsTrigger>
          <TabsTrigger value="about">关于</TabsTrigger>
        </TabsList>

        <TabsContent value="comparison" className="mt-6">
          {/* 发行商比较表格 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                发行商代币比较
              </CardTitle>
              <CardDescription>
                比较不同发行商提供的 {stock.name} 代币化版本
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-medium text-gray-600">发行商</th>
                      <th className="text-left py-3 px-4 font-medium text-gray-600">代币符号</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">价格</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">24h涨跌</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">市值</th>
                      <th className="text-right py-3 px-4 font-medium text-gray-600">24h交易量</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">手续费</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">最低投资</th>
                      <th className="text-center py-3 px-4 font-medium text-gray-600">流动性</th>
                    </tr>
                  </thead>
                  <tbody>
                    {stock.tokenizedVersions.map((token, index) => (
                      <tr key={index} className="border-b hover:bg-gray-50">
                        <td className="py-3 px-4">
                          <div className="font-medium">{token.issuer}</div>
                        </td>
                        <td className="py-3 px-4">
                          <Badge variant="outline">{token.tokenSymbol}</Badge>
                        </td>
                        <td className="py-3 px-4 text-right font-semibold">
                          ${token.price}
                        </td>
                        <td className="py-3 px-4 text-right">
                          <span className={token.change24h >= 0 ? 'text-green-600' : 'text-red-600'}>
                            {token.change24h >= 0 ? '+' : ''}{token.change24h}%
                          </span>
                        </td>
                        <td className="py-3 px-4 text-right">
                          {formatNumber(token.marketCap)}
                        </td>
                        <td className="py-3 px-4 text-right">
                          {formatVolume(token.volume24h)}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={token.fees === '0%' ? 'default' : 'secondary'}>
                            {token.fees}
                          </Badge>
                        </td>
                        <td className="py-3 px-4 text-center">
                          {token.minimumInvestment}
                        </td>
                        <td className="py-3 px-4 text-center">
                          <Badge variant={token.liquidity === '高' ? 'default' : 'secondary'}>
                            {token.liquidity}
                          </Badge>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>

          {/* 发行商特色功能比较 */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
            {stock.tokenizedVersions.map((token, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">{token.issuer}</Badge>
                  </CardTitle>
                  <CardDescription>{token.tokenSymbol}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">特色功能</h4>
                      <div className="space-y-1">
                        {token.features.map((feature, featureIndex) => (
                          <div key={featureIndex} className="flex items-center gap-2">
                            <CheckCircle className="h-4 w-4 text-green-600" />
                            <span className="text-sm">{feature}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">托管服务</h4>
                      <p className="text-sm text-gray-600">{token.custody}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">合规监管</h4>
                      <p className="text-sm text-gray-600">{token.compliance}</p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">支持交易所</h4>
                      <div className="flex flex-wrap gap-1">
                        {token.exchanges.map((exchange, exchangeIndex) => (
                          <Badge key={exchangeIndex} variant="secondary" className="text-xs">
                            {exchange}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="details" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {stock.tokenizedVersions.map((token, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Badge variant="outline">{token.issuer}</Badge>
                    <span className="text-sm">{token.tokenSymbol}</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-600">合约地址</label>
                      <div className="flex items-center gap-2 mt-1">
                        <code className="flex-1 p-2 bg-gray-100 rounded text-xs font-mono truncate">
                          {token.contractAddress}
                        </code>
                        <Button
                          size="sm"
                          variant="outline"
                          onClick={() => copyToClipboard(token.contractAddress)}
                        >
                          {copied ? <CheckCircle className="h-3 w-3" /> : <Copy className="h-3 w-3" />}
                        </Button>
                        <Button size="sm" variant="outline" asChild>
                          <a 
                            href={`https://etherscan.io/token/${token.contractAddress}`}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-2">供应量</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">总供应量</span>
                            <span>{parseInt(token.totalSupply).toLocaleString()}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">流通供应量</span>
                            <span>{parseInt(token.circulatingSupply).toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div>
                        <h4 className="font-semibold mb-2">平台信息</h4>
                        <div className="space-y-1 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">区块链</span>
                            <span>{token.platform}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">最后更新</span>
                            <span>{new Date(token.lastUpdated).toLocaleDateString('zh-CN')}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="about" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>关于 {stock.name} 代币化</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">{stock.about}</p>
                
                <div>
                  <h4 className="font-semibold mb-2">代币化股票说明</h4>
                  <p className="text-gray-600 text-sm leading-relaxed">
                    代币化股票是将传统股票转换为区块链上的数字代币，使投资者能够通过加密货币交易所购买和交易股票。
                    每个发行商都有不同的技术实现、监管合规和用户体验。
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Robinhood</h4>
                    <p className="text-sm text-blue-800">
                      专注于零售投资者，提供零手续费交易和用户友好的移动应用体验。
                    </p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-green-900 mb-2">Backed Finance</h4>
                    <p className="text-sm text-green-800">
                      瑞士监管的DeFi原生平台，提供完全抵押和透明的审计机制。
                    </p>
                  </div>
                  <div className="bg-purple-50 p-4 rounded-lg">
                    <h4 className="font-semibold text-purple-900 mb-2">Ondo Finance</h4>
                    <p className="text-sm text-purple-800">
                      机构级解决方案，提供高流动性和专业的托管服务。
                    </p>
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-lg">
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-yellow-900 mb-1">投资风险提示</h4>
                      <p className="text-sm text-yellow-800">
                        代币化股票不代表实际股票所有权，而是代表底层股票价值的代币化表示。
                        投资前请仔细研究相关风险，包括监管风险、技术风险和流动性风险，并咨询专业财务顾问。
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default StockDetail;
