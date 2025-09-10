import React from 'react';
import { Link } from 'react-router-dom';
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { ChevronDown, MessageSquare, Newspaper, Coins, TrendingUp, MoreHorizontal } from 'lucide-react';
import { cn } from "@/lib/utils";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-highlight-bg backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">R</span>
            </div>
            <span className="financial-subtitle text-primary">RWA HK Insights</span>
          </Link>

          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-2">
              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/" 
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-background hover:text-accent-foreground focus:bg-background focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    首页
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <a 
                    href="https://asksurf.ai/chat" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-background hover:text-accent-foreground focus:bg-background focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    <MessageSquare className="mr-2 h-4 w-4" />
                    AI Chat
                  </a>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuLink asChild>
                  <Link 
                    to="/news" 
                    className="group inline-flex h-10 w-max items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-background hover:text-accent-foreground focus:bg-background focus:text-accent-foreground focus:outline-none disabled:pointer-events-none disabled:opacity-50"
                  >
                    <Newspaper className="mr-2 h-4 w-4" />
                    快讯
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-background">
                  <Coins className="mr-2 h-4 w-4" />
                  资产代币化
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[300px] gap-3 p-4">
                    <ListItem href="/tokenization/stablecoins" title="稳定币">
                      稳定币市场数据与分析
                    </ListItem>
                    <ListItem href="/tokenization/bonds" title="债券">
                      债券代币化项目追踪
                    </ListItem>
                    <ListItem href="/tokenization/funds" title="基金">
                      基金代币化产品概览
                    </ListItem>
                    <ListItem href="/tokenization/stocks" title="股票">
                      股票代币化市场动态
                    </ListItem>
                    <ListItem href="/tokenization/commodities" title="大宗商品">
                      商品代币化交易数据
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-background">
                  <TrendingUp className="mr-2 h-4 w-4" />
                  代币证券化
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[280px] gap-3 p-4">
                    <ListItem href="/securitization/etf" title="ETF">
                      交易所交易基金产品
                    </ListItem>
                    <ListItem href="/securitization/dats" title="DATs">
                      数字资产交易系统
                    </ListItem>
                    <ListItem href="/securitization/crypto-companies" title="Crypto业务上市公司">
                      加密货币相关公司分析
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="text-sm font-medium bg-transparent hover:bg-background">
                  <MoreHorizontal className="mr-2 h-4 w-4" />
                  更多
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid w-[250px] gap-3 p-4">
                    <ListItem href="/more/research" title="研报">
                      行业研究报告
                    </ListItem>
                    <ListItem href="/more/audit" title="合约审计">
                      智能合约安全审计
                    </ListItem>
                    <ListItem href="/more/technology" title="代币化技术">
                      技术解决方案与创新
                    </ListItem>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>
        </div>
      </div>
    </header>
  );
};

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string; href: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={href}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});

ListItem.displayName = "ListItem";

export default Header;