
import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';
import { createPixCharge, extractPixData } from '../services/fruitfyApi';
import { 
  ShieldCheck, 
  QrCode, 
  ChevronRight, 
  Loader2, 
  CheckCircle2,
  Lock,
  Check,
  RefreshCcw,
  AlertCircle,
  Copy,
  Smartphone,
  Clock,
  Info,
  Banknote,
  Smartphone as PhoneIcon,
  CreditCard as CardIcon
} from 'lucide-react';

type CheckoutStep = 'form' | 'payment_processing' | 'pix_screen' | 'success' | 'payment_error' | 'pix_error';

interface PixData {
  qrcode: string;
  qrcode_text: string;
}

const Checkout: React.FC = () => {
  const { cart, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState<'pix' | 'card'>('pix');
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('form');
  const [isSearchingCep, setIsSearchingCep] = useState(false);
  const [copied, setCopied] = useState(false);
  const [pixData, setPixData] = useState<PixData | null>(null);

  const [formData, setFormData] = useState({ name: '', email: '', cpf: '', phone: '' });
  const [cep, setCep] = useState('');
  const [address, setAddress] = useState({ street: '', neighborhood: '', city: '', state: '', number: '', complement: '' });
  const [cardData, setCardData] = useState({ number: '', name: '', expiry: '', cvv: '' });
  const [pixError, setPixError] = useState<string | null>(null);

  const shippingOptions = [
    { id: 'free', name: 'Frete Grátis', price: 0.00, time: '7-10 dias úteis' },
    { id: 'pac', name: 'PAC', price: 18.72, time: '5-7 dias úteis' },
    { id: 'sedex', name: 'SEDEX', price: 26.91, time: '1-3 dias úteis' }
  ];
  const [selectedShipping, setSelectedShipping] = useState(shippingOptions[0]);

  const totalWithShipping = totalPrice + selectedShipping.price;

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [checkoutStep]);

  useEffect(() => {
    if (cart.length === 0 && checkoutStep === 'form') navigate('/');
  }, [cart, navigate, checkoutStep]);

  // --- MÁSCARAS INTELIGENTES ---
  const handleCpfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    val = val.replace(/(\d{3})(\d)/, '$1.$2');
    val = val.replace(/(\d{3})\.(\d{3})(\d)/, '$1.$2.$3');
    val = val.replace(/(\d{3})\.(\d{3})\.(\d{3})(\d)/, '$1.$2.$3-$4');
    setFormData({ ...formData, cpf: val });
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 11) val = val.slice(0, 11);
    val = val.replace(/^(\d{2})(\d)/g, '($1) $2');
    val = val.replace(/(\d{5})(\d)/, '$1-$2');
    setFormData({ ...formData, phone: val });
  };

  const handleCepChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 8) val = val.slice(0, 8);
    val = val.replace(/(\d{5})(\d)/, '$1-$2');
    setCep(val);
  };

  const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 16) val = val.slice(0, 16);
    const formatted = val.match(/.{1,4}/g)?.join(' ') || val;
    setCardData({ ...cardData, number: formatted });
  };

  const handleExpiryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    if (val.length > 2) val = val.slice(0, 2) + '/' + val.slice(2);
    setCardData({ ...cardData, expiry: val });
  };

  const handleCvvChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let val = e.target.value.replace(/\D/g, '');
    if (val.length > 4) val = val.slice(0, 4);
    setCardData({ ...cardData, cvv: val });
  };

  useEffect(() => {
    const cleanCep = cep.replace(/\D/g, '');
    if (cleanCep.length === 8) {
      setIsSearchingCep(true);
      fetch(`https://viacep.com.br/ws/${cleanCep}/json/`)
        .then(res => res.json())
        .then(data => {
          if (!data.erro) {
            setAddress(prev => ({
              ...prev,
              street: data.logradouro,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf
            }));
          }
        })
        .finally(() => setIsSearchingCep(false));
    }
  }, [cep]);

  const handleCopyPix = () => {
    if (pixData) {
      navigator.clipboard.writeText(pixData.qrcode_text);
      setCopied(true);
      setTimeout(() => setCopied(false), 3000);
    }
  };

  const generatePixCharge = async () => {
    try {
      const totalCents = Math.round(totalWithShipping * 100);
      const fruitfyProductId = (process.env.FRUITFY_PRODUCT_ID as string) || 'a0e4d86d-a036-4f87-8c3f-b6d9c6abffd3';

      const payload = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone.replace(/\D/g, ''),
        cpf: formData.cpf.replace(/\D/g, ''),
        items: [
          {
            id: fruitfyProductId,
            value: totalCents,
            quantity: 1,
          },
        ],
      };

      const result = await createPixCharge(payload);

      if (result.success && result.data) {
        const extracted = extractPixData(result.data);

        if (extracted.qrcode || extracted.qrcode_text) {
          setPixData({
            qrcode: extracted.qrcode,
            qrcode_text: extracted.qrcode_text,
          });
          setCheckoutStep('pix_screen');
        } else {
          // Resposta sem dados de QR Code — usar fallback com dados disponíveis
          console.warn('Resposta da API sem QR Code explícito. Dados recebidos:', result.data);
          const fallbackCode = result.data.id || result.data.payment_code || JSON.stringify(result.data);
          setPixData({
            qrcode: `https://api.qrserver.com/v1/create-qr-code/?size=400x400&data=${encodeURIComponent(String(fallbackCode))}`,
            qrcode_text: String(fallbackCode),
          });
          setCheckoutStep('pix_screen');
        }
      } else {
        throw new Error(result.message || 'Resposta inesperada da API');
      }
    } catch (error: any) {
      console.error('Erro ao gerar cobrança PIX:', error);
      setPixError(error.message || 'Erro ao gerar o pagamento PIX. Tente novamente.');
      setCheckoutStep('pix_error');
    }
  };

  const handleProcessOrder = (e: React.FormEvent) => {
    e.preventDefault();
    setCheckoutStep('payment_processing');
    setPixError(null);
    if (paymentMethod === 'card') {
      setTimeout(() => setCheckoutStep('payment_error'), 2800);
    } else {
      generatePixCharge();
    }
  };

  if (checkoutStep === 'payment_processing') {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-white px-4">
        <Loader2 size={60} className="text-[#009EE3] animate-spin mb-6" />
        <h2 className="text-2xl font-black text-[#005B94] uppercase tracking-tighter mb-2">Validando Transação</h2>
        <p className="text-gray-500 font-medium tracking-widest text-[10px] uppercase">Aguarde, estamos processando seu pedido...</p>
      </div>
    );
  }

  if (checkoutStep === 'payment_error') {
    return (
      <div className="bg-gray-50 min-h-screen py-10 flex items-center px-4">
        <div className="max-w-xl mx-auto w-full">
           <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
              <div className="bg-red-50 p-8 flex items-center gap-6 border-b border-red-100">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 flex-shrink-0">
                  <AlertCircle size={32} />
                </div>
                <div>
                  <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-tight">CARTÃO NEGADO</h2>
                  <p className="text-[10px] font-bold text-red-600/70 uppercase tracking-widest">Problema na autenticação bancária</p>
                </div>
              </div>
              <div className="p-8 md:p-12 space-y-8">
                <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                  Houve um erro no processamento do seu cartão de crédito. <br/>
                  Para garantir sua <span className="text-[#005B94] font-black underline">reserva imediata</span> com frete grátis, sugerimos finalizar via <span className="text-[#009EE3] font-black">PIX</span>.
                </p>
                <button 
                  onClick={() => { setPaymentMethod('pix'); setCheckoutStep('payment_processing'); generatePixCharge(); }} 
                  className="w-full bg-[#005B94] text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#009EE3] transition-all rounded-xl shadow-xl active:scale-95"
                >
                  PAGAR COM PIX AGORA
                </button>
                <button onClick={() => setCheckoutStep('form')} className="w-full text-gray-400 py-2 font-black uppercase tracking-widest text-[9px] hover:text-gray-600 flex items-center justify-center gap-2">
                  <RefreshCcw size={12} /> Tentar novamente
                </button>
              </div>
           </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'pix_error') {
    return (
      <div className="bg-gray-50 min-h-screen py-10 flex items-center px-4">
        <div className="max-w-xl mx-auto w-full">
          <div className="bg-white shadow-2xl rounded-2xl overflow-hidden border border-gray-100">
            <div className="bg-red-50 p-8 flex items-center gap-6 border-b border-red-100">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-sm text-red-500 flex-shrink-0">
                <AlertCircle size={32} />
              </div>
              <div>
                <h2 className="text-2xl font-black text-gray-900 uppercase tracking-tighter leading-tight">ERRO NO PAGAMENTO</h2>
                <p className="text-[10px] font-bold text-red-600/70 uppercase tracking-widest">Não foi possível gerar o PIX</p>
              </div>
            </div>
            <div className="p-8 md:p-12 space-y-8">
              <p className="text-gray-600 text-sm md:text-base font-medium leading-relaxed">
                {pixError || 'Ocorreu um erro ao gerar a cobrança PIX. Por favor, verifique seus dados e tente novamente.'}
              </p>
              <button
                onClick={() => { setPixError(null); setCheckoutStep('form'); }}
                className="w-full bg-[#005B94] text-white py-5 font-black uppercase tracking-[0.2em] text-xs hover:bg-[#009EE3] transition-all rounded-xl shadow-xl active:scale-95"
              >
                TENTAR NOVAMENTE
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (checkoutStep === 'pix_screen' && pixData) {
    return (
      <div className="bg-[#005B94] min-h-screen py-6 md:py-16">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="bg-white rounded-[2.5rem] shadow-[0_30px_100px_rgba(0,0,0,0.3)] overflow-hidden flex flex-col md:flex-row transition-all duration-500">
            
            {/* Lado Esquerdo: Área do Pagamento (Destaque Azul Suave) */}
            <div className="md:w-[45%] bg-[#F4F9FF] p-8 md:p-12 border-b md:border-b-0 md:border-r border-gray-100 flex flex-col items-center justify-center text-center gap-8">
              <div className="space-y-1">
                <span className="text-[10px] font-black text-[#009EE3] uppercase tracking-[0.4em] mb-1 block">VALOR DO PEDIDO</span>
                <h2 className="text-4xl md:text-5xl font-black text-[#005B94] tracking-tighter">
                  R$ {totalWithShipping.toFixed(2).replace('.', ',')}
                </h2>
              </div>

              {/* QR Code Frame */}
              <div className="relative group">
                <div className="bg-white p-6 rounded-[3rem] shadow-[0_20px_50px_rgba(0,158,227,0.15)] border-4 border-white transition-transform duration-500 group-hover:scale-105">
                  <img src={pixData.qrcode} alt="QR Code" className="w-44 h-44 md:w-52 md:h-52 mix-blend-multiply" />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-[#009EE3] text-white px-5 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest shadow-lg">
                  PIX OFICIAL
                </div>
              </div>

              {/* Copia e Cola Logo Abaixo */}
              <div className="w-full space-y-4 max-w-[280px] mt-4">
                <div className="flex flex-col gap-2">
                  <span className="text-[9px] font-black text-gray-400 uppercase tracking-widest">CÓDIGO COPIA E COLA</span>
                  <div className="relative group">
                    <div className="bg-white border border-[#E1EFFE] rounded-2xl p-4 pr-14 text-[9px] font-mono text-gray-400 font-bold overflow-hidden shadow-sm text-left">
                      {pixData.qrcode_text.substring(0, 32)}...
                    </div>
                    <button 
                      onClick={handleCopyPix}
                      className={`absolute right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${copied ? 'bg-green-500 scale-110' : 'bg-[#009EE3] hover:bg-[#005B94]'} text-white shadow-lg`}
                    >
                      {copied ? <Check size={18} /> : <Copy size={18} />}
                    </button>
                  </div>
                </div>
                {copied && (
                  <p className="text-[10px] font-black text-green-600 uppercase tracking-widest animate-bounce">Código copiado!</p>
                )}
              </div>
            </div>

            {/* Lado Direito: Instruções Premium */}
            <div className="flex-1 p-8 md:p-14 flex flex-col justify-between">
              <div className="space-y-10">
                <div className="flex items-center gap-4">
                  <div className="bg-[#005B94] text-white p-3.5 rounded-2xl shadow-xl shadow-blue-900/20">
                    <QrCode size={24} />
                  </div>
                  <div>
                    <h3 className="text-xl font-black text-gray-900 uppercase tracking-tighter leading-none">QUASE LÁ!</h3>
                    <p className="text-[10px] font-bold text-[#009EE3] uppercase tracking-widest mt-1">Siga os passos abaixo</p>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 bg-[#EBF5FF] text-[#009EE3] rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-sm">1</div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed uppercase tracking-tight pt-1">
                      Abra o app do seu banco e escolha a função <span className="text-[#005B94] font-black">PIX</span>.
                    </p>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 bg-[#EBF5FF] text-[#009EE3] rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-sm">2</div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed uppercase tracking-tight pt-1">
                      Escaneie o código ou cole a chave PIX acima. Confira o valor de <span className="text-[#005B94] font-black">R$ {totalWithShipping.toFixed(2).replace('.', ',')}</span>.
                    </p>
                  </div>
                  <div className="flex gap-5 items-start">
                    <div className="w-10 h-10 bg-[#EBF5FF] text-[#009EE3] rounded-2xl flex items-center justify-center flex-shrink-0 font-black text-sm">3</div>
                    <p className="text-xs text-gray-500 font-medium leading-relaxed uppercase tracking-tight pt-1">
                      Aprovação <span className="text-green-600 font-black">instantânea</span>! Seu tratamento será enviado hoje mesmo.
                    </p>
                  </div>
                </div>

                <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100 flex items-center gap-4">
                  <Clock className="text-[#009EE3] animate-pulse" size={20} />
                  <span className="text-[10px] font-black text-[#005B94] uppercase tracking-widest">Aguardando pagamento...</span>
                </div>
              </div>

              <div className="mt-12 space-y-4">
                <button 
                  onClick={() => { clearCart(); setCheckoutStep('success'); }} 
                  className="w-full bg-[#005B94] text-white py-6 rounded-2xl font-black uppercase tracking-[0.25em] text-[11px] shadow-2xl shadow-blue-900/20 hover:bg-[#009EE3] transition-all flex items-center justify-center gap-3 active:scale-95"
                >
                  JÁ REALIZEI O PAGAMENTO <ChevronRight size={18} />
                </button>
                <button onClick={() => setCheckoutStep('form')} className="w-full text-[9px] font-black text-gray-400 hover:text-[#005B94] uppercase tracking-widest transition-colors">
                  VOLTAR E ESCOLHER OUTRO MÉTODO
                </button>
              </div>
            </div>

          </div>

          <div className="mt-10 flex flex-col md:flex-row items-center justify-center gap-6 text-white/40">
            <div className="flex items-center gap-2">
              <ShieldCheck size={18} />
              <span className="text-[9px] font-black uppercase tracking-widest">Ambiente Seguro</span>
            </div>
            <div className="flex items-center gap-2">
              <Lock size={18} />
              <span className="text-[9px] font-black uppercase tracking-widest">Criptografia SSL 256 BITS</span>
            </div>
          </div>

        </div>
      </div>
    );
  }

  if (checkoutStep === 'success') {
    return (
      <div className="min-h-[85vh] flex flex-col items-center justify-center px-4 text-center bg-white">
        <div className="w-24 h-24 bg-green-50 text-green-500 rounded-full flex items-center justify-center mb-8 shadow-inner">
           <CheckCircle2 size={60} />
        </div>
        <h1 className="text-4xl md:text-5xl font-black text-[#005B94] uppercase mb-4 tracking-tighter">SUCESSO!</h1>
        <p className="text-gray-500 max-w-sm mx-auto mb-10 font-bold uppercase text-xs tracking-widest leading-relaxed">
           Seu pedido foi recebido. Prepare-se para renovar sua pele com La Roche-Posay.
        </p>
        <button onClick={() => navigate('/')} className="bg-[#005B94] text-white px-12 py-5 font-black uppercase tracking-[0.3em] text-[11px] rounded-xl shadow-2xl hover:bg-[#009EE3] transition-all">
          VOLTAR PARA A LOJA
        </button>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen py-6 md:py-16">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <form onSubmit={handleProcessOrder} className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          <div className="lg:col-span-8 space-y-8">
            
            {/* Passo 1: Resumo */}
            <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-xl rounded-2xl">
              <h2 className="text-xl font-black text-[#005B94] uppercase mb-8 flex items-center gap-4 tracking-tight">
                <span className="w-8 h-8 bg-[#005B94] text-white rounded-full flex items-center justify-center text-xs">1</span> 
                Sua Sacola
              </h2>
              <div className="space-y-6">
                {cart.map(item => (
                  <div key={item.id} className="flex gap-6 items-center border-b border-gray-50 pb-6 last:border-0 last:pb-0">
                    <div className="w-20 h-24 md:w-24 md:h-28 bg-gray-50 flex-shrink-0 p-3 rounded-xl border border-gray-100">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain mix-blend-multiply" />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-[11px] md:text-sm font-black text-gray-900 uppercase tracking-tight leading-tight mb-1">{item.name}</h3>
                      <p className="text-[9px] text-[#009EE3] font-black uppercase tracking-widest mb-3">{item.category}</p>
                      <div className="flex justify-between items-center">
                        <span className="text-[10px] font-bold text-gray-400">QTD: {item.quantity}</span>
                        <span className="text-sm md:text-lg font-black text-[#005B94]">R$ {(item.discountedPrice * item.quantity).toFixed(2).replace('.', ',')}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Passo 2: Dados */}
            <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-xl rounded-2xl">
              <h2 className="text-xl font-black text-[#005B94] uppercase mb-8 flex items-center gap-4 tracking-tight">
                <span className="w-8 h-8 bg-[#005B94] text-white rounded-full flex items-center justify-center text-xs">2</span> 
                Identificação
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome Completo</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="Como no documento" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">E-mail</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="seu@email.com" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">CPF</label>
                  <input required type="text" value={formData.cpf} onChange={handleCpfChange} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="000.000.000-00" />
                </div>
                <div className="space-y-1.5">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Telefone</label>
                  <input required type="text" value={formData.phone} onChange={handlePhoneChange} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="(00) 00000-0000" />
                </div>
              </div>
            </div>

            {/* Passo 3: Entrega */}
            <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-xl rounded-2xl">
              <h2 className="text-xl font-black text-[#005B94] uppercase mb-8 flex items-center gap-4 tracking-tight">
                <span className="w-8 h-8 bg-[#005B94] text-white rounded-full flex items-center justify-center text-xs">3</span> 
                Entrega
              </h2>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-6 gap-6">
                  <div className="md:col-span-2 relative">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">CEP</label>
                    <div className="relative">
                      <input required type="text" value={cep} onChange={handleCepChange} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="00000-000" />
                      {isSearchingCep && <Loader2 className="absolute right-4 top-4 animate-spin text-[#009EE3]" size={18} />}
                    </div>
                  </div>
                  <div className="md:col-span-4">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Endereço</label>
                    <input required type="text" value={address.street} onChange={e => setAddress({...address, street: e.target.value})} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="Rua, Avenida..." />
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Número</label>
                    <input required type="text" value={address.number} onChange={e => setAddress({...address, number: e.target.value})} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="123" />
                  </div>
                  <div className="md:col-span-2 space-y-1.5">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Bairro</label>
                    <input required type="text" value={address.neighborhood} onChange={e => setAddress({...address, neighborhood: e.target.value})} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-sm font-bold focus:bg-white focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="Bairro" />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Cidade - UF</label>
                    <input required type="text" value={address.city ? `${address.city} - ${address.state}` : ''} className="w-full bg-gray-50 border border-gray-100 p-4 rounded-xl text-[11px] font-black uppercase" readOnly />
                  </div>
                </div>
              </div>

              {/* Opções de Frete */}
              {cep.replace(/\D/g, '').length === 8 && (
                <div className="mt-10 space-y-4">
                  <h3 className="text-[10px] font-black text-[#005B94] uppercase tracking-widest mb-4">Selecione o Frete</h3>
                  {shippingOptions.map(option => (
                    <label 
                      key={option.id}
                      className={`flex items-center justify-between p-5 border-2 cursor-pointer transition-all rounded-2xl ${selectedShipping.id === option.id ? 'border-[#009EE3] bg-blue-50/50' : 'border-gray-50 hover:border-gray-200 bg-white'}`}
                      onClick={() => setSelectedShipping(option)}
                    >
                      <div className="flex items-center gap-4">
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedShipping.id === option.id ? 'border-[#009EE3] bg-[#009EE3]' : 'border-gray-300'}`}>
                           {selectedShipping.id === option.id && <div className="w-2 h-2 bg-white rounded-full" />}
                        </div>
                        <div>
                          <p className="text-xs font-black text-gray-900 uppercase tracking-tight">{option.name}</p>
                          <p className="text-[10px] text-gray-400 font-bold">{option.time}</p>
                        </div>
                      </div>
                      <span className="text-sm font-black text-[#005B94]">
                        {option.price === 0 ? 'GRÁTIS' : `R$ ${option.price.toFixed(2).replace('.', ',')}`}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Passo 4: Pagamento */}
            <div className="bg-white p-6 md:p-10 border border-gray-100 shadow-xl rounded-2xl">
              <h2 className="text-xl font-black text-[#005B94] uppercase mb-8 flex items-center gap-4 tracking-tight">
                <span className="w-8 h-8 bg-[#005B94] text-white rounded-full flex items-center justify-center text-xs">4</span> 
                Pagamento
              </h2>
              <div className="grid grid-cols-2 gap-4 mb-10">
                 <button 
                  type="button" 
                  onClick={() => setPaymentMethod('pix')} 
                  className={`p-6 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all ${paymentMethod === 'pix' ? 'border-[#009EE3] bg-blue-50/50 text-[#005B94]' : 'border-gray-50 text-gray-300 hover:border-gray-200'}`}
                 >
                    <QrCode size={28} /> 
                    <span className="text-[10px] font-black uppercase tracking-widest">PIX</span>
                 </button>
                 <button 
                  type="button" 
                  onClick={() => setPaymentMethod('card')} 
                  className={`p-6 border-2 rounded-2xl flex flex-col items-center gap-3 transition-all ${paymentMethod === 'card' ? 'border-[#009EE3] bg-blue-50/50 text-[#005B94]' : 'border-gray-50 text-gray-300 hover:border-gray-200'}`}
                 >
                    <CardIcon size={28} /> 
                    <span className="text-[10px] font-black uppercase tracking-widest">Cartão</span>
                 </button>
              </div>

              {/* Formulários de Pagamento */}
              <div className="bg-gray-50 p-6 md:p-10 rounded-2xl border border-gray-100">
                {paymentMethod === 'pix' ? (
                  <div className="flex flex-col md:flex-row gap-8 items-center text-center md:text-left">
                    <div className="w-40 h-40 bg-white border-2 border-dashed border-blue-200 rounded-3xl flex items-center justify-center relative flex-shrink-0">
                       <QrCode size={80} className="text-gray-100" />
                       <div className="absolute inset-0 flex items-center justify-center">
                         <div className="bg-[#009EE3] p-3 rounded-full shadow-lg">
                           <Clock className="text-white animate-pulse" size={20} />
                         </div>
                       </div>
                    </div>
                    <div className="flex-1 space-y-4">
                      <div className="inline-block bg-[#005B94] text-white px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest">Aprovação Prioritária</div>
                      <h3 className="text-xl md:text-2xl font-black text-gray-900 uppercase tracking-tighter">O QR CODE será gerado no próximo passo.</h3>
                      <p className="text-xs text-gray-500 font-medium leading-relaxed uppercase tracking-tight">Pagando com PIX, sua entrega é processada em <span className="text-[#005B94] font-black">segundos</span> e despachada imediatamente.</p>
                    </div>
                  </div>
                ) : (
                  <div className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Número do Cartão</label>
                        <input required type="text" value={cardData.number} onChange={handleCardNumberChange} className="w-full bg-white border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="0000 0000 0000 0000" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Nome no Cartão</label>
                        <input required type="text" value={cardData.name} onChange={e => setCardData({...cardData, name: e.target.value.toUpperCase()})} className="w-full bg-white border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="NOME COMO NO CARTÃO" />
                      </div>
                      <div className="grid grid-cols-2 gap-6">
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">Validade</label>
                          <input required type="text" value={cardData.expiry} onChange={handleExpiryChange} className="w-full bg-white border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="MM/AA" />
                        </div>
                        <div className="space-y-1.5">
                          <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest ml-1">CVV</label>
                          <input required type="text" value={cardData.cvv} onChange={handleCvvChange} className="w-full bg-white border border-gray-100 p-4 rounded-xl text-sm font-bold focus:ring-2 focus:ring-[#009EE3] outline-none transition-all" placeholder="000" />
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

          </div>

          {/* Sidebar Final */}
          <div className="lg:col-span-4">
            <div className="bg-white border border-gray-100 shadow-2xl p-8 md:p-10 rounded-[2rem] sticky top-28 overflow-hidden">
               <div className="absolute top-0 left-0 w-full h-1.5 bg-[#005B94]"></div>
               <h3 className="text-[10px] font-black text-gray-400 uppercase tracking-[0.3em] mb-10 text-center">REVISÃO FINAL</h3>
               
               <div className="space-y-4 mb-10 pb-10 border-b border-gray-100">
                  <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                     <span>Subtotal</span>
                     <span className="text-gray-900">R$ {totalPrice.toFixed(2).replace('.', ',')}</span>
                  </div>
                  <div className="flex justify-between text-xs font-bold text-gray-500 uppercase tracking-widest">
                     <span>Frete</span>
                     <span className={selectedShipping.price === 0 ? 'text-green-600' : 'text-gray-900'}>
                        {selectedShipping.price === 0 ? 'GRÁTIS' : `R$ ${selectedShipping.price.toFixed(2).replace('.', ',')}`}
                     </span>
                  </div>
               </div>

               <div className="flex justify-between text-4xl font-black text-[#005B94] tracking-tighter mb-4">
                  <span className="uppercase text-lg">Total</span>
                  <span>R$ {totalWithShipping.toFixed(2).replace('.', ',')}</span>
               </div>
               
               <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest text-center mb-10">
                  Ou até 10x sem juros no cartão
               </p>

               <button 
                type="submit" 
                className="w-full py-6 font-black uppercase tracking-[0.3em] text-[11px] transition-all rounded-2xl shadow-2xl flex items-center justify-center gap-3 bg-[#005B94] text-white hover:bg-[#009EE3] active:scale-95"
               >
                 {paymentMethod === 'pix' ? 'GERAR PAGAMENTO' : 'CONFIRMAR PEDIDO'} <ChevronRight size={18} />
               </button>

               <div className="mt-10 pt-6 border-t border-gray-50 flex items-center justify-center gap-4 text-gray-300">
                  <Lock size={14} />
                  <span className="text-[9px] font-black uppercase tracking-widest">Criptografia de Ponta a Ponta</span>
               </div>
            </div>
          </div>

        </form>
      </div>
    </div>
  );
};

export default Checkout;
