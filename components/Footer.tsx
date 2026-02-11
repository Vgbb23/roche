
import React from 'react';
import { Facebook, Instagram, Twitter, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer: React.FC = () => {
  return (
    <footer className="bg-white pt-24 pb-12 border-t border-gray-100">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-20">
          <div className="col-span-1 md:col-span-1">
             <img 
               src="https://i.ibb.co/gMG2sXYY/La-Roche-Logo.png" 
               alt="La Roche-Posay" 
               className="h-8 w-auto mb-8"
             />
             <div className="flex gap-4">
               {[Instagram, Facebook, Twitter, Youtube].map((Icon, i) => (
                  <a key={i} href="#" className="text-gray-400 hover:text-[#009EE3] transition-all">
                     <Icon size={20} />
                  </a>
               ))}
            </div>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-[#005B94] uppercase tracking-widest mb-6">A MARCA</h4>
            <ul className="space-y-4 text-xs font-medium text-gray-500">
              <li><Link to="/sobre" className="hover:text-[#009EE3]">Nossa História</Link></li>
              <li><Link to="/sobre" className="hover:text-[#009EE3]">Água Termal</Link></li>
              <li><Link to="/sobre" className="hover:text-[#009EE3]">Sustentabilidade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-[#005B94] uppercase tracking-widest mb-6">SUPORTE</h4>
            <ul className="space-y-4 text-xs font-medium text-gray-500">
              <li><Link to="/contato" className="hover:text-[#009EE3]">Atendimento</Link></li>
              <li><Link to="/termos" className="hover:text-[#009EE3]">Envio e Frete</Link></li>
              <li><Link to="/privacidade" className="hover:text-[#009EE3]">Privacidade</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-[11px] font-bold text-[#005B94] uppercase tracking-widest mb-6">NEWSLETTER</h4>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
               <input type="email" placeholder="E-mail" className="flex-1 bg-gray-50 border border-gray-100 px-4 py-3 text-xs outline-none focus:border-[#009EE3]" />
               <button className="bg-[#005B94] text-white px-6 py-3 text-[10px] font-bold uppercase hover:bg-[#009EE3] transition-all">OK</button>
            </form>
          </div>
        </div>
        <div className="pt-12 border-t border-gray-50 text-center">
           <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">
             © 2024 LA ROCHE-POSAY. TODOS OS DIREITOS RESERVADOS.
           </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
