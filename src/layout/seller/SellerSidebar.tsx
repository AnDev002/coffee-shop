// src/layout/seller/SellerSidebar.tsx
'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams, useRouter } from 'next/navigation'; // Thêm useRouter
import { 
  FiHome, FiBox, FiShoppingBag, 
  FiChevronDown, FiLogOut, FiTruck, FiClipboard 
} from 'react-icons/fi';
import classNames from 'classnames';

interface MenuItem {
  id: string;
  label: string;
  icon?: React.ReactNode;
  path?: string;
  children?: MenuItem[];
}

const SELLER_MENU: MenuItem[] = [
  {
    id: 'dashboard',
    label: 'Tổng quan',
    icon: <FiHome size={20} />,
    path: '/seller-dashboard',
  },
  {
    id: 'orders',
    label: 'Quản lý đơn hàng',
    icon: <FiShoppingBag size={20} />,
    children: [
      { id: 'all_orders', label: 'Tất cả', path: '/seller-dashboard/orders?tab=all' },
      { id: 'bulk_delivery', label: 'Giao hàng loạt', path: '/seller-dashboard/orders?tab=bulk-delivery' },
      { id: 'handover', label: 'Bàn giao đơn hàng', path: '/seller-dashboard/orders?tab=handover' },
      { id: 'return_orders', label: 'Đơn Trả hàng / Hoàn tiền', path: '/seller-dashboard/orders?tab=return' },
    ]
  },
  {
    id: 'shipping_settings',
    label: 'Cài đặt vận chuyển',
    icon: <FiTruck size={20} />,
    path: '/seller-dashboard/shipping/settings',
  },
  {
    id: 'products',
    label: 'Quản lý sản phẩm',
    icon: <FiBox size={20} />,
    children: [
      { id: 'all_products', label: 'Tất cả sản phẩm', path: '/seller-dashboard/products/all' },
      { id: 'add_product', label: 'Thêm sản phẩm', path: '/seller-dashboard/products/new' },
    ]
  },
  {
    id: 'marketing',
    label: 'Kênh Marketing',
    icon: <FiClipboard size={20} />,
    path: '/seller-dashboard/marketing',
  },
];

const SidebarItem = ({ item, level = 0, isOpen, toggleOpen }: { 
  item: MenuItem, level?: number, isOpen: (id: string) => boolean, toggleOpen: (id: string) => void
}) => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const hasChildren = item.children && item.children.length > 0;
  
  // Hàm kiểm tra Active (giữ nguyên logic của bạn)
  const checkActive = (menuItemPath?: string) => {
    if (!menuItemPath) return false;
    const [pathBase, queryString] = menuItemPath.split('?');
    if (pathBase !== pathname) return false;
    if (queryString) {
      const currentTab = searchParams.get('tab');
      const itemTab = new URLSearchParams(queryString).get('tab');
      return currentTab === itemTab;
    }
    return true;
  };

  const isSelfActive = checkActive(item.path);
  const isChildActive = item.children?.some(child => checkActive(child.path));
  const isActive = isSelfActive || isChildActive;
  
  useEffect(() => {
    if (isChildActive && !isOpen(item.id)) {
      toggleOpen(item.id);
    }
  }, [pathname, searchParams, isChildActive, item.id, isOpen, toggleOpen]);

  const handleClick = (e: React.MouseEvent) => {
    if (hasChildren) {
      e.preventDefault();
      toggleOpen(item.id);
      return;
    }

    // LOGIC MỚI: Xử lý chuyển tab Single Page
    if (item.path) {
      const [pathBase] = item.path.split('?');
      
      // Nếu đang ở cùng trang (ví dụ /seller-dashboard/orders), chỉ thay đổi query param
      if (pathBase === pathname) {
        e.preventDefault(); // Chặn hành vi load trang của Link
        router.push(item.path, { scroll: false }); // Chỉ đẩy URL mới vào history
      }
      // Nếu khác trang, để Link hoạt động bình thường
    }
  };

  return (
    <div className="w-full select-none">
      <Link 
        href={item.path || '#'}
        onClick={handleClick}
        className={classNames(
          "flex items-center justify-between py-3.5 px-6 text-sm transition-all duration-200 cursor-pointer group hover:bg-gray-50",
          {
            "text-[#E78720] bg-orange-50/80 font-semibold border-r-[3px] border-[#E78720]": isActive && level === 0,
            "text-gray-600": !isActive && level === 0,
            "pl-12 py-3": level === 1,
            "text-[#E78720] font-medium": isSelfActive && level > 0,
            "text-gray-500 hover:text-[#E78720]": !isSelfActive && level > 0,
          }
        )}
      >
        <div className="flex items-center gap-3.5">
          {level === 0 && <span className={isActive ? "text-[#E78720]" : "text-gray-400 group-hover:text-[#E78720]"}>{item.icon}</span>}
          <span className="truncate">{item.label}</span>
        </div>
        {hasChildren && <FiChevronDown size={16} className={classNames("text-gray-400 transition-transform", isOpen(item.id) ? "rotate-180" : "")} />}
      </Link>
      <div className={classNames("overflow-hidden transition-all duration-300 bg-gray-50/30", isOpen(item.id) ? "max-h-[500px] opacity-100" : "max-h-0 opacity-0")}>
        {item.children?.map(child => <SidebarItem key={child.id} item={child} level={level + 1} isOpen={isOpen} toggleOpen={toggleOpen} />)}
      </div>
    </div>
  );
};

const SellerSidebar = () => {
  const [openItems, setOpenItems] = useState<Record<string, boolean>>({ 'orders': true });
  
  const toggleOpen = (id: string) => {
    setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <aside className="fixed top-0 left-0 w-[260px] h-screen bg-white border-r border-gray-200 shadow-sm z-50 flex flex-col">
      <div className="h-[80px] flex items-center px-6 border-b border-gray-100 gap-3">
        <div className="w-9 h-9 bg-gradient-to-br from-[#E78720] to-[#FFB05C] rounded-lg flex items-center justify-center text-white font-bold shadow-md shadow-orange-200">S</div>
        <div>
            <h1 className="font-bold text-lg text-gray-800 leading-none">Seller Hub</h1>
            <span className="text-[10px] text-gray-400 font-medium tracking-wide">QUẢN LÝ CỬA HÀNG</span>
        </div>
      </div>
      <div className="flex-1 overflow-y-auto custom-scrollbar py-4 space-y-1">
        {SELLER_MENU.map(item => <SidebarItem key={item.id} item={item} isOpen={(id) => !!openItems[id]} toggleOpen={toggleOpen} />)}
      </div>
      <div className="p-4 border-t border-gray-100 bg-gray-50/50">
        <button className="flex items-center gap-3 w-full px-4 py-2.5 text-sm text-gray-600 hover:text-red-500 hover:bg-red-50 rounded-lg transition-colors">
            <FiLogOut size={18} /> <span>Đăng xuất</span>
        </button>
      </div>
    </aside>
  );
};

export default React.memo(SellerSidebar);