import { useEffect, useState } from "react";
// import $ from "jquery";
// import "select2";
// window.jQuery = window.$ = $;
import ServerApi from "../helper/ServerApi";
// import React from 'react';
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

// Registrasi elemen
ChartJS.register(ArcElement, Tooltip, Legend);

export default function PieChart() {
  const [selectedFilter, setSelectedFilter] = useState("")
  const [dataDropdown, setDataDropdown] = useState([]);
  const [filter, setFilter] = useState("");
  const [pieChartData, setPieChartData] = useState([]);
  // const selectRef = useRef(null);
  // useEffect(() => {
  //   if (typeof window !== "undefined" && selectRef.current) {
  //     const $select = $(selectRef.current);
  //     if ($.fn.select2) {
  //       $select.select2({
  //         ajax: {
  //           url: `${ServerApi}chart`,
  //           dataType: "json",
  //           data: function(params) {
  //             console.log('Request params:', params);
  //             return {
  //               search: params.term
  //             };
  //           },
  //           processResults: function(data) {
  //             console.log('Response:', data);
  //             return {
  //               results: data.results.map((item) => ({
  //                 id: item.filter,
  //                 text: item.nama
  //               }))
  //             };
  //           }
  //         }
  //       });
  //     }
  //     return () => $select.select2("destroy");
  //   }
  // }, []);

  const getTotalData = async (filter) => {
    console.log(filter, "filter di getTotaldata");
    try {
      const res = await fetch(`${ServerApi}filterChart?filter=${filter}`, {
        method: "GET",
      });
      const data = await res.json();
      console.log(data, "ini data chartttt");
      console.log(typeof data);
      // if(typeof data === Array){
      //   console.log('masuk kesini ya?')
      setPieChartData(data);
      // }
    } catch (error) {
      console.log(error, "ini errrrr");
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    console.log(value, "ini di handleChange");

    setSelectedFilter(event.target.value)
    if (value) {
      setFilter(value); // Perbarui state
    }
  };

  const getChartFilter = async () => {
    const res = await fetch(`${ServerApi}chart`, {
      method: "GET",
    });
    const data = await res.json();
    console.log(data.results);
    setDataDropdown(data.results);
  };
  useEffect(() => {
    getChartFilter();
    if (filter) {
      console.log(filter, "ini filter di useEffect");
      getTotalData(filter);
    }
  }, [filter]); // Dipanggil setiap filter berubah
  // useEffect(()=>{
  //   getChartFilter()
  // },[])
  const pieData = {
    labels: pieChartData.map((item) => item.label),
    datasets: [
      {
        data: pieChartData.map((item) => item.value),
        backgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FFA726",
          "#26C6DA",
        ],
        hoverBackgroundColor: [
          "#FF6384",
          "#36A2EB",
          "#FFCE56",
          "#66BB6A",
          "#FFA726",
          "#26C6DA",
        ],
      },
    ],
  };
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };
  return (
    <>
      {/* <select 
  ref={selectRef} 
  className="form-control select2"
  style={{ width: '100%' }}
>
  <option value="">Pilih opsi...</option>
</select> */}
      {/* <select ref={selectRef} className="js-data-example-ajax"></select> */}
      {/* <select className="js-data-example-ajax"></select> */}
      {/* <select className="js-example-data-ajax form-control">
  <option value="3620194" selected="selected">select2/select2</option>
</select> */}
<p className="text-red-600 text-sm">Silahkan pilih filter untuk melihat chart</p>
      <select value={selectedFilter} onChange={handleChange} className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300">
        <option value="" disabled>
          Pilih Filter
        </option>{" "}
        {dataDropdown.map((el) => (
          <option key={el.nama} value={el.filter}>
            {el.nama}
          </option>
        ))}
      </select>
      <div className="w-full max-w-md mx-auto h-64 mt-6">
        <Pie data={pieData} options={options} />
      </div>
      {/* <div className="grid grid-cols-1 md:grid-cols-5 items-start px-4 xl:p-0 gap-y-4 md:gap-6">
        <div className="col-start-1 col-end-5">
          <h2 className="text-xs md:text-sm text-gray-800 font-bold tracking-wide">
            Summary Transactions
          </h2>
        </div>
        <div className="col-span-2 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 flex justify-between items-center">
            <div className="p-4 cursor-pointer border">
              <span className="text-xs text-gray-500 font-semibold">Daily</span>
              <h2 className="text-gray-800 font-bold tracking-wider">
                $ 27.80
              </h2>
            </div>
            <div className="p-4 cursor-pointer border">
              <span className="text-xs text-gray-500 font-semibold">
                Weekly
              </span>
              <h2 className="text-gray-800 font-bold tracking-wider">
                $ 192.92
              </h2>
            </div>
            <div className="p-4 cursor-pointer border">
              <span className="text-xs text-gray-500 font-semibold">
                Monthly
              </span>
              <h2 className="text-gray-800 font-bold tracking-wider">
                $ 501.10
              </h2>
            </div>
          </div>
          <canvas id="myChart" />
        </div>
        <div className="col-span-3 bg-white p-6 rounded-xl border border-gray-50 flex flex-col space-y-6">
          <div className="flex justify-between items-center">
            <h2 className="text-sm text-gray-600 font-bold tracking-wide">
              Latest Transactions
            </h2>
            <a
              href="#"
              className="px-4 py-2 text-xs bg-blue-100 text-blue-500 rounded uppercase tracking-wider font-semibold hover:bg-blue-300"
            >
              More
            </a>
          </div>
          <ul className="divide-y-2 divide-gray-100 overflow-x-auto w-full">
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
            <li className="py-3 flex justify-between text-sm text-gray-500 font-semibold">
              <p className="px-4 font-semibold">Today</p>
              <p className="px-4 text-gray-600">McDonald</p>
              <p className="px-4 tracking-wider">Cash</p>
              <p className="px-4 text-blue-600">Food</p>
              <p className="md:text-base text-gray-800 flex items-center gap-2">
                16.90
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-4 h-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </p>
            </li>
          </ul>
        </div>
      </div> */}
    </>
  );
}
