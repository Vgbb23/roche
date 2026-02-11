
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import { Product, Category } from '../types';
import { Filter, SlidersHorizontal, ChevronLeft } from 'lucide-react';
import { categoryDescriptions } from './Home';

const CategoryPage: React.FC = () => {
  const { categoryName } = useParams();
  const navigate = useNavigate();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [displayName, setDisplayName] = useState('');

  // Função auxiliar para normalização de acentos
  const normalize = (str: string) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  useEffect(() => {
    if (!categoryName) {
      setFilteredProducts(products);
      setDisplayName('TODOS OS PRODUTOS');
      return;
    }

    // Normaliza o nome da categoria vindo da URL (remove hífens e acentos)
    const rawTarget = categoryName.replace(/-/g, ' ');
    const normalizedTarget = normalize(rawTarget);
    
    let result: Product[] = [];
    let formattedName = rawTarget.toUpperCase();

    // 1. Lógica de mapeamento para itens específicos do menu de navegação
    if (normalizedTarget === 'kits') {
      result = products.filter(p => p.category === Category.KITS);
    } else if (normalizedTarget === 'serum' || normalizedTarget === 'seruns') {
      result = products.filter(p => 
        normalize(p.name).includes('serum') || 
        p.category === Category.HYALU_B5 || 
        p.category === Category.VITAMINA_C || 
        p.category === Category.MELA_B3
      );
    } else if (normalizedTarget.includes('anti idade')) {
      result = products.filter(p => 
        p.category === Category.RETINOL || 
        p.category === Category.HYALU_B5 || 
        p.category === Category.VITAMINA_C || 
        p.category === Category.MELA_B3
      );
    } else if (normalizedTarget.includes('cuidados diario')) {
      result = products.filter(p => p.category === Category.LIPIKAR || p.category === Category.CICAPLAST);
    } else if (normalizedTarget.includes('protetor solar')) {
      result = products.filter(p => p.category === Category.ANTHELIOS);
    } else if (normalizedTarget.includes('limpeza profunda')) {
      result = products.filter(p => p.category === Category.EFFACLAR);
    } 
    // 2. Filtro genérico por nome exato da linha (ex: Hyalu B5, Mela B3, etc)
    else {
      result = products.filter(p => normalize(p.category) === normalizedTarget);
      
      // Se não encontrar nada pela categoria, tenta buscar pelo nome do produto (para maior cobertura)
      if (result.length === 0) {
        result = products.filter(p => normalize(p.name).includes(normalizedTarget));
      }
    }

    setFilteredProducts(result);
    setDisplayName(formattedName);
    window.scrollTo(0, 0);
  }, [categoryName]);

  // Busca descrição normalizada para o cabeçalho
  const getCategoryDescription = () => {
    if (!categoryName) return '';
    const normName = normalize(categoryName.replace(/-/g, ' '));
    const key = Object.keys(categoryDescriptions).find(k => normalize(k) === normName);
    return key ? categoryDescriptions[key] : '';
  };

  const currentDescription = getCategoryDescription() || 
    `Conheça a gama completa de cuidados de ${displayName.toLowerCase()}, desenvolvida para oferecer máxima eficácia e tolerância dermatológica.`;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      {/* Navegação Superior */}
      <nav className="flex items-center mb-8">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-400 font-bold text-[10px] tracking-widest uppercase hover:text-[#005B94] transition-colors"
        >
          <ChevronLeft size={16} /> Voltar
        </button>
      </nav>

      <div className="mb-12">
        <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
          {displayName}
        </h1>
        <div className="h-1.5 w-16 md:w-24 bg-[#005B94] mb-6"></div>
        <p className="text-sm md:text-lg text-gray-600 max-w-3xl font-medium leading-relaxed">
          {currentDescription} Aproveite nossas <span className="text-[#005B94] font-black underline decoration-[#009EE3]">ofertas imperdíveis</span>.
        </p>
      </div>

      <div className="flex items-center justify-between border-y border-gray-100 py-4 md:py-6 mb-12 gap-4">
        <div className="flex items-center gap-4 md:gap-6">
          <button className="flex items-center gap-2 text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-widest group">
            <Filter size={16} className="text-[#009EE3] md:w-5 md:h-5" /> FILTRAR
          </button>
          <button className="flex items-center gap-2 text-[10px] md:text-sm font-black text-gray-900 uppercase tracking-widest group">
            <SlidersHorizontal size={16} className="text-[#009EE3] md:w-5 md:h-5" /> ORDENAR
          </button>
        </div>
        <div className="text-[10px] md:text-sm font-bold text-gray-400">
          {filteredProducts.length} itens
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12 animate-in fade-in duration-500">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <div className="min-h-[40vh] flex flex-col items-center justify-center bg-gray-50 rounded-sm text-center p-8">
          <p className="text-gray-400 font-bold mb-6 uppercase tracking-widest">Nenhum produto disponível nesta categoria no momento.</p>
          <button onClick={() => window.history.back()} className="bg-[#005B94] text-white px-8 py-3 font-black uppercase tracking-widest rounded-sm">
            Voltar
          </button>
        </div>
      )}

      <div className="mt-20 md:mt-24 p-8 md:p-12 bg-blue-50/20 rounded-sm">
         <h2 className="text-xl md:text-2xl font-black text-[#005B94] mb-6 uppercase tracking-wider">A CIÊNCIA POR TRÁS DE {displayName}</h2>
         <p className="text-xs md:text-sm text-gray-600 leading-relaxed font-medium mb-4">
            Cada formulação é testada rigorosamente nos Laboratórios Dermatológicos La Roche-Posay para garantir que até as peles mais reativas possam se beneficiar 
            de ingredientes ativos potentes. Nossa missão é mudar a vida da pele sensível através da inovação científica.
         </p>
      </div>
    </div>
  );
};

export default CategoryPage;
