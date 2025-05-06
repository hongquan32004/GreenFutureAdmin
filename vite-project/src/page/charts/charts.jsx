import React, { useEffect, useRef } from 'react';
import { Chart } from 'chart.js/auto';

const LineChartComponent = () => {
  const lineChartRef = useRef(null);

  useEffect(() => {
    // Khởi tạo Line Chart khi component mount
    const lineChart = new Chart(lineChartRef.current, {
      type: 'line',
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [{
          label: 'Line Chart',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          borderColor: 'rgb(75, 192, 192)',
          tension: 0.1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: true
          }
        }
      }
    });

    // Cleanup khi component unmount
    return () => {
      lineChart.destroy();
    };
  }, []);

  return (
    <main id="main" className="main">
      <div className="pagetitle">
        <h1>Chart.js</h1>
        <nav>
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="index.html">Home</a></li>
            <li className="breadcrumb-item">Charts</li>
            <li className="breadcrumb-item active">Chart.js</li>
          </ol>
        </nav>
      </div>

      <p>Chart.JS Examples. You can check the <a href="https://www.chartjs.org/docs/latest/samples/" target="_blank" rel="noopener noreferrer">official website</a> for more examples.</p>

      <section className="section">
        <div className="row">
          <div className="col-lg-6">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">Line Chart</h5>
                <canvas ref={lineChartRef} style={{ maxHeight: '400px' }}></canvas>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default LineChartComponent;