'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import Api from '../service/api';

export interface ApiResponse {
  logradouro: string;
  bairro: string;
  localidade: string;
  uf: string;
}

export default function Home() {
  const [cep, SetCep] = useState<string>('');
  const [logradouro, SetLogradouro] = useState<string>('');
  const [bairro, SetBairro] = useState<string>('');
  const [localidade, SetLocalidade] = useState<string>('');
  const [uf, SetUf] = useState<string>('');
  const [showResults, setShowResults] = useState<boolean>(false);

  async function buscarCep() {
    if (cep == '') {
      alert('Cep Inválido!');
      SetCep('');
      setShowResults(false);
    }
    if (cep.length > 8) {
      alert('Cep Inválido!');
      setShowResults(false);
    }

    try {
      const response = await Api.get(`https://viacep.com.br/ws/${cep}/json`);
      SetLogradouro(response.data.logradouro);
      SetBairro(response.data.bairro);
      SetLocalidade(response.data.localidade);
      SetUf(response.data.uf);
      setShowResults(true);
      console.log(response);
    } catch (error) {
      console.log('ERRO' + error);
    }
  }

  return (
    <main className='flex flex-col h-screen w-full items-center justify-center bg-gradient-to-r from-cyan-300 to-blue-500'>
      <div className='flex flex-col items-center w-[550px] h-[350px] shadow-2xl bg-white rounded-3xl'>
        <div className='mt-6'>
          <h1 className='text-[30px] line-clamp-1 text-center font-bold font-sans'>
            Buscador de Cep
          </h1>
        </div>
        <div className='flex flex-row items-center justify-center mt-6 w-[200px]'>
          <label className='relative block '>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <Search className='w-[15px]' />
            </span>
            <input
              className='placeholder:italic placeholder:text-slate-400 block bg-white w-[200px] border border-slate-300 rounded-md h-9 pl-9 shadow-sm focus:outline-none focus:border-sky-500  text-[13px] font-bold'
              placeholder='Número do CEP'
              type='text'
              name='search'
              value={cep}
              onChange={(e) => SetCep(e.target.value)}
            />
          </label>
          <button className='flex ml-5 items-center justify-center' onClick={buscarCep}>
            <span className='flex items-center justify-center text-[15px] text-white font-bold bg-blue-500 hover:bg-blue-900 rounded-md w-[90px] h-9 '>
              Buscar
            </span>
          </button>
        </div>
        {showResults && (
          <div className='flex flex-col space-y-3 mt-10'>
            <div className='flex items-center justify-center border border-slate-400 w-[200px] h-7 rounded-full'>
              <span className='text-[12px] font-bold'>{logradouro}</span>
            </div>
            <div className='flex items-center justify-center border border-slate-400 w-[200px] h-7 rounded-full'>
              <span className='text-[12px] font-bold'>{bairro}</span>
            </div>
            <div className='flex items-center justify-center border border-slate-400 w-[200px] h-7 rounded-full'>
              <span className='text-[12px] font-bold'>{localidade}</span>
            </div>
            <div className='flex items-center justify-center border border-slate-400 w-[200px] h-7 rounded-full'>
              <span className='text-[12px] font-bold'>{uf}</span>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
