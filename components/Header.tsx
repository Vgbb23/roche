
import React, { useState } from 'react';
import { ShoppingBag, Search, Menu, X, User } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { Link, useNavigate } from 'react-router-dom';

interface HeaderProps {
  onCartOpen: () => void;
}

const Header: React.FC<HeaderProps> = ({ onCartOpen }) => {
  const { totalItems } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const navItems = [
    { label: 'INÍCIO', path: '/' },
    { label: 'KITS', path: '/category/Kits' },
    { label: 'SÉRUM', path: '/category/Sérum' },
    { label: 'ANTI IDADE', path: '/category/Anti-Idade' },
    { label: 'CUIDADOS DIÁRIO', path: '/category/Cuidados-Diário' },
    { label: 'PROTETOR SOLAR', path: '/category/Protetor-Solar' },
    { label: 'LIMPEZA PROFUNDA', path: '/category/Limpeza-Profunda' },
  ];

  const handleSearch = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery('');
      setIsSearchOpen(false);
      setIsMenuOpen(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <header className="w-full bg-white z-50 sticky top-0 border-b border-gray-100">
      {/* 1. Barra de Anúncio Premium */}
      <div className="bg-[#005B94] text-white text-center py-2.5 text-[9px] md:text-[11px] font-black tracking-[0.18em] uppercase border-b border-white/10">
        Frete Grátis e Entrega Prioritária em Todo o Brasil
      </div>

      {/* 2. Barra Principal */}
      <div className="max-w-[1440px] mx-auto px-4 lg:px-12 flex items-center justify-between h-14 md:h-20 lg:h-24 transition-all duration-300 relative">
        
        {/* Lado Esquerdo (Mobile): Menu + Busca */}
        <div className="flex items-center gap-4 lg:hidden">
          <button onClick={() => setIsMenuOpen(true)} className="text-gray-900 active:scale-95 transition-transform">
            <Menu size={22} strokeWidth={1.8} />
          </button>
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="text-gray-900 active:scale-95 transition-transform">
            <Search size={20} strokeWidth={1.8} />
          </button>
        </div>

        {/* Campo de Busca (Desktop) */}
        <div className="hidden lg:flex flex-1 max-w-[320px]">
          <form onSubmit={handleSearch} className="relative w-full group">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você está buscando hoje?"
              className="w-full pl-6 pr-12 py-2.5 bg-white border border-gray-200 rounded-full text-sm font-light text-gray-500 focus:outline-none focus:border-[#009EE3] transition-colors"
            />
            <button type="submit" className="absolute right-4 top-1/2 -translate-y-1/2 text-black hover:text-[#009EE3] transition-colors">
              <Search size={20} strokeWidth={2} />
            </button>
          </form>
        </div>

        {/* Logo Centralizado (Absoluto para garantir centralização perfeita) */}
        <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 flex flex-col items-center cursor-pointer group" onClick={() => navigate('/')}>
          <div className="relative">
            <div className="absolute left-[54px] top-[-8px] w-5 h-7 bg-[#60A5FA] z-0 hidden md:block opacity-90"></div>
            <div className="absolute left-[38px] top-[-4px] w-3 h-4 bg-[#60A5FA] z-0 md:hidden opacity-90"></div>
            
            <div className="relative z-10 text-center">
              <span className="block text-[14px] md:text-xl lg:text-[24px] font-bold tracking-tight text-black leading-none uppercase font-sans">
                LA ROCHE POSAY
              </span>
              <span className="block text-[5px] md:text-[7px] lg:text-[8px] font-medium tracking-[0.2em] text-black leading-none uppercase mt-0.5 opacity-80">
                LABORATOIRE DERMATOLOGIQUE
              </span>
            </div>
          </div>
        </div>

        {/* Lado Direito */}
        <div className="flex items-center justify-end flex-1 gap-4 lg:gap-8">
          <button className="hidden lg:block text-gray-900 hover:text-[#009EE3] transition-colors">
            <User size={28} strokeWidth={1.2} />
          </button>
          
          <div className="hidden lg:block h-8 w-px bg-gray-200"></div>

          <button onClick={onCartOpen} className="relative text-gray-900 hover:text-[#009EE3] transition-colors active:scale-95 transition-transform">
            <ShoppingBag className="w-[22px] h-[22px] md:w-[28px] md:h-[28px]" strokeWidth={1.8} />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-black text-white font-black flex items-center justify-center rounded-full text-[8px] w-3.5 h-3.5 border border-white">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Busca Mobile Dropdown */}
      {isSearchOpen && (
        <div className="lg:hidden absolute top-full left-0 w-full bg-white p-4 border-b border-gray-100 shadow-lg animate-in fade-in slide-in-from-top-2 z-50">
          <form onSubmit={handleSearch} className="relative">
            <input
              autoFocus
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="O que você busca?"
              className="w-full p-3 bg-gray-50 border-none rounded-sm text-sm focus:ring-1 focus:ring-[#009EE3] outline-none"
            />
            <button type="submit" className="absolute right-3 top-3 text-gray-400">
              <Search size={18} />
            </button>
          </form>
        </div>
      )}

      {/* Menu Inferior (Desktop) */}
      <nav className="hidden lg:flex justify-center py-3 bg-white border-t border-gray-50">
        <ul className="flex items-center gap-10">
          {navItems.map((item) => (
            <li key={item.label}>
              <Link
                to={item.path}
                className="text-[12px] font-bold text-gray-900 hover:text-[#009EE3] transition-colors tracking-tighter uppercase"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      {/* Mobile Drawer (Sidebar) */}
      <div className={`lg:hidden fixed inset-0 z-[100] transition-opacity duration-300 ${isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}>
        <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setIsMenuOpen(false)} />
        <div className={`absolute left-0 top-0 h-full w-[80%] bg-white shadow-2xl transition-transform duration-300 ease-out transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          <div className="flex flex-col h-full overflow-y-auto">
            <div className="p-5 flex justify-between items-center border-b border-gray-50">
               <span className="text-[10px] font-black tracking-widest text-[#005B94] uppercase">Menu</span>
               <button onClick={() => setIsMenuOpen(false)} className="text-gray-900 p-1">
                 <X size={24} strokeWidth={1.5} />
               </button>
            </div>
            
            <nav className="flex flex-col">
              {navItems.map((item) => (
                <Link
                  key={item.label}
                  to={item.path}
                  onClick={() => setIsMenuOpen(false)}
                  className="px-6 py-4 border-b border-gray-100 text-[16px] font-black text-[#1A1C1E] uppercase tracking-tighter leading-none hover:bg-gray-50 transition-colors"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-auto p-6 bg-gray-50/50 space-y-6">
              <button className="flex items-center gap-4 text-gray-900 font-black uppercase text-sm tracking-tight">
                <User size={20} /> MINHA CONTA
              </button>
              <div className="bg-white p-4 border border-gray-100 rounded-sm">
                <p className="text-[10px] font-black text-[#005B94] uppercase tracking-widest mb-1">Central de Atendimento:</p>
                <p className="text-sm font-black text-gray-900">0800-701-1552</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
