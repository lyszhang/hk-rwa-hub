import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
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


const MarketOverview = () => {
  return (
    <div className="space-y-6">
      <div className="bg-highlight-bg p-6 rounded-lg">
        <h1 className="financial-title mb-2">市场概览</h1>
        <p className="text-muted-foreground">全球Web3金融资产市场的全面洞察</p>
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
        <TabsList className="grid w-full grid-cols-1">
          <TabsTrigger value="growth">市场增长</TabsTrigger>
        </TabsList>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>资产代币化市场增长</CardTitle>
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

      </Tabs>

    </div>
  );
};

export default MarketOverview;