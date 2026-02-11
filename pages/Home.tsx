
import React, { useMemo } from 'react';
import { products } from '../data/mockProducts';
import ProductCard from '../components/ProductCard';
import { Category } from '../types';
import { ArrowRight, ShieldCheck, FlaskConical, Droplets } from 'lucide-react';
import { Link } from 'react-router-dom';

export const categoryDescriptions: Record<string, string> = {
  [Category.ANTHELIOS]: "Os produtos da linha Anthelios são pioneiros no segmento de proteção solar. Sua alta proteção de amplo espectro é o resultado de mais de 25 anos de pesquisas clínicas avançadas na área de proteção solar e sobre a pele sensível ao sol.",
  [Category.EFFACLAR]: "EFFACLAR é a linha completa para peles oleosas com tendência a acne e peles oleosas sensíveis ou sensibilizadas, garantindo alta eficácia e tolerância. Com o seu conhecimento único sobre a fisiologia da pele, os Laboratórios da La Roche-Posay desenvolveram uma gama que garante uma solução dermatológica para cada perfil de pele oleosa.",
  [Category.LIPIKAR]: "LIPIKAR é a primeira linha de hidratação e higienização corporal para peles sensíveis, muito secas e com ressecamento severo. Recomendado por dermatologistas.",
  [Category.HYALU_B5]: "A partir dos 25 anos o corpo vai diminuindo a produção de ácido hialurônico. Nossos produtos, que possuem ácido hialurônico, tem como principais benefícios a reposição dessa substância na pele, a redução de rugas e lines finas, além de preencher e devolver a elasticidade. Respeitando a tolerância das peles sensíveis.",
  [Category.CICAPLAST]: "CICAPLAST é um creme multirreparador calmante que acalma, repara e protege a função de barreira da pele. Rico em ingredientes suavizantes e restauradores, como pantenol, manteiga de karité, madecassoside e Água Termal da La Roche-Posay. A linha CICAPLAST hidrata e repara a barreira cutânea.",
  [Category.RETINOL]: "O Retinol é reconhecido como um dos ativos anti-idade mais eficazes na dermatologia, pois atua na correção dos sinais de fotoenvelhecimento. Nossos produtos que possuem a molécula retinol, tem como principais benefícios a redução de rugas acentuadas, uniformização da tonalidade e textura da pele. Respeitando a tolerância das peles sensíveis.",
  [Category.VITAMINA_C]: "A Vitamina C é um dos ativos antirrugas mais prescritos por dermatologistas. Que age na recuperação da luminosidade da pele. Nossos produtos que possuem vitamina C Pura, tem como principais benefícios a redução de rugas e lines finas, uniformização da textura e tonalidade da pele e suavização de poros dilatados. Respeitando a tolerância das peles sensíveis.",
  [Category.MELA_B3]: "A linha Mela-B3 é a solução nº1 para quem deseja uma rotina antimanchas eficaz. Formulada com Niacinamida + Melasyl ™, novo ativo patenteado para combater a hiperpigmentação como nunca antes.",
  [Category.KITS]: "Nossos Kits Promocionais combinam os protocolos dermatológicos mais eficazes em packs exclusivos com descontos imperdíveis para sua rotina completa."
};

const SectionTitle: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="flex items-center gap-4 my-8 md:my-14">
    <div className="flex-1 h-0.5 bg-[#005B94] opacity-80"></div>
    <h2 className="text-[22px] md:text-[32px] font-normal text-[#005B94] tracking-tight whitespace-nowrap px-4">
      {children}
    </h2>
    <div className="flex-1 h-0.5 bg-[#005B94] opacity-80"></div>
  </div>
);

const Home: React.FC = () => {
  const bestSellers = useMemo(() => {
    // Seleção de 4 séruns de linhas diferentes para destaque científico
    const selectedIds = ['hb5-6', 'red-ret-b3', 'vitc12-serum', 'mela-serum-anti'];
    return products.filter(p => selectedIds.includes(p.id)).slice(0, 4);
  }, []);

  const promoKits = useMemo(() => {
    return products.filter(p => p.category === Category.KITS).slice(0, 4);
  }, []);

  const lastUnits = useMemo(() => {
    return products.filter(p => p.id.includes('ant-uvm') || p.id.includes('ant-age')).slice(0, 4);
  }, []);

  const allCategories = [
    Category.ANTHELIOS,
    Category.EFFACLAR,
    Category.LIPIKAR,
    Category.HYALU_B5,
    Category.CICAPLAST,
    Category.RETINOL,
    Category.VITAMINA_C,
    Category.MELA_B3
  ];

  return (
    <div className="pb-32 bg-white">
      {/* Banner Principal */}
      <section className="relative w-full mb-12 overflow-hidden bg-white">
        <div className="w-full max-w-[2560px] mx-auto">
          <img
            src="https://i.ibb.co/pTCvFVq/la-banner.jpg"
            alt="La Roche-Posay Promoção Exclusiva"
            className="w-full h-auto block banner-high-res"
            fetchPriority="high"
          />
        </div>
      </section>

      {/* Diferenciais Clínicos */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 mb-12">
        <div className="grid grid-cols-3 gap-4 md:gap-12 py-10 border-b border-gray-50">
          {[
            { icon: ShieldCheck, title: 'RECOMENDADO', desc: 'Por mais de 90.000 dermatologistas.' },
            { icon: FlaskConical, title: 'TECNOLOGIA', desc: 'Fórmulas minimalistas de alta eficácia.' },
            { icon: Droplets, title: 'ÁGUA TERMAL', desc: 'O coração de todas as nossas fórmulas.' }
          ].map((item, i) => (
            <div key={i} className="flex flex-col items-center text-center">
              <div className="w-12 h-12 md:w-20 md:h-20 bg-blue-50 text-[#009EE3] rounded-full flex items-center justify-center mb-4 md:mb-6">
                <item.icon size={24} className="md:w-10 md:h-10" />
              </div>
              <h4 className="text-[10px] md:text-[14px] font-bold text-[#005B94] uppercase tracking-widest mb-2">
                {item.title}
              </h4>
              <p className="text-[9px] md:text-[12px] text-gray-500 font-medium leading-tight max-w-[150px] mx-auto">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* 1. OS MAIS VENDIDOS (Atualizado com Séruns) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 mb-16">
        <SectionTitle>Os Mais Vendidos</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {bestSellers.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 2. IMAGENS (Banner Campanha 1-3) */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 mb-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <img src="https://i.ibb.co/605WBjvk/la1.webp" className="w-full h-auto rounded-sm cursor-pointer hover:opacity-90 transition-opacity" />
          <img src="https://i.ibb.co/27kHWyp0/la2.webp" className="w-full h-auto rounded-sm cursor-pointer hover:opacity-90 transition-opacity" />
          <img src="https://i.ibb.co/TxqhPfNj/la3.webp" className="w-full h-auto rounded-sm cursor-pointer hover:opacity-90 transition-opacity" />
        </div>
      </section>

      {/* 3. KITS EM PROMOÇÃO */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 mb-16">
        <SectionTitle>Kits em Promoção</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {promoKits.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 4. IMAGEM (Banner Campanha 4 - FULL WIDTH) */}
      <section className="relative w-full mb-16 overflow-hidden bg-white">
        <div className="w-full max-w-[2560px] mx-auto">
          <img src="https://i.ibb.co/6c0FbpdK/la4.webp" alt="Campanha La Roche-Posay" className="w-full h-auto block banner-high-res" />
        </div>
      </section>

      {/* 5. ÚLTIMAS UNIDADES */}
      <section className="max-w-7xl mx-auto px-4 lg:px-8 mb-16">
        <SectionTitle>Últimas Unidades</SectionTitle>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
          {lastUnits.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* 6. IMAGEM (Banner Campanha 5 - FULL WIDTH) */}
      <section className="relative w-full mb-16 overflow-hidden bg-white">
        <div className="w-full max-w-[2560px] mx-auto">
          <img src="https://i.ibb.co/q38XFQ71/la5.webp" alt="Campanha La Roche-Posay" className="w-full h-auto block banner-high-res" />
        </div>
      </section>

      {/* 7. AS LINHAS DA LA ROCHE POSAY */}
      <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-4 text-center">
         <SectionTitle>Nossas Linhas Especialistas</SectionTitle>
      </div>

      {allCategories.map((cat) => {
        const catProducts = products.filter(p => p.category === cat);
        
        if (catProducts.length === 0) return null;

        return (
          <section key={cat} className="py-12 border-t border-gray-50 scroll-mt-24">
            <div className="max-w-7xl mx-auto px-4 lg:px-8">
              <div className="mb-8">
                <div className="max-w-4xl">
                  <h2 className="text-3xl md:text-5xl font-black text-[#005B94] uppercase tracking-tighter mb-4">{cat}</h2>
                  <p className="text-gray-600 font-medium text-sm md:text-base leading-relaxed mb-6">{categoryDescriptions[cat]}</p>
                </div>
                <Link 
                  to={`/category/${cat.replace(/\s+/g, '-')}`} 
                  className="inline-flex items-center gap-3 bg-[#005B94] text-white px-10 py-4 font-black text-[12px] uppercase tracking-widest hover:bg-[#009EE3] transition-all rounded-sm shadow-xl"
                >
                  EXPLORAR LINHA {cat.toUpperCase()} <ArrowRight size={18} />
                </Link>
              </div>
              
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-10">
                {catProducts.slice(0, 4).map(product => (
                  <ProductCard key={product.id} product={product} />
                ))}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
};

export default Home;
