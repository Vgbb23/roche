
import React from 'react';
import { Microscope, Globe, ShieldCheck, Heart, Droplets, BookOpen } from 'lucide-react';

const WhitePage: React.FC = () => {
  return (
    <div className="bg-white min-h-screen font-sans text-gray-800">
      {/* Header Institucional Simples */}
      <header className="border-b border-gray-100 py-6">
        <div className="max-w-5xl mx-auto px-6 flex justify-between items-center">
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-black uppercase">LA ROCHE POSAY</span>
            <span className="text-[7px] font-medium tracking-[0.2em] text-gray-400 uppercase">LABORATOIRE DERMATOLOGIQUE</span>
          </div>
          <nav className="hidden md:flex gap-8 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
            <span className="cursor-default">Ciência</span>
            <span className="cursor-default">Água Termal</span>
            <span className="cursor-default">Sustentabilidade</span>
          </nav>
        </div>
      </header>

      {/* Hero Blog */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <div className="inline-block bg-[#005B94] text-white px-4 py-1 rounded-full text-[9px] font-black uppercase tracking-widest mb-8">
            Artigo Científico 2024
          </div>
          <h1 className="text-4xl md:text-6xl font-black text-gray-900 leading-tight mb-8 tracking-tighter uppercase">
            A Revolução da Água Termal na <br/><span className="text-[#009EE3]">Dermatologia Moderna</span>
          </h1>
          <p className="text-lg md:text-xl text-gray-500 font-medium leading-relaxed italic">
            Como uma fonte natural na França tornou-se o coração dos tratamentos para as peles mais sensíveis do mundo.
          </p>
        </div>
      </section>

      {/* Conteúdo do Artigo */}
      <article className="max-w-3xl mx-auto px-6 py-16 md:py-24">
        <div className="aspect-video bg-gray-200 rounded-sm overflow-hidden mb-12 shadow-xl">
          <img 
            src="https://i.ibb.co/Ng21RmK1/Untitled-design-2.png" 
            alt="Laboratório" 
            className="w-full h-full object-cover grayscale opacity-90"
          />
        </div>

        <div className="prose prose-lg max-w-none text-gray-600 leading-relaxed space-y-8">
          <p>
            Desde a sua criação em 1975, os <strong>Laboratórios Dermatológicos La Roche-Posay</strong> estabeleceram uma missão clara: mudar a vida das pessoas com pele sensível. Através de uma colaboração estreita com mais de 90.000 dermatologistas em todo o mundo, a marca desenvolve fórmulas que combinam segurança extrema e eficácia comprovada.
          </p>
          
          <h2 className="text-2xl font-black text-[#005B94] uppercase tracking-tight pt-8">O Patrimônio da Água Termal</h2>
          <p>
            No centro de cada inovação está a nossa Água Termal. Reconhecida pela Academia Francesa de Medicina por suas propriedades terapêuticas, ela possui uma concentração única de Selênio, um antioxidante natural que acalma e suaviza a pele instantaneamente.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 my-16">
            <div className="p-8 bg-blue-50 border-l-4 border-[#009EE3]">
              <Droplets className="text-[#009EE3] mb-4" />
              <h4 className="font-black text-gray-900 uppercase text-sm mb-2">Pureza Excepcional</h4>
              <p className="text-xs font-medium text-gray-500 leading-tight">Protegida contra qualquer poluição, a água mantém sua integridade mineral desde a fonte.</p>
            </div>
            <div className="p-8 bg-blue-50 border-l-4 border-[#009EE3]">
              <Microscope className="text-[#009EE3] mb-4" />
              <h4 className="font-black text-gray-900 uppercase text-sm mb-2">Testes Clínicos</h4>
              <p className="text-xs font-medium text-gray-500 leading-tight">Mais de 600 estudos clínicos realizados para garantir tolerância máxima.</p>
            </div>
          </div>

          <h2 className="text-2xl font-black text-[#005B94] uppercase tracking-tight">Compromisso com a Segurança</h2>
          <p>
            Nossas fórmulas são minimalistas, focadas no essencial. Removemos qualquer ingrediente potencialmente irritante, como parabenos e fragrâncias desnecessárias, permitindo que até as peles mais reativas — incluindo as de bebês e pacientes sob tratamentos oncológicos — encontrem conforto e reparação.
          </p>
        </div>
      </article>

      {/* Footer Blog */}
      <footer className="bg-gray-900 py-20 text-center">
        <div className="max-w-4xl mx-auto px-6">
          <div className="flex justify-center gap-10 mb-12 opacity-40">
            <ShieldCheck className="text-white" size={32} />
            <Globe className="text-white" size={32} />
            <Heart className="text-white" size={32} />
          </div>
          <p className="text-white/30 text-[10px] font-black uppercase tracking-[0.4em]">
            © 2024 La Roche-Posay Research Center - Todos os Direitos Reservados
          </p>
        </div>
      </footer>
    </div>
  );
};

export default WhitePage;
