import { useEffect, useRef, useState } from 'react';

const App = () => {
  const [duration, setDuration] = useState(10);
  const [percent, setPercent] = useState(0);
  const [loading, setLoading] = useState(false);
  const intervalRef = useRef(null)
  useEffect(() => {
    if (loading) {
      const startTime = Date.now();
      const totalMs = duration * 1000;
      intervalRef.current = setInterval(() => {
        const elem = Date.now() - startTime;
        const newPercent = Math.min((elem / totalMs) * 100, 100)
        setPercent(newPercent);
        if (newPercent >= 100) {
          clearInterval(intervalRef.current);
          setLoading(false)
        }

      }, 100);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [loading, duration]);

  const handleStart = () => {
    setPercent(0);
    setLoading(true)
  }
  return (
    <div className='flex justify-center h-full  my-10'>

      <div>
        <div className='flex gap-3'>
          <input
            className={`border p-2 ${loading ? 'cursor-not-allowed' : ""}`}
            type='number'
            min={1}
            disabled={loading}
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
          />

          <button type='button'
            disabled={loading}
            className={`border p-2 ${loading ? 'cursor-not-allowed' : ""}`}
            onClick={handleStart}>
            {loading ? "Processing" : "Start"}
          </button>
        </div>
        <div className='mt-6 relative'>
          <div className=' w-full bg-gray-200 h-6 rounded-md '>
            <div className={`bg-gradient-to-r from-blue-500 to-cyan-500 h-full rounded-md transition-all duration-100 ease-linear w-[${percent}%]`}>

            </div>
            <p className='absolute  top-0 left-[45%] text-center text-blue-600/100 font-medium'> {percent.toFixed(0)}%</p>
          </div>

        </div>
      </div>

    </div>
  )
}

export default App
