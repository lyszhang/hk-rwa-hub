import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Shield, Zap } from 'lucide-react';

const marketCapData = [
  { date: '1月', USDT: 95.2, USDC: 68.5, DAI: 8.2, BUSD: 12.1, others: 6.8 },
  { date: '2月', USDT: 98.1, USDC: 71.3, DAI: 8.7, BUSD: 11.8, others: 7.2 },
  { date: '3月', USDT: 102.5, USDC: 74.2, DAI: 9.1, BUSD: 11.5, others: 7.8 },
  { date: '4月', USDT: 108.7, USDC: 78.9, DAI: 9.8, BUSD: 10.9, others: 8.4 },
];

const stabilityData = [
  { coin: 'USDT', stability: 99.97, volume24h: 28.5 },
  { coin: 'USDC', stability: 99.99, volume24h: 18.3 },
  { coin: 'DAI', stability: 99.89, volume24h: 2.1 },
  { coin: 'BUSD', stability: 99.95, volume24h: 5.7 },
  { coin: 'HKDT', stability: 99.94, volume24h: 1.2 },
];

const distributionData = [
  { name: 'USDT', value: 45.2, color: 'hsl(var(--chart-1))' },
  { name: 'USDC', value: 32.8, color: 'hsl(var(--chart-2))' },
  { name: 'DAI', value: 8.1, color: 'hsl(var(--chart-3))' },
  { name: 'BUSD', value: 7.3, color: 'hsl(var(--chart-4))' },
  { name: '其他', value: 6.6, color: 'hsl(var(--muted-foreground))' },
];

const stablecoinProjects = [
  {
    name: 'Tether (USDT)',
    symbol: 'USDT',
    marketCap: '$108.7B',
    change24h: '+0.12%',
    backing: 'USD储备',
    issuer: 'Tether Limited',
    auditStatus: '已审计',
    volume24h: '$28.5B',
    circulatingSupply: '108.7B',
    status: 'active',
    description: '最大的美元稳定币，由美元储备和等价物支持'
  },
  {
    name: 'USD Coin (USDC)',
    symbol: 'USDC',
    marketCap: '$78.9B',
    change24h: '+0.08%',
    backing: 'USD储备',
    issuer: 'Centre',
    auditStatus: '已审计',
    volume24h: '$18.3B',
    circulatingSupply: '78.9B',
    status: 'active',
    description: '完全由美元储备支持的透明稳定币'
  },
  {
    name: 'Dai (DAI)',
    symbol: 'DAI',
    marketCap: '$9.8B',
    change24h: '-0.05%',
    backing: '加密资产超额抵押',
    issuer: 'MakerDAO',
    auditStatus: '已审计',
    volume24h: '$2.1B',
    circulatingSupply: '9.8B',
    status: 'active',
    description: '去中心化稳定币，由多种加密资产超额抵押'
  },
  {
    name: 'Binance USD (BUSD)',
    symbol: 'BUSD',
    marketCap: '$10.9B',
    change24h: '-0.15%',
    backing: 'USD储备',
    issuer: 'Paxos',
    auditStatus: '已审计',
    volume24h: '$5.7B',
    circulatingSupply: '10.9B',
    status: 'sunset',
    description: '由Paxos发行的受监管稳定币（即将停止发行）'
  },
  {
    name: 'Hong Kong Dollar Token (HKDT)',
    symbol: 'HKDT',
    marketCap: '$1.2B',
    change24h: '+0.03%',
    backing: 'HKD储备',
    issuer: 'HK FinTech Ltd',
    auditStatus: '已审计',
    volume24h: '$1.2B',
    circulatingSupply: '9.3B',
    status: 'active',
    description: '香港首个获得完全监管批准的港元稳定币'
  }
];

const getStatusColor = (status: string) => {
  switch (status) {
    case 'active': return 'bg-success text-success-foreground';
    case 'sunset': return 'bg-warning text-warning-foreground';
    default: return 'bg-muted text-muted-foreground';
  }
};

const getStatusText = (status: string) => {
  switch (status) {
    case 'active': return '正常运行';
    case 'sunset': return '即将停止';
    default: return '未知状态';
  }
};

const Stablecoins = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="financial-title mb-2">稳定币市场</h1>
          <p className="text-muted-foreground">全球稳定币生态系统的综合数据分析与项目追踪</p>
        </div>

        {/* Market Overview */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">总市值</CardTitle>
              <DollarSign className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="financial-metric text-primary">$207.3B</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="financial-change-positive text-sm">+2.3% 24h</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">24h交易量</CardTitle>
              <Zap className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="financial-metric text-primary">$55.8B</div>
              <div className="flex items-center mt-2">
                <TrendingDown className="h-4 w-4 text-destructive mr-1" />
                <span className="financial-change-negative text-sm">-1.2% 24h</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">活跃项目</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="financial-metric text-primary">25</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="financial-change-positive text-sm">+2 本月</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">平均稳定性</CardTitle>
              <Shield className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="financial-metric text-primary">99.95%</div>
              <div className="flex items-center mt-2">
                <TrendingUp className="h-4 w-4 text-success mr-1" />
                <span className="financial-change-positive text-sm">+0.01% 7d</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <Tabs defaultValue="marketcap" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="marketcap">市值趋势</TabsTrigger>
            <TabsTrigger value="distribution">市场分布</TabsTrigger>
            <TabsTrigger value="stability">稳定性分析</TabsTrigger>
          </TabsList>

          <TabsContent value="marketcap">
            <Card>
              <CardHeader>
                <CardTitle>稳定币市值变化</CardTitle>
                <CardDescription>主要稳定币的市值增长趋势（十亿美元）</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <LineChart data={marketCapData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line type="monotone" dataKey="USDT" stroke="hsl(var(--chart-1))" strokeWidth={3} name="USDT" />
                    <Line type="monotone" dataKey="USDC" stroke="hsl(var(--chart-2))" strokeWidth={2} name="USDC" />
                    <Line type="monotone" dataKey="DAI" stroke="hsl(var(--chart-3))" strokeWidth={2} name="DAI" />
                    <Line type="monotone" dataKey="BUSD" stroke="hsl(var(--chart-4))" strokeWidth={2} name="BUSD" />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="distribution">
            <Card>
              <CardHeader>
                <CardTitle>市场占有率分布</CardTitle>
                <CardDescription>各稳定币的市场份额</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <PieChart>
                    <Pie
                      data={distributionData}
                      cx="50%"
                      cy="50%"
                      innerRadius={80}
                      outerRadius={160}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {distributionData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(value) => [`${value}%`, '市场份额']} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {distributionData.map((item, index) => (
                    <div key={index} className="flex items-center space-x-2">
                      <div 
                        className="w-3 h-3 rounded-sm" 
                        style={{ backgroundColor: item.color }}
                      />
                      <span className="text-sm">{item.name}</span>
                      <span className="text-sm font-medium">{item.value}%</span>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stability">
            <Card>
              <CardHeader>
                <CardTitle>稳定性指标</CardTitle>
                <CardDescription>各稳定币的价格稳定性表现</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={400}>
                  <BarChart data={stabilityData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="coin" />
                    <YAxis domain={[99.8, 100]} />
                    <Tooltip formatter={(value) => [`${value}%`, '稳定性']} />
                    <Bar dataKey="stability" fill="hsl(var(--primary))" name="稳定性 %" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Stablecoin Projects */}
        <Card>
          <CardHeader>
            <CardTitle>稳定币项目详情</CardTitle>
            <CardDescription>主要稳定币项目的详细信息与实时数据</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {stablecoinProjects.map((project, index) => (
                <div key={index} className="border rounded-lg p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
                        <span className="font-bold text-primary">{project.symbol.slice(0, 2)}</span>
                      </div>
                      <div>
                        <h3 className="financial-subtitle">{project.name}</h3>
                        <p className="text-sm text-muted-foreground">{project.symbol}</p>
                      </div>
                    </div>
                    <Badge className={getStatusColor(project.status)}>
                      {getStatusText(project.status)}
                    </Badge>
                  </div>

                  <p className="text-sm text-muted-foreground">{project.description}</p>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div>
                      <p className="text-sm text-muted-foreground">市值</p>
                      <p className="font-semibold">{project.marketCap}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">24h变化</p>
                      <p className={`font-semibold ${project.change24h.startsWith('+') ? 'text-success' : 'text-destructive'}`}>
                        {project.change24h}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">24h交易量</p>
                      <p className="font-semibold">{project.volume24h}</p>
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">发行方</p>
                      <p className="font-semibold">{project.issuer}</p>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2 pt-2">
                    <Badge variant="outline">{project.backing}</Badge>
                    <Badge variant="outline">{project.auditStatus}</Badge>
                    <Badge variant="outline">流通量: {project.circulatingSupply}</Badge>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Stablecoins;