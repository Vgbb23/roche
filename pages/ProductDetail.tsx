
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { products } from '../data/mockProducts';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Truck, ShieldCheck, Minus, Plus, ChevronLeft, Microscope, FlaskConical, Droplets, Share2 } from 'lucide-react';

const ProductDetail: React.FC = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<'details' | 'usage' | 'ingredients'>('details');

  useEffect(() => {
    const found = products.find((p) => p.id === id);
    if (found) {
      setProduct(found);
    }
    window.scrollTo(0, 0);
  }, [id]);

  if (!product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center">
        <Microscope size={48} className="text-[#009EE3] mb-4" />
        <h2 className="text-2xl font-black text-gray-900 mb-4 uppercase">Produto não encontrado</h2>
        <button onClick={() => navigate('/')} className="text-[#005B94] font-bold border-b-2 border-[#009EE3]">
          Voltar para a home
        </button>
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) addToCart(product);
    setQuantity(1);
  };

  return (
    <div className="bg-white min-h-screen">
      <div className="max-w-7xl mx-auto px-4 lg:px-12 py-4 md:py-10">
        {/* Navegação Superior */}
        <nav className="flex items-center justify-between mb-6 md:mb-8">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 text-gray-400 font-bold text-[10px] tracking-widest uppercase hover:text-[#005B94] transition-colors"
          >
            <ChevronLeft size={16} /> Voltar
          </button>
          <div className="flex gap-4">
            <button className="text-gray-400 hover:text-[#009EE3]">
              <Share2 size={18} />
            </button>
          </div>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-20 items-start">
          {/* Lado Esquerdo: Imagem */}
          <div className="lg:sticky lg:top-32 order-1">
            <div className="aspect-square bg-[#F9F9F9] rounded-sm overflow-hidden flex items-center justify-center p-8 md:p-16 border border-gray-50">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-full object-contain mix-blend-multiply transition-transform duration-500 hover:scale-105"
              />
            </div>
          </div>

          {/* Lado Direito: Informações */}
          <div className="flex flex-col order-2">
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-2">
                 <span className="text-[#009EE3] text-[10px] font-black tracking-[0.2em] uppercase">{product.category}</span>
                 <span className="w-1 h-1 bg-gray-200 rounded-full"></span>
                 <span className="text-gray-400 text-[10px] font-bold uppercase tracking-wider">{product.brand}</span>
              </div>
              
              <h1 className="text-[22px] md:text-[32px] font-black text-black leading-[1.15] mb-2 uppercase tracking-tight">
                 {product.name}
              </h1>

              {/* Funcionalidade em destaque */}
              <p className="text-gray-500 text-xs md:text-sm font-bold uppercase tracking-widest mb-6">
                {product.functionality}
              </p>

              {/* Preço */}
              <div className="flex flex-col mb-6">
                <div className="flex items-center gap-3">
                  <span className="text-gray-300 line-through text-sm font-bold">
                    R$ {product.originalPrice.toFixed(2).replace('.', ',')}
                  </span>
                  <span className="text-[#009EE3] text-[9px] font-black uppercase tracking-widest border border-[#009EE3]/20 px-2 py-0.5 rounded-sm">
                    50% OFF
                  </span>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl md:text-4xl font-black text-[#005B94] tracking-tighter">
                    R$ {product.discountedPrice.toFixed(2).replace('.', ',')}
                  </span>
                </div>
                <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                  Ou 10x de R$ {(product.discountedPrice/10).toFixed(2).replace('.', ',')} sem juros
                </p>
              </div>

              <p className="text-sm md:text-base text-gray-600 font-medium leading-relaxed mb-8 border-l-2 border-gray-100 pl-4">
                 {product.description}
              </p>
            </div>

            <div className="flex flex-col gap-4 mb-8">
              <div className="flex flex-row gap-3">
                <div className="flex items-center bg-gray-50 border border-gray-100 h-14 w-32 rounded-sm overflow-hidden">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="flex-1 h-full flex items-center justify-center hover:bg-gray-200 transition text-gray-400 hover:text-black"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-8 text-center font-black text-sm">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => q + 1)}
                    className="flex-1 h-full flex items-center justify-center hover:bg-gray-200 transition text-gray-400 hover:text-black"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <button
                  onClick={handleAddToCart}
                  className="flex-1 bg-[#005B94] text-white h-14 font-black uppercase tracking-[0.15em] text-[11px] md:text-xs hover:bg-[#009EE3] transition-all shadow-lg rounded-sm"
                >
                  Adicionar à Sacola
                </button>
              </div>
            </div>

            <div className="flex items-center gap-6 py-6 border-y border-gray-50 mb-10">
               <div className="flex items-center gap-2">
                  <Truck size={18} className="text-[#009EE3]" />
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">Entrega Grátis</span>
               </div>
               <div className="w-px h-4 bg-gray-200"></div>
               <div className="flex items-center gap-2">
                  <ShieldCheck size={18} className="text-[#009EE3]" />
                  <span className="text-[9px] font-black text-gray-500 uppercase tracking-widest">100% Original</span>
               </div>
            </div>

            <div>
               <div className="flex gap-8 border-b border-gray-50 mb-6 overflow-x-auto no-scrollbar">
                {(['details', 'usage', 'ingredients'] as const).map(tab => (
                   <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`pb-3 text-[10px] font-black uppercase tracking-[0.2em] transition-all relative whitespace-nowrap ${
                      activeTab === tab ? 'text-[#005B94]' : 'text-gray-300'
                    }`}
                   >
                    {tab === 'details' ? 'Destaques' : tab === 'usage' ? 'Aplicação' : 'Ativos'}
                    {activeTab === tab && <div className="absolute bottom-0 left-0 w-full h-0.5 bg-[#005B94]" />}
                   </button>
                ))}
               </div>

               <div className="animate-in fade-in slide-in-from-bottom-2 duration-300">
                {activeTab === 'details' && (
                   <div className="space-y-6">
                      <div className="grid grid-cols-2 gap-4">
                         <div className="p-4 bg-gray-50/50 rounded-sm">
                            <h4 className="text-[9px] font-black text-gray-400 mb-1 uppercase tracking-widest flex items-center gap-2">
                               <Droplets size={12} className="text-[#009EE3]" /> Pele
                            </h4>
                            <p className="text-[12px] text-gray-900 font-black uppercase">{product.skinType}</p>
                         </div>
                         <div className="p-4 bg-gray-50/50 rounded-sm">
                            <h4 className="text-[9px] font-black text-gray-400 mb-1 uppercase tracking-widest flex items-center gap-2">
                               <FlaskConical size={12} className="text-[#009EE3]" /> Textura
                            </h4>
                            <p className="text-[12px] text-gray-900 font-black uppercase">{product.texture}</p>
                         </div>
                      </div>
                      <ul className="space-y-2">
                        {product.benefits.map((b, i) => (
                           <li key={i} className="flex items-center gap-3 text-[12px] text-gray-600 font-medium">
                              <div className="w-1 h-1 rounded-full bg-[#009EE3]" /> {b}
                           </li>
                        ))}
                      </ul>
                   </div>
                )}
                {activeTab === 'usage' && (
                   <div className="p-5 bg-blue-50/20 border-l-4 border-[#009EE3] rounded-sm">
                      <p className="text-[13px] text-[#005B94] leading-relaxed font-bold">
                         {product.howToUse}
                      </p>
                   </div>
                )}
                {activeTab === 'ingredients' && (
                   <div className="flex flex-wrap gap-2">
                      {product.ingredients.map((ing, i) => (
                         <span key={i} className="text-[9px] bg-white border border-gray-100 px-3 py-1.5 rounded-sm font-black text-gray-400 uppercase tracking-widest">
                            {ing}
                         </span>
                      ))}
                   </div>
                )}
               </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
