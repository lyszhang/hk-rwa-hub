import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  TrendingUp, 
  DollarSign, 
  Package, 
  BarChart3, 
  ArrowUpRight,
  ArrowDownRight,
  ExternalLink,
  Calendar,
  Users,
  Building2,
  Coins
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
import { format, subDays, subMonths, subYears, startOfDay, endOfDay, differenceInDays, addDays } from 'date-fns';
import { zhCN } from 'date-fns/locale';
import Draggable from 'react-draggable';
import {
  PieChart as RechartsPieChart,
  Pie,
  Cell,
  ResponsiveContainer,
  Tooltip
} from 'recharts';

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

// 统计数据
const statisticsData = {
  totalValue: {
    value: 125.8,
    unit: '亿美元',
    change: 12.5,
    changeType: 'increase'
  },
  totalProducts: {
    value: 342,
    unit: '个',
    change: 8.2,
    changeType: 'increase'
  },
  activeIssuers: {
    value: 156,
    unit: '家',
    change: -2.1,
    changeType: 'decrease'
  },
  marketCap: {
    value: 1.2,
    unit: '万个',
    change: 8.3,
    changeType: 'increase'
  }
};

// 产品发行方发行量数据
const issuerData = [
  { issuer: '汇丰银行', value: 28.5, percentage: 22.7, color: 'bg-blue-500' },
  { issuer: '中银香港', value: 25.8, percentage: 20.5, color: 'bg-green-500' },
  { issuer: '渣打银行', value: 22.3, percentage: 17.7, color: 'bg-purple-500' },
  { issuer: '恒生银行', value: 18.9, percentage: 15.0, color: 'bg-orange-500' },
  { issuer: '东亚银行', value: 15.2, percentage: 12.1, color: 'bg-red-500' },
  { issuer: '花旗银行', value: 14.1, percentage: 11.2, color: 'bg-indigo-500' },
  { issuer: '其他', value: 1.0, percentage: 0.8, color: 'bg-gray-500' }
];

// 区块链分布数据
const blockchainData = [
  { name: 'Ethereum', value: 45.2, percentage: 35.9, color: '#627EEA' },
  { name: 'Polygon', value: 28.5, percentage: 22.7, color: '#8247E5' },
  { name: 'BNB Chain', value: 22.3, percentage: 17.7, color: '#F3BA2F' },
  { name: 'Avalanche', value: 15.8, percentage: 12.6, color: '#E84142' },
  { name: 'Arbitrum', value: 8.9, percentage: 7.1, color: '#28A0F0' },
  { name: '其他', value: 5.1, percentage: 4.0, color: '#6B7280' }
];

// 月度发行趋势数据 - 按产品类型分类
const monthlyTrendData = [
  { month: '1月', 债券代币化: 3.2, 股票代币化: 2.8, 基金代币化: 1.5, REIT代币化: 0.4, 其他: 0.3 },
  { month: '2月', 债券代币化: 3.8, 股票代币化: 3.2, 基金代币化: 1.8, REIT代币化: 0.5, 其他: 0.2 },
  { month: '3月', 债券代币化: 4.5, 股票代币化: 3.8, 基金代币化: 2.2, REIT代币化: 0.6, 其他: 0.2 },
  { month: '4月', 债券代币化: 4.2, 股票代币化: 3.5, 基金代币化: 2.1, REIT代币化: 0.7, 其他: 0.3 },
  { month: '5月', 债券代币化: 4.8, 股票代币化: 4.1, 基金代币化: 2.4, REIT代币化: 0.5, 其他: 0.3 },
  { month: '6月', 债券代币化: 5.2, 股票代币化: 4.5, 基金代币化: 2.8, REIT代币化: 0.8, 其他: 0.4 },
  { month: '7月', 债券代币化: 5.5, 股票代币化: 4.8, 基金代币化: 2.9, REIT代币化: 0.7, 其他: 0.3 },
  { month: '8月', 债券代币化: 6.1, 股票代币化: 5.2, 基金代币化: 3.2, REIT代币化: 0.9, 其他: 0.4 },
  { month: '9月', 债券代币化: 6.3, 股票代币化: 5.5, 基金代币化: 3.4, REIT代币化: 0.8, 其他: 0.4 },
  { month: '10月', 债券代币化: 6.8, 股票代币化: 6.1, 基金代币化: 3.7, REIT代币化: 1.0, 其他: 0.5 },
  { month: '11月', 债券代币化: 6.5, 股票代币化: 5.9, 基金代币化: 3.6, REIT代币化: 1.1, 其他: 0.8 },
  { month: '12月', 债券代币化: 7.2, 股票代币化: 6.5, 基金代币化: 3.9, REIT代币化: 1.2, 其他: 0.4 }
];

// 产品类型颜色配置
const productColors = {
  '债券代币化': '#3B82F6',
  '股票代币化': '#10B981',
  '基金代币化': '#8B5CF6',
  'REIT代币化': '#F59E0B',
  '其他': '#6B7280'
};

// 基金产品数据
const fundProducts = [
  {
    id: 1,
    name: '博時港元貨幣市場ETF',
    issuer: '博時基金',
    type: '貨幣市場ETF',
    totalValue: 2.5,
    unit: '亿美元',
    tokenPrice: 1.25,
    currency: 'USDT',
    apy: 8.5,
    riskLevel: '中等',
    launchDate: '2024-03-15',
    status: '活跃',
    description: '博時基金推出的港元貨幣市場ETF，投資於高流動性的港元貨幣市場工具，提供穩定的收益和流動性。'
  },
  {
    id: 2,
    name: '大湾区房地产代币化REIT',
    issuer: '中银香港',
    type: 'REIT代币化',
    totalValue: 1.8,
    unit: '亿美元',
    tokenPrice: 0.95,
    currency: 'USDT',
    apy: 6.2,
    riskLevel: '低',
    launchDate: '2024-02-20',
    status: '活跃',
    description: '投资大湾区优质商业地产的代币化REIT产品，提供稳定的租金收益。'
  },
  {
    id: 3,
    name: '香港政府债券代币化基金',
    issuer: '渣打银行',
    type: '债券代币化',
    totalValue: 3.2,
    unit: '亿美元',
    tokenPrice: 1.00,
    currency: 'USDT',
    apy: 4.8,
    riskLevel: '低',
    launchDate: '2024-01-10',
    status: '活跃',
    description: '投资香港政府债券的代币化基金，提供稳定的固定收益。'
  },
  {
    id: 4,
    name: '亚洲新兴市场股票代币化ETF',
    issuer: '恒生银行',
    type: '股票代币化',
    totalValue: 1.5,
    unit: '亿美元',
    tokenPrice: 0.78,
    currency: 'USDT',
    apy: 12.3,
    riskLevel: '高',
    launchDate: '2024-04-05',
    status: '活跃',
    description: '投资亚洲新兴市场股票的代币化ETF，追求高成长收益。'
  },
  {
    id: 5,
    name: '香港基础设施债券代币化',
    issuer: '东亚银行',
    type: '债券代币化',
    totalValue: 2.1,
    unit: '亿美元',
    tokenPrice: 1.15,
    currency: 'USDT',
    apy: 5.5,
    riskLevel: '中等',
    launchDate: '2024-03-28',
    status: '活跃',
    description: '投资香港基础设施项目的债券代币化产品，支持城市发展。'
  },
  {
    id: 6,
    name: '全球科技股代币化基金',
    issuer: '花旗银行',
    type: '股票代币化',
    totalValue: 4.2,
    unit: '亿美元',
    tokenPrice: 1.45,
    currency: 'USDT',
    apy: 15.8,
    riskLevel: '高',
    launchDate: '2024-05-12',
    status: '活跃',
    description: '投资全球顶级科技公司的代币化基金，包括苹果、微软、谷歌等。'
  }
];

const getRiskColor = (risk: string) => {
  switch (risk) {
    case '低': return 'bg-green-100 text-green-800';
    case '中等': return 'bg-yellow-100 text-yellow-800';
    case '高': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case '活跃': return 'bg-green-100 text-green-800';
    case '暂停': return 'bg-yellow-100 text-yellow-800';
    case '结束': return 'bg-red-100 text-red-800';
    default: return 'bg-gray-100 text-gray-800';
  }
};


// 区块链分布饼图组件
const BlockchainPieChart = ({ data }: { data: any[] }) => {
  // 自定义 Tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-white p-3 border border-gray-200 rounded-lg shadow-lg">
          <p className="font-medium text-gray-900 mb-1">{data.name}</p>
          <p className="text-sm text-gray-600">
            {`发行量: ${data.value}亿美元`}
          </p>
          <p className="text-sm text-gray-600">
            {`占比: ${data.percentage}%`}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <RechartsPieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={40}
            outerRadius={80}
            paddingAngle={2}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </RechartsPieChart>
      </ResponsiveContainer>
    </div>
  );
};

const Securitization = () => {
  const [selectedTab, setSelectedTab] = useState('overview');
  const navigate = useNavigate();
  
  // 时间范围选择状态
  const [timeRange, setTimeRange] = useState<'7D' | '1M' | '3M' | '6M' | '6M' | '1Y' | '2Y' | 'ALL'>('1Y');
  const [customRange, setCustomRange] = useState<{ start: Date; end: Date } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const overviewRef = React.useRef<HTMLDivElement>(null);

  // 跳转到产品详情页
  const handleViewDetails = (productId: number) => {
    navigate(`/hk/securitization/product/${productId}`);
  };

  // 时间选择器相关计算
  const fullDataRange = React.useMemo(() => {
    const dates = monthlyTrendData.map((_, index) => new Date(2024, index, 1));
    return {
      start: new Date(Math.min(...dates.map(d => d.getTime()))),
      end: new Date(Math.max(...dates.map(d => d.getTime())))
    };
  }, []);

  const currentRange = React.useMemo(() => {
    if (customRange) return customRange;
    
    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case '7D':
        startDate = subDays(now, 7);
        break;
      case '1M':
        startDate = subMonths(now, 1);
        break;
      case '3M':
        startDate = subMonths(now, 3);
        break;
      case '6M':
        startDate = subMonths(now, 6);
        break;
      case '1Y':
        startDate = subYears(now, 1);
        break;
      case '2Y':
        startDate = subYears(now, 2);
        break;
      case 'ALL':
        return fullDataRange;
      default:
        return fullDataRange;
    }

    return { start: startDate, end: now };
  }, [timeRange, customRange, fullDataRange]);

  // 根据时间范围过滤数据
  const filteredData = React.useMemo(() => {
    if (customRange) {
      return monthlyTrendData.filter((_, index) => {
        const itemDate = new Date(2024, index, 1);
        return itemDate >= customRange.start && itemDate <= customRange.end;
      });
    }

    const now = new Date();
    let startDate: Date;

    switch (timeRange) {
      case '7D':
        startDate = subDays(now, 7);
        break;
      case '1M':
        startDate = subMonths(now, 1);
        break;
      case '3M':
        startDate = subMonths(now, 3);
        break;
      case '6M':
        startDate = subMonths(now, 6);
        break;
      case '1Y':
        startDate = subYears(now, 1);
        break;
      case '2Y':
        startDate = subYears(now, 2);
        break;
      case 'ALL':
        return monthlyTrendData;
      default:
        return monthlyTrendData;
    }

    return monthlyTrendData.filter((_, index) => {
      const itemDate = new Date(2024, index, 1);
      return itemDate >= startDate;
    });
  }, [timeRange, customRange]);

  // Chart.js 配置
  const chartData = {
    labels: filteredData.map(item => item.month),
    datasets: [
      {
        label: '债券代币化',
        data: filteredData.map(item => item.债券代币化),
        borderColor: '#3B82F6',
        backgroundColor: 'rgba(59, 130, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#3B82F6',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
      {
        label: '股票代币化',
        data: filteredData.map(item => item.股票代币化),
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#10B981',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
      {
        label: '基金代币化',
        data: filteredData.map(item => item.基金代币化),
        borderColor: '#8B5CF6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#8B5CF6',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
      {
        label: 'REIT代币化',
        data: filteredData.map(item => item.REIT代币化),
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#F59E0B',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
      {
        label: '其他',
        data: filteredData.map(item => item.其他),
        borderColor: '#6B7280',
        backgroundColor: 'rgba(107, 114, 128, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#6B7280',
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
          },
        },
      },
      tooltip: {
        backgroundColor: 'rgba(0, 0, 0, 0.8)',
        titleColor: '#ffffff',
        bodyColor: '#ffffff',
        borderColor: '#374151',
        borderWidth: 1,
        cornerRadius: 8,
        displayColors: true,
        callbacks: {
          label: function(context: any) {
            return `${context.dataset.label}: ${context.parsed.y.toFixed(1)}亿美元`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
        },
      },
      y: {
        grid: {
          color: '#f3f4f6',
          drawBorder: false,
        },
        ticks: {
          color: '#6b7280',
          font: {
            size: 11,
          },
          callback: function(value: any) {
            return `${value}亿`;
          },
        },
      },
    },
  };

  // 计算时间选择器位置和宽度
  const timeSelectorPosition = React.useMemo(() => {
    const totalDays = differenceInDays(fullDataRange.end, fullDataRange.start);
    const selectedDays = differenceInDays(currentRange.end, currentRange.start);
    const startOffset = differenceInDays(currentRange.start, fullDataRange.start);
    
    const leftPercent = (startOffset / totalDays) * 100;
    const widthPercent = (selectedDays / totalDays) * 100;
    
    return {
      left: Math.max(0, Math.min(leftPercent, 100 - widthPercent)),
      width: Math.max(5, Math.min(widthPercent, 100))
    };
  }, [currentRange, fullDataRange]);

  // 处理拖拽
  const handleDrag = React.useCallback((e: any, data: any) => {
    if (!overviewRef.current) return;
    
    const containerWidth = overviewRef.current.offsetWidth;
    const leftPercent = (data.x / containerWidth) * 100;
    const currentWidth = timeSelectorPosition.width;
    
    // 计算新的开始时间
    const totalDays = differenceInDays(fullDataRange.end, fullDataRange.start);
    const newStartDays = Math.max(0, Math.min(leftPercent / 100 * totalDays, totalDays - (currentWidth / 100 * totalDays)));
    const newStartDate = addDays(fullDataRange.start, newStartDays);
    const newEndDate = addDays(newStartDate, currentWidth / 100 * totalDays);
    
    setCustomRange({ start: newStartDate, end: newEndDate });
    setTimeRange('ALL');
  }, [timeSelectorPosition.width, fullDataRange]);

  // 概览图表数据
  const overviewChartData = {
    labels: monthlyTrendData.map(item => item.month),
    datasets: [
      {
        label: '概览',
        data: monthlyTrendData.map(item => item.债券代币化 + item.股票代币化 + item.基金代币化 + item.REIT代币化 + item.其他),
        borderColor: '#3b82f6',
        backgroundColor: 'rgba(59, 130, 246, 0.3)',
        borderWidth: 1,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
      },
    ],
  };

  const overviewChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
    scales: {
      x: {
        display: true,
        grid: {
          display: false,
        },
        ticks: {
          color: '#9ca3af',
          font: {
            size: 10,
          },
          maxTicksLimit: 8,
        },
      },
      y: {
        display: false,
      },
    },
    interaction: {
      intersect: false,
    },
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* 页面头部 */}
        <div className="mb-8">
          <div className="flex items-center mb-4">
            <Building2 className="w-8 h-8 text-blue-600 mr-3" />
            <div>
              <h1 className="text-3xl font-bold text-gray-900">证券代币化</h1>
              <p className="text-gray-600 mt-1">香港证券代币化监管与产品概览</p>
            </div>
          </div>
        </div>

        {/* 统计数据卡片 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">发行总价值</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statisticsData.totalValue.value}
                    <span className="text-lg text-gray-500 ml-1">{statisticsData.totalValue.unit}</span>
                  </p>
                </div>
                <div className="p-3 bg-blue-100 rounded-full">
                  <DollarSign className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {statisticsData.totalValue.changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  statisticsData.totalValue.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {statisticsData.totalValue.change}%
                </span>
                <span className="text-sm text-gray-500 ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">产品总量</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statisticsData.totalProducts.value}
                    <span className="text-lg text-gray-500 ml-1">{statisticsData.totalProducts.unit}</span>
                  </p>
                </div>
                <div className="p-3 bg-green-100 rounded-full">
                  <Package className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {statisticsData.totalProducts.changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  statisticsData.totalProducts.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {statisticsData.totalProducts.change}%
                </span>
                <span className="text-sm text-gray-500 ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">活跃发行方</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statisticsData.activeIssuers.value}
                    <span className="text-lg text-gray-500 ml-1">{statisticsData.activeIssuers.unit}</span>
                  </p>
                </div>
                <div className="p-3 bg-purple-100 rounded-full">
                  <Users className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {statisticsData.activeIssuers.changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  statisticsData.activeIssuers.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {statisticsData.activeIssuers.change}%
                </span>
                <span className="text-sm text-gray-500 ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-gray-600">持仓地址</p>
                  <p className="text-2xl font-bold text-gray-900">
                    {statisticsData.marketCap.value}
                    <span className="text-lg text-gray-500 ml-1">{statisticsData.marketCap.unit}</span>
                  </p>
                </div>
                <div className="p-3 bg-orange-100 rounded-full">
                  <TrendingUp className="w-6 h-6 text-orange-600" />
                </div>
              </div>
              <div className="flex items-center mt-4">
                {statisticsData.marketCap.changeType === 'increase' ? (
                  <ArrowUpRight className="w-4 h-4 text-green-500 mr-1" />
                ) : (
                  <ArrowDownRight className="w-4 h-4 text-red-500 mr-1" />
                )}
                <span className={`text-sm font-medium ${
                  statisticsData.marketCap.changeType === 'increase' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {statisticsData.marketCap.change}%
                </span>
                <span className="text-sm text-gray-500 ml-1">较上月</span>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* 主要内容区域 */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="funds">基金产品</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* 月度发行趋势折线图 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle className="flex items-center">
                      <BarChart3 className="w-5 h-5 mr-2" />
                      月度发行趋势
                    </CardTitle>
                    <CardDescription>2024年各产品类型月度发行量变化趋势</CardDescription>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select value={timeRange} onValueChange={(value: any) => setTimeRange(value)}>
                      <SelectTrigger className="w-[120px] h-8">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="7D">7天</SelectItem>
                        <SelectItem value="1M">1个月</SelectItem>
                        <SelectItem value="3M">3个月</SelectItem>
                        <SelectItem value="6M">6个月</SelectItem>
                        <SelectItem value="1Y">1年</SelectItem>
                        <SelectItem value="2Y">2年</SelectItem>
                        <SelectItem value="ALL">全部</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-8 px-3"
                      onClick={() => {
                        const start = new Date();
                        const end = new Date();
                        start.setMonth(start.getMonth() - 3);
                        setCustomRange({ start, end });
                        setTimeRange('ALL');
                      }}
                    >
                      自定义
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="h-[400px]">
                  <Line data={chartData} options={chartOptions} />
                </div>
                
                {/* 时间选择器组件 */}
                <div className="mt-4 space-y-2">
                  <div className="relative" ref={overviewRef}>
                    <div className="h-[80px] bg-gray-50 rounded-lg p-2">
                      <Line data={overviewChartData} options={overviewChartOptions} />
                    </div>
                    
                    {/* 可拖拽的时间选择器 */}
                    <Draggable
                      axis="x"
                      bounds="parent"
                      position={{ x: (timeSelectorPosition.left / 100) * (overviewRef.current?.offsetWidth || 0), y: 0 }}
                      onDrag={handleDrag}
                      onStart={() => setIsDragging(true)}
                      onStop={() => setIsDragging(false)}
                    >
                      <div
                        className={`absolute top-0 h-full bg-blue-500 bg-opacity-30 border-2 border-blue-500 cursor-move select-none ${
                          isDragging ? 'shadow-lg' : 'hover:bg-opacity-40'
                        }`}
                        style={{
                          width: `${timeSelectorPosition.width}%`,
                          minWidth: '20px'
                        }}
                      >
                        {/* 左侧拖拽手柄 */}
                        <div 
                          className="absolute left-0 top-0 w-2 h-full bg-blue-600 cursor-ew-resize hover:w-3 hover:bg-blue-700 transition-all z-10"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            const startX = e.clientX;
                            const startLeft = timeSelectorPosition.left;
                            const startWidth = timeSelectorPosition.width;
                            
                            const handleMouseMove = (moveEvent: MouseEvent) => {
                              const deltaX = moveEvent.clientX - startX;
                              const containerWidth = overviewRef.current?.offsetWidth || 0;
                              const deltaPercent = (deltaX / containerWidth) * 100;
                              
                              const newLeft = Math.max(0, Math.min(startLeft + deltaPercent, startLeft + startWidth - 5));
                              const newWidth = startWidth - (newLeft - startLeft);
                              
                              const totalDays = differenceInDays(fullDataRange.end, fullDataRange.start);
                              const newStartDate = addDays(fullDataRange.start, newLeft / 100 * totalDays);
                              const newEndDate = addDays(fullDataRange.start, (newLeft + newWidth) / 100 * totalDays);
                              
                              setCustomRange({ start: newStartDate, end: newEndDate });
                              setTimeRange('ALL');
                            };
                            
                            const handleMouseUp = () => {
                              document.removeEventListener('mousemove', handleMouseMove);
                              document.removeEventListener('mouseup', handleMouseUp);
                            };
                            
                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                          }}
                        />
                        
                        {/* 右侧拖拽手柄 */}
                        <div 
                          className="absolute right-0 top-0 w-2 h-full bg-blue-600 cursor-ew-resize hover:w-3 hover:bg-blue-700 transition-all z-10"
                          onMouseDown={(e) => {
                            e.stopPropagation();
                            const startX = e.clientX;
                            const startLeft = timeSelectorPosition.left;
                            const startWidth = timeSelectorPosition.width;
                            
                            const handleMouseMove = (moveEvent: MouseEvent) => {
                              const deltaX = moveEvent.clientX - startX;
                              const containerWidth = overviewRef.current?.offsetWidth || 0;
                              const deltaPercent = (deltaX / containerWidth) * 100;
                              
                              const newWidth = Math.max(5, Math.min(startWidth + deltaPercent, 100 - startLeft));
                              
                              const totalDays = differenceInDays(fullDataRange.end, fullDataRange.start);
                              const newStartDate = addDays(fullDataRange.start, startLeft / 100 * totalDays);
                              const newEndDate = addDays(fullDataRange.start, (startLeft + newWidth) / 100 * totalDays);
                              
                              setCustomRange({ start: newStartDate, end: newEndDate });
                              setTimeRange('ALL');
                            };
                            
                            const handleMouseUp = () => {
                              document.removeEventListener('mousemove', handleMouseMove);
                              document.removeEventListener('mouseup', handleMouseUp);
                            };
                            
                            document.addEventListener('mousemove', handleMouseMove);
                            document.addEventListener('mouseup', handleMouseUp);
                          }}
                        />
                        
                        {/* 播放/暂停按钮 */}
                        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center text-white text-xs hover:bg-blue-700 transition-colors">
                          ⏸
                        </div>
                      </div>
                    </Draggable>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 产品发行方分布 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Building2 className="w-5 h-5 mr-2" />
                    产品发行方分布
                  </CardTitle>
                  <CardDescription>按产品发行方统计的发行量分布</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {issuerData.map((item, index) => (
                      <div key={index} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                          <span className="text-sm font-medium text-gray-700">{item.issuer}</span>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-semibold text-gray-900">
                            {item.value}亿美元
                          </div>
                          <div className="text-xs text-gray-500">{item.percentage}%</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* 区块链分布 */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Coins className="w-5 h-5 mr-2" />
                    区块链分布
                  </CardTitle>
                  <CardDescription>证券代币化产品在不同区块链上的分布情况</CardDescription>
                </CardHeader>
                <CardContent>
                  <BlockchainPieChart data={blockchainData} />
                  
                  {/* 图例 */}
                  <div className="flex flex-wrap justify-center gap-3 mt-4 pt-4 border-t">
                    {blockchainData.map((item, index) => (
                      <div key={index} className="flex items-center space-x-2">
                        <div 
                          className="w-3 h-3 rounded-full" 
                          style={{ backgroundColor: item.color }}
                        ></div>
                        <span className="text-sm text-gray-600">{item.name}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>


          <TabsContent value="funds" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>基金产品列表</CardTitle>
                <CardDescription>香港证券代币化基金产品详细信息</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {fundProducts.map((fund) => (
                    <Card key={fund.id} className="hover:shadow-md transition-shadow">
                      <CardContent className="p-6">
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-2">
                              <h3 className="text-lg font-semibold text-gray-900">{fund.name}</h3>
                              <Badge className={getRiskColor(fund.riskLevel)}>
                                {fund.riskLevel}风险
                              </Badge>
                              <Badge className={getStatusColor(fund.status)}>
                                {fund.status}
                              </Badge>
                            </div>
                            <p className="text-gray-600 text-sm mb-3">{fund.description}</p>
                            <div className="flex items-center space-x-4 text-sm text-gray-500">
                              <div className="flex items-center">
                                <Building2 className="w-4 h-4 mr-1" />
                                {fund.issuer}
                              </div>
                              <div className="flex items-center">
                                <Calendar className="w-4 h-4 mr-1" />
                                {fund.launchDate}
                              </div>
                            </div>
                          </div>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => handleViewDetails(fund.id)}
                          >
                            查看详情
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </Button>
                        </div>
                        
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-4 border-t">
                          <div>
                            <p className="text-sm text-gray-600">总价值</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {fund.totalValue} {fund.unit}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">代币价格</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {fund.tokenPrice} {fund.currency}
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">年化收益率</p>
                            <p className="text-lg font-semibold text-green-600">
                              {fund.apy}%
                            </p>
                          </div>
                          <div>
                            <p className="text-sm text-gray-600">产品类型</p>
                            <p className="text-lg font-semibold text-gray-900">
                              {fund.type}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Securitization;
