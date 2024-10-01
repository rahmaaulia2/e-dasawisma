export default function Hero() {
  return (
    <>
      <div className="max-w-7xl mx-auto relative ">
        <div className="relative py-16 flex justify-center px-4 sm:px-0">
          <div className="max-w-3xl text-center">
            <div className="pb-4">
              <span className="inline-flex items-center rounded-2xl bg-lime-100 px-4 py-1.5 text-xs sm:text-sm font-serif font-medium text-lime-700">
              Digitalisasi Dasawisma, Langkah Menuju Harmoni
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-semibold text-gray-900 xl:text-6xl font-serif !leading-tight">
              E-Dasawisma
            </h1>
            <p
              className="mt-4 text-lg sm:text-xl leading-8 text-gray-800 sm:px-16"
              style={{ whiteSpace: "pre-line" }}
            >
              Empower your classroom with cutting-edge AI technology. Whether
              it's lesson planning or creating interactive learning materials,
              our AI service has got you covered.
            </p>
            <div className="mt-8 flex w-full space-x-8 justify-center">
              <a href="/exercises">
                <button className="inline-flex items-center justify-center px-4 py-2.5 border border-transparent text-sm font-medium rounded-md shadow-sm focus:outline-none ring-2 ring-offset-2 ring-transparent ring-offset-transparent disabled:bg-gray-400 appearance-none text-white bg-lime-600 hover:bg-lime-700 focus:ring-lime-500 focus:ring-offset-white !px-12 !shadow-lg !rounded-full !text-base">
                  <p>Start now for free</p>
                </button>
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
