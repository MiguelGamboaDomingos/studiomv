import React, { useState } from 'react';

const TestButton: React.FC = () => {
  const [count, setCount] = useState(0);
  const [message, setMessage] = useState('');

  const handleClick = () => {
    setCount(prev => prev + 1);
    setMessage(`Botão clicado ${count + 1} vezes!`);
    console.log('Botão de teste clicado!', count + 1);
  };

  const testFirebase = async () => {
    try {
      console.log('Testando Firebase...');
      setMessage('Testando Firebase...');
      
      // Simular uma operação
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMessage('Firebase funcionando!');
      console.log('Firebase teste OK');
    } catch (error) {
      console.error('Erro no teste Firebase:', error);
      setMessage('Erro no Firebase!');
    }
  };

  return (
    <div className="p-4 bg-white rounded-lg shadow">
      <h3 className="text-lg font-semibold mb-4">Teste de Botões</h3>
      
      <div className="space-y-4">
        <div>
          <button
            onClick={handleClick}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
          >
            Clique Aqui ({count})
          </button>
        </div>
        
        <div>
          <button
            onClick={testFirebase}
            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition-colors"
          >
            Testar Firebase
          </button>
        </div>
        
        {message && (
          <div className="p-2 bg-gray-100 rounded">
            {message}
          </div>
        )}
      </div>
    </div>
  );
};

export default TestButton;
