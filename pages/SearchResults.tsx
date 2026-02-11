
import React, { useMemo } from 'react';
import { useParams, Link } from 'react-router-dom';
import { products } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import { Search, ChevronLeft } from 'lucide-react';

const SearchResults: React.FC = () => {
  const { query } = useParams();
  
  // Função auxiliar para remover acentos e converter para minúsculas
  const normalize = (str: string) => 
    str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();

  const searchTermRaw = query ? decodeURIComponent(query) : '';
  const searchTermNormalized = normalize(searchTermRaw);

  const filteredProducts = useMemo(() => {
    if (!searchTermNormalized) return [];
    return products.filter(product => {
      const name = normalize(product.name);
      const category = normalize(product.category);
      const description = normalize(product.description);
      
      return (
        name.includes(searchTermNormalized) ||
        category.includes(searchTermNormalized) ||
        description.includes(searchTermNormalized)
      );
    });
  }, [searchTermNormalized]);

  return (
    <div className="min-h-screen bg-white pb-20">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-10 md:py-16">
        
        {/* Breadcrumb / Back button */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center gap-2 text-gray-400 font-bold text-[10px] tracking-widest uppercase hover:text-[#005B94] transition-colors"
          >
            <ChevronLeft size={16} /> Voltar para o Início
          </Link>
        </div>

        {/* Cabeçalho da Busca */}
        <div className="mb-12">
          <h1 className="text-3xl md:text-5xl font-black text-gray-900 mb-4 uppercase tracking-tighter">
            Resultados para: <span className="text-[#009EE3]">"{searchTermRaw}"</span>
          </h1>
          <div className="h-1.5 w-16 md:w-24 bg-[#005B94] mb-6"></div>
          <p className="text-sm md:text-lg text-gray-500 font-medium">
            Encontramos <span className="text-black font-black">{filteredProducts.length}</span> {filteredProducts.length === 1 ? 'resultado' : 'resultados'} para sua pesquisa.
          </p>
        </div>

        {/* Grade de Produtos */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-4 md:gap-x-8 gap-y-10 md:gap-y-12 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {filteredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20 px-4 bg-gray-50 rounded-sm text-center">
            <div className="w-20 h-20 bg-white shadow-sm rounded-full flex items-center justify-center mb-6 text-gray-200">
               <Search size={40} />
            </div>
            <h2 className="text-xl font-black text-gray-900 uppercase tracking-tight mb-3">Nenhum produto encontrado</h2>
            <p className="text-gray-500 text-sm max-w-md mb-8">
              Infelizmente não encontramos resultados para "{searchTermRaw}". <br/>
              Tente verificar a ortografia ou use termos mais genéricos.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                to="/"
                className="bg-[#005B94] text-white px-8 py-4 font-black uppercase tracking-widest text-[11px] hover:bg-[#009EE3] transition-all rounded-sm shadow-md"
              >
                Ver Melhores Ofertas
              </Link>
              <Link
                to="/category/Kits"
                className="bg-white border-2 border-gray-100 text-gray-900 px-8 py-4 font-black uppercase tracking-widest text-[11px] hover:border-[#009EE3] hover:text-[#009EE3] transition-all rounded-sm"
              >
                Explorar Kits
              </Link>
            </div>
          </div>
        )}

        {/* Sugestões de Categorias */}
        {filteredProducts.length === 0 && (
          <div className="mt-20">
            <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-6 text-center">Ou busque por categoria</h3>
            <div className="flex flex-wrap justify-center gap-3">
              {['Anthelios', 'Effaclar', 'Hyalu B5', 'Cicaplast', 'Vitamina C'].map(cat => (
                <Link
                  key={cat}
                  to={`/category/${cat.replace(' ', '-')}`}
                  className="px-6 py-2.5 bg-white border border-gray-100 rounded-full text-[10px] font-black uppercase tracking-widest hover:border-[#009EE3] hover:text-[#009EE3] transition-all"
                >
                  {cat}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchResults;
