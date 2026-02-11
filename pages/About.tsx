
import React from 'react';
import { Link } from 'react-router-dom';
import { Microscope, Heart, ShieldCheck, FlaskConical, Award, Globe, Users } from 'lucide-react';

const About: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <section className="py-24 md:py-40 bg-blue-50/40 overflow-hidden relative border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-6xl md:text-9xl font-black text-[#005B94] uppercase tracking-tighter leading-[0.8] mb-12">
              CIÊNCIA & <br/><span className="text-[#009EE3]">CUIDADO.</span>
            </h1>
            <p className="text-xl md:text-3xl text-gray-700 font-medium leading-relaxed border-l-8 border-[#009EE3] pl-8 italic max-w-2xl">
              Nossa missão é desenvolver soluções dermatológicas que mudam a vida da pele sensível em todo o mundo.
            </p>
          </div>
        </div>
        <div className="absolute right-[-5%] top-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
          <Microscope size={800} className="text-[#005B94]" />
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white border-b border-gray-50">
        <div className="max-w-7xl mx-auto px-4 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ShieldCheck, val: '90k+', label: 'Dermatologistas Recomendam' },
              { icon: Users, val: 'Global', label: 'Presença Mundial' },
              { icon: Globe, val: 'Brasil', label: 'Envio Oficial' },
              { icon: Award, val: 'Original', label: 'Fórmula Patenteada' }
            ].map((stat, i) => (
              <div key={i} className="flex flex-col items-center text-center p-8 bg-gray-50/50 rounded-sm">
                <stat.icon size={28} className="text-[#009EE3] mb-4" />
                <span className="text-4xl font-black text-gray-900 mb-1">{stat.val}</span>
                <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest leading-tight">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
          <div className="space-y-10">
            <div>
              <h2 className="text-[11px] font-black text-[#009EE3] uppercase tracking-[0.5em] mb-4">A La Roche-Posay</h2>
              <h3 className="text-4xl md:text-5xl font-black text-gray-900 uppercase tracking-tighter leading-none mb-8">CIÊNCIA DERMATOLÓGICA DE ELITE.</h3>
              <p className="text-lg text-gray-600 font-medium leading-relaxed">
                Nascida na França, nossa marca utiliza as propriedades únicas da Água Termal de La Roche-Posay para criar cuidados que respeitam a pele e entregam resultados clínicos comprovados.
              </p>
            </div>
            <div className="space-y-6">
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <ShieldCheck className="text-[#009EE3]" />
                </div>
                <div>
                  <h4 className="font-black text-[#005B94] uppercase text-sm mb-1">Garantia Oficial</h4>
                  <p className="text-sm text-gray-500 font-medium">Produtos 100% originais com selos de autenticidade.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start">
                <div className="w-12 h-12 bg-blue-50 rounded-full flex items-center justify-center flex-shrink-0">
                  <Heart className="text-[#009EE3]" />
                </div>
                <div>
                  <h4 className="font-black text-[#005B94] uppercase text-sm mb-1">Peles Sensíveis</h4>
                  <p className="text-sm text-gray-500 font-medium">Fórmulas minimalistas desenvolvidas para máxima tolerância.</p>
                </div>
              </div>
            </div>
          </div>
          <div className="relative">
            <div className="aspect-[4/5] bg-gray-100 overflow-hidden rounded-sm shadow-2xl">
               <img src="https://i.ibb.co/Ng21RmK1/Untitled-design-2.png" alt="Lab" className="w-full h-full object-cover grayscale opacity-80" />
            </div>
            <div className="absolute -bottom-10 -left-10 bg-white p-12 shadow-2xl border border-gray-100 hidden md:block">
               <span className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2">MARCA OFICIAL</span>
               <img src="https://i.ibb.co/gMG2sXYY/La-Roche-Logo.png" alt="LRP" className="h-8 w-auto opacity-80" />
            </div>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section className="bg-gray-900 py-24 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-6xl font-black text-white uppercase tracking-tighter mb-8">O FUTURO DA SUA PELE É HOJE</h2>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-3xl mx-auto mb-12">
            Descubra as texturas premiadas e os ativos dermatológicos mais potentes do mercado.
          </p>
          <Link to="/" className="inline-flex items-center gap-2 bg-[#009EE3] text-white px-8 py-4 font-black uppercase tracking-widest text-xs hover:bg-[#005B94] transition-colors">
            Explorar Loja
          </Link>
        </div>
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
      </section>
    </div>
  );
};

export default About;
