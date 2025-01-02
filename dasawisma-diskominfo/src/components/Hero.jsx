export default function Hero() {
  return (
    <div className="relative bg-yellow-50">
      <div className="container mx-auto px-4 pt-20 sm:px-6 lg:px-8">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between">
          {/* Text Content */}
          <div className="w-full md:w-1/2 text-center md:text-left px-4 md:px-0 mt-8 md:mt-0">
            <h1 className="font-bold text-3xl sm:text-4xl lg:text-5xl text-yellow-900 max-w-xl mx-auto md:mx-0">
              Digitalisasi, Langkah Menuju Harmoni
            </h1>
            <p className="mt-4 sm:mt-6 lg:mt-8 text-gray-700 text-base sm:text-lg max-w-xl mx-auto md:mx-0">
              Solusi{" "}
              <a href="#" className="text-yellow-700 hover:text-yellow-600 transition-colors">
                digital
              </a>{" "}
              yang mempermudah pengelolaan data dan aktivitas dasawisma, mendorong
              kolaborasi menuju lingkungan yang lebih harmonis dan berdaya.
            </p>
          </div>

          {/* Image */}
          <div className="w-full md:w-1/2 flex justify-center md:justify-end">
            <img
              src="ds.png"
              className="w-full max-w-md lg:max-w-lg xl:max-w-xl object-contain"
              alt="Dasawisma illustration"
              loading="lazy"
              width={400}
              height={400}
            />
          </div>
        </div>
      </div>
    </div>
  );
}