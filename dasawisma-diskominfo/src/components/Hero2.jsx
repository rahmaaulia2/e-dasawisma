export default function Hero2() {
  return (
    <>
      <div className="relative bg-yellow-50">
        <div className="container max-h-screen px-6 pt-32 md:px-12 lg:pt-[4.8rem] lg:px-7">
          <div className="flex items-center flex-wrap px-2 md:px-0">
            <div className="relative lg:w-6/12 lg:py-24 xl:py-32">
              <h1 className="font-bold text-4xl text-yellow-900 md:text-5xl lg:w-10/12">
              Digitalisasi, Langkah Menuju Harmoni
              </h1>
              <p className="mt-8 text-gray-700 lg:w-10/12">
                Sit amet consectetur adipisicing elit.{" "}
                <a href="#" className="text-yellow-700">
                  connection
                </a>{" "}
                tenetur nihil quaerat suscipit, sunt dignissimos.
              </p>
            </div>
            <div className="ml-auto -mb-24 lg:-mb-56 lg:w-6/12">
              <img
                src="family.png"
                className="relative"
                alt="food illustration"
                loading="lazy"
                width={4500}
                height={4500}
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
