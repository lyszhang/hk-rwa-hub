import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, Clock, TrendingUp } from 'lucide-react';
import { Link } from 'react-router-dom';

const newsData = [
  {
    id: 1,
    title: "金管局宣布代币化证券新框架",
    description: "香港金融管理局发布了金融机构处理代币化证券和RWA的全新指导方针。",
    date: "2024年4月18日",
    source: "香港金融时报",
    category: "监管",
    readTime: "3分钟",
    isBreaking: true
  },
  {
    id: 2,
    title: "主要地产开发商推出代币化房产基金",
    description: "香港领先开发商宣布推出5亿美元代币化房地产基金，瞄准中环商业地产。",
    date: "2024年4月16日",
    source: "地产内参港",
    category: "房地产",
    readTime: "4分钟",
    isBreaking: false
  },
  {
    id: 3,
    title: "港元支持稳定币获监管批准",
    description: "新的港元支持稳定币获得监管机构批准，为代币化支付铺平道路。",
    date: "2024年4月15日",
    source: "区块链今日",
    category: "稳定币",
    readTime: "2分钟",
    isBreaking: false
  },
  {
    id: 4,
    title: "亚洲首支代币化债券ETF上市",
    description: "开创性的代币化政府债券ETF在香港交易所成功上市交易。",
    date: "2024年4月14日",
    source: "投资周刊",
    category: "ETF",
    readTime: "5分钟",
    isBreaking: false
  },
  {
    id: 5,
    title: "大宗商品代币化平台获得许可",
    description: "新平台将允许黄金、白银和其他贵金属的分数所有权交易。",
    date: "2024年4月13日",
    source: "商品交易报",
    category: "商品",
    readTime: "3分钟",
    isBreaking: false
  },
  {
    id: 6,
    title: "机构投资者RWA采用率创新高",
    description: "最新报告显示，香港机构投资者对RWA的采用率达到历史新高。",
    date: "2024年4月12日",
    source: "机构投资者",
    category: "市场",
    readTime: "4分钟",
    isBreaking: false
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

const LatestNews = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="financial-subtitle">最新动态</h2>
        <Button variant="outline" size="sm" asChild>
          <Link to="/news">
            查看全部
            <ExternalLink className="ml-2 h-4 w-4" />
          </Link>
        </Button>
      </div>

      <div className="space-y-3">
        {newsData.map((news) => (
          <Card key={news.id} className="hover:shadow-md transition-shadow cursor-pointer">
            <CardContent className="p-4">
              <div className="space-y-2">
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-2">
                    <Badge className={getCategoryColor(news.category)}>
                      {news.category}
                    </Badge>
                    {news.isBreaking && (
                      <Badge variant="destructive" className="animate-pulse">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        突发
                      </Badge>
                    )}
                  </div>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="w-3 h-3 mr-1" />
                    {news.readTime}
                  </div>
                </div>
                
                <h3 className="font-semibold text-sm leading-tight hover:text-primary transition-colors">
                  {news.title}
                </h3>
                
                <p className="text-xs text-muted-foreground leading-relaxed">
                  {news.description}
                </p>
                
                <div className="flex items-center justify-between pt-2 border-t border-border">
                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <span>{news.date}</span>
                    <span>•</span>
                    <span>{news.source}</span>
                  </div>
                  <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
                    阅读更多
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Quick Stats */}
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-sm">今日快览</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">新增代币化项目</span>
            <span className="font-semibold text-primary">+3</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">交易量增长</span>
            <span className="font-semibold text-success">+15.2%</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">市场参与者</span>
            <span className="font-semibold">156</span>
          </div>
          <div className="flex justify-between items-center text-sm">
            <span className="text-muted-foreground">活跃合约</span>
            <span className="font-semibold">89</span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default LatestNews;