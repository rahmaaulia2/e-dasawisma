export default function Statistic() {
  return (
    <>
      <div className="mx-auto max-w-screen-xl px-4 py-8 sm:px-6 sm:py-12 lg:px-8 mt-32">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl">
            Kader Dasawisma
          </h2>

          <p className="mt-4 text-gray-500 sm:text-xl">
            Database Kecamatan Warudoyong ini untuk menjelaskan jumlah warga yang berada di wilayah kecamatan warudoyong dan di distribusikan untuk semua kelurahan.
            {/* Data Kader Dasawisma di Kelurahan Warudoyong pada tahun 2023/2024.
            Bagian ini menjelaskan jumlah kader Dasawisma se-Kecamatan ini dan
            distribusi kader per kelurahan Warudoyong */}
          </p>
        </div>

        <dl className="mt-6 grid grid-cols-1 gap-4 sm:mt-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Baros
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              55
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Cibereum
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              64
            </dd>
          </div>

          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Cikole
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              87
            </dd>
          </div>
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Citamiang
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              35
            </dd>
          </div>
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Gunung Puyuh
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              75
            </dd>
          </div>
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Lembursitu
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              84
            </dd>
          </div>
          <div className="flex flex-col rounded-lg bg-blue-50 px-4 py-8 text-center">
            <dt className="order-last text-lg font-medium text-gray-500">
              Warudoyong
            </dt>

            <dd className="text-4xl font-extrabold text-blue-600 md:text-5xl">
              82
            </dd>
          </div>
        </dl>
      </div>
    </>
  );
}
