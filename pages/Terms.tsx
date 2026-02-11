
import React from 'react';
import { FileText, Truck, RefreshCw, AlertCircle, Scale, CreditCard, ShoppingBag } from 'lucide-react';

const Terms: React.FC = () => {
  return (
    <div className="bg-white py-20 md:py-32">
      <div className="max-w-4xl mx-auto px-4 lg:px-8">
        <header className="mb-24">
           <div className="flex items-center gap-6 mb-8">
              <div className="w-16 h-16 bg-blue-50 text-[#009EE3] rounded-full flex items-center justify-center shadow-inner">
                 <Scale size={32} />
              </div>
              <div>
                 <h1 className="text-4xl md:text-6xl font-black text-gray-900 uppercase tracking-tighter">Termos de Uso</h1>
                 <p className="text-[10px] font-black text-[#009EE3] uppercase tracking-[0.4em]">Contrato Oficial 2024</p>
              </div>
           </div>
           <p className="text-gray-500 font-medium leading-relaxed max-w-2xl italic">
              Este documento estabelece as condições que regem a utilização deste site oficial e a compra de produtos no mesmo.
           </p>
        </header>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
           {[
             { icon: Truck, title: 'Logística', desc: 'Entregas nacionais com seguro total.' },
             { icon: RefreshCw, title: 'Trocas', desc: 'Política de satisfação dermatológica.' },
             { icon: ShoppingBag, title: 'Loja', desc: 'Vendas oficiais diretas da marca.' }
           ].map((item, i) => (
             <div key={i} className="p-8 bg-gray-50 border border-gray-100 rounded-sm">
                <item.icon size={24} className="text-[#009EE3] mb-4" />
                <h4 className="text-[11px] font-black text-gray-900 uppercase tracking-widest mb-2">{item.title}</h4>
                <p className="text-[11px] text-gray-500 font-medium leading-tight">{item.desc}</p>
             </div>
           ))}
        </div>

        <div className="space-y-20">
          <section>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
               <span className="text-[#009EE3] font-serif italic text-4xl">01</span> ACEITE DE TERMOS
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed">
              A realização do pedido implica na aceitação plena e irrevogável destes termos. Reservamo-nos o direito de alterar estes termos a qualquer momento, visando a melhoria do atendimento.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
               <span className="text-[#009EE3] font-serif italic text-4xl">02</span> PREÇOS E OFERTAS
            </h2>
            <p className="text-gray-600 font-medium leading-relaxed mb-6">
              Todos os preços são expressos em Reais (BRL). Promoções marcadas como exclusivas possuem tempo limitado.
            </p>
            <div className="p-6 bg-blue-50 border-l-4 border-[#009EE3] text-[10px] font-black uppercase text-[#005B94] tracking-widest">
               Frete grátis aplicado automaticamente em produtos selecionados.
            </div>
          </section>

          <section>
            <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8 flex items-center gap-4">
               <span className="text-[#009EE3] font-serif italic text-4xl">03</span> PAGAMENTOS
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-gray-600 font-medium text-sm leading-relaxed">
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-900 font-black uppercase tracking-tight">
                     <CreditCard size={18} className="text-[#009EE3]" /> Cartão
                  </div>
                  <p>Parcelamento em até 12x sem juros.</p>
               </div>
               <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-900 font-black uppercase tracking-tight">
                     <FileText size={18} className="text-[#009EE3]" /> PIX
                  </div>
                  <p>Aprovação imediata e prioridade de despacho.</p>
               </div>
            </div>
          </section>

          <section className="bg-blue-900/5 p-10 md:p-14 border-t-8 border-[#005B94]">
             <div className="flex items-center gap-4 mb-8 text-[#005B94]">
                <AlertCircle size={32} />
                <h3 className="text-2xl font-black uppercase tracking-tight">AVISO MÉDICO</h3>
             </div>
             <p className="text-[#005B94] font-medium leading-relaxed text-sm">
                A nossa plataforma oferece descrições técnicas baseadas em laboratório. Recomendamos fortemente a consulta a um dermatologista antes da utilização de produtos de alta potência.
             </p>
          </section>
        </div>

        <footer className="mt-24 pt-12 border-t border-gray-100 text-center">
           <p className="text-[10px] text-gray-400 font-black uppercase tracking-[0.3em]">© 2024 La Roche-Posay - Termos Aplicáveis</p>
        </footer>
      </div>
    </div>
  );
};

export default Terms;
