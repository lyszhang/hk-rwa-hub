import React from 'react';
import { useParams } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowLeft, TrendingUp, TrendingDown, DollarSign, BarChart3, Activity, Clock, ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const CompanyAnalysis = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const navigate = useNavigate();

  // 模拟公司数据（实际应用中应该通过API获取）
  const companyData = {
    '954839c2-0fa8-4b1b-b657-bb505a011f1a': {
      name: 'MicroStrategy',
      ticker: 'MSTR',
      rank: 1,
      country: 'US',
      coin_type: 'Bitcoin',
      amount: 632457,
      usd_value: 69570270000,
      market_cap: 28500000000,
      description: 'MicroStrategy 是全球领先的商业智能软件公司，也是最大的企业比特币持有者之一。',
      analysis: {
        risk_level: 'Medium',
        growth_potential: 'High',
        market_position: 'Leader',
        recent_performance: '+15.2%',
        key_metrics: {
          btc_ratio: '2.44%', // 比特币持仓占公司市值的比例
          avg_cost: '$45,200',
          unrealized_pnl: '+$25.4B',
          portfolio_concentration: '100%'
        }
      }
    },
    '77529482-0876-4b0d-ac81-90beb7085ab9': {
      name: 'Bitmine Immersion Tech',
      ticker: 'BMNR',
      rank: 69,
      country: 'US',
      coin_type: 'Ethereum',
      amount: 2070000,
      usd_value: 9459900000,
      market_cap: 12000000000,
      description: 'Bitmine Immersion Tech 专注于加密货币挖矿和数字资产投资。',
      analysis: {
        risk_level: 'High',
        growth_potential: 'Medium',
        market_position: 'Emerging',
        recent_performance: '+8.7%',
        key_metrics: {
          btc_ratio: '78.8%',
          avg_cost: '$2,800',
          unrealized_pnl: '+$3.2B',
          portfolio_concentration: '95%'
        }
      }
    }
  };

  const company = companyData[companyId as keyof typeof companyData] || companyData['954839c2-0fa8-4b1b-b657-bb505a011f1a'];

  // 模拟交易记录数据
  const transactionHistory = {
    '954839c2-0fa8-4b1b-b657-bb505a011f1a': [
      {
        id: 1,
        date: '2024-12-15',
        type: 'buy',
        coin: 'Bitcoin',
        amount: 1000,
        price: 67500,
        totalValue: 67500000,
        exchange: 'Coinbase Pro',
        notes: '定期增持策略'
      },
      {
        id: 2,
        date: '2024-11-28',
        type: 'buy',
        coin: 'Bitcoin',
        amount: 500,
        price: 63200,
        totalValue: 31600000,
        exchange: 'Kraken',
        notes: '市场回调时增持'
      },
      {
        id: 3,
        date: '2024-10-15',
        type: 'sell',
        coin: 'Bitcoin',
        amount: 200,
        price: 58000,
        totalValue: 11600000,
        exchange: 'Binance',
        notes: '部分获利了结'
      },
      {
        id: 4,
        date: '2024-09-20',
        type: 'buy',
        coin: 'Bitcoin',
        amount: 800,
        price: 45200,
        totalValue: 36160000,
        exchange: 'Coinbase Pro',
        notes: '大幅增持'
      },
      {
        id: 5,
        date: '2024-08-10',
        type: 'buy',
        coin: 'Bitcoin',
        amount: 300,
        price: 38500,
        totalValue: 11550000,
        exchange: 'Kraken',
        notes: '逢低买入'
      },
      {
        id: 6,
        date: '2024-07-05',
        type: 'buy',
        coin: 'Bitcoin',
        amount: 150,
        price: 42000,
        totalValue: 6300000,
        exchange: 'Coinbase Pro',
        notes: '小额增持'
      },
      {
        id: 7,
        date: '2024-06-18',
        type: 'sell',
        coin: 'Bitcoin',
        amount: 100,
        price: 38500,
        totalValue: 3850000,
        exchange: 'Binance',
        notes: '短期调整'
      },
      {
        id: 8,
        date: '2024-05-25',
        type: 'buy',
        coin: 'Bitcoin',
        amount: 400,
        price: 35200,
        totalValue: 14080000,
        exchange: 'Kraken',
        notes: '市场底部增持'
      }
    ],
    '77529482-0876-4b0d-ac81-90beb7085ab9': [
      {
        id: 1,
        date: '2024-12-10',
        type: 'buy',
        coin: 'Ethereum',
        amount: 5000,
        price: 2850,
        totalValue: 14250000,
        exchange: 'Coinbase Pro',
        notes: 'ETH增持计划'
      },
      {
        id: 2,
        date: '2024-11-15',
        type: 'buy',
        coin: 'Ethereum',
        amount: 3000,
        price: 2650,
        totalValue: 7950000,
        exchange: 'Kraken',
        notes: '逢低买入'
      },
      {
        id: 3,
        date: '2024-10-20',
        type: 'sell',
        coin: 'Ethereum',
        amount: 1000,
        price: 3200,
        totalValue: 3200000,
        exchange: 'Binance',
        notes: '部分获利'
      }
    ]
  };

  const transactions = transactionHistory[companyId as keyof typeof transactionHistory] || transactionHistory['954839c2-0fa8-4b1b-b657-bb505a011f1a'];

  const formatNumber = (n: number) => {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(1)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
    return `$${n}`;
  };

  const formatAmount = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });
  };

  // 计算盈亏比例
  const calculateProfitLossRatio = () => {
    const avgCost = parseFloat(company.analysis.key_metrics.avg_cost.replace('$', '').replace(',', ''));
    // 假设当前价格为 67500（可以根据实际API获取）
    const currentPrice = 67500;
    const ratio = ((currentPrice - avgCost) / avgCost) * 100;
    return {
      ratio: ratio,
      isProfit: ratio >= 0,
      currentPrice: currentPrice
    };
  };

  const profitLoss = calculateProfitLossRatio();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Button
            variant="outline"
            onClick={() => navigate('/securitization/dats')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            返回公司列表
          </Button>
        </div>

        {/* 公司基本信息 */}
        <div className="mb-8">
          <div className="flex items-center gap-4 mb-4">
            <h1 className="text-3xl font-bold text-gray-900">{company.name}</h1>
            <Badge variant="secondary" className="text-sm">
              #{company.rank}
            </Badge>
            <Badge variant="outline" className="text-sm">
              {company.ticker}
            </Badge>
          </div>
          <p className="text-gray-600 text-lg">{company.description}</p>
        </div>

        {/* 关键指标卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">持仓价值</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(company.usd_value)}</div>
              <div className="text-sm text-gray-500">
                {formatAmount(company.amount)} {company.coin_type}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">市值</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{formatNumber(company.market_cap || 0)}</div>
              <div className="text-sm text-gray-500">公司总市值</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">持仓占比</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">{company.analysis.key_metrics.btc_ratio}</div>
              <div className="text-sm text-gray-500">占公司市值比例</div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-600">平均购买价格</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-gray-900">
                {company.analysis.key_metrics.avg_cost}
              </div>
              <div className="flex items-center gap-2 mt-1">
                <div className={`text-sm font-medium flex items-center gap-1 ${
                  profitLoss.isProfit ? 'text-green-600' : 'text-red-600'
                }`}>
                  {profitLoss.isProfit ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {profitLoss.isProfit ? '+' : ''}{profitLoss.ratio.toFixed(1)}%
                </div>
                <div className="text-xs text-gray-500">
                  (当前: ${profitLoss.currentPrice.toLocaleString()})
                </div>
              </div>
              <div className="text-sm text-gray-500 mt-1">历史平均成本</div>
            </CardContent>
          </Card>
        </div>

        {/* 详细分析 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* 投资分析 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <BarChart3 className="h-5 w-5" />
                投资分析
              </CardTitle>
              <CardDescription>基于持仓数据的深度分析</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">风险等级</div>
                  <Badge variant={company.analysis.risk_level === 'Low' ? 'default' : 
                                 company.analysis.risk_level === 'Medium' ? 'secondary' : 'destructive'}>
                    {company.analysis.risk_level}
                  </Badge>
                </div>
                <div>
                  <div className="text-sm text-gray-600">增长潜力</div>
                  <Badge variant={company.analysis.growth_potential === 'High' ? 'default' : 
                                 company.analysis.growth_potential === 'Medium' ? 'secondary' : 'outline'}>
                    {company.analysis.growth_potential}
                  </Badge>
                </div>
              </div>
              
              <div>
                <div className="text-sm text-gray-600 mb-2">市场地位</div>
                <Badge variant="outline">{company.analysis.market_position}</Badge>
              </div>

              <div className="pt-4 border-t">
                <h4 className="font-medium mb-3">关键指标</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">平均成本</span>
                    <span className="font-medium">{company.analysis.key_metrics.avg_cost}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">未实现盈亏</span>
                    <span className="font-medium text-green-600">{company.analysis.key_metrics.unrealized_pnl}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">投资集中度</span>
                    <span className="font-medium">{company.analysis.key_metrics.portfolio_concentration}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* 市场趋势 */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                市场趋势
              </CardTitle>
              <CardDescription>基于历史数据的趋势分析</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="p-4 bg-blue-50 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">投资策略</h4>
                  <p className="text-sm text-blue-800">
                    {company.name} 采用长期持有策略，将数字资产作为公司储备资产的重要组成部分。
                    这种策略体现了对数字资产长期价值的信心。
                  </p>
                </div>
                
                <div className="p-4 bg-green-50 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">竞争优势</h4>
                  <p className="text-sm text-green-800">
                    作为早期采用者，{company.name} 在数字资产投资领域具有先发优势，
                    能够以相对较低的成本建立大量持仓。
                  </p>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg">
                  <h4 className="font-medium text-yellow-900 mb-2">风险提示</h4>
                  <p className="text-sm text-yellow-800">
                    数字资产价格波动较大，可能对公司财务状况产生重大影响。
                    建议关注市场动态和监管政策变化。
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 交易记录 */}
        <Card className="mt-8">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              历史交易记录
            </CardTitle>
            <CardDescription>
              {company.name} 的虚拟代币购买、卖出历史记录
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left py-3 px-4 font-medium text-gray-600">时间</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">类型</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">币种</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">数量</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">价格</th>
                    <th className="text-right py-3 px-4 font-medium text-gray-600">总价值</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">交易所</th>
                    <th className="text-left py-3 px-4 font-medium text-gray-600">备注</th>
                  </tr>
                </thead>
                <tbody>
                  {transactions.map((transaction) => (
                    <tr key={transaction.id} className="border-b hover:bg-gray-50">
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {formatDate(transaction.date)}
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          {transaction.type === 'buy' ? (
                            <ArrowUpRight className="h-4 w-4 text-green-600" />
                          ) : (
                            <ArrowDownLeft className="h-4 w-4 text-red-600" />
                          )}
                          <Badge 
                            variant={transaction.type === 'buy' ? 'default' : 'destructive'}
                            className="text-xs"
                          >
                            {transaction.type === 'buy' ? '买入' : '卖出'}
                          </Badge>
                        </div>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900">
                        {transaction.coin}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">
                        {formatAmount(transaction.amount)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-900 text-right">
                        ${transaction.price.toLocaleString()}
                      </td>
                      <td className="py-3 px-4 text-sm font-medium text-gray-900 text-right">
                        {formatNumber(transaction.totalValue)}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {transaction.exchange}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-500">
                        {transaction.notes}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            
            {/* 交易统计 */}
            <div className="mt-6 pt-6 border-t">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <div className="text-2xl font-bold text-green-600">
                    {transactions.filter(t => t.type === 'buy').length}
                  </div>
                  <div className="text-sm text-green-800">买入次数</div>
                </div>
                <div className="text-center p-4 bg-red-50 rounded-lg">
                  <div className="text-2xl font-bold text-red-600">
                    {transactions.filter(t => t.type === 'sell').length}
                  </div>
                  <div className="text-sm text-red-800">卖出次数</div>
                </div>
                <div className="text-center p-4 bg-blue-50 rounded-lg">
                  <div className="text-2xl font-bold text-blue-600">
                    {formatNumber(transactions.reduce((sum, t) => sum + t.totalValue, 0))}
                  </div>
                  <div className="text-sm text-blue-800">总交易额</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CompanyAnalysis;
