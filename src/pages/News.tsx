import React, { useState, useEffect } from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Search, TrendingUp, Calendar, ExternalLink, RefreshCw, AlertCircle, Activity, Zap } from 'lucide-react';

const newsData = [
  {
    id: 1,
    title: "金管局宣布代币化证券新框架",
    description: "香港金融管理局发布了金融机构处理代币化证券和RWA的全新指导方针，这一框架将为香港的数字资产生态系统奠定坚实基础。新规定涵盖了托管要求、风险管理标准以及投资者保护措施。",
    content: "这项新框架标志着香港在数字资产监管方面的重大进展。金管局表示，新规定将在2024年第三季度生效，所有处理代币化证券的金融机构都需要遵守相关规定。",
    date: "2025-09-10",
    time: "18:15",
    source: "香港金融时报",
    category: "代币证券化",
    readTime: "3分钟",
    isBreaking: true,
    tags: ["金管局", "监管框架", "代币化", "证券"],
    type: "重要快讯"
  },
  {
    id: 2,
    title: "主要地产开发商推出代币化房产基金",
    description: "香港领先开发商宣布推出5亿美元代币化房地产基金，瞄准中环商业地产。该基金将允许投资者以较低门槛参与高价值商业地产投资。",
    content: "这只基金采用区块链技术，将传统房地产投资数字化，投资者可以购买代表实际物业份额的代币。最低投资门槛仅为1000美元，大大降低了商业地产投资的准入门槛。",
    date: "2025-09-10",
    time: "18:04",
    source: "地产内参港",
    category: "资产代币化",
    readTime: "4分钟",
    isBreaking: false,
    tags: ["房地产", "代币化", "投资基金", "中环"],
    type: "市场动态"
  },
  {
    id: 3,
    title: "港元支持稳定币获监管批准",
    description: "新的港元支持稳定币获得监管机构批准，为代币化支付铺平道路。这是香港首个获得完全监管批准的法定货币支持稳定币。",
    content: "该稳定币由香港一家金融科技公司发行，每个代币都由等值的港元储备金支持。监管机构表示，这将为香港的数字支付生态系统带来新的可能性。",
    date: "2025-09-10",
    time: "18:01",
    source: "区块链今日",
    category: "代币证券化",
    readTime: "2分钟",
    isBreaking: false,
    tags: ["稳定币", "港元", "监管批准", "数字支付"],
    type: "产品发布"
  },
  {
    id: 4,
    title: "亚洲首支代币化债券ETF上市",
    description: "开创性的代币化政府债券ETF在香港交易所成功上市交易。该ETF追踪香港政府债券指数，采用区块链技术进行结算。",
    content: "这支ETF代表了传统金融与数字资产技术的完美结合。投资者可以通过传统券商账户购买，同时享受区块链技术带来的透明度和效率提升。",
    date: "2025-09-10",
    time: "18:00",
    source: "投资周刊",
    category: "代币证券化",
    readTime: "5分钟",
    isBreaking: false,
    tags: ["ETF", "代币化", "政府债券", "港交所"],
    type: "市场动态"
  },
  {
    id: 5,
    title: "大宗商品代币化平台获得许可",
    description: "新平台将允许黄金、白银和其他贵金属的分数所有权交易。投资者可以购买以克为单位的贵金属代币，所有代币都由实物金属支持。",
    content: "该平台与多家贵金属仓储公司合作，确保每个代币都有对应的实物资产支持。平台还提供了实物提取服务，代币持有者可以选择将代币兑换为实际的贵金属。",
    date: "2025-09-10",
    time: "17:57",
    source: "商品交易报",
    category: "资产代币化",
    readTime: "3分钟",
    isBreaking: false,
    tags: ["大宗商品", "贵金属", "代币化", "分数所有权"],
    type: "监管动态"
  },
  {
    id: 6,
    title: "机构投资者RWA采用率创新高",
    description: "最新报告显示，香港机构投资者对RWA的采用率达到历史新高，超过60%的机构已将RWA纳入其投资组合。",
    content: "报告指出，机构投资者被RWA的透明度、流动性和较低的准入门槛所吸引。预计到2025年，RWA在机构投资组合中的占比将进一步增加。",
    date: "2025-09-10",
    time: "17:46",
    source: "机构投资者",
    category: "市场价格",
    readTime: "4分钟",
    isBreaking: false,
    tags: ["机构投资者", "RWA", "采用率", "投资组合"],
    type: "市场分析"
  },
  {
    id: 7,
    title: "某鲸鱼20倍杠杆做空SOL，目前浮亏达507万美元",
    description: "链上监控显示，某大户使用20倍杠杆做空SOL，当前浮亏已达507万美元。该地址在多个平台开仓，风险敞口较大。",
    content: "根据链上数据分析，该地址在多个DeFi平台开仓做空SOL，总仓位价值超过2500万美元。随着SOL价格上涨，该地址面临较大清算风险。",
    date: "2025-09-10",
    time: "2小时前",
    source: "链上监控",
    category: "链上",
    readTime: "1分钟",
    isBreaking: false,
    tags: ["SOL", "做空", "杠杆", "清算风险"],
    type: "链上监控"
  },
  {
    id: 8,
    title: "四新建钱包过去5小时从Binance提取101,824枚SOL",
    description: "链上数据显示，四个新建钱包地址在过去5小时内从Binance提取了总计101,824枚SOL，价值约1.2亿美元。",
    content: "这些地址均为新创建的钱包，提取时间集中在过去5小时内。大额提取可能预示着机构或大户的建仓行为。",
    date: "2025-09-10",
    time: "50分钟前",
    source: "链上监控",
    category: "链上",
    readTime: "1分钟",
    isBreaking: false,
    tags: ["SOL", "Binance", "大额提取", "机构建仓"],
    type: "链上监控"
  },
  {
    id: 9,
    title: "比特币突破114,100美元，或上探至118,000美元",
    description: "glassnode分析显示，比特币处于区间震荡，在盘整过程中，比特币低于111,100美元价格时在持续被潜在需求吸收。若突破114,100美元，可能会测试118,000美元附近的密集区。",
    content: "技术分析表明，比特币当前在关键阻力位附近震荡，突破后将迎来新的上涨空间。市场情绪保持乐观，机构资金持续流入。",
    date: "2025-09-10",
    time: "17:57",
    source: "glassnode",
    category: "市场价格",
    readTime: "2分钟",
    isBreaking: false,
    tags: ["比特币", "技术分析", "阻力位", "上涨"],
    type: "市场分析"
  },
  {
    id: 10,
    title: "艺术品代币化平台获得监管批准",
    description: "新的艺术品代币化平台获得香港监管机构批准，将允许投资者购买代表艺术品所有权的代币。平台与多家知名画廊和拍卖行合作。",
    content: "该平台采用区块链技术确保艺术品的真实性和所有权记录。投资者可以购买代表艺术品部分所有权的代币，享受艺术品增值收益。",
    date: "2025-09-10",
    time: "17:35",
    source: "艺术财经",
    category: "资产代币化",
    readTime: "3分钟",
    isBreaking: false,
    tags: ["艺术品", "代币化", "监管批准", "所有权"],
    type: "产品发布"
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case '代币证券化': return 'bg-blue-500 text-white';
    case '资产代币化': return 'bg-green-500 text-white';
    case '链上': return 'bg-indigo-500 text-white';
    case '市场价格': return 'bg-orange-500 text-white';
    default: return 'bg-gray-500 text-white';
  }
};

const getTypeIcon = (type: string) => {
  switch (type) {
    case '重要快讯': return <AlertCircle className="w-4 h-4" />;
    case '链上监控': return <Activity className="w-4 h-4" />;
    case '市场动态': return <TrendingUp className="w-4 h-4" />;
    case '产品发布': return <Zap className="w-4 h-4" />;
    case '监管动态': return <AlertCircle className="w-4 h-4" />;
    case '市场分析': return <TrendingUp className="w-4 h-4" />;
    default: return <Clock className="w-4 h-4" />;
  }
};

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [isAutoUpdate, setIsAutoUpdate] = useState(true);

  // 自动更新功能
  useEffect(() => {
    if (!isAutoUpdate) return;
    
    const interval = setInterval(() => {
      setLastUpdate(new Date());
    }, 30000); // 每30秒更新一次

    return () => clearInterval(interval);
  }, [isAutoUpdate]);

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', '代币证券化', '资产代币化', '链上', '市场价格'];

  // 按时间分组新闻
  const groupedNews = filteredNews.reduce((groups, news) => {
    const date = news.date;
    if (!groups[date]) {
      groups[date] = [];
    }
    groups[date].push(news);
    return groups;
  }, {} as Record<string, typeof newsData>);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('zh-CN', { 
      hour: '2-digit', 
      minute: '2-digit',
      hour12: false 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-6">
        {/* 页面头部 */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900 mb-2">市场快讯</h1>
              <p className="text-gray-600">代币化领域的最新动态与深度分析</p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-3">
                <div className="flex items-center space-x-2 text-sm text-gray-600">
                  <RefreshCw className={`w-4 h-4 ${isAutoUpdate ? 'animate-spin text-blue-500' : 'text-gray-400'}`} />
                  <span className="font-medium">自动更新</span>
                </div>
                <Button
                  variant={isAutoUpdate ? "default" : "outline"}
                  size="sm"
                  onClick={() => setIsAutoUpdate(!isAutoUpdate)}
                  className={`text-xs font-medium transition-all duration-200 ${
                    isAutoUpdate 
                      ? 'bg-blue-500 hover:bg-blue-600 text-white shadow-md' 
                      : 'border-gray-300 text-gray-600 hover:bg-gray-50'
                  }`}
                >
                  {isAutoUpdate ? '已开启' : '已关闭'}
                </Button>
              </div>
              <div className="text-sm text-gray-500">
                最后更新: {formatTime(lastUpdate)}
              </div>
            </div>
          </div>

          {/* 搜索和筛选 */}
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="搜索新闻..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-white"
              />
            </div>
            <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
              <TabsList className="grid grid-cols-4 sm:grid-cols-8 h-auto bg-white">
                {categories.map((category) => (
                  <TabsTrigger key={category} value={category} className="text-xs px-2">
                    {category === 'all' ? '全部' : category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
          </div>
        </div>

        {/* 时间线新闻 */}
        <div className="space-y-6">
          {Object.entries(groupedNews)
            .sort(([a], [b]) => b.localeCompare(a))
            .map(([date, newsList]) => (
            <div key={date}>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">{date}</h3>
                </div>
              </div>
              
              <div className="relative">
                {/* 时间线 */}
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"></div>
                
                <div className="space-y-4">
                  {newsList
                    .sort((a, b) => b.time.localeCompare(a.time))
                    .map((news, index) => (
                    <div key={news.id} className="relative flex items-start">
                      {/* 时间点 */}
                      <div className="relative z-10 flex items-center justify-center w-8 h-8 bg-white border-2 border-gray-300 rounded-full">
                        {getTypeIcon(news.type)}
                      </div>
                      
                      {/* 新闻内容 */}
                      <div className="ml-6 flex-1">
                        <Card className="bg-white hover:shadow-md transition-shadow">
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between mb-3">
                              <div className="flex items-center space-x-2">
                                <Badge className={getCategoryColor(news.category)}>
                                  {news.category}
                                </Badge>
                                <span className="text-sm text-gray-500">{news.time}</span>
                              </div>
                              <div className="flex items-center text-sm text-gray-500">
                                <Clock className="w-4 h-4 mr-1" />
                                {news.readTime}
                              </div>
                            </div>
                            
                            <h4 className="font-semibold text-gray-900 mb-2 hover:text-blue-600 cursor-pointer">
                              {news.title}
                            </h4>
                            
                            <p className="text-gray-600 text-sm leading-relaxed mb-3">
                              {news.description}
                            </p>
                            
                            {news.type === '链上监控' && (
                              <div className="flex flex-wrap gap-1 mb-3">
                                {news.tags.map((tag, tagIndex) => (
                                  <Badge key={tagIndex} variant="outline" className="text-xs">
                                    {tag}
                                  </Badge>
                                ))}
                              </div>
                            )}
                            
                            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                              <div className="flex items-center space-x-4 text-sm text-gray-500">
                                <span>{news.source}</span>
                                {news.type !== '链上监控' && (
                                  <>
                                    <span>•</span>
                                    <span>{news.readTime}</span>
                                  </>
                                )}
                              </div>
                              <Button variant="ghost" size="sm" className="text-blue-600 hover:text-blue-700">
                                查看详情
                                <ExternalLink className="ml-1 h-3 w-3" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 链上监控持续监控 */}
        <div className="mt-8">
          <div className="flex items-center mb-4">
            <Activity className="w-5 h-5 text-indigo-500 mr-2" />
            <h2 className="text-lg font-semibold text-gray-900">链上监控持续监控</h2>
          </div>
          <div className="bg-white rounded-lg p-4 border">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                <span className="text-sm text-gray-600">实时监控中</span>
              </div>
              <Button variant="outline" size="sm">
                查看全部监控
              </Button>
            </div>
          </div>
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">没有找到匹配的新闻</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;