
import React from 'react';
import { Mail, Phone, MapPin, MessageSquare, Clock, Globe, ChevronRight } from 'lucide-react';

const Contact: React.FC = () => {
  return (
    <div className="bg-white">
      {/* Header Section */}
      <section className="py-24 md:py-32 bg-gray-50 border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 lg:px-8 text-center">
          <div className="inline-flex items-center gap-2 bg-blue-50 text-[#009EE3] px-4 py-2 rounded-full mb-8">
             <MessageSquare size={16} />
             <span className="text-[10px] font-black uppercase tracking-widest">Centro de Suporte</span>
          </div>
          <h1 className="text-5xl md:text-8xl font-black text-gray-900 uppercase tracking-tighter mb-8">CIÊNCIA AO SEU <br/><span className="text-[#005B94]">ALCANCE.</span></h1>
          <p className="text-gray-500 font-medium max-w-2xl mx-auto text-lg md:text-xl leading-relaxed">
            Nossa equipe de especialistas está pronta para guiar sua rotina de cuidado.
          </p>
        </div>
      </section>

      <section className="py-24 max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-20">
          {/* Contact Info */}
          <div className="lg:col-span-5 space-y-12">
            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Canais Oficiais</h2>
              <div className="space-y-6">
                 <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-sm group">
                    <div className="w-14 h-14 bg-blue-50 text-[#009EE3] rounded-full flex items-center justify-center group-hover:bg-[#005B94] group-hover:text-white transition-all">
                       <Mail size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail</p>
                       <p className="text-lg font-black text-gray-900 lowercase">suporte@laroche-posay.com.br</p>
                    </div>
                 </div>
                 <div className="flex items-center gap-6 p-6 bg-white border border-gray-100 shadow-sm hover:shadow-md transition-all rounded-sm group">
                    <div className="w-14 h-14 bg-blue-50 text-[#009EE3] rounded-full flex items-center justify-center group-hover:bg-[#005B94] group-hover:text-white transition-all">
                       <Phone size={24} />
                    </div>
                    <div>
                       <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">SAC Central</p>
                       <p className="text-lg font-black text-gray-900">0800-701-1552</p>
                    </div>
                 </div>
              </div>
            </div>

            <div>
              <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tight mb-8">Horário</h2>
              <div className="space-y-6">
                 <div className="flex gap-6">
                    <Clock className="text-[#009EE3] flex-shrink-0" size={24} />
                    <div>
                       <h4 className="font-black text-gray-900 uppercase text-xs mb-2">Atendimento</h4>
                       <p className="text-sm text-gray-500 font-medium">
                          Segunda a Sexta: 09:00 às 18:00
                       </p>
                    </div>
                 </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
             <div className="bg-white p-8 md:p-14 shadow-2xl border border-gray-50 rounded-sm">
                <h3 className="text-3xl font-black text-[#005B94] uppercase tracking-tighter mb-10 leading-none">Mande sua Dúvida</h3>
                <form className="space-y-8" onSubmit={(e) => e.preventDefault()}>
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Nome</label>
                         <input type="text" className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#009EE3]" placeholder="Seu nome" />
                      </div>
                      <div className="flex flex-col gap-2">
                         <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">E-mail</label>
                         <input type="email" className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#009EE3]" placeholder="seu@email.com" />
                      </div>
                   </div>
                   <div className="flex flex-col gap-2">
                      <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Sua Mensagem</label>
                      <textarea rows={5} className="bg-gray-50 border border-gray-100 p-4 text-sm outline-none focus:border-[#009EE3]" placeholder="Como podemos ajudar?"></textarea>
                   </div>
                   <button className="w-full bg-[#005B94] text-white py-6 font-black uppercase tracking-widest hover:bg-[#009EE3] transition-all shadow-xl flex items-center justify-center gap-3">
                      ENVIAR MENSAGEM <ChevronRight size={20} />
                   </button>
                </form>
             </div>
          </div>
        </div>
      </section>

      {/* Social Banner */}
      <section className="py-20 bg-gray-900">
         <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col md:flex-row items-center justify-between gap-10">
            <div className="text-center md:text-left">
               <h3 className="text-2xl md:text-4xl font-black text-white uppercase tracking-tighter mb-2">Siga nossa ciência</h3>
               <p className="text-white/40 font-medium text-sm md:text-lg">Dicas diárias de cuidado no Instagram oficial.</p>
            </div>
            <div className="flex gap-6">
               <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#009EE3] transition-all cursor-pointer">
                  <Globe size={24} />
               </div>
               <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center hover:bg-[#009EE3] transition-all cursor-pointer">
                  <MessageSquare size={24} />
               </div>
            </div>
         </div>
      </section>
    </div>
  );
};

export default Contact;
