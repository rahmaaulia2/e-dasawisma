export default function Form() {
  return (
    <>
      <section className="mt-4 mb-4 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Form Dasawisma
        </h2>
        <form>
          
          <div className="mt-4">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="emailAddress"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="selectGender"
              className="block text-sm font-medium text-gray-900"
            >
              Jenis Kelamin
            </label>

            <div className="relative mt-1.5">
              <input
                type="text"
                list="selectGenderList"
                id="selectGender"
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                placeholder="Please select"
              />

              <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="size-5 text-gray-500"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                  />
                </svg>
              </span>
            </div>

            <datalist name="selectGender" id="selectGenderList">
              <option value="Laki-laki">Laki-laki</option>
              <option value="Perempuan">Perempuan</option>
            </datalist>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                className="block text-sm font-medium text-gray-900"
                htmlFor="text"
              >
                Tempat Lahir
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
            <div>
              <label
                htmlFor="Birthday"
                className="block text-sm font-medium text-gray-900"
              >
                Tanggal Lahir
              </label>
              <input
                type="date"
                // placeholder="John Doe"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div className="">
              <label
                htmlFor="image"
                className="block text-sm font-medium text-gray-900"
              >
                Kartu Keluarga
              </label>
              <input
                type="file"
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              />
            </div>
            <div className="">
              <label
                className="block text-sm font-medium text-gray-900"
                htmlFor="username"
              >
                Nomor Kartu Keluarga/KTP
              </label>
              <input
                type="text"
                className="block w-full px-3 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="SelectPerkawinan"
                className="block text-sm font-medium text-gray-900"
              >
                Status Perkawinan
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="SelectPerkawinanList"
                  id="SelectPerkawinan"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="SelectPerkawinan" id="SelectPerkawinanList">
                <option value="Nikah Tercatat">Nikah Tercatat</option>
                <option value="Nikah Tidak Tercatat">
                  Nikah Tidak Tercatat
                </option>
                <option value="Cerai Hidup">Cerai Hidup</option>
                <option value="Cerai Mati">Cerai Mati</option>
                <option value="Lajang">Lajang</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectAgama"
                className="block text-sm font-medium text-gray-900"
              >
                Agama
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectAgamaList"
                  id="selectAgama"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectAgama" id="selectAgamaList">
                <option value="Islam">Islam</option>
                <option value="Kristen">Kristen</option>
                <option value="Katolik">Katolik</option>
                <option value="Hindu">Hindu</option>
                <option value="Buddha">Buddha</option>
                <option value="Konghuchu">Konghuchu</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectRT"
                className="block text-sm font-medium text-gray-900"
              >
                RT
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectRTList"
                  id="selectRT"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectRw" id="selectRTList">
                <option value="001">001</option>
                <option value="002">002</option>
                <option value="003">003</option>
                <option value="004">004</option>
                <option value="005">005</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectRW"
                className="block text-sm font-medium text-gray-900"
              >
                RW
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectRWList"
                  id="selectRW"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectRW" id="selectRWList">
                <option value="001">001</option>
                <option value="002">002</option>
                <option value="003">003</option>
                <option value="004">004</option>
                <option value="005">005</option>
                <option value="006">006</option>
                <option value="007">007</option>
              </datalist>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="alamat"
            >
              Alamat
            </label>
            <textarea
              id="alamat"
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
            />
          </div>
          
          
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectPendidikan"
                className="block text-sm font-medium text-gray-900"
              >
                Pendidikan
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectPendidikanList"
                  id="selectPendidikan"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectPendidikan" id="selectPendidikanList">
                <option value="Tidak Tamat SD">Tidak Tamat SD</option>
                <option value="SD/MI">SD/MI</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="DIII/Sarjana">DIII/Sarjana</option>
                <option value="S2/Magister">S2/Magister</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectPekerjaan"
                className="block text-sm font-medium text-gray-900"
              >
                Pekerjaan
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectPekerjaanList"
                  id="selectPekerjaan"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectPekerjaan" id="selectPekerjaanList">
                <option value="PNS/TNI/POLRI">PNS/TNI/POLRI</option>
                <option value="Karyawan Swasta">Karyawan Swasta</option>
                <option value="Wiraswasta">Wiraswasta</option>
                <option value="Buruh">Buruh</option>
                <option value="Tidak Bekerja">Tidak Bekerja</option>
                <option value="Tenaga Honorer/THL/TKS">
                  Tenaga Honorer/THL/TKS
                </option>
                <option value="Pensiunan">Pensiunan</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectPenghasilan"
                className="block text-sm font-medium text-gray-900"
              >
                Jumlah Penghasilan dalam Sebulan (dalam Rupiah)
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectPenghasilanList"
                  id="selectPenghasilan"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectPenghasilan" id="selectPenghasilanList">
                <option value="Rp.600.000 s/d dibawah Rp.2.836.398">
                  Rp.600.000 s/d dibawah Rp.2.836.398
                </option>
                <option value="Diatas atau sama dengan Rp.2.836.398">
                  Diatas atau sama dengan Rp.2.836.398
                </option>
                <option value="Dibawah Rp.600.000">Dibawah Rp.600.000</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectDoc"
                className="block text-sm font-medium text-gray-900"
              >
                Dokumen Kependudukan (KTP, KK, Akta Lahir, Akta Nikah)
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectDocList"
                  id="selectDoc"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectDoc" id="selectDocList">
                <option value="Lengkap">Lengkap</option>
                <option value="Tidak Lengkap">Tidak Lengkap</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectWUS"
                className="block text-sm font-medium text-gray-900"
              >
                Wanita Usia Subur (WUS) dalam Keluarga
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectWUSList"
                  id="selectWUS"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectWUS" id="selectWUSList">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="Lebih dari 2">Lebih dari 2</option>
                <option value="Tidak Ada WUS">Tidak Ada WUS</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectPUS"
                className="block text-sm font-medium text-gray-900"
              >
                Pasangan Usia Subur (PUS) dalam Keluarga
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectPUSList"
                  id="selectPUS"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectPUS" id="selectPUSList">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectAkseptor"
                className="block text-sm font-medium text-gray-900"
              >
                PUS Menjadi Akseptor KB
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectAkseptorList"
                  id="selectAkseptor"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectAkseptor" id="selectAkseptorList">
                <option value="Suami">Suami</option>
                <option value="Istri">Istri</option>
                <option value="Tidak Menjadi Akseptor KB">
                  Tidak Menjadi Akseptor KB
                </option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectIbuHamil"
                className="block text-sm font-medium text-gray-900"
              >
                Ibu Hamil dalam Keluarga
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectIbuHamilList"
                  id="selectIbuHamil"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectIbuHamil" id="selectIbuHamilList">
                <option value="Ada">Ada</option>
                <option value="Tidak Ada">Tidak Ada</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectIbuMenyusui"
                className="block text-sm font-medium text-gray-900"
              >
                Ibu Menyusui dalam Keluarga
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectIbuMenyusuiList"
                  id="selectIbuMenyusui"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectIbuMenyusui" id="selectIbuMenyusuiList">
                <option value="Ada">Ada</option>
                <option value="Tidak Ada">Tidak Ada</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectIbubekerja"
                className="block text-sm font-medium text-gray-900"
              >
                Ibu Bekerja dalam Keluarga
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectIbubekerjaList"
                  id="selectIbubekerja"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectIbubekerja" id="selectIbubekerjaList">
                <option value="Ada">Ada</option>
                <option value="Tidak Ada">Tidak Ada</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectJumlahBalita"
                className="block text-sm font-medium text-gray-900"
              >
                Jumlah Balita dalam Keluarga
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectJumlahBalitaList"
                  id="selectJumlahBalita"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectJumlahBalita" id="selectJumlahBalitaList">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="Lebih dari 2">Lebih dari 2</option>
                <option value="Tidak Ada Balita">Tidak Ada Balita</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectbbBayi"
                className="block text-sm font-medium text-gray-900"
              >
                Bayi memiliki Berat Badan Lahir Normal
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectbbBayiList"
                  id="selectbbBayi"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectbbBayi" id="selectbbBayiList">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
                <option value="Tidak Ada Balita">Tidak Ada Balita</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectAsiBayi"
                className="block text-sm font-medium text-gray-900"
              >
                Bayi diberikan Asi Ekslusif
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectAsiBayiList"
                  id="selectAsiBayi"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectAsiBayi" id="selectAsiBayiList">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
                <option value="Tidak ada Balita">Tidak ada Balita</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectPosyandu"
                className="block text-sm font-medium text-gray-900"
              >
                Bayi diperiksa Setiap Bulan ke Posyandu
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectPosyanduList"
                  id="selectPosyandu"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectPosyandu" id="selectPosyanduList">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
                <option value="Tidak Ada Balita">Tidak Ada Balita</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectImunisasi"
                className="block text-sm font-medium text-gray-900"
              >
                Bayi mendapatkan Imunisasi Dasar Lengkap
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectImunisasiList"
                  id="selectImunisasi"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectImunisasi" id="selectImunisasiList">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
                <option value="Tidak ada Balita">Tidak ada Balita</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectbbtbBayi"
                className="block text-sm font-medium text-gray-900"
              >
                Bayi memiliki Berat Badan dan Tinggi Badan Normal
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectbbtbBayiList"
                  id="selectbbtbBayi"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectbbtbBayi" id="selectbbtbBayiList">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
                <option value="Tidak ada Balita">Tidak ada Balita</option>
              </datalist>
            </div>
          </div>
          <div className="mt-4">
            <label
              htmlFor="selectImunisasi"
              className="block text-sm font-medium text-gray-900"
            >
              Riwayat Penyakit dan Keterlambatan Tumbuh Kembang Bayi (Jika Ada)
            </label>

            <div className="relative mt-1.5">
              <input
                type="text"
                list="selectImunisasiList"
                id="selectImunisasi"
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                placeholder="Please select"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectUsiaAnak"
                className="block text-sm font-medium text-gray-900"
              >
                Anak Usia Sekolah dalam Keluarga
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectUsiaAnakList"
                  id="selectUsiaAnak"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectUsiaAnak" id="selectUsiaAnakList">
                <option value="TK/PAUD">TK/PAUD</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="Tidak Ada Anak Usia Sekolah">
                  Tidak Ada Anak Usia Sekolah
                </option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectAnakTidakSekolah"
                className="block text-sm font-medium text-gray-900"
              >
                Anak Usia Sekolah yang{" "}
                <span className="text-red-800">Tidak Sekolah</span>
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectAnakTidakSekolahList"
                  id="selectAnakTidakSekolah"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist
                name="selectAnakTidakSekolah"
                id="selectAnakTidakSekolahList"
              >
                <option value="TK/PAUD">TK/PAUD</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="Tidak Ada Anak Usia Sekolah yang Tidak Sekolah">
                  Tidak Ada Anak Usia Sekolah yang Tidak Sekolah
                </option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectAnakYatim"
                className="block text-sm font-medium text-gray-900"
              >
                Anak Yatim/Piatu dalam Keluarga
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectAnakYatimList"
                  id="selectAnakYatim"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectAnakYatim" id="selectAnakYatimList">
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="Lebih dari 2">Lebih dari 2</option>
                <option value="Tidak ada Anak Yatim/Piatu">
                  Tidak ada Anak Yatim/Piatu
                </option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectLansia"
                className="block text-sm font-medium text-gray-900"
              >
                Orangtua Lanjut Usia (LANSIA)
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectLansiaList"
                  id="selectLansia"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectLansia" id="selectLansiaList">
                <option value="Ada">Ada</option>
                <option value="Tidak Ada">Tidak Ada</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectDifabel"
                className="block text-sm font-medium text-gray-900"
              >
                Anggota Keluarga dengan Difabel
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectDifabelList"
                  id="selectDifabel"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectDifabel" id="selectDifabelList">
                <option value="Ada">Ada</option>
                <option value="Tidak Ada">Tidak Ada</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectCacatMental"
                className="block text-sm font-medium text-gray-900"
              >
                Anggota Keluarga dengan Cacat Mental
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectCacatMentalList"
                  id="selectCacatMental"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectCacatMental" id="selectCacatMentalList">
                <option value="Ada">Ada</option>
                <option value="Tidak Ada">Tidak Ada</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectKeluargaSakit"
                className="block text-sm font-medium text-gray-900"
              >
                Anggota Keluarga Sakit yang Tidak Mendapatkan Pengobatan
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectKeluargaSakitList"
                  id="selectKeluargaSakit"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectKeluargaSakit" id="selectKeluargaSakitList">
                <option value="Ada">Ada</option>
                <option value="Tidak Ada">Tidak Ada</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectBantuanPemerintah"
                className="block text-sm font-medium text-gray-900"
              >
                Penerima Manfaat/Bantuan Pemerintah
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectBantuanPemerintahList"
                  id="selectBantuanPemerintah"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist
                name="selectBantuanPemerintah"
                id="selectBantuanPemerintahList"
              >
                <option value="PKH">PKH</option>
                <option value="BPNT">BPNT</option>
                <option value="KIS">KIS</option>
                <option value="KIP">KIP</option>
                <option value="KARTU CERDAS">KARTU CERDAS</option>
                <option value="RASTRADA">RASTRADA</option>
                <option value="Bukan Penerima Manfaat/Bantuan">
                  Bukan Penerima Manfaat/Bantuan
                </option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectKeluargaMerokok"
                className="block text-sm font-medium text-gray-900"
              >
                Anggota Keluarga yang Merokok
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectKeluargaMerokokList"
                  id="selectKeluargaMerokok"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist
                name="selectKeluargaMerokok"
                id="selectKeluargaMerokokList"
              >
                <option value="Ada">Ada</option>
                <option value="Tidak Ada">Tidak Ada</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectAirBersih"
                className="block text-sm font-medium text-gray-900"
              >
                Sumber Sarana Air Bersih
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectAirBersihList"
                  id="selectAirBersih"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectAirBersih" id="selectAirBersihList">
                <option value="PDAM">PDAM</option>
                <option value="Sumur">Sumur</option>
                <option value="Air Hujan">Air Hujan</option>
                <option value="Air Sungai">Air Sungai</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectJamban"
                className="block text-sm font-medium text-gray-900"
              >
                Memiliki Jamban Keluarga
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectJambanList"
                  id="selectJamban"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectJamban" id="selectJambanList">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectSeptictank"
                className="block text-sm font-medium text-gray-900"
              >
                Memiliki Septictank
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectSeptictankList"
                  id="selectSeptictank"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectSeptictank" id="selectSeptictankList">
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectPembuanganSampah"
                className="block text-sm font-medium text-gray-900"
              >
                Memiliki Tempat Pembuangan Sampah
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectPembuanganSampahList"
                  id="selectPembuanganSampah"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist
                name="selectPembuanganSampah"
                id="selectPembuanganSampahList"
              >
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectKriteriaRumah"
                className="block text-sm font-medium text-gray-900"
              >
                Kriteria Rumah
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectKriteriaRumahList"
                  id="selectKriteriaRumah"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectKriteriaRumah" id="selectKriteriaRumahList">
                <option value="Sehat Layak Huni">Sehat Layak Huni</option>
                <option value="Layak Huni">Layak Huni</option>
                <option value="Tidak Layak Huni">Tidak Layak Huni</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectStatusRumah"
                className="block text-sm font-medium text-gray-900"
              >
                Status Kepemilikan Rumah
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectStatusRumahList"
                  id="selectStatusRumah"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist name="selectStatusRumah" id="selectStatusRumahList">
                <option value="Milik Sendiri">Milik Sendiri</option>
                <option value="Sewa">Sewa</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectAktivitasKeagamaan"
                className="block text-sm font-medium text-gray-900"
              >
                Mengikuti Aktivitas Keagaaman di Lingkungan Sekitar
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectAktivitasKeagamaanList"
                  id="selectAktivitasKeagamaan"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist
                name="selectAktivitasKeagamaan"
                id="selectAktivitasKeagamaanList"
              >
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </datalist>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectAktivitasSosial"
                className="block text-sm font-medium text-gray-900"
              >
                Mengikuti Aktivitas Sosial di Lingkungan Sekitar
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectAktivitasSosialList"
                  id="selectAktivitasSosial"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist
                name="selectAktivitasSosial"
                id="selectAktivitasSosialList"
              >
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </datalist>
            </div>
            <div>
              <label
                htmlFor="selectToga"
                className="block text-sm font-medium text-gray-900"
              >
                Memiliki Tanaman Obat Keluarga (TOGA)
              </label>

              <div className="relative mt-1.5">
                <input
                  type="text"
                  list="selectTogaList"
                  id="selectToga"
                  className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                  placeholder="Please select"
                />

                <span className="absolute inset-y-0 end-0 flex w-8 items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="size-5 text-gray-500"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
                    />
                  </svg>
                </span>
              </div>

              <datalist
                name="selectToga"
                id="selectTogaList"
              >
                <option value="Ya">Ya</option>
                <option value="Tidak">Tidak</option>
              </datalist>
            </div>
          </div>
          <div className="mt-4">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="usahaPeningkatanPendapatan"
            >
              Memiliki Usaha Peningkatan Pendapatan Keluarga (UP2K) atau UMKM
              (Sebutkan Jenis Usaha yang Dimiliki)
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              placeholder="Contoh: Usaha Ternak Ayam, Usaha Kecil Kerajinan Tangan"
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="pengeluaranBulanan"
            >
              Jumlah Pengeluaran dalam Satu Bulan
            </label>
            <input
              type="text"
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring"
              placeholder="Contoh: Rp 1.000.000"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
