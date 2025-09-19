import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TrendingUp, TrendingDown, DollarSign, Users, Building2 } from 'lucide-react';
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

const marketGrowthData = [
  { month: 'Jan', stablecoins: 15, stocks: 8, rwa: 12 },
  { month: 'Feb', stablecoins: 18, stocks: 12, rwa: 16 },
  { month: 'Mar', stablecoins: 22, stocks: 16, rwa: 20 },
  { month: 'Apr', stablecoins: 28, stocks: 20, rwa: 25 },
  { month: 'May', stablecoins: 35, stocks: 25, rwa: 32 },
  { month: 'Jun', stablecoins: 42, stocks: 32, rwa: 38 },
  { month: 'Jul', stablecoins: 48, stocks: 38, rwa: 45 },
  { month: 'Aug', stablecoins: 55, stocks: 45, rwa: 52 },
  { month: 'Sep', stablecoins: 62, stocks: 52, rwa: 58 },
];

// 代币证券化市场增长数据
const securitizationGrowthData = [
  { month: 'Jan', dats: 25, etf: 18 },
  { month: 'Feb', dats: 32, etf: 22 },
  { month: 'Mar', dats: 38, etf: 28 },
  { month: 'Apr', dats: 45, etf: 35 },
  { month: 'May', dats: 52, etf: 42 },
  { month: 'Jun', dats: 58, etf: 48 },
  { month: 'Jul', dats: 65, etf: 55 },
  { month: 'Aug', dats: 72, etf: 62 },
  { month: 'Sep', dats: 78, etf: 68 },
];

// Chart.js 配置
const chartData = {
  labels: marketGrowthData.map(item => item.month),
  datasets: [
    {
      label: '稳定币',
      data: marketGrowthData.map(item => item.stablecoins),
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
    {
      label: '股票代币化',
      data: marketGrowthData.map(item => item.stocks),
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
      label: 'RWA总值',
      data: marketGrowthData.map(item => item.rwa),
      borderColor: 'rgb(239, 68, 68)',
      backgroundColor: 'rgba(239, 68, 68, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(239, 68, 68)',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: 'rgb(239, 68, 68)',
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
          return `${context.dataset.label}: $${context.parsed.y}B`;
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
        text: '市值 (十亿美元)',
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
          return `$${value}B`;
        },
      },
    },
  },
};

// 代币证券化图表配置
const securitizationChartData = {
  labels: securitizationGrowthData.map(item => item.month),
  datasets: [
    {
      label: 'DATs',
      data: securitizationGrowthData.map(item => item.dats),
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
      label: 'ETF',
      data: securitizationGrowthData.map(item => item.etf),
      borderColor: 'rgb(245, 158, 11)',
      backgroundColor: 'rgba(245, 158, 11, 0.1)',
      borderWidth: 3,
      fill: true,
      tension: 0.4,
      pointBackgroundColor: 'rgb(245, 158, 11)',
      pointBorderColor: '#ffffff',
      pointBorderWidth: 2,
      pointRadius: 6,
      pointHoverRadius: 8,
      pointHoverBackgroundColor: 'rgb(245, 158, 11)',
      pointHoverBorderColor: '#ffffff',
      pointHoverBorderWidth: 2,
    },
  ],
};

const securitizationChartOptions = {
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
          return `${context.dataset.label}: $${context.parsed.y}B`;
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
        text: '市值 (十亿美元)',
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
          return `$${value}B`;
        },
      },
    },
  },
};


const MarketOverview = () => {
  return (
    <div className="space-y-6">
      <div className="bg-highlight-bg p-6 rounded-lg">
        <h1 className="financial-title mb-2">市场概览</h1>
        <p className="text-muted-foreground">全球Web3金融资产市场的全面洞察</p>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">BTC市值</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-metric text-primary">$2.4T</div>
            <p className="text-xs text-muted-foreground">黄金市值24.6T  </p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="financial-change-positive text-sm">+15.2% 环比上季度</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">RWA市场总值</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-metric text-primary">$12.4B</div>
            <p className="text-xs text-muted-foreground">全球市场</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="financial-change-positive text-sm">+18.5% 环比上季度</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">DATs市场总值</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-metric text-primary">$78.2B</div>
            <p className="text-xs text-muted-foreground">虚拟货币总市值4.6T</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="financial-change-positive text-sm">+25.3% 环比上季度</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">代币化股票总值</CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="financial-metric text-primary">$52.1B</div>
            <p className="text-xs text-muted-foreground">全球股票总市值112.5T</p>
            <div className="flex items-center mt-2">
              <TrendingUp className="h-4 w-4 text-success mr-1" />
              <span className="financial-change-positive text-sm">+31.7% 环比上季度</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <Tabs defaultValue="growth" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="growth">资产代币化市场增长</TabsTrigger>
          <TabsTrigger value="securitization">代币证券化市场增长</TabsTrigger>
        </TabsList>

        <TabsContent value="growth">
          <Card>
            <CardHeader>
              <CardTitle>资产代币化市场增长</CardTitle>
              <CardDescription>
                稳定币、股票代币化和RWA总值增长趋势（十亿美元）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Line data={chartData} options={chartOptions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="securitization">
          <Card>
            <CardHeader>
              <CardTitle>代币证券化市场增长</CardTitle>
              <CardDescription>
                DATs和ETF市场增长趋势（十亿美元）
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[400px]">
                <Line data={securitizationChartData} options={securitizationChartOptions} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

      </Tabs>

    </div>
  );
};

export default MarketOverview;