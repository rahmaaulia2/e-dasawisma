import { useEffect, useState } from "react";

export default function Statistic({ data }) {
  const [datarw, setData] = useState([]);

  useEffect(() => {
    setData(data);
  }, [data]);

  return (
    <div className="w-full px-4 py-8 sm:px-6 lg:px-8 mt-16 sm:mt-20 lg:mt-24">
      <div className="mx-auto max-w-2xl lg:max-w-3xl text-center">
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
          Warga Dasawisma Kelurahan Warudoyong
        </h2>
        <p className="mt-3 sm:mt-4 text-sm sm:text-base lg:text-lg text-gray-500">
          Data ini berisi informasi total jumlah warga di Kelurahan Warudoyong 
          yang tercatat melalui kegiatan dasawisma pada masing-masing RW.
        </p>
      </div>

      <div className="mt-8 sm:mt-12 lg:mt-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 mx-auto max-w-6xl">
          {datarw?.map((item, index) => (
            <div 
              key={index}
              className="flex flex-col rounded-lg bg-blue-50 px-4 py-6 text-center transform transition duration-300 hover:shadow-lg hover:-translate-y-1"
            >
              <dt className="order-last text-base sm:text-lg font-medium text-gray-500 mt-2">
                RW {item.nomor}
              </dt>
              <dd className="text-3xl sm:text-4xl font-extrabold text-blue-600">
                {item.count}
              </dd>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}