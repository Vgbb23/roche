
import React from 'react';
import { Product } from '../types';
import { useCart } from '../context/CartContext';
import { Link } from 'react-router-dom';
import { Plus, Star, StarHalf } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useCart();
  const [added, setAdded] = React.useState(false);

  // Função para gerar rating e reviews pseudo-aleatórios mas persistentes baseados no ID
  const getRatingData = (id: string) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
      hash = ((hash << 5) - hash) + id.charCodeAt(i);
      hash |= 0;
    }
    const absHash = Math.abs(hash);
    const ratings = [4, 4.5, 5];
    const rating = ratings[absHash % ratings.length];
    const reviews = 860 + (absHash % 541); 
    return { rating, reviews };
  };

  const { rating, reviews } = getRatingData(product.id);

  const handleAdd = (e: React.MouseEvent) => {
    e.preventDefault();
    addToCart(product);
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  const renderStars = (val: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(val)) {
        stars.push(<Star key={i} size={12} className="text-yellow-400 fill-yellow-400" />);
      } else if (i === Math.ceil(val) && !Number.isInteger(val)) {
        stars.push(<StarHalf key={i} size={12} className="text-yellow-400 fill-yellow-400" />);
      } else {
        stars.push(<Star key={i} size={12} className="text-gray-200 fill-gray-200" />);
      }
    }
    return stars;
  };

  return (
    <div className="group flex flex-col bg-white transition-all duration-300 relative rounded-sm overflow-hidden border border-gray-100 p-2 h-full">
      {/* Container da Imagem */}
      <Link to={`/product/${product.id}`} className="block relative aspect-[3/4] bg-[#F9F9F9] overflow-hidden rounded-sm mb-4">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-contain p-4 group-hover:scale-105 transition-transform duration-500"
        />
      </Link>

      <div className="px-2 pb-2 flex flex-col flex-grow items-start text-left">
        {/* Categoria */}
        <span className="text-[#009EE3] text-[10px] font-bold uppercase tracking-widest mb-1.5">
          {product.category}
        </span>

        {/* Nome do Produto */}
        <Link to={`/product/${product.id}`} className="block mb-1 w-full">
          <h3 className="text-black font-black text-[11px] md:text-[13px] leading-tight uppercase min-h-[35px] md:min-h-[40px] break-words">
            {product.name}
          </h3>
        </Link>

        {/* Funcionalidade / Benefício */}
        <p className="text-gray-500 text-[9px] md:text-[10px] font-medium italic mb-3">
          {product.functionality}
        </p>

        {/* Estrelas de Avaliação */}
        <div className="flex items-center gap-0.5 mb-4">
          <div className="flex items-center">
            {renderStars(rating)}
          </div>
          <span className="text-[10px] text-gray-400 font-bold ml-1">
            ({reviews})
          </span>
        </div>

        {/* Preços */}
        <div className="mt-auto w-full flex flex-col gap-0.5 mb-5">
             <span className="text-[#CCCCCC] text-[12px] md:text-[13px] line-through font-medium">
                R$ {product.originalPrice.toFixed(2).replace('.', ',')}
             </span>
             <span className="text-[18px] md:text-[20px] font-bold text-black leading-none">
                R$ {product.discountedPrice.toFixed(2).replace('.', ',')}
             </span>
        </div>

        {/* Botão de Compra */}
        <button
          onClick={handleAdd}
          className={`w-full py-3 md:py-3.5 text-[10px] md:text-[12px] font-bold uppercase tracking-widest transition-all rounded-sm flex items-center justify-center gap-2 shadow-sm ${
            added 
            ? 'bg-green-600 text-white' 
            : 'bg-[#005B94] text-white hover:bg-[#009EE3]'
          }`}
        >
          {added ? (
            'ADICIONADO'
          ) : (
            <>
              <Plus size={16} strokeWidth={3} /> ADICIONAR
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
