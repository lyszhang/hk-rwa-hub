import React from 'react';
import Header from '@/components/layout/Header';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Calendar, 
  Building2, 
  Clock, 
  CheckCircle, 
  AlertCircle, 
  ExternalLink,
  TrendingUp,
  Users,
  DollarSign,
  Globe,
  FileText,
  Target
} from 'lucide-react';

const Stablecoins = () => {
  // 稳定币落地时间线数据
  const timelineData = [
    {
      date: "2024年12月",
      title: "稳定币监管框架正式生效",
      description: "香港金管局发布《稳定币发行人监管制度》，正式建立稳定币监管框架",
      status: "completed",
      details: [
        "建立稳定币发行人监管制度",
        "明确稳定币发行、保管、赎回等要求",
        "设立过渡期安排"
      ]
    },
    {
      date: "2024年10月",
      title: "稳定币监管制度咨询总结",
      description: "金管局发布稳定币监管制度咨询总结，确定最终监管框架",
      status: "completed",
      details: [
        "完成公众咨询",
        "确定监管要求",
        "制定实施时间表"
      ]
    },
    {
      date: "2024年6月",
      title: "稳定币监管制度咨询文件",
      description: "金管局发布《稳定币发行人监管制度》咨询文件",
      status: "completed",
      details: [
        "启动公众咨询",
        "收集业界意见",
        "完善监管框架"
      ]
    },
    {
      date: "2024年Q2",
      title: "首批稳定币牌照申请",
      description: "预计首批稳定币发行人开始提交牌照申请",
      status: "pending",
      details: [
        "企业准备申请材料",
        "提交牌照申请",
        "金管局审核流程"
      ]
    },
    {
      date: "2024年Q3",
      title: "首批稳定币牌照获批",
      description: "预计首批稳定币发行人获得牌照",
      status: "pending",
      details: [
        "完成审核流程",
        "颁发首批牌照",
        "启动稳定币发行"
      ]
    },
    {
      date: "2024年Q4",
      title: "稳定币正式落地",
      description: "香港稳定币正式进入市场流通",
      status: "pending",
      details: [
        "稳定币开始交易",
        "建立市场流动性",
        "用户开始使用"
      ]
    }
  ];

  // 香港稳定币牌照申请企业数据
  const applicantData = [
    {
      id: 1,
      name: "京东科技",
      logo: "🔴",
      description: "京东集团旗下金融科技公司，计划发行港元稳定币",
      status: "preparing",
      established: "2013年",
      headquarters: "北京",
      hkPresence: "已设立香港子公司",
      applicationStatus: "积极准备",
      expectedLaunch: "2024年Q3",
      businessType: "金融科技",
      keyProducts: ["京东支付", "京东白条", "京东金融"],
      website: "https://www.jd.com"
    },
    {
      id: 2,
      name: "蚂蚁集团",
      logo: "🔵",
      description: "支付宝母公司，全球领先的数字支付平台",
      status: "preparing",
      established: "2014年",
      headquarters: "杭州",
      hkPresence: "已设立香港办公室",
      applicationStatus: "准备申请",
      expectedLaunch: "2024年Q4",
      businessType: "数字支付",
      keyProducts: ["支付宝", "蚂蚁链", "余额宝"],
      website: "https://www.antgroup.com"
    },
    {
      id: 3,
      name: "渣打银行",
      logo: "🟢",
      description: "英国跨国银行，香港三大发钞行之一",
      status: "preparing",
      established: "1853年",
      headquarters: "伦敦",
      hkPresence: "香港主要银行",
      applicationStatus: "积极准备",
      expectedLaunch: "2024年Q3",
      businessType: "传统银行",
      keyProducts: ["渣打银行", "SC Ventures", "数字银行"],
      website: "https://www.sc.com"
    },
    {
      id: 4,
      name: "中银香港",
      logo: "🟡",
      description: "中国银行香港分行，香港三大发钞行之一",
      status: "preparing",
      established: "1917年",
      headquarters: "香港",
      hkPresence: "香港本土银行",
      applicationStatus: "准备申请",
      expectedLaunch: "2024年Q2",
      businessType: "传统银行",
      keyProducts: ["中银香港", "BOC Pay", "数字银行"],
      website: "https://www.bochk.com"
    },
    {
      id: 5,
      name: "汇丰银行",
      logo: "🔴",
      description: "香港三大发钞行之一，全球领先的金融服务集团",
      status: "evaluating",
      established: "1865年",
      headquarters: "伦敦",
      hkPresence: "香港主要银行",
      applicationStatus: "评估中",
      expectedLaunch: "2024年Q4",
      businessType: "传统银行",
      keyProducts: ["汇丰银行", "HSBC PayMe", "数字银行"],
      website: "https://www.hsbc.com.hk"
    },
    {
      id: 6,
      name: "恒生银行",
      logo: "🟣",
      description: "汇丰集团成员，香港主要银行之一",
      status: "evaluating",
      established: "1933年",
      headquarters: "香港",
      hkPresence: "香港本土银行",
      applicationStatus: "评估中",
      expectedLaunch: "2025年Q1",
      businessType: "传统银行",
      keyProducts: ["恒生银行", "恒生Pay", "数字银行"],
      website: "https://www.hangseng.com"
    },
    {
      id: 7,
      name: "众安银行",
      logo: "🟠",
      description: "香港首家虚拟银行，众安保险旗下",
      status: "preparing",
      established: "2019年",
      headquarters: "香港",
      hkPresence: "香港虚拟银行",
      applicationStatus: "积极准备",
      expectedLaunch: "2024年Q3",
      businessType: "虚拟银行",
      keyProducts: ["众安银行", "ZA Pay", "数字银行"],
      website: "https://www.za.group"
    },
    {
      id: 8,
      name: "Livi Bank",
      logo: "🟢",
      description: "中银香港、京东数科、怡和集团合资的虚拟银行",
      status: "preparing",
      established: "2019年",
      headquarters: "香港",
      hkPresence: "香港虚拟银行",
      applicationStatus: "准备申请",
      expectedLaunch: "2024年Q4",
      businessType: "虚拟银行",
      keyProducts: ["Livi Bank", "Livi Pay", "数字银行"],
      website: "https://www.livibank.com"
    }
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case 'pending':
        return <Clock className="w-5 h-5 text-blue-600" />;
      case 'preparing':
        return <AlertCircle className="w-5 h-5 text-yellow-600" />;
      case 'evaluating':
        return <Target className="w-5 h-5 text-purple-600" />;
      default:
        return <Clock className="w-5 h-5 text-gray-600" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-green-100 text-green-800">已完成</Badge>;
      case 'pending':
        return <Badge className="bg-blue-100 text-blue-800">进行中</Badge>;
      case 'preparing':
        return <Badge className="bg-yellow-100 text-yellow-800">准备中</Badge>;
      case 'evaluating':
        return <Badge className="bg-purple-100 text-purple-800">评估中</Badge>;
      default:
        return <Badge variant="secondary">未知</Badge>;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* 页面标题 */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">香港稳定币发展</h1>
          <p className="text-gray-600">
            香港稳定币监管框架与主要申请企业信息
          </p>
        </div>

        <Tabs defaultValue="timeline" className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="timeline">落地时间线</TabsTrigger>
            <TabsTrigger value="applicants">申请企业</TabsTrigger>
          </TabsList>

          {/* 稳定币落地时间线 */}
          <TabsContent value="timeline" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Calendar className="w-5 h-5" />
                  <span>稳定币落地时间线</span>
                </CardTitle>
                <CardDescription>
                  香港稳定币监管框架的建立和稳定币落地的关键时间节点
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {timelineData.map((item, index) => (
                    <div key={index} className="relative">
                      {/* 时间线连接线 */}
                      {index < timelineData.length - 1 && (
                        <div className="absolute left-6 top-12 w-0.5 h-16 bg-gray-200"></div>
                      )}
                      
                      <div className="flex items-start space-x-4">
                        {/* 状态图标 */}
                        <div className="flex-shrink-0 w-12 h-12 bg-white rounded-full border-2 border-gray-200 flex items-center justify-center">
                          {getStatusIcon(item.status)}
                        </div>
                        
                        {/* 内容 */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center space-x-3 mb-2">
                            <h3 className="text-lg font-semibold text-gray-900">{item.title}</h3>
                            {getStatusBadge(item.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{item.date}</p>
                          <p className="text-gray-700 mb-3">{item.description}</p>
                          
                          {/* 详细信息 */}
                          <div className="bg-gray-50 rounded-lg p-3">
                            <h4 className="text-sm font-medium text-gray-900 mb-2">关键要点：</h4>
                            <ul className="space-y-1">
                              {item.details.map((detail, detailIndex) => (
                                <li key={detailIndex} className="text-sm text-gray-600 flex items-center space-x-2">
                                  <div className="w-1.5 h-1.5 bg-gray-400 rounded-full"></div>
                                  <span>{detail}</span>
                                </li>
                              ))}
                            </ul>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* 香港稳定币牌照申请企业 */}
          <TabsContent value="applicants" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2">
                  <Building2 className="w-5 h-5" />
                  <span>香港稳定币牌照申请企业</span>
                </CardTitle>
                <CardDescription>
                  计划在香港申请稳定币牌照的主要企业信息
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {applicantData.map((applicant) => (
                    <div key={applicant.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50 transition-colors">
                      <div className="flex items-center space-x-4">
                        <div className="text-2xl">{applicant.logo}</div>
                        <div className="flex-1">
                          <div className="flex items-center space-x-3 mb-1">
                            <h3 className="text-lg font-semibold text-gray-900">{applicant.name}</h3>
                            {getStatusBadge(applicant.status)}
                          </div>
                          <p className="text-sm text-gray-600 mb-2">{applicant.description}</p>
                          <div className="flex items-center space-x-6 text-sm text-gray-500">
                            <div className="flex items-center space-x-1">
                              <Calendar className="w-4 h-4" />
                              <span>{applicant.established}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Globe className="w-4 h-4" />
                              <span>{applicant.headquarters}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <Building2 className="w-4 h-4" />
                              <span>{applicant.businessType}</span>
                            </div>
                            <div className="flex items-center space-x-1">
                              <TrendingUp className="w-4 h-4" />
                              <span>预计上线: {applicant.expectedLaunch}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-right mr-4">
                          <p className="text-sm font-medium text-gray-900">{applicant.applicationStatus}</p>
                          <p className="text-xs text-gray-500">{applicant.hkPresence}</p>
                        </div>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => window.open(applicant.website, '_blank')}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
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

export default Stablecoins;
