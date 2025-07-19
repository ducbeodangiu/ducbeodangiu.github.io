
import React, { useState, useCallback } from 'react';
import { HealthStatus } from './types';
import type { BmiResult } from './types';
import { RulerIcon, WeightIcon, BotIcon } from './components/icons';
import ResultDisplay from './components/ResultDisplay';
import Chatbot from './components/Chatbot';


const App: React.FC = () => {
  const [height, setHeight] = useState<string>('');
  const [weight, setWeight] = useState<string>('');
  const [result, setResult] = useState<BmiResult | null>(null);
  const [error, setError] = useState<string>('');
  const [isChatOpen, setChatOpen] = useState(false);

  const getBmiDetails = (bmi: number): Omit<BmiResult, 'bmi'> => {
    if (bmi < 18.5) {
      return {
        status: HealthStatus.Underweight,
        advice: "Bạn có thể cần bổ sung thêm dinh dưỡng để đạt cân nặng khỏe mạnh. Hãy tham khảo ý kiến chuyên gia dinh dưỡng.",
        color: "border-blue-500"
      };
    } else if (bmi >= 18.5 && bmi <= 24.9) {
      return {
        status: HealthStatus.Normal,
        advice: "Tuyệt vời! Bạn có một thân hình cân đối. Hãy tiếp tục duy trì lối sống lành mạnh nhé.",
        color: "border-green-500"
      };
    } else if (bmi >= 25.0 && bmi <= 29.9) {
      return {
        status: HealthStatus.Overweight,
        advice: "Bạn có thể cần xem xét điều chỉnh chế độ ăn uống và tăng cường vận động để cải thiện sức khỏe.",
        color: "border-yellow-500"
      };
    } else {
      return {
        status: HealthStatus.Obese,
        advice: "Bạn nên tham khảo ý kiến bác sĩ hoặc chuyên gia để có kế hoạch giảm cân an toàn và hiệu quả.",
        color: "border-red-500"
      };
    }
  };

  const handleCalculateBmi = useCallback(() => {
    setError('');
    const heightNum = parseFloat(height);
    const weightNum = parseFloat(weight);

    if (isNaN(heightNum) || isNaN(weightNum) || heightNum <= 0 || weightNum <= 0) {
      setError('Vui lòng nhập chiều cao và cân nặng hợp lệ.');
      setResult(null);
      return;
    }

    const heightInMeters = heightNum / 100;
    const bmiValue = weightNum / (heightInMeters * heightInMeters);
    
    const bmiDetails = getBmiDetails(bmiValue);
    
    setResult({
      bmi: bmiValue,
      ...bmiDetails
    });
  }, [height, weight]);

  return (
    <div className="bg-slate-50 min-h-screen flex items-center justify-center p-4 antialiased relative">
      <main className="w-full max-w-md mx-auto">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Trợ lý Sức khỏe BMI</h1>
            <p className="text-gray-600 mt-2">Xin chào! Hãy cho tôi biết các chỉ số của bạn để cùng phân tích sức khỏe nhé.</p>
          </div>

          <form onSubmit={(e) => { e.preventDefault(); handleCalculateBmi(); }} className="space-y-6">
            <div>
              <label htmlFor="height" className="text-sm font-medium text-gray-700 flex items-center mb-2">
                <RulerIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Chiều cao của bạn
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="height"
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  placeholder="ví dụ: 170"
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  aria-label="Chiều cao bằng centimet"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">cm</span>
              </div>
            </div>

            <div>
              <label htmlFor="weight" className="text-sm font-medium text-gray-700 flex items-center mb-2">
                <WeightIcon className="h-5 w-5 mr-2 text-indigo-500" />
                Cân nặng của bạn
              </label>
              <div className="relative">
                <input
                  type="number"
                  id="weight"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  placeholder="ví dụ: 65"
                  className="w-full pl-4 pr-12 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
                  aria-label="Cân nặng bằng kilogram"
                />
                <span className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-500">kg</span>
              </div>
            </div>

            {error && <p role="alert" className="text-sm text-red-600 text-center">{error}</p>}
            
            <button
              type="submit"
              className="w-full bg-indigo-600 text-white font-bold py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
            >
              Xem kết quả
            </button>
          </form>
          
          {result && (
             <div className="mt-6 animate-fade-in">
                <ResultDisplay result={result} />
             </div>
          )}
        </div>
        <footer className="text-center mt-6 text-xs text-gray-400">
            <p>Phân loại dựa trên tiêu chuẩn BMI của WHO. Ứng dụng chỉ mang tính tham khảo.</p>
            <div className="mt-4 text-gray-500">
                <p>Phát triển bởi: Hà Văn Đức</p>
                <p>Đợt đào tạo thực tế Hợp tác giữa FPT Polytechnic và IMTA TECH,</p>
                <p>Cán bộ Hướng dẫn: Trần Tuấn Thành.</p>
            </div>
        </footer>
      </main>

      <button
        onClick={() => setChatOpen(true)}
        className="fixed bottom-6 right-6 bg-indigo-600 text-white p-4 rounded-full shadow-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-110"
        aria-label="Mở Trợ lý AI"
      >
        <BotIcon className="h-6 w-6" />
      </button>

      <Chatbot isOpen={isChatOpen} onClose={() => setChatOpen(false)} />

      <style>{`
        @keyframes fade-in {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
            animation: fade-in 0.5s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default App;
