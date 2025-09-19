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
import { ChevronDown, MessageSquare, Newspaper, Coins, TrendingUp, Building2 } from 'lucide-react';
import { cn } from "@/lib/utils";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Header = () => {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-highlight-bg backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link to="/" className="flex items-center space-x-2">
            <div className="h-8 w-8 rounded-lg bg-primary flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">C</span>
            </div>
            <span className="financial-subtitle text-primary">Creda Insights</span>
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
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="group inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-background hover:text-accent-foreground focus:bg-background focus:text-accent-foreground">
                      <Building2 className="mr-2 h-4 w-4" />
                      香港专区
                      <ChevronDown className="ml-1 h-4 w-4 opacity-60" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="start" className="w-48 p-2 rounded-lg border shadow-md bg-background">
                    <DropdownMenuItem asChild>
                      <Link to="/hk/securitization" className="w-full cursor-pointer rounded-md px-2 py-2 font-semibold text-foreground bg-accent/40 hover:bg-accent hover:text-accent-foreground transition-colors">
                        证券代币化
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/hk/stablecoins" className="w-full cursor-pointer rounded-md px-2 py-2 font-semibold text-foreground bg-accent/40 hover:bg-accent hover:text-accent-foreground transition-colors">
                        稳定币
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/hk/real-assets" className="w-full cursor-pointer rounded-md px-2 py-2 text-muted-foreground opacity-70 hover:opacity-100 hover:text-accent-foreground hover:bg-accent transition-colors">
                        实物代币化
                      </Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="group inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-background hover:text-accent-foreground focus:bg-background focus:text-accent-foreground">
                      <Coins className="mr-2 h-4 w-4" />
                      资产代币化
                      <ChevronDown className="ml-1 h-4 w-4 opacity-60" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="start" className="w-48 p-2 rounded-lg border shadow-md bg-background">
                    <DropdownMenuItem asChild>
                      <Link to="/tokenization/stocks" className="w-full cursor-pointer rounded-md px-2 py-2 font-semibold text-foreground bg-accent/40 hover:bg-accent hover:text-accent-foreground transition-colors">股票</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tokenization/stablecoins" className="w-full cursor-pointer rounded-md px-2 py-2 text-muted-foreground opacity-70 hover:opacity-100 hover:text-accent-foreground hover:bg-accent transition-colors">稳定币</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tokenization/funds" className="w-full cursor-pointer rounded-md px-2 py-2 text-muted-foreground opacity-70 hover:opacity-100 hover:text-accent-foreground hover:bg-accent transition-colors">基金</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tokenization/bonds" className="w-full cursor-pointer rounded-md px-2 py-2 text-muted-foreground opacity-70 hover:opacity-100 hover:text-accent-foreground hover:bg-accent transition-colors">债券</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/tokenization/commodities" className="w-full cursor-pointer rounded-md px-2 py-2 text-muted-foreground opacity-70 hover:opacity-100 hover:text-accent-foreground hover:bg-accent transition-colors">大宗商品</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="group inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-background hover:text-accent-foreground focus:bg-background focus:text-accent-foreground">
                      <TrendingUp className="mr-2 h-4 w-4" />
                      代币证券化
                      <ChevronDown className="ml-1 h-4 w-4 opacity-60" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="start" className="w-48 p-2 rounded-lg border shadow-md bg-background">
                    <DropdownMenuItem asChild>
                      <Link to="/securitization/dats" className="w-full cursor-pointer rounded-md px-2 py-2 font-semibold text-foreground bg-accent/40 hover:bg-accent hover:text-accent-foreground transition-colors">DATs</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/securitization/etf" className="w-full cursor-pointer rounded-md px-2 py-2 text-muted-foreground opacity-70 hover:opacity-100 hover:text-accent-foreground hover:bg-accent transition-colors">ETF</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/securitization/crypto-companies" className="w-full cursor-pointer rounded-md px-2 py-2 text-muted-foreground opacity-70 hover:opacity-100 hover:text-accent-foreground hover:bg-accent transition-colors">Crypto上市公司</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="group inline-flex h-10 items-center justify-center rounded-md bg-transparent px-4 py-2 text-sm font-medium transition-colors hover:bg-background hover:text-accent-foreground focus:bg-background focus:text-accent-foreground">
                      更多
                      <ChevronDown className="ml-1 h-4 w-4 opacity-60" />
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="start" className="w-48 p-2 rounded-lg border shadow-md bg-background">
                    <DropdownMenuItem asChild>
                      <Link to="/more/research" className="w-full cursor-pointer rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">研报</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/more/audit" className="w-full cursor-pointer rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">合约审计</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link to="/more/technology" className="w-full cursor-pointer rounded-md px-2 py-2 hover:bg-accent hover:text-accent-foreground transition-colors">代币化技术</Link>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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