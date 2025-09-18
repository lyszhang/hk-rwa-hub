import React, { useState, useMemo, useRef, useCallback } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
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
import { BarChart3 } from 'lucide-react';

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
// no icon/chart imports needed for the simplified overview

const DATs = () => {
  // Live prices（示例静态数据，可后续接入API）
  const livePrices = [
    { key: 'btc', name: 'Bitcoin', symbol: '₿', price: 115118, change24h: -0.83, color: 'text-orange-600', dot: 'bg-orange-500', pill: 'bg-orange-50 text-orange-700' },
    { key: 'eth', name: 'Ethereum', symbol: 'Ξ', price: 4535, change24h: -2.91, color: 'text-blue-600', dot: 'bg-blue-500', pill: 'bg-blue-50 text-blue-700' },
    { key: 'sol', name: 'Solana', symbol: '◎', price: 235, change24h: -5.07, color: 'text-purple-600', dot: 'bg-purple-500', pill: 'bg-purple-50 text-purple-700' },
    { key: 'bnb', name: 'BNB', symbol: '•', price: 917, change24h: -2.44, color: 'text-yellow-600', dot: 'bg-yellow-500', pill: 'bg-yellow-50 text-yellow-700' },
  ];

  // Holdings（单位：十亿美金）
  const holdings = {
    total: 131.6,
    btc: 108.2,
    eth: 21.7,
    sol: 1.3,
  };

  // 时间范围选择状态
  const [timeRange, setTimeRange] = useState<'7D' | '1M' | '3M' | '6M' | '1Y' | '2Y' | 'ALL'>('1Y');
  const [customRange, setCustomRange] = useState<{ start: Date; end: Date } | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const overviewRef = useRef<HTMLDivElement>(null);

  // 完整的折线图数据：金库持有的加密资产总市值 vs 相关公司股票总市值（单位：十亿美金）
  const fullTreasuryVsEquity = [
    { date: '2022-01-01', cryptoTV: 58.2, equityMC: 100.1 },
    { date: '2022-02-01', cryptoTV: 52.7, equityMC: 98.5 },
    { date: '2022-03-01', cryptoTV: 48.9, equityMC: 96.8 },
    { date: '2022-04-01', cryptoTV: 45.3, equityMC: 95.2 },
    { date: '2022-05-01', cryptoTV: 38.7, equityMC: 92.6 },
    { date: '2022-06-01', cryptoTV: 35.2, equityMC: 90.3 },
    { date: '2022-07-01', cryptoTV: 42.1, equityMC: 93.7 },
    { date: '2022-08-01', cryptoTV: 38.9, equityMC: 91.8 },
    { date: '2022-09-01', cryptoTV: 35.6, equityMC: 89.4 },
    { date: '2022-10-01', cryptoTV: 32.8, equityMC: 87.1 },
    { date: '2022-11-01', cryptoTV: 28.5, equityMC: 84.7 },
    { date: '2022-12-01', cryptoTV: 31.2, equityMC: 86.3 },
    { date: '2023-01-01', cryptoTV: 38.7, equityMC: 89.8 },
    { date: '2023-02-01', cryptoTV: 42.3, equityMC: 92.1 },
    { date: '2023-03-01', cryptoTV: 48.9, equityMC: 95.6 },
    { date: '2023-04-01', cryptoTV: 52.7, equityMC: 97.8 },
    { date: '2023-05-01', cryptoTV: 58.3, equityMC: 100.2 },
    { date: '2023-06-01', cryptoTV: 62.1, equityMC: 102.7 },
    { date: '2023-07-01', cryptoTV: 68.9, equityMC: 105.3 },
    { date: '2023-08-01', cryptoTV: 72.5, equityMC: 107.8 },
    { date: '2023-09-01', cryptoTV: 75.8, equityMC: 109.4 },
    { date: '2023-10-01', cryptoTV: 82.3, equityMC: 112.1 },
    { date: '2023-11-01', cryptoTV: 88.7, equityMC: 114.6 },
    { date: '2023-12-01', cryptoTV: 95.2, equityMC: 117.3 },
    { date: '2024-01-01', cryptoTV: 102.8, equityMC: 119.8 },
    { date: '2024-02-01', cryptoTV: 108.5, equityMC: 121.4 },
    { date: '2024-03-01', cryptoTV: 115.9, equityMC: 123.7 },
    { date: '2024-04-01', cryptoTV: 122.3, equityMC: 125.2 },
    { date: '2024-05-01', cryptoTV: 128.7, equityMC: 126.8 },
    { date: '2024-06-01', cryptoTV: 125.4, equityMC: 125.9 },
    { date: '2024-07-01', cryptoTV: 131.6, equityMC: 127.5 },
    { date: '2024-08-01', cryptoTV: 135.2, equityMC: 128.8 },
    { date: '2024-09-01', cryptoTV: 138.7, equityMC: 130.2 },
    { date: '2024-10-01', cryptoTV: 142.3, equityMC: 131.6 },
    { date: '2024-11-01', cryptoTV: 145.8, equityMC: 132.9 },
    { date: '2024-12-01', cryptoTV: 149.2, equityMC: 134.3 },
  ];

  // 根据时间范围过滤数据
  const filteredData = useMemo(() => {
    if (customRange) {
      return fullTreasuryVsEquity.filter(item => {
        const itemDate = new Date(item.date);
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
        return fullTreasuryVsEquity;
      default:
        return fullTreasuryVsEquity;
    }

    return fullTreasuryVsEquity.filter(item => {
      const itemDate = new Date(item.date);
      return itemDate >= startDate;
    });
  }, [timeRange, customRange]);

  // Chart.js 配置
  const chartData = {
    labels: filteredData.map(item => format(new Date(item.date), 'MM-dd', { locale: zhCN })),
    datasets: [
      {
        label: '加密资产总市值',
        data: filteredData.map(item => item.cryptoTV),
        borderColor: '#ebbb50',
        backgroundColor: 'rgba(235, 187, 80, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#ebbb50',
        pointHoverBorderColor: '#ffffff',
        pointHoverBorderWidth: 2,
      },
      {
        label: '公司股票总市值',
        data: filteredData.map(item => item.equityMC),
        borderColor: '#0ec783',
        backgroundColor: 'rgba(14, 199, 131, 0.1)',
        borderWidth: 2,
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        pointHoverRadius: 6,
        pointHoverBackgroundColor: '#0ec783',
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
            return `${context.dataset.label}: $${context.parsed.y.toFixed(1)}B`;
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
            return `$${value}B`;
          },
        },
      },
    },
  };

  // 时间选择器相关计算
  const fullDataRange = useMemo(() => {
    const dates = fullTreasuryVsEquity.map(item => new Date(item.date));
    return {
      start: new Date(Math.min(...dates.map(d => d.getTime()))),
      end: new Date(Math.max(...dates.map(d => d.getTime())))
    };
  }, []);

  const currentRange = useMemo(() => {
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

  // 计算时间选择器位置和宽度
  const timeSelectorPosition = useMemo(() => {
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
  const handleDrag = useCallback((e: any, data: any) => {
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

  // 处理左侧手柄拖拽（调整开始时间）
  const handleLeftResize = useCallback((e: any, data: any) => {
    if (!overviewRef.current) return;
    
    const containerWidth = overviewRef.current.offsetWidth;
    const leftPercent = (data.x / containerWidth) * 100;
    const currentRightPercent = timeSelectorPosition.left + timeSelectorPosition.width;
    
    // 确保左侧不超过右侧
    const newLeftPercent = Math.max(0, Math.min(leftPercent, currentRightPercent - 5));
    const newWidth = currentRightPercent - newLeftPercent;
    
    const totalDays = differenceInDays(fullDataRange.end, fullDataRange.start);
    const newStartDate = addDays(fullDataRange.start, newLeftPercent / 100 * totalDays);
    const newEndDate = addDays(fullDataRange.start, currentRightPercent / 100 * totalDays);
    
    setCustomRange({ start: newStartDate, end: newEndDate });
    setTimeRange('ALL');
  }, [timeSelectorPosition, fullDataRange]);

  // 处理右侧手柄拖拽（调整结束时间）
  const handleRightResize = useCallback((e: any, data: any) => {
    if (!overviewRef.current) return;
    
    const containerWidth = overviewRef.current.offsetWidth;
    const rightPercent = (data.x / containerWidth) * 100;
    const currentLeftPercent = timeSelectorPosition.left;
    
    // 确保右侧不超过左侧
    const newRightPercent = Math.max(currentLeftPercent + 5, Math.min(rightPercent, 100));
    const newWidth = newRightPercent - currentLeftPercent;
    
    const totalDays = differenceInDays(fullDataRange.end, fullDataRange.start);
    const newStartDate = addDays(fullDataRange.start, currentLeftPercent / 100 * totalDays);
    const newEndDate = addDays(fullDataRange.start, newRightPercent / 100 * totalDays);
    
    setCustomRange({ start: newStartDate, end: newEndDate });
    setTimeRange('ALL');
  }, [timeSelectorPosition, fullDataRange]);

  // 概览图表数据
  const overviewChartData = {
    labels: fullTreasuryVsEquity.map(item => format(new Date(item.date), 'MM-dd', { locale: zhCN })),
    datasets: [
      {
        label: '概览',
        data: fullTreasuryVsEquity.map(item => item.cryptoTV),
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

  // 公司列表数据（来自用户提供的数据，精简字段）
  type CompanyRow = {
    id: string;
    name: string;
    ticker: string | null;
    rank: number;
    country: string;
    coin_type: 'Bitcoin' | 'Ethereum' | 'Solana' | 'BNB' | string;
    amount: number;
    usd_value: number;
    market_cap?: number | null;
  };

  const companies: CompanyRow[] = [
    { id: '954839c2-0fa8-4b1b-b657-bb505a011f1a', name: 'MicroStrategy', ticker: 'MSTR', rank: 1, country: 'US', coin_type: 'Bitcoin', amount: 632457, usd_value: 69570270000, market_cap: 28500000000 },
    { id: '77529482-0876-4b0d-ac81-90beb7085ab9', name: 'Bitmine Immersion Tech', ticker: 'BMNR', rank: 69, country: 'US', coin_type: 'Ethereum', amount: 2070000, usd_value: 9459900000, market_cap: 12000000000 },
    { id: '65171162-c78f-4368-af53-d2bb97175e91', name: 'MARA Holdings, Inc.', ticker: 'MARA', rank: 2, country: 'US', coin_type: 'Bitcoin', amount: 50639, usd_value: 5570290000, market_cap: 8500000000 },
    { id: '23107b8d-c2e2-41e2-8b0c-8f87f1652594', name: 'XXI', ticker: 'CEP', rank: 3, country: 'US', coin_type: 'Bitcoin', amount: 43514, usd_value: 4786540000, market_cap: 7200000000 },
    { id: '37c69d24-494c-42b6-ab43-e7ef58fabb90', name: 'SharpLink Gaming', ticker: 'SBET', rank: 70, country: 'US', coin_type: 'Ethereum', amount: 837230, usd_value: 3826141100, market_cap: 5800000000 },
    { id: '855908f0-c0b5-4049-992f-83515db986e8', name: 'Bitcoin Standard Treasury Company', ticker: 'BSTR', rank: 4, country: 'US', coin_type: 'Bitcoin', amount: 30021, usd_value: 3302310000, market_cap: 4200000000 },
    { id: '58f284ad-f4a1-4087-a8ce-eae3e983fdb6', name: 'Bullish', ticker: 'BLSH', rank: 5, country: 'US', coin_type: 'Bitcoin', amount: 24000, usd_value: 2640000000, market_cap: 3800000000 },
    { id: 'e9f24af5-2a6f-4eb2-b0cb-6dd84c27fe5e', name: 'The Ether Machine', ticker: 'ETHM', rank: 71, country: 'US', coin_type: 'Ethereum', amount: 495360, usd_value: 2263795200, market_cap: 3200000000 },
    { id: 'daedf78a-d16a-4449-9043-61a7d920b785', name: 'Riot Platforms, Inc.', ticker: 'RIOT', rank: 6, country: 'US', coin_type: 'Bitcoin', amount: 19239, usd_value: 2116290000, market_cap: 2800000000 },
    { id: '6d33f961-0383-4e13-9bec-2c14de1b48c9', name: 'Metaplanet Inc.', ticker: 'MTPLF', rank: 7, country: 'JP', coin_type: 'Bitcoin', amount: 18991, usd_value: 2089010000, market_cap: 2500000000 },
    { id: '506ba186-96af-404e-bb8f-0a3c90e43ef8', name: 'Trump Media & Technology Group Corp.', ticker: 'DJT', rank: 8, country: 'US', coin_type: 'Bitcoin', amount: 15000, usd_value: 1650000000, market_cap: 2200000000 },
    { id: '191a7efc-7f67-4eb0-8439-29b8e5af8cad', name: 'CleanSpark, Inc.', ticker: 'CLSK', rank: 9, country: 'US', coin_type: 'Bitcoin', amount: 12703, usd_value: 1397330000, market_cap: 1800000000 },
    { id: '58e9c87e-7527-4b05-8310-f77bb10580ff', name: 'Coinbase Global, Inc.', ticker: 'COIN', rank: 10, country: 'US', coin_type: 'Bitcoin', amount: 11776, usd_value: 1295360000, market_cap: 1500000000 },
    { id: 'caf1f6b7-b199-4a8c-b99d-574c68986909', name: 'Tesla, Inc.', ticker: 'TSLA', rank: 11, country: 'US', coin_type: 'Bitcoin', amount: 11509, usd_value: 1265990000, market_cap: 1200000000 },
    { id: '6764dbce-9123-46da-ac35-b9794012ade5', name: 'Hut 8 Mining Corp', ticker: 'HUT', rank: 12, country: 'CA', coin_type: 'Bitcoin', amount: 10667, usd_value: 1173370000, market_cap: 1000000000 },
    { id: '6ec17029-ff69-463b-b443-f71645f21cb5', name: 'Ethereum Foundation', ticker: null, rank: 72, country: 'US', coin_type: 'Ethereum', amount: 229670, usd_value: 1049591900, market_cap: null },
    { id: '969e41c7-6336-489d-bb02-5995683a9d2f', name: 'Block, Inc.', ticker: 'XYZ', rank: 13, country: 'US', coin_type: 'Bitcoin', amount: 8692, usd_value: 956120000, market_cap: 850000000 },
    { id: 'f3da6b15-99ea-478d-b27f-5c3b768ef0ef', name: 'PulseChain Sac', ticker: 'PLS', rank: 73, country: 'US', coin_type: 'Ethereum', amount: 166300, usd_value: 759991000, market_cap: 700000000 },
    { id: '33fc8ae7-05e7-4c6c-8c42-363534606450', name: 'Galaxy Digital Holdings Ltd', ticker: 'GLXY', rank: 14, country: 'US', coin_type: 'Bitcoin', amount: 6894, usd_value: 758340000, market_cap: 600000000 },
    { id: '73757683-7e49-4433-9236-1d78888e4332', name: 'Next Technology Holding Inc.', ticker: 'NXTT', rank: 15, country: 'CN', coin_type: 'Bitcoin', amount: 5833, usd_value: 641630000, market_cap: 550000000 },
    { id: 'e7277114-038d-44f7-bf03-b8d7894a2ccd', name: 'KindlyMD, Inc.', ticker: 'NAKA', rank: 16, country: 'US', coin_type: 'Bitcoin', amount: 5765, usd_value: 634150000, market_cap: 500000000 },
    { id: '3a8ba695-4f08-478d-b454-9ec9b9a233f2', name: 'Coinbase', ticker: 'COIN', rank: 74, country: 'US', coin_type: 'Ethereum', amount: 136780, usd_value: 625084600, market_cap: 450000000 },
    { id: '8c7c5ea2-a97b-4a01-9b7c-d9b95a016433', name: 'Semler Scientific', ticker: 'SMLR', rank: 17, country: 'US', coin_type: 'Bitcoin', amount: 5021, usd_value: 552310000, market_cap: 400000000 },
    { id: '501d72fa-7a30-4759-b59c-6eacbd220339', name: 'Bit Digital', ticker: 'BTBT', rank: 75, country: 'US', coin_type: 'Ethereum', amount: 120310, usd_value: 549816700, market_cap: 380000000 },
    { id: 'e741cba3-5a4b-4150-b1b1-9f324f275626', name: 'ProCap BTC', ticker: 'CCCM', rank: 18, country: 'US', coin_type: 'Bitcoin', amount: 4932, usd_value: 542520000, market_cap: 350000000 },
    { id: '8193d578-0ec8-46ca-8830-f09876bd4951', name: 'GameStop Corp.', ticker: 'GME', rank: 19, country: 'US', coin_type: 'Bitcoin', amount: 4710, usd_value: 518100000, market_cap: 320000000 },
    { id: 'ed543253-f292-41e6-be65-27ec3212054f', name: 'Cango Inc', ticker: 'CANG', rank: 20, country: 'CN', coin_type: 'Bitcoin', amount: 4679, usd_value: 514690000, market_cap: 300000000 },
    { id: 'dc207df9-0b67-426e-8f2c-ea6f65eeb482', name: 'ETHZilla Corporation', ticker: 'ETHZ', rank: 76, country: 'US', coin_type: 'Ethereum', amount: 102240, usd_value: 467236800, market_cap: 280000000 },
    { id: 'e00ef843-3a44-4200-9e22-bd672d40c4e2', name: 'Mantle', ticker: 'MNT', rank: 77, country: 'US', coin_type: 'Ethereum', amount: 101870, usd_value: 465545900, market_cap: 250000000 },
    { id: '4df708da-83d2-4980-b278-21b5615a291e', name: 'Golem Foundation', ticker: 'GLM', rank: 78, country: 'US', coin_type: 'Ethereum', amount: 100930, usd_value: 461250100, market_cap: 220000000 },
    { id: '93cc4df4-a805-4904-8ebf-0be2cc457a7c', name: 'Empery Digital (Volcon, Inc.)', ticker: 'EMPD', rank: 21, country: 'US', coin_type: 'Bitcoin', amount: 4019, usd_value: 442090000 },
    { id: 'd0054562-98df-4d9a-a7b1-7a140de5ff7a', name: 'DeFi Development Corp.', ticker: 'DFDV.US', rank: 89, country: 'US', coin_type: 'Solana', amount: 2027817, usd_value: 409619034 },
    { id: '5db12561-5158-4d55-b970-2515f7fba68e', name: 'Upexi', ticker: 'UPXI.US', rank: 90, country: 'US', coin_type: 'Solana', amount: 2018419, usd_value: 407720638 },
    { id: '7494cd89-f9e1-4d9a-9952-1911dff4d1f1', name: 'Sharps Technology', ticker: 'STSS.US', rank: 91, country: 'US', coin_type: 'Solana', amount: 2000000, usd_value: 404000000 },
    { id: 'e2bf67bf-6206-4f6c-aa6b-63be900236e9', name: 'Boyaa Interactive International Limited', ticker: '0434', rank: 22, country: 'HK', coin_type: 'Bitcoin', amount: 3640, usd_value: 400400000 },
    { id: '4eae4446-9e64-49b8-b8d8-5b3d9512bdb7', name: 'Bitcoin Group SE', ticker: 'ADE', rank: 23, country: 'DE', coin_type: 'Bitcoin', amount: 3605, usd_value: 396550000 },
    { id: 'b0f46955-fba7-4bc2-925d-396471268aca', name: 'Sequans Communications S.A.', ticker: 'SQNS', rank: 24, country: 'FR', coin_type: 'Bitcoin', amount: 3170, usd_value: 348700000 },
    { id: 'ee0c5359-8e9f-4a33-a255-4a07de04f8b4', name: 'BTCS Inc.', ticker: 'BTCS', rank: 79, country: 'US', coin_type: 'Ethereum', amount: 70030, usd_value: 320037100 },
    { id: '964957d6-1eda-43cd-bd4e-af597f673801', name: 'Gnosis DAO', ticker: 'GNO', rank: 80, country: 'US', coin_type: 'Ethereum', amount: 66590, usd_value: 304316300 },
    { id: '0270d1f4-4aa4-4ecf-acf5-a1f49b1707a7', name: 'U.S. Government', ticker: null, rank: 81, country: 'US', coin_type: 'Ethereum', amount: 60030, usd_value: 274337100 },
    { id: '40294d74-035c-4205-bea9-c54f2e3dcf81', name: 'CEA Industries', ticker: 'BNC', rank: 97, country: 'US', coin_type: 'BNB', amount: 388888, usd_value: 269110496 },
    { id: '6033984a-afc9-4809-9cb4-8073831eb18c', name: 'The Smarter Web Company PLC', ticker: 'SWC', rank: 25, country: 'GB', coin_type: 'Bitcoin', amount: 2395, usd_value: 263450000 },
    { id: '52808500-b292-413b-9909-7bf6ac405e81', name: 'Microcloud Hologram', ticker: 'HOLO', rank: 26, country: 'KY', coin_type: 'Bitcoin', amount: 2353, usd_value: 258830000 },
    { id: '0ca027a8-c53b-4319-9fa2-89d174351a3a', name: 'The Blockchain Group', ticker: 'ALTBG', rank: 27, country: 'FR', coin_type: 'Bitcoin', amount: 2218, usd_value: 243980000 },
    { id: '82c79dc8-9cbd-4df4-8fe8-70231e4591c2', name: 'HIVE Digital Technologies', ticker: 'HIVE', rank: 28, country: 'CA', coin_type: 'Bitcoin', amount: 2201, usd_value: 242110000 },
    { id: '2512c4aa-3469-48f3-a744-c6636fc52fe1', name: 'Exodus Movement, Inc', ticker: 'EXOD', rank: 29, country: 'US', coin_type: 'Bitcoin', amount: 2087, usd_value: 229570000 },
    { id: 'da565edf-4fa3-4061-8e48-5f6e6ce8bb4d', name: 'FG Nexus', ticker: 'FGNX', rank: 82, country: 'US', coin_type: 'Ethereum', amount: 48440, usd_value: 221370800 },
    { id: '583bb9ae-e721-4a00-8160-6239b18dbc20', name: 'NEXON Co., Ltd.', ticker: '3659', rank: 30, country: 'JP', coin_type: 'Bitcoin', amount: 1717, usd_value: 188870000 },
    { id: 'ae995eb0-05e1-482d-ad6d-d1f6abade1e2', name: 'BITFUFU', ticker: 'FUFU', rank: 31, country: 'SG', coin_type: 'Bitcoin', amount: 1709, usd_value: 187990000 },
    { id: '749db32f-5ba1-4ac9-b87c-1b4a21f73de0', name: 'Core Scientific', ticker: 'CORZ', rank: 32, country: 'US', coin_type: 'Bitcoin', amount: 1612, usd_value: 177320000 },
    { id: 'e8a62e1a-6b9f-4e1f-817b-28714c799ac8', name: 'Bitdeer Technologies Group', ticker: 'BTDR', rank: 33, country: 'SG', coin_type: 'Bitcoin', amount: 1601, usd_value: 176110000 },
    { id: '0bbafdb3-f21b-4ba2-a9c7-d2750c4252f5', name: 'Lido DAO', ticker: 'LDO', rank: 83, country: 'US', coin_type: 'Ethereum', amount: 36380, usd_value: 166256600 },
    { id: 'd6060b09-ac4f-42c5-8231-35aaa625243f', name: 'Fold Holdings Inc.', ticker: 'FLD', rank: 34, country: 'US', coin_type: 'Bitcoin', amount: 1492, usd_value: 164120000 },
    { id: 'ba754bcd-3bca-4b0e-a209-fb3309f51949', name: 'Canaan Inc.', ticker: 'CAN', rank: 35, country: 'US', coin_type: 'Bitcoin', amount: 1484, usd_value: 163240000 },
    { id: '1f38e3b4-7e06-4e68-8f5a-bcfc47dc2f13', name: 'Remixpoint', ticker: '3825', rank: 36, country: 'JP', coin_type: 'Bitcoin', amount: 1273, usd_value: 140030000 },
    { id: 'f05d340a-c0a7-4a7f-8fe8-e8d5690365ad', name: 'Bitfarms Ltd.', ticker: 'BITF', rank: 37, country: 'CA', coin_type: 'Bitcoin', amount: 1166, usd_value: 128260000 },
    { id: 'f67c27cb-7362-4e9d-bde6-1fc341d21323', name: 'Ethereum Name Service', ticker: 'ENS', rank: 84, country: 'US', coin_type: 'Ethereum', amount: 27560, usd_value: 125949200 },
    { id: 'f28d193b-c477-407d-b22a-7ad237510062', name: 'Satsuma Technology', ticker: 'SATS', rank: 38, country: 'GB', coin_type: 'Bitcoin', amount: 1126, usd_value: 123860000 },
    { id: '4c071b27-e917-463e-8a9f-51f6f430427a', name: 'Cipher Mining', ticker: 'CIFR', rank: 39, country: 'US', coin_type: 'Bitcoin', amount: 1063, usd_value: 116930000 },
    { id: '546144bd-c60f-4a15-a83a-8f4715033142', name: 'KULR Technology Group', ticker: 'KULR', rank: 40, country: 'US', coin_type: 'Bitcoin', amount: 1021, usd_value: 112310000 },
    { id: 'e5170622-0762-49cf-904d-260db8be283f', name: 'Anap Holdings Inc.', ticker: '3189', rank: 41, country: 'JP', coin_type: 'Bitcoin', amount: 1018, usd_value: 111980000 },
    { id: '6efdc2ad-e61f-4c2d-944a-bb0b09b669d6', name: 'Nano Labs', ticker: 'NA', rank: 42, country: 'CN', coin_type: 'Bitcoin', amount: 1000, usd_value: 110000000 },
    { id: '434be898-fc2f-4eef-b982-2dd211faf4b7', name: 'USBC, Inc.', ticker: 'USBC', rank: 43, country: 'US', coin_type: 'Bitcoin', amount: 1000, usd_value: 110000000 },
    { id: '2f325029-e55b-4c32-9bf2-2f8cfec30fec', name: 'Frax Finance', ticker: 'FRAX', rank: 85, country: 'US', coin_type: 'Ethereum', amount: 23210, usd_value: 106069700 },
    { id: 'd56ffffb-c393-4ccd-80e0-ab8f31ec8472', name: 'Arbitrum DAO', ticker: 'ARB', rank: 86, country: 'US', coin_type: 'Ethereum', amount: 22400, usd_value: 102368000 },
    { id: 'cc10fbcb-9ca6-4252-b52a-f1c3b8bff40e', name: 'H100 Group', ticker: 'H100', rank: 44, country: 'SE', coin_type: 'Bitcoin', amount: 911, usd_value: 100210000 },
    { id: '3a479e25-4dc1-4c18-a69e-cf7b9fa7972b', name: 'DDC Enterprise Limited', ticker: 'DDC', rank: 45, country: 'US', coin_type: 'Bitcoin', amount: 888, usd_value: 97680000 },
    { id: '6fecca52-5767-4c21-aab0-1ab02d5dd26d', name: 'Ming Shing Group', ticker: 'MSW', rank: 46, country: 'HK', coin_type: 'Bitcoin', amount: 833, usd_value: 91630000 },
    { id: 'b57e545d-b484-4320-b450-fbe32609863f', name: 'Nano Labs', ticker: 'NA', rank: 98, country: 'CN', coin_type: 'BNB', amount: 128000, usd_value: 88576000 },
    { id: 'a59b6bea-37fd-435a-8c7d-22f14dc94887', name: 'SOS Limited', ticker: 'SOS', rank: 47, country: 'CN', coin_type: 'Bitcoin', amount: 803, usd_value: 88330000 },
    { id: 'e8823254-bb9f-477b-955f-1b23716973b3', name: 'Bitcoin Treasury Corp', ticker: 'BTCT', rank: 48, country: 'CA', coin_type: 'Bitcoin', amount: 771, usd_value: 84810000 },
    { id: '02aaad02-fb4c-42c0-9ad0-0e19ad53937d', name: 'Aker ASA', ticker: 'AKER', rank: 49, country: 'NO', coin_type: 'Bitcoin', amount: 754, usd_value: 82940000 },
    { id: 'a7721c6e-db23-4486-9ca6-d288b671667b', name: 'Optimism Foundation', ticker: 'OP', rank: 87, country: 'US', coin_type: 'Ethereum', amount: 17900, usd_value: 81803000 },
    { id: '512bb44f-2e76-4647-a9b2-1c53d77c25af', name: 'Sol Strategies', ticker: 'HODL.CA', rank: 92, country: 'CA', coin_type: 'Solana', amount: 370420, usd_value: 74824840 },
    { id: 'd70d0cf0-5675-4ea1-8177-28f038f6448e', name: 'Status', ticker: 'SNT', rank: 88, country: 'US', coin_type: 'Ethereum', amount: 16170, usd_value: 73896900 },
    { id: 'd7a5ba8f-ffbc-43d2-bc99-c1f33f789353', name: 'Méliuz', ticker: 'CASH3', rank: 50, country: 'BR', coin_type: 'Bitcoin', amount: 596, usd_value: 65560000 },
    { id: '71743787-1c5c-405a-ab1b-4f82a1591b2a', name: 'MercadoLibre, Inc.', ticker: 'MELI', rank: 51, country: 'AR', coin_type: 'Bitcoin', amount: 570, usd_value: 62700000 },
    { id: '82a37821-baed-485f-bd6f-cb307b543548', name: 'bitmax', ticker: '377030', rank: 52, country: 'KR', coin_type: 'Bitcoin', amount: 551, usd_value: 60610000 },
    { id: '9c31a49f-9adf-4e43-ae74-3efedebd19a1', name: 'Alliance Resource Partners, L.P.', ticker: 'ARLP', rank: 53, country: 'US', coin_type: 'Bitcoin', amount: 541, usd_value: 59510000 },
    { id: '564149b4-d3b4-4f09-b34b-c25ef059e68a', name: 'Samara Asset Group', ticker: 'SRAG', rank: 54, country: 'MT', coin_type: 'Bitcoin', amount: 525, usd_value: 57750000 },
    { id: '6c363e54-7bcb-4b99-994c-1a1b8cdc60a1', name: 'Phoenix Group PLC', ticker: 'PHX', rank: 55, country: 'AE', coin_type: 'Bitcoin', amount: 514, usd_value: 56540000 },
    { id: '62cc09ba-d53f-45e5-a8b2-c104e4ef7f4d', name: 'Jasmine International PCL', ticker: 'JAS', rank: 56, country: 'TH', coin_type: 'Bitcoin', amount: 506, usd_value: 55660000 },
    { id: '5c6707fb-390f-40cd-a03d-d1cd52190737', name: 'DigitalX', ticker: 'DCC', rank: 57, country: 'AU', coin_type: 'Bitcoin', amount: 499, usd_value: 54890000 },
    { id: 'f7ed4626-d6d0-4043-8f5b-b5442bd5fba0', name: 'Bit Digital, Inc.', ticker: 'BTBT', rank: 58, country: 'US', coin_type: 'Bitcoin', amount: 418, usd_value: 45980000 },
    { id: '9f187002-8fe0-42fc-b058-10994c694017', name: 'Virtu Financial, Inc.', ticker: 'VIRT', rank: 59, country: 'US', coin_type: 'Bitcoin', amount: 410, usd_value: 45100000 },
    { id: '6e6b0649-161c-4343-9ac0-6d90cb7e1179', name: 'Neptune Digital Assets', ticker: 'NDA', rank: 60, country: 'CA', coin_type: 'Bitcoin', amount: 404, usd_value: 44440000 },
    { id: '0748d61b-f84a-4a00-bb25-8c19432305bc', name: 'Convano Inc', ticker: '6574', rank: 61, country: 'JP', coin_type: 'Bitcoin', amount: 365, usd_value: 40150000 },
    { id: '3fb277d3-7dc6-48f3-bb91-422f2abe37d6', name: '3U Holding AG', ticker: 'UUU', rank: 62, country: 'DE', coin_type: 'Bitcoin', amount: 363, usd_value: 39930000 },
    { id: 'e6744292-5f50-4ced-8047-ee3a05e09731', name: 'Net Holding A.S.', ticker: 'NTHOL', rank: 63, country: 'TR', coin_type: 'Bitcoin', amount: 352, usd_value: 38720000 },
    { id: '47f749d1-d922-4372-8672-894e7be82c59', name: 'DMG Blockchain Solutions Inc.', ticker: 'DMGI', rank: 64, country: 'CA', coin_type: 'Bitcoin', amount: 341, usd_value: 37510000 },
    { id: 'eda6491c-c220-4412-919a-415827690d2d', name: 'LM Funding America', ticker: 'LMFA', rank: 65, country: 'US', coin_type: 'Bitcoin', amount: 311, usd_value: 34210000 },
    { id: '44ca296e-05a4-475c-a610-8666aba9986e', name: 'The9 Limited', ticker: 'NCTY', rank: 66, country: 'CN', coin_type: 'Bitcoin', amount: 285, usd_value: 31350000 },
    { id: 'e4eb6743-d7a0-4b9e-a4be-3ee623c86c65', name: 'Phoenix Digital Assets', ticker: 'PNIX', rank: 67, country: 'GB', coin_type: 'Bitcoin', amount: 247, usd_value: 27170000 },
    { id: '4df126e9-f07e-47ef-8262-8e8921e6dd7a', name: 'Advanced Bitcoin Technologies AG', ticker: 'ABT', rank: 68, country: 'DE', coin_type: 'Bitcoin', amount: 242, usd_value: 26620000 },
    { id: 'a2b25954-c55f-4c6c-b9d4-8222b9e30f40', name: 'BIT Mining', ticker: 'BTCM.US', rank: 93, country: 'US', coin_type: 'Solana', amount: 44412, usd_value: 8971224 },
    { id: '3b1bf85f-fe70-4b0e-bfb0-6ccdff2d893a', name: 'Exodus Movement', ticker: 'EXOD.US', rank: 94, country: 'US', coin_type: 'Solana', amount: 43738, usd_value: 8835076 },
    { id: 'ff339384-033d-48c7-83c9-52e27b46cc8e', name: 'Torrent Capital', ticker: 'TORR.CA', rank: 95, country: 'CA', coin_type: 'Solana', amount: 40039, usd_value: 8087878 },
    { id: 'e136cc4b-cf56-48a5-971c-90b87bacc9b9', name: '🇸🇬', ticker: 'LGHL.US', rank: 96, country: 'US', coin_type: 'Solana', amount: 6629, usd_value: 1339058 },
  ];

  const formatNumber = (n: number) => {
    if (n >= 1_000_000_000) return `$${(n / 1_000_000_000).toFixed(2)}B`;
    if (n >= 1_000_000) return `$${(n / 1_000_000).toFixed(2)}M`;
    if (n >= 1_000) return `$${(n / 1_000).toFixed(1)}K`;
    return `$${n.toLocaleString()}`;
  };

  const formatAmount = (n: number) => {
    if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
    if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
    return n.toString();
  };

  // 排序：按 rank 从小到大
  const companiesSorted = [...companies].sort((a, b) => a.rank - b.rank);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">加密货币金库公司</h1>
          <p className="text-gray-600">
            实时追踪全球最大企业所持有的比特币、以太坊和 Solana 储备。探索哪些公司正在建立它们的数字资产储备。
          </p>
        </div>

        <Tabs defaultValue="overview" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="overview">概览统计</TabsTrigger>
            <TabsTrigger value="companies">公司列表</TabsTrigger>
          </TabsList>

          {/* 概览统计 */}
          <TabsContent value="overview" className="space-y-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Live Prices */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Live Prices</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {livePrices.map((c) => (
                    <div key={c.key} className="space-y-1">
                      <div className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${c.pill}`}>
                        <span className="mr-1">{c.symbol}</span>
                        <span>{c.name}</span>
                      </div>
                      <div className="flex items-center space-x-3 pl-1">
                        <span className="text-lg font-semibold text-gray-900">${c.price.toLocaleString()}</span>
                        <span className={`text-sm ${c.change24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>{c.change24h}% (24h)</span>
                      </div>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* Total Value All Companies */}
              <Card>
                <CardHeader className="pb-2">
                  <CardTitle className="text-base">Total Value All Companies</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="text-3xl font-bold text-purple-600">${holdings.total}B</div>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-orange-500"></span>
                        <span className="text-gray-700">Bitcoin Holdings</span>
                      </div>
                      <span className="font-semibold text-orange-600">${holdings.btc}B</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        <span className="text-gray-700">Ethereum Holdings</span>
                      </div>
                      <span className="font-semibold text-blue-600">${holdings.eth}B</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        <span className="text-gray-700">Solana Holdings</span>
                      </div>
                      <span className="font-semibold text-purple-600">${holdings.sol}B</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 金库总市值 vs 公司总市值 折线图 */}
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <div>
                    <CardTitle>金库加密资产总市值 vs 公司股票总市值</CardTitle>
                    <CardDescription>单位：十亿美金（B）</CardDescription>
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
                  <div className="text-sm text-gray-600">
                    时间范围: {format(currentRange.start, 'yyyy-MM-dd', { locale: zhCN })} 至 {format(currentRange.end, 'yyyy-MM-dd', { locale: zhCN })}
                  </div>
                  
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
          </TabsContent>

          {/* 公司列表（参考图样式） */}
          <TabsContent value="companies">
            <Card>
              <CardHeader>
                <CardTitle>Company Rankings</CardTitle>
                <CardDescription>企业数字资产持仓与构成（基于提供数据的静态示例）</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead className="text-left text-gray-600">
                      <tr className="border-b">
                        <th className="py-2 pr-4">Rank</th>
                        <th className="py-2 pr-4">Company</th>
                        <th className="py-2 pr-4">Ticker</th>
                        <th className="py-2 pr-4">Coin Type</th>
                        <th className="py-2 pr-4">Holdings</th>
                        <th className="py-2 pr-4">Total Value</th>
                        <th className="py-2 pr-4">Market Cap</th>
                        <th className="py-2 pr-4">mNAV</th>
                        <th className="py-2 pr-4">Analysis</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y">
                      {companiesSorted.map((row) => (
                        <tr key={row.id} className="hover:bg-gray-50">
                          <td className="py-2 pr-4 font-medium text-gray-700">#{row.rank}</td>
                          <td className="py-2 pr-4 font-medium text-gray-900">{row.name}</td>
                          <td className="py-2 pr-4 text-gray-700">{row.ticker ?? '-'}</td>
                          <td className="py-2 pr-4">
                            <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${row.coin_type === 'Bitcoin' ? 'bg-orange-50 text-orange-700' : row.coin_type === 'Ethereum' ? 'bg-blue-50 text-blue-700' : row.coin_type === 'Solana' ? 'bg-purple-50 text-purple-700' : 'bg-gray-100 text-gray-700'}`}>
                              {row.coin_type === 'Bitcoin' ? '₿' : row.coin_type === 'Ethereum' ? 'Ξ' : row.coin_type === 'Solana' ? '◎' : ''} {row.coin_type}
                            </span>
                          </td>
                          <td className="py-2 pr-4 font-semibold">{formatAmount(row.amount)}</td>
                          <td className="py-2 pr-4 font-semibold">{formatNumber(row.usd_value)}</td>
                          <td className="py-2 pr-4">{row.market_cap ? formatNumber(row.market_cap) : '-'}</td>
                          <td className="py-2 pr-4">{row.market_cap && row.usd_value > 0 ? (row.market_cap / row.usd_value).toFixed(2) : '-'}</td>
                          <td className="py-2 pr-4 text-center">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-7 w-7 p-0 flex items-center justify-center"
                              onClick={() => {
                                // 跳转到分析页面，使用公司ID作为参数
                                window.open(`/securitization/analysis/${row.id}`, '_blank');
                              }}
                              title="查看分析"
                            >
                              <BarChart3 className="h-4 w-4 text-blue-600" />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DATs;
