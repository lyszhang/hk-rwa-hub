import React, { useState, useCallback } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ArrowLeft,
  TrendingUp, 
  DollarSign, 
  Calendar,
  Users,
  Building2,
  Coins,
  BarChart3,
  PieChart,
  ExternalLink,
  Download,
  Share2,
  Star,
  AlertCircle,
  CheckCircle,
  Clock,
  Target,
  Shield,
  Activity,
  FileText,
  Link,
  Database,
  Zap,
  Eye,
  Copy,
  Globe,
  Hash,
  Wallet,
  TrendingDown
} from 'lucide-react';
import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar
} from 'recharts';
import ReactFlow, {
  Node,
  Edge,
  addEdge,
  Connection,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
  MarkerType,
  Handle,
  Position,
} from 'reactflow';
import 'reactflow/dist/style.css';

// 自定义节点组件
const CustomNode = ({ data }: { data: any }) => {
  const { icon: Icon, title, subtitle, color, bgColor } = data;
  
  return (
    <div className={`${bgColor} border-2 ${color} rounded-lg p-4 min-w-[160px] text-center shadow-lg relative`}>
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Left}
        id="left"
        style={{ background: '#555' }}
      />
      <Handle
        type="source"
        position={Position.Right}
        id="right"
        style={{ background: '#555' }}
      />
      <Icon className={`w-8 h-8 ${color.replace('border-', 'text-').replace('-300', '-600')} mx-auto mb-2`} />
      <p className="font-semibold text-sm mb-1">{title}</p>
      <p className="text-xs opacity-75">{subtitle}</p>
    </div>
  );
};

// 节点类型
const nodeTypes = {
  custom: CustomNode,
};

// 产品数据
const productData = {
  1: {
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
    description: '博時基金推出的港元貨幣市場ETF，投資於高流動性的港元貨幣市場工具，提供穩定的收益和流動性。',
    fullDescription: '博時港元貨幣市場ETF是一隻專注於港元貨幣市場的交易所買賣基金，主要投資於高質量的港元貨幣市場工具，包括銀行存款、短期債券、商業票據等。該ETF旨在為投資者提供穩定的收益和良好的流動性，同時保持較低的風險水平。',
    investmentObjective: '通過投資於高流動性的港元貨幣市場工具，為投資者提供穩定的收益和資本保值。',
    riskFactors: [
      '利率風險：貨幣市場利率變動可能影響基金收益',
      '信用風險：投資標的的信用狀況可能影響基金價值',
      '流動性風險：市場流動性不足可能影響基金運作',
      '匯率風險：港元匯率波動可能影響基金表現'
    ],
    keyFeatures: [
      '投資於高質量的港元貨幣市場工具',
      '提供每日流動性',
      '管理費率較低',
      '專業的基金管理團隊',
      '嚴格的風險控制措施'
    ],
    performance: {
      ytd: 8.5,
      oneYear: 7.8,
      threeYear: 6.2,
      sinceInception: 7.1
    },
    holdings: [
      { name: '銀行存款', percentage: 45.2, value: 1.13 },
      { name: '短期政府債券', percentage: 28.5, value: 0.71 },
      { name: '商業票據', percentage: 15.8, value: 0.40 },
      { name: '回購協議', percentage: 8.9, value: 0.22 },
      { name: '其他', percentage: 1.6, value: 0.04 }
    ],
    monthlyPerformance: [
      { month: '1月', return: 0.7, nav: 1.008 },
      { month: '2月', return: 0.6, nav: 1.014 },
      { month: '3月', return: 0.8, nav: 1.022 },
      { month: '4月', return: 0.5, nav: 1.027 },
      { month: '5月', return: 0.9, nav: 1.036 },
      { month: '6月', return: 0.7, nav: 1.043 },
      { month: '7月', return: 0.8, nav: 1.051 },
      { month: '8月', return: 0.6, nav: 1.057 },
      { month: '9月', return: 0.9, nav: 1.066 },
      { month: '10月', return: 0.7, nav: 1.073 },
      { month: '11月', return: 0.8, nav: 1.081 },
      { month: '12月', return: 0.9, nav: 1.090 }
    ],
    fees: {
      managementFee: 0.15,
      totalExpenseRatio: 0.18,
      minimumInvestment: 1000,
      currency: 'HKD'
    },
    contact: {
      website: 'https://www.bosera.com',
      phone: '+852 2121 8888',
      email: 'info@bosera.com',
      address: '香港中環金融街8號國際金融中心2期'
    },
    blockchain: {
      contractAddress: '0x1234567890abcdef1234567890abcdef12345678',
      tokenStandard: 'ERC-20',
      network: 'Ethereum',
      blockExplorer: 'https://etherscan.io',
      totalSupply: '1000000000',
      decimals: 18,
      holders: 1250,
      transactions: 15680,
      lastUpdate: '2024-01-15 14:30:25',
      smartContract: {
        name: 'BoseraHKDMoneyMarketETF',
        version: 'v1.2.0',
        verified: true,
        compiler: 'Solidity 0.8.19',
        license: 'MIT'
      },
      onChainMetrics: {
        totalValue: 250000000, // USD
        dailySubscription: 15000000, // USD
        dailyRedemption: 12000000, // USD
        holderAddresses: 12500, // 个
        priceChange24h: 0.15 // %
      },
      recentTransactions: [
        {
          hash: '0xabc123...def456',
          type: 'Mint',
          amount: '1000000',
          from: '0x1234...5678',
          to: '0x8765...4321',
          timestamp: '2024-01-15 14:25:10',
          status: 'Success'
        },
        {
          hash: '0xdef456...ghi789',
          type: 'Transfer',
          amount: '500000',
          from: '0x8765...4321',
          to: '0x1111...2222',
          timestamp: '2024-01-15 13:45:30',
          status: 'Success'
        },
        {
          hash: '0xghi789...jkl012',
          type: 'Burn',
          amount: '200000',
          from: '0x1111...2222',
          to: '0x0000...0000',
          timestamp: '2024-01-15 12:15:45',
          status: 'Success'
        }
      ],
      governance: {
        votingPower: '250000000',
        proposals: 12,
        activeProposals: 2,
        lastVote: '2024-01-10'
      }
    },
    structure: {
      fundType: '开放式ETF',
      legalStructure: '单位信托基金',
      domicile: '香港',
      baseCurrency: '港元 (HKD)',
      tradingCurrency: 'USDT',
      tokenStandard: 'ERC-20',
      blockchain: '以太坊',
      custody: '汇丰银行',
      administrator: '博時基金',
      auditor: '普华永道',
      legalAdvisor: '高伟绅律师事务所',
      distribution: '每日',
      redemption: 'T+1',
      minimumHolding: '1000 HKD',
      managementCompany: '博時基金管理有限公司',
      trustee: '汇丰信托(香港)有限公司',
      structureDiagram: {
        title: '产品结构图',
        description: '博時港元貨幣市場ETF的产品架构和参与方关系',
        participants: [
          { name: '投资者', role: '基金份额持有人', position: 'top' },
          { name: '博時基金', role: '基金管理人', position: 'center' },
          { name: '汇丰信托', role: '基金托管人', position: 'center' },
          { name: '汇丰银行', role: '资产托管人', position: 'bottom' },
          { name: '以太坊网络', role: '区块链基础设施', position: 'bottom' }
        ]
      }
    }
  }
};

const ProductDetail = () => {
  const { productId } = useParams<{ productId: string }>();
  const navigate = useNavigate();
  const [selectedTab, setSelectedTab] = useState('overview');
  
  const product = productData[productId as unknown as keyof typeof productData] || productData[1];

  // ReactFlow 节点和边的定义 - 根据图片重新调整布局
  const initialNodes: Node[] = [
    {
      id: 'investor',
      type: 'custom',
      position: { x: 400, y: 0 },
      data: {
        icon: Users,
        title: '投資者',
        subtitle: 'Investor',
        color: 'border-blue-300',
        bgColor: 'bg-blue-100'
      },
    },
    {
      id: 'distributor',
      type: 'custom',
      position: { x: 400, y: 150 },
      data: {
        icon: Building2,
        title: '合資格分銷商',
        subtitle: '(作為直接股份持有人)',
        color: 'border-green-300',
        bgColor: 'bg-green-100'
      },
    },
    {
      id: 'subfund',
      type: 'custom',
      position: { x: 400, y: 300 },
      data: {
        icon: Coins,
        title: '子基金',
        subtitle: 'Sub-fund',
        color: 'border-purple-300',
        bgColor: 'bg-purple-100'
      },
    },
    {
      id: 'token_custodian',
      type: 'custom',
      position: { x: 700, y: 0 },
      data: {
        icon: Shield,
        title: '代幣保管人',
        subtitle: 'Token Custodian',
        color: 'border-gray-300',
        bgColor: 'bg-gray-100'
      },
    },
    {
      id: 'tokenization_provider',
      type: 'custom',
      position: { x: 700, y: 300 },
      data: {
        icon: Activity,
        title: '代幣化服務商',
        subtitle: 'Tokenization Service Provider',
        color: 'border-orange-300',
        bgColor: 'bg-orange-100'
      },
    },
  ];

  const initialEdges: Edge[] = [
    {
      id: 'e1',
      source: 'investor',
      sourceHandle: 'bottom',
      target: 'distributor',
      targetHandle: 'top',
      label: '(1) 認購代幣, 並支付認購款',
      style: { stroke: '#2563eb', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb' },
    },
    {
      id: 'e2',
      source: 'distributor',
      sourceHandle: 'bottom',
      target: 'subfund',
      targetHandle: 'top',
      label: '(2) 認購請求通知經理人及保管人, 並支付認購費',
      style: { stroke: '#2563eb', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb' },
    },
    {
      id: 'e3a',
      source: 'subfund',
      sourceHandle: 'top',
      target: 'distributor',
      targetHandle: 'bottom',
      label: '(3a) 發行代幣化股份',
      style: { stroke: '#2563eb', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb' },
    },
    {
      id: 'e3b',
      source: 'subfund',
      sourceHandle: 'right',
      target: 'tokenization_provider',
      targetHandle: 'left',
      label: '(3b) 保管人發出代幣鑄造指令',
      style: { stroke: '#2563eb', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb' },
    },
    {
      id: 'e4',
      source: 'tokenization_provider',
      sourceHandle: 'top',
      target: 'token_custodian',
      targetHandle: 'bottom',
      label: '(4) 代幣轉移',
      style: { stroke: '#2563eb', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb' },
    },
    {
      id: 'e5',
      source: 'token_custodian',
      sourceHandle: 'left',
      target: 'distributor',
      targetHandle: 'right',
      label: '代表合格分銷商持有代幣, 並提供有關數碼錢包之更新信息',
      style: { stroke: '#2563eb', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb' },
    },
    {
      id: 'e6',
      source: 'distributor',
      sourceHandle: 'top',
      target: 'investor',
      targetHandle: 'bottom',
      label: '(5) 以代幣形式分配代幣化股份之權益至投資者於合格分銷商處以簿記形式持有的帳戶中',
      style: { stroke: '#2563eb', strokeWidth: 3 },
      markerEnd: { type: MarkerType.ArrowClosed, color: '#2563eb' },
    },
  ];

  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges]
  );
  
  if (!product) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="container mx-auto px-4 py-8">
          <div className="text-center py-12">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">产品未找到</h1>
            <p className="text-gray-600 mb-6">请检查产品ID是否正确</p>
            <Button onClick={() => navigate('/hk/securitization')}>
              返回产品列表
            </Button>
          </div>
        </div>
      </div>
    );
  }

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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* 返回按钮 */}
        <div className="mb-6">
          <Button 
            variant="ghost" 
            onClick={() => navigate('/hk/securitization')}
            className="mb-4"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            返回产品列表
          </Button>
        </div>

        {/* 产品头部信息 */}
        <div className="mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <h1 className="text-3xl font-bold text-gray-900">{product.name}</h1>
                <Badge className={getRiskColor(product.riskLevel)}>
                  {product.riskLevel}风险
                </Badge>
                <Badge className={getStatusColor(product.status)}>
                  {product.status}
                </Badge>
              </div>
              <p className="text-lg text-gray-600 mb-4">{product.description}</p>
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center">
                  <Building2 className="w-4 h-4 mr-2" />
                  {product.issuer}
                </div>
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 mr-2" />
                  {product.launchDate}
                </div>
                <div className="flex items-center">
                  <Coins className="w-4 h-4 mr-2" />
                  {product.type}
                </div>
              </div>
            </div>
            <div className="flex space-x-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                分享
              </Button>
              <Button variant="outline" size="sm">
                <Download className="w-4 h-4 mr-2" />
                下载资料
              </Button>
            </div>
          </div>

          {/* 关键指标 */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">总价值</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {product.totalValue} {product.unit}
                    </p>
                  </div>
                  <DollarSign className="w-8 h-8 text-blue-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">代币价格</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {product.tokenPrice} {product.currency}
                    </p>
                  </div>
                  <Coins className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">年化收益率</p>
                    <p className="text-2xl font-bold text-green-600">
                      {product.apy}%
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-green-600" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">管理费率</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {product.fees.managementFee}%
                    </p>
                  </div>
                  <Shield className="w-8 h-8 text-purple-600" />
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* 主要内容区域 */}
        <Tabs value={selectedTab} onValueChange={setSelectedTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="overview">概览</TabsTrigger>
            <TabsTrigger value="structure">产品结构</TabsTrigger>
            <TabsTrigger value="blockchain">链上信息</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            {/* 产品介绍和主要特点 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>产品介绍</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed mb-4">
                    {product.fullDescription}
                  </p>
                  <div className="space-y-3">
                    <h4 className="font-semibold text-gray-900">投资目标</h4>
                    <p className="text-gray-600">{product.investmentObjective}</p>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>主要特点</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {product.keyFeatures.map((feature, index) => (
                      <div key={index} className="flex items-start space-x-3">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 费用结构 */}
            <Card>
              <CardHeader>
                <CardTitle>费用结构</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">管理费率</p>
                    <p className="text-2xl font-bold text-blue-600">
                      {product.fees.managementFee}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">总费用率</p>
                    <p className="text-2xl font-bold text-green-600">
                      {product.fees.totalExpenseRatio}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">最低投资额</p>
                    <p className="text-2xl font-bold text-purple-600">
                      {product.fees.minimumInvestment.toLocaleString()} {product.fees.currency}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 历史表现 */}
            <Card>
              <CardHeader>
                <CardTitle>历史表现</CardTitle>
                <CardDescription>基金的历史收益率表现</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-gray-600">年初至今</p>
                    <p className="text-xl font-bold text-blue-600">
                      {product.performance.ytd}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <p className="text-sm text-gray-600">一年</p>
                    <p className="text-xl font-bold text-green-600">
                      {product.performance.oneYear}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <p className="text-sm text-gray-600">三年</p>
                    <p className="text-xl font-bold text-purple-600">
                      {product.performance.threeYear}%
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <p className="text-sm text-gray-600">成立以来</p>
                    <p className="text-xl font-bold text-orange-600">
                      {product.performance.sinceInception}%
                    </p>
                  </div>
                </div>

                <div className="h-80">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={product.monthlyPerformance}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                      <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                      <YAxis stroke="#6b7280" fontSize={12} />
                      <Tooltip 
                        formatter={(value: any) => [`${value}%`, '收益率']}
                        labelFormatter={(label) => `${label}`}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="return" 
                        stroke="#3B82F6" 
                        fill="#3B82F6" 
                        fillOpacity={0.3}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            {/* 投资组合构成 */}
            <Card>
              <CardHeader>
                <CardTitle>投资组合构成</CardTitle>
                <CardDescription>基金的投资组合分布情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.holdings.map((holding, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <div className="w-4 h-4 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium text-gray-900">{holding.name}</p>
                          <p className="text-sm text-gray-600">{holding.value}亿美元</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-lg font-semibold text-gray-900">
                          {holding.percentage}%
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 风险因素 */}
            <Card>
              <CardHeader>
                <CardTitle>风险因素</CardTitle>
                <CardDescription>投资本基金可能面临的主要风险</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.riskFactors.map((risk, index) => (
                    <div key={index} className="flex items-start space-x-3 p-4 bg-yellow-50 rounded-lg">
                      <AlertCircle className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" />
                      <p className="text-gray-700">{risk}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* 联系信息 */}
            <Card>
              <CardHeader>
                <CardTitle>联系信息</CardTitle>
                <CardDescription>获取更多产品信息的联系方式</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <ExternalLink className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="font-medium text-gray-900">官方网站</p>
                        <a href={product.contact.website} className="text-blue-600 hover:underline">
                          {product.contact.website}
                        </a>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Clock className="w-5 h-5 text-green-600" />
                      <div>
                        <p className="font-medium text-gray-900">联系电话</p>
                        <p className="text-gray-600">{product.contact.phone}</p>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3">
                      <Target className="w-5 h-5 text-purple-600" />
                      <div>
                        <p className="font-medium text-gray-900">邮箱地址</p>
                        <p className="text-gray-600">{product.contact.email}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <Building2 className="w-5 h-5 text-orange-600" />
                      <div>
                        <p className="font-medium text-gray-900">办公地址</p>
                        <p className="text-gray-600">{product.contact.address}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>


          <TabsContent value="structure" className="space-y-6">
            {/* 产品结构图 - 使用 ReactFlow */}
            <Card>
              <CardHeader>
                <CardTitle>产品结构图</CardTitle>
                <CardDescription>博時港元貨幣市場ETF的产品架构和参与方关系</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[500px] w-full border rounded-lg">
                  <ReactFlow
                    nodes={nodes}
                    edges={edges}
                    onNodesChange={onNodesChange}
                    onEdgesChange={onEdgesChange}
                    onConnect={onConnect}
                    nodeTypes={nodeTypes}
                    fitView
                    attributionPosition="bottom-left"
                  >
                    <Controls />
                    <Background variant={BackgroundVariant.Dots} gap={12} size={1} />
                  </ReactFlow>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>基本信息</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">基金类型</span>
                      <span className="font-medium">{product.structure.fundType}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">法律结构</span>
                      <span className="font-medium">{product.structure.legalStructure}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">注册地</span>
                      <span className="font-medium">{product.structure.domicile}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">基础货币</span>
                      <span className="font-medium">{product.structure.baseCurrency}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">交易货币</span>
                      <span className="font-medium">{product.structure.tradingCurrency}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">代币标准</span>
                      <span className="font-medium">{product.structure.tokenStandard}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">区块链</span>
                      <span className="font-medium">{product.structure.blockchain}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>服务提供商</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">基金管理人</span>
                      <span className="font-medium">{product.structure.managementCompany}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">基金托管人</span>
                      <span className="font-medium">{product.structure.trustee}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">资产托管人</span>
                      <span className="font-medium">{product.structure.custody}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">行政管理人</span>
                      <span className="font-medium">{product.structure.administrator}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">审计师</span>
                      <span className="font-medium">{product.structure.auditor}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">法律顾问</span>
                      <span className="font-medium">{product.structure.legalAdvisor}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>交易规则</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Activity className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">分红频率</p>
                    <p className="text-lg font-semibold text-blue-600">
                      {product.structure.distribution}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Clock className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">赎回时间</p>
                    <p className="text-lg font-semibold text-green-600">
                      {product.structure.redemption}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Target className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">最低持有</p>
                    <p className="text-lg font-semibold text-purple-600">
                      {product.structure.minimumHolding}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="blockchain" className="space-y-6">
            {/* 合约基本信息 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>智能合约信息</CardTitle>
                  <CardDescription>代币合约的基本信息和验证状态</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
            <div className="flex justify-between items-center py-2 border-b">
              <span className="text-gray-600">合约地址</span>
              <div className="flex items-center space-x-2">
                <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                  {product.blockchain.contractAddress.slice(0, 10)}...{product.blockchain.contractAddress.slice(-8)}
                </code>
                <Button 
                  variant="ghost" 
                  size="sm"
                  onClick={() => window.open(`https://hashkey.blockscout.com/address/${product.blockchain.contractAddress}`, '_blank')}
                >
                  <ExternalLink className="w-4 h-4" />
                </Button>
                <Button variant="ghost" size="sm">
                  <Copy className="w-4 h-4" />
                </Button>
              </div>
            </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">代币标准</span>
                      <Badge variant="secondary">{product.blockchain.tokenStandard}</Badge>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">网络</span>
                      <div className="flex items-center space-x-2">
                        <Globe className="w-4 h-4 text-blue-600" />
                        <span className="font-medium">{product.blockchain.network}</span>
                      </div>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">合约名称</span>
                      <span className="font-medium">{product.blockchain.smartContract.name}</span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b">
                      <span className="text-gray-600">版本</span>
                      <span className="font-medium">{product.blockchain.smartContract.version}</span>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">验证状态</span>
                      <Badge className={product.blockchain.smartContract.verified ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}>
                        {product.blockchain.smartContract.verified ? "已验证" : "未验证"}
                      </Badge>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>链上指标</CardTitle>
                  <CardDescription>实时链上数据和市场指标</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <DollarSign className="w-6 h-6 text-blue-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">总价值</p>
                      <p className="text-lg font-bold text-blue-600">
                        ${(product.blockchain.onChainMetrics.totalValue / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <TrendingUp className="w-6 h-6 text-green-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">当日申购量</p>
                      <p className="text-lg font-bold text-green-600">
                        ${(product.blockchain.onChainMetrics.dailySubscription / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="text-center p-4 bg-red-50 rounded-lg">
                      <TrendingDown className="w-6 h-6 text-red-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">当日赎回量</p>
                      <p className="text-lg font-bold text-red-600">
                        ${(product.blockchain.onChainMetrics.dailyRedemption / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
                      <p className="text-sm text-gray-600">持仓地址</p>
                      <p className="text-lg font-bold text-purple-600">
                        {product.blockchain.onChainMetrics.holderAddresses.toLocaleString()}个
                      </p>
                    </div>
                  </div>
                  <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center justify-between">
                      <span className="text-sm text-gray-600">24小时价格变化</span>
                      <div className="flex items-center space-x-1">
                        {product.blockchain.onChainMetrics.priceChange24h >= 0 ? (
                          <TrendingUp className="w-4 h-4 text-green-600" />
                        ) : (
                          <TrendingDown className="w-4 h-4 text-red-600" />
                        )}
                        <span className={`font-medium ${product.blockchain.onChainMetrics.priceChange24h >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                          {product.blockchain.onChainMetrics.priceChange24h >= 0 ? '+' : ''}{product.blockchain.onChainMetrics.priceChange24h}%
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* 代币统计信息 */}
            <Card>
              <CardHeader>
                <CardTitle>代币统计</CardTitle>
                <CardDescription>代币的发行和持有情况</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center p-4 bg-blue-50 rounded-lg">
                    <Hash className="w-8 h-8 text-blue-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">总供应量</p>
                    <p className="text-xl font-bold text-blue-600">
                      {(parseInt(product.blockchain.totalSupply) / 1000000).toFixed(1)}M
                    </p>
                  </div>
                  <div className="text-center p-4 bg-green-50 rounded-lg">
                    <Users className="w-8 h-8 text-green-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">持有者数量</p>
                    <p className="text-xl font-bold text-green-600">
                      {product.blockchain.holders.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-purple-50 rounded-lg">
                    <Activity className="w-8 h-8 text-purple-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">交易次数</p>
                    <p className="text-xl font-bold text-purple-600">
                      {product.blockchain.transactions.toLocaleString()}
                    </p>
                  </div>
                  <div className="text-center p-4 bg-orange-50 rounded-lg">
                    <Clock className="w-8 h-8 text-orange-600 mx-auto mb-2" />
                    <p className="text-sm text-gray-600">最后更新</p>
                    <p className="text-sm font-medium text-orange-600">
                      {product.blockchain.lastUpdate}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* 最近交易记录 */}
            <Card>
              <CardHeader>
                <CardTitle>最近交易记录</CardTitle>
                <CardDescription>最新的链上交易活动</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {product.blockchain.recentTransactions.map((tx, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center space-x-4">
                        <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                          tx.type === 'Mint' ? 'bg-green-100' : 
                          tx.type === 'Burn' ? 'bg-red-100' : 'bg-blue-100'
                        }`}>
                          {tx.type === 'Mint' ? (
                            <TrendingUp className="w-5 h-5 text-green-600" />
                          ) : tx.type === 'Burn' ? (
                            <TrendingDown className="w-5 h-5 text-red-600" />
                          ) : (
                            <ArrowLeft className="w-5 h-5 text-blue-600" />
                          )}
                        </div>
                        <div>
                          <p className="font-medium text-gray-900">{tx.type}</p>
                          <p className="text-sm text-gray-600">{tx.amount} 代币</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-gray-900">
                          {tx.hash.slice(0, 10)}...{tx.hash.slice(-8)}
                        </p>
                        <p className="text-sm text-gray-600">{tx.timestamp}</p>
                      </div>
                      <Badge className={tx.status === 'Success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                        {tx.status}
                      </Badge>
                    </div>
                  ))}
                </div>
                <div className="mt-4 text-center">
                  <Button variant="outline">
                    <Eye className="w-4 h-4 mr-2" />
                    查看所有交易
                  </Button>
                </div>
              </CardContent>
            </Card>

          </TabsContent>

        </Tabs>
      </div>
    </div>
  );
};

export default ProductDetail;
