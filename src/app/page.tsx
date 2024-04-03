'use client';

import { Search } from 'lucide-react';
import { useState } from 'react';
import Api from '../service/api';
import Lottie from 'react-lottie';
import animationData from '@/assets/Animation.json'

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

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  return (
    <main className='flex flex-col h-screen w-full items-center justify-center bg-gradient-to-r from-cyan-300 to-blue-500'>
      <div className='flex flex-row items-center justify-center md:mt-[50px]'>
          <h1 className='text-[30px] mt-[-100px] text-white line-clamp-1 text-center font-bold font-sans md:text-[40px]'>
            Buscador de Cep
          </h1>
          <span className='mt-[-100px] ml-8'>
              <Lottie options={defaultOptions}
              height={100}
              width={100}
              />
          </span>
      </div>
      <div className='flex flex-col items-center w-[400px] h-96 shadow-2xl bg-white rounded-3xl mt-[20px] md:w-[750px] md:h-[400px]'>
        <div className='flex flex-row items-center justify-center mt-[60px] w-[200px]'>
          <label className='relative block '>
            <span className='absolute inset-y-0 left-0 flex items-center pl-2'>
              <Search className='w-[15px]' />
            </span>
            <input
              className='placeholder:italic placeholder:text-slate-400 block bg-white w-[200px] border border-slate-300 rounded-md h-9 pl-9 shadow-sm focus:outline-none focus:border-sky-500  text-[13px] font-bold '
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
          <ul className='flex flex-col space-y-3 mt-10'>
            <li className='flex items-center justify-center border border-slate-400 w-[300px] h-10 rounded-full md:w-[500px]'>
              <span className='text-[12px] font-bold md:text-[18px]'>{logradouro}</span>
            </li>
            <li className='flex items-center justify-center border border-slate-400 w-[300px] h-10 rounded-full md:w-[500px]'>
              <span className='text-[12px] font-bold md:text-[18px]'>{bairro}</span>
            </li>
            <li className='flex items-center justify-center border border-slate-400 w-[300px] h-10 rounded-full md:w-[500px]'>
              <span className='text-[12px] font-bold md:text-[18px]'>{localidade}</span>
            </li>
            <li className='flex items-center justify-center border border-slate-400 w-[300px] h-10 rounded-full md:w-[500px]'>
              <span className='text-[12px] font-bold md:text-[18px]'>{uf}</span>
            </li>
          </ul>
        )}
      </div>
    </main>
  );
}
