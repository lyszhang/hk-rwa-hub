import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Users, Building2 } from 'lucide-react';

const marketGrowthData = [
  { month: 'Jan', tokenized: 25, traditional: 45 },
  { month: 'Feb', tokenized: 32, traditional: 48 },
  { month: 'Mar', tokenized: 38, traditional: 52 },
  { month: 'Apr', tokenized: 43, traditional: 55 },
  { month: 'May', tokenized: 48, traditional: 58 },
  { month: 'Jun', tokenized: 56, traditional: 62 },
  { month: 'Jul', tokenized: 62, traditional: 65 },
  { month: 'Aug', tokenized: 70, traditional: 68 },
  { month: 'Sep', tokenized: 78, traditional: 72 },
];

const assetDistribution = [
  { name: '房地产', value: 35, color: 'hsl(var(--chart-1))' },
  { name: '债券', value: 25, color: 'hsl(var(--chart-2))' },
  { name: '股票', value: 20, color: 'hsl(var(--chart-3))' },
  { name: '商品', value: 12, color: 'hsl(var(--chart-4))' },
  { name: '其他', value: 8, color: 'hsl(var(--muted-foreground))' },
];

const quarterlyPerformance = [
  { quarter: 'Q1 2024', rwa: 45, traditional: 32 },
  { quarter: 'Q2 2024', rwa: 52, traditional: 28 },
  { quarter: 'Q3 2024', rwa: 67, traditional: 35 },
  { quarter: 'Q4 2024', rwa: 78, traditional: 31 },
];

const MarketOverview = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="financial-title mb-2">RWA市场概览</h1>
        <p className="text-muted-foreground">香港地区实物资产代币化市场的全面洞察</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RWA市场总值</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-metric text-primary">$12.4B</div>
            <p className="text-xs text-muted-foreground">香港地区</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="financial-change-positive text-sm">+18.5% 环比上季度</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">代币化资产</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-metric text-primary">$4.7B</div>
            <p className="text-xs text-muted-foreground">总价值</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="financial-change-positive text-sm">+23.8% 环比上季度</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">市场参与者</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-metric text-primary">156</div>
            <p className="text-xs text-muted-foreground">活跃实体</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="financial-change-positive text-sm">+12 本季度新增</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="growth" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="growth">市场增长</TabsTrigger>
          <TabsTrigger value="distribution">资产分布</TabsTrigger>
          <TabsTrigger value="performance">季度表现</TabsTrigger>
        </TabsList>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>RWA市场增长</CardTitle>
              <CardDescription>
                香港地区代币化与传统RWA对比（十亿美元）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={marketGrowthData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="tokenized" 
                    stroke="hsl(var(--primary))" 
                    strokeWidth={3}
                    name="代币化资产"
                  />
                  <Line 
                    type="monotone" 
                    dataKey="traditional" 
                    stroke="hsl(var(--muted-foreground))" 
                    strokeWidth={2}
                    strokeDasharray="5 5"
                    name="传统资产"
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="distribution">
          <Card>
            <CardHeader>
              <CardTitle>资产类别分布</CardTitle>
              <CardDescription>
                不同类型RWA资产的市场占比
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={assetDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {assetDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => [`${value}%`, '占比']} />
                </PieChart>
              </ResponsiveContainer>
              <div className="grid grid-cols-3 gap-4 mt-4">
                {assetDistribution.map((item, index) => (
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

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>季度表现对比</CardTitle>
              <CardDescription>
                RWA vs 传统投资回报率（%）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={quarterlyPerformance}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="quarter" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="rwa" fill="hsl(var(--primary))" name="RWA" />
                  <Bar dataKey="traditional" fill="hsl(var(--muted-foreground))" name="传统投资" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Regulatory Framework */}
      <Card>
        <CardHeader>
          <CardTitle>监管框架</CardTitle>
          <CardDescription>香港RWA监管政策最新动态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="border-l-4 border-primary pl-4">
            <h4 className="font-semibold">证监会就RWA代币监管征求意见</h4>
            <p className="text-sm text-muted-foreground mt-1">
              证券及期货事务监察委员会就代币化框架向业界征求反馈意见
            </p>
            <Badge variant="secondary" className="mt-2">监管</Badge>
          </div>
          <div className="border-l-4 border-info pl-4">
            <h4 className="font-semibold">金管局数字资产政策实施</h4>
            <p className="text-sm text-muted-foreground mt-1">
              银行处理代币化证券和资产的新指引发布
            </p>
            <Badge variant="secondary" className="mt-2">政策</Badge>
          </div>
          <div className="border-l-4 border-success pl-4">
            <h4 className="font-semibold">RWA托管标准发布</h4>
            <p className="text-sm text-muted-foreground mt-1">
              代币化实物资产机构托管的行业标准正式实施
            </p>
            <Badge variant="secondary" className="mt-2">标准</Badge>
          </div>
        </CardContent>
      </Card>

      {/* Market Insights */}
      <Card>
        <CardHeader>
          <CardTitle>市场洞察</CardTitle>
          <CardDescription>关键趋势与发展动态</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-start space-x-3">
            <TrendingUp className="h-5 w-5 text-success mt-0.5" />
            <div>
              <h4 className="font-semibold">房地产代币引领增长</h4>
              <p className="text-sm text-muted-foreground">
                2024年Q3商业地产代币化增长28%
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <Building2 className="h-5 w-5 text-info mt-0.5" />
            <div>
              <h4 className="font-semibold">机构采用加速</h4>
              <p className="text-sm text-muted-foreground">
                三家主要银行在香港推出RWA托管服务
              </p>
            </div>
          </div>
          <div className="flex items-start space-x-3">
            <DollarSign className="h-5 w-5 text-warning mt-0.5" />
            <div>
              <h4 className="font-semibold">跨境RWA交易上升</h4>
              <p className="text-sm text-muted-foreground">
                大湾区倡议推动区域代币化资产流动
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default MarketOverview;