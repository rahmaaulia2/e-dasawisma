export default function Statistic() {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Kader Dasawisma
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            Data Kader Dasawisma di Kelurahan Warudoyong pada tahun 2023/2024.
            Bagian ini menjelaskan jumlah kader Dasawisma se-Kecamatan ini 
            dan distribusi kader per kelurahan Warudoyong
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Warudoyong
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              55
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
            Warudoyong
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              64
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
            Warudoyong
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              87
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
            Warudoyong
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              86
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
