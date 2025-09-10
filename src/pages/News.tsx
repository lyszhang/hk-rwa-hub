import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, Search, Filter, TrendingUp, Calendar, ExternalLink } from 'lucide-react';

const newsData = [
  {
    id: 1,
    title: "金管局宣布代币化证券新框架",
    description: "香港金融管理局发布了金融机构处理代币化证券和RWA的全新指导方针，这一框架将为香港的数字资产生态系统奠定坚实基础。新规定涵盖了托管要求、风险管理标准以及投资者保护措施。",
    content: "这项新框架标志着香港在数字资产监管方面的重大进展。金管局表示，新规定将在2024年第三季度生效，所有处理代币化证券的金融机构都需要遵守相关规定。",
    date: "2024年4月18日",
    time: "14:30",
    source: "香港金融时报",
    category: "监管",
    readTime: "3分钟",
    isBreaking: true,
    tags: ["金管局", "监管框架", "代币化", "证券"]
  },
  {
    id: 2,
    title: "主要地产开发商推出代币化房产基金",
    description: "香港领先开发商宣布推出5亿美元代币化房地产基金，瞄准中环商业地产。该基金将允许投资者以较低门槛参与高价值商业地产投资。",
    content: "这只基金采用区块链技术，将传统房地产投资数字化，投资者可以购买代表实际物业份额的代币。最低投资门槛仅为1000美元，大大降低了商业地产投资的准入门槛。",
    date: "2024年4月16日",
    time: "10:15",
    source: "地产内参港",
    category: "房地产",
    readTime: "4分钟",
    isBreaking: false,
    tags: ["房地产", "代币化", "投资基金", "中环"]
  },
  {
    id: 3,
    title: "港元支持稳定币获监管批准",
    description: "新的港元支持稳定币获得监管机构批准，为代币化支付铺平道路。这是香港首个获得完全监管批准的法定货币支持稳定币。",
    content: "该稳定币由香港一家金融科技公司发行，每个代币都由等值的港元储备金支持。监管机构表示，这将为香港的数字支付生态系统带来新的可能性。",
    date: "2024年4月15日",
    time: "16:45",
    source: "区块链今日",
    category: "稳定币",
    readTime: "2分钟",
    isBreaking: false,
    tags: ["稳定币", "港元", "监管批准", "数字支付"]
  },
  {
    id: 4,
    title: "亚洲首支代币化债券ETF上市",
    description: "开创性的代币化政府债券ETF在香港交易所成功上市交易。该ETF追踪香港政府债券指数，采用区块链技术进行结算。",
    content: "这支ETF代表了传统金融与数字资产技术的完美结合。投资者可以通过传统券商账户购买，同时享受区块链技术带来的透明度和效率提升。",
    date: "2024年4月14日",
    time: "09:30",
    source: "投资周刊",
    category: "ETF",
    readTime: "5分钟",
    isBreaking: false,
    tags: ["ETF", "代币化", "政府债券", "港交所"]
  },
  {
    id: 5,
    title: "大宗商品代币化平台获得许可",
    description: "新平台将允许黄金、白银和其他贵金属的分数所有权交易。投资者可以购买以克为单位的贵金属代币，所有代币都由实物金属支持。",
    content: "该平台与多家贵金属仓储公司合作，确保每个代币都有对应的实物资产支持。平台还提供了实物提取服务，代币持有者可以选择将代币兑换为实际的贵金属。",
    date: "2024年4月13日",
    time: "11:20",
    source: "商品交易报",
    category: "商品",
    readTime: "3分钟",
    isBreaking: false,
    tags: ["大宗商品", "贵金属", "代币化", "分数所有权"]
  },
  {
    id: 6,
    title: "机构投资者RWA采用率创新高",
    description: "最新报告显示，香港机构投资者对RWA的采用率达到历史新高，超过60%的机构已将RWA纳入其投资组合。",
    content: "报告指出，机构投资者被RWA的透明度、流动性和较低的准入门槛所吸引。预计到2025年，RWA在机构投资组合中的占比将进一步增加。",
    date: "2024年4月12日",
    time: "15:10",
    source: "机构投资者",
    category: "市场",
    readTime: "4分钟",
    isBreaking: false,
    tags: ["机构投资者", "RWA", "采用率", "投资组合"]
  }
];

const getCategoryColor = (category: string) => {
  switch (category) {
    case '监管': return 'bg-primary text-primary-foreground';
    case '房地产': return 'bg-success text-success-foreground';
    case '稳定币': return 'bg-info text-info-foreground';
    case 'ETF': return 'bg-warning text-warning-foreground';
    case '商品': return 'bg-chart-3 text-white';
    case '市场': return 'bg-chart-2 text-white';
    default: return 'bg-muted text-muted-foreground';
  }
};

const News = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredNews = newsData.filter(news => {
    const matchesSearch = news.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         news.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || news.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const categories = ['all', '监管', '房地产', '稳定币', 'ETF', '商品', '市场'];

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="space-y-6">
        <div>
          <h1 className="financial-title mb-2">RWA快讯</h1>
          <p className="text-muted-foreground">实物资产代币化领域的最新动态与深度分析</p>
        </div>

        {/* Search and Filter */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
            <Input
              placeholder="搜索新闻..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-9"
            />
          </div>
          <Tabs value={selectedCategory} onValueChange={setSelectedCategory} className="w-full sm:w-auto">
            <TabsList className="grid grid-cols-4 sm:grid-cols-7 h-auto">
              {categories.map((category) => (
                <TabsTrigger key={category} value={category} className="text-xs px-2">
                  {category === 'all' ? '全部' : category}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>

        {/* Breaking News */}
        <div className="space-y-4">
          <h2 className="financial-subtitle flex items-center">
            <TrendingUp className="mr-2 h-5 w-5 text-destructive" />
            突发新闻
          </h2>
          <div className="grid gap-4">
            {filteredNews.filter(news => news.isBreaking).map((news) => (
              <Card key={news.id} className="border-l-4 border-l-destructive">
                <CardContent className="p-6">
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        <Badge className={getCategoryColor(news.category)}>
                          {news.category}
                        </Badge>
                        <Badge variant="destructive" className="animate-pulse">
                          突发
                        </Badge>
                      </div>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {news.readTime}
                      </div>
                    </div>
                    
                    <h3 className="financial-subtitle text-primary">
                      {news.title}
                    </h3>
                    
                    <p className="text-muted-foreground">
                      {news.description}
                    </p>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {news.date} {news.time}
                        </div>
                        <span>•</span>
                        <span>{news.source}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        阅读全文
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Regular News */}
        <div className="space-y-4">
          <h2 className="financial-subtitle">最新动态</h2>
          <div className="grid gap-6">
            {filteredNews.filter(news => !news.isBreaking).map((news) => (
              <Card key={news.id} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Badge className={getCategoryColor(news.category)}>
                        {news.category}
                      </Badge>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="w-4 h-4 mr-1" />
                        {news.readTime}
                      </div>
                    </div>
                    
                    <h3 className="financial-subtitle hover:text-primary transition-colors cursor-pointer">
                      {news.title}
                    </h3>
                    
                    <p className="text-muted-foreground leading-relaxed">
                      {news.description}
                    </p>
                    
                    <p className="text-sm leading-relaxed">
                      {news.content}
                    </p>
                    
                    <div className="flex flex-wrap gap-2">
                      {news.tags.map((tag, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {tag}
                        </Badge>
                      ))}
                    </div>
                    
                    <div className="flex items-center justify-between pt-4 border-t">
                      <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                        <div className="flex items-center">
                          <Calendar className="w-4 h-4 mr-1" />
                          {news.date} {news.time}
                        </div>
                        <span>•</span>
                        <span>{news.source}</span>
                      </div>
                      <Button variant="outline" size="sm">
                        分享
                        <ExternalLink className="ml-2 h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {filteredNews.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">没有找到匹配的新闻</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default News;