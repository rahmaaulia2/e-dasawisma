import { useEffect, useState } from "react";
import ServerApi from "../helper/ServerApi";
import Swal from "sweetalert2";
import { useNavigate, useParams } from "react-router-dom";
import { formatDate } from "../helper/formatDate";

export default function FormEdit() {
  const params = useParams();
  // console.log(params, "ini paraammmss DI FORM EDIT");
  const id = params.idDasawisma;
  const [input, setInput] = useState({
    namaLengkap: "",
    jenisKelamin: "",
    tempatLahir: "",
    tanggalLahir: "",
    // kartuKeluarga: "",
    noKKKTP: "",
    statusPerkawinan: "",
    agama: "",
    RtId: "",
    RwId: "",
    alamat: "",
    pendidikan: "",
    pekerjaan: "",
    penghasilanSebulan: "",
    dokumenKependudukan: "",
    wusKeluarga: "",
    pusKeluarga: "",
    pusKB: "",
    ibuHamilKeluarga: "",
    ibuMenyusuiKeluarga: "",
    ibuBekerjaKeluarga: "",
    balitaKeluarga: "",
    bbBayiNormal: "",
    asiBayiEkslusif: "",
    bayiPosyandu: "",
    bayiImunisasi: "",
    bbTbBayiNormal: "",
    riwayatPenyakitBayi: "",
    anakSekolah: "",
    anakTidakSekolah: "",
    anakYatimPiatu: "",
    lansia: "",
    keluargaDifabel: "",
    keluargaCacatMental: "",
    keluargaTidakMendapatkanPengobatan: "",
    bantuanPemerintah: "",
    keluargaMerokok: "",
    saranaAirBersih: "",
    jambanKeluarga: "",
    septicTank: "",
    pembuanganSampah: "",
    kriteriaRumah: "",
    statusRumah: "",
    aktivitasKeagamaan: "",
    aktivitasSosial: "",
    memilikiToga: "",
    jenisUsaha: "",
    pengeluaranBulanan: "",
    keterangan: "-",
  });
  const [file, setFile] = useState(null);
  const [filteredRT, setFilteredRT] = useState([]);
  const [dataRt, setDataRt] = useState([]);
  const navigate = useNavigate();

  const getRt = async () => {
    const response = await fetch(`${ServerApi}rt`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const data = await response.json();
    console.log(data, "ini response rt");
    setDataRt(data);
  };
  const filterRt = dataRt.find((el) => {
    const result = el.id === input.RtId;
    if (result) {
      console.log(el.id, el.nomor);
      return el.nomor;
    }
    console.log(result);
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInput((prevInput) => ({
      ...prevInput,
      [name]: value.toUpperCase(), // Ubah nilai input menjadi uppercase
    }));
    if (name === "RwId") {
      const filtered = dataRt.filter((item) => item.RWCode === parseInt(value));
      console.log(filtered, "ini filtered");
      setFilteredRT(filtered);

      // Hanya reset RtId jika filteredRT kosong
      setInput((prev) => ({
        ...prev,
        RtId: filtered.length ? prev.RtId : "",
      }));
    }
  };
  const getKKbyId = async (id) => {
    const res = await fetch(`${ServerApi}KK/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    // console.log(res, 'ini res getKKbyId')
    const data = await res.json();
    console.log(data, "ini dataaaaaaaaaaaaaaaaaaaaaaaaaa");
    setInput(data);
  };
  useEffect(() => {
    getRt();
    getKKbyId(id);
    console.log("ini page form edit ");
  }, []);
  const handleFileChange = (event) => {
    setFile(event.target.files[0]); // Simpan file yang dipilih dalam state
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = new FormData();
    Object.entries(input).forEach(([key, value]) => {
      // const upper = value.toUpperCase()
      // console.log(upper, "ini uppperr")
      form.append(key, value);
    });
    if (file) {
      form.append("kartuKeluarga", file);
    }
    // console.log(...form.entries());
    // const params = new URLSearchParams(filter).toString();
    console.log(form, "<<<<<<<<<<<<<");
    //ini editttt
    const response = await fetch(`${ServerApi}KK/${id}`, {
      method: "PATCH",
      body: form,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("access_token")}`,
      },
    });
    const res = await response.json();
    console.log(res);
    if (res.message === "Detail KK Updated") {
      Swal.fire({
        icon: "success",
        title: `Success update data`,
        text: "I will close in 2 seconds.",
        timer: 2000,
      });
      navigate("/dashboard");
    } else {
      Swal.fire({
        icon: "error",
        title: `${res.message}`,
        text: "I will close in 2 seconds.",
        timer: 2000,
      });
    }
    // setKk(data);
  };
  return (
    <>
      <section className="mt-4 mb-4 max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
        <h2 className="text-lg font-semibold text-gray-700 capitalize dark:text-white">
          Form Edit Dasawisma
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mt-4">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="emailAddress"
            >
              Nama Lengkap
            </label>
            <input
              type="text"
              name="namaLengkap"
              value={input.namaLengkap}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring uppercase"
            />
          </div>
          <div className="mt-4">
            <label
              htmlFor="selectGender"
              className="block text-sm font-medium text-gray-900"
            >
              Jenis Kelamin
            </label>

            <select
              name="jenisKelamin"
              value={input.jenisKelamin}
              onChange={handleChange}
              className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              // placeholder="Please select"
            >
              <option value="" disabled>
                Please select
              </option>
              <option value="LAKI-LAKI">Laki-laki</option>
              <option value="PEREMPUAN">Perempuan</option>
            </select>
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
                name="tempatLahir"
                value={input.tempatLahir}
                onChange={handleChange}
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
                name="tanggalLahir"
                value={formatDate(input.tanggalLahir)}
                onChange={handleChange}
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
                name="kartuKeluarga"
                // value={file}
                onChange={handleFileChange}
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
                type="number"
                name="noKKKTP"
                value={input.noKKKTP}
                onChange={handleChange}
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

              {/* <div className="relative mt-1.5">
                <input
                  type="text"
                  name="statusPerkawinan"
                value={input.statusPerkawinan}
                onChange={handleChange}
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
              </div> */}

              <select
                name="statusPerkawinan"
                value={input.statusPerkawinan}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="NIKAH TERCATAT">Nikah Tercatat</option>
                <option value="NIKAH TIDAK TERCATAT">
                  Nikah Tidak Tercatat
                </option>
                <option value="CERAI HIDUP">Cerai Hidup</option>
                <option value="CERAI MATI">Cerai Mati</option>
                <option value="LAJANG">Lajang</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectAgama"
                className="block text-sm font-medium text-gray-900"
              >
                Agama
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="agama"
                value={input.agama}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="ISLAM">Islam</option>
                <option value="KRISTEN">Kristen</option>
                <option value="KATOLIK">Katolik</option>
                <option value="HINDU">Hindu</option>
                <option value="BUDDHA">Buddha</option>
                <option value="KONGHUCHU">Konghuchu</option>
              </select>
            </div>
          </div>
          <div className="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
            <div>
              <label
                htmlFor="selectRW"
                className="block text-sm font-medium text-gray-900"
              >
                RW
              </label>

              <select
                name="RwId"
                value={input.RwId}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                {[...new Set(dataRt.map((item) => item.RWCode))].map((rw) => (
                  <option key={rw} value={rw}>
                    RW {rw}
                  </option>
                ))}
              </select>
            </div>
            <div>
              <label
                htmlFor="selectRT"
                className="block text-sm font-medium text-gray-900"
              >
                RT
              </label>

              <select
                name="RtId"
                value={input.RtId}
                onChange={handleChange}
                disabled={!filteredRT.length}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                {filteredRT.map((rt) => (
                  <option key={rt.id} value={rt.id}>
                    RT {rt.nomor || filterRt}
                  </option>
                ))}
              </select>
            </div>
            <div className="mt-4">
              <p>Selected RW ID: {input.RwId}</p>
              <p>Selected RT ID: {input.RtId}</p>
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
              name="alamat"
              value={input.alamat}
              onChange={handleChange}
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

              <select
                name="pendidikan"
                value={input.pendidikan}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="TIDAK TAMAT SD">Tidak Tamat SD</option>
                <option value="SD/MI">SD/MI</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="DIII/SARJANA">DIII/Sarjana</option>
                <option value="S2/MAGISTER">S2/Magister</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectPekerjaan"
                className="block text-sm font-medium text-gray-900"
              >
                Pekerjaan
              </label>

              <select
                name="pekerjaan"
                value={input.pekerjaan}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please Select
                </option>
                <option value="PNS/TNI/POLRI">PNS/TNI/POLRI</option>
                <option value="KARYAWAN SWASTA">Karyawan Swasta</option>
                <option value="WIRASWASTA">Wiraswasta</option>
                <option value="BURUH">Buruh</option>
                <option value="TIDAK BEKERJA">Tidak Bekerja</option>
                <option value="TENAGA HONORER/THL/TKS">
                  Tenaga Honorer/THL/TKS
                </option>
                <option value="PENSIUNAN">Pensiunan</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="penghasilanSebulan"
                value={input.penghasilanSebulan}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="RP.600.000 S/D DIBAWAH RP.2.836.398">
                  Rp.600.000 s/d dibawah Rp.2.836.398
                </option>
                <option value="DIATAS ATAU SAMA DENGAN RP.2.836.398">
                  Diatas atau sama dengan Rp.2.836.398
                </option>
                <option value="DIBAWAH RP.600.000">Dibawah Rp.600.000</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectDoc"
                className="block text-sm font-medium text-gray-900"
              >
                Dokumen Kependudukan (KTP, KK, Akta Lahir, Akta Nikah)
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="dokumenKependudukan"
                value={input.dokumenKependudukan}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please Select
                </option>
                <option value="LENGKAP">Lengkap</option>
                <option value="TIDAK LENGKAP">Tidak Lengkap</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="wusKeluarga"
                value={input.wusKeluarga}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="LEBIH DARI 2">Lebih dari 2</option>
                <option value="TIDAK ADA WUS">Tidak Ada WUS</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectPUS"
                className="block text-sm font-medium text-gray-900"
              >
                Pasangan Usia Subur (PUS) dalam Keluarga
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="pusKeluarga"
                value={input.pusKeluarga}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please Select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="pusKB"
                value={input.pusKB}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="SUAMI">Suami</option>
                <option value="ISTRI">Istri</option>
                <option value="TIDAK MENJADI AKSEPTOR KB">
                  Tidak Menjadi Akseptor KB
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectIbuHamil"
                className="block text-sm font-medium text-gray-900"
              >
                Ibu Hamil dalam Keluarga
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="ibuHamilKeluarga"
                value={input.ibuHamilKeluarga}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="ADA">Ada</option>
                <option value="TIDAK ADA">Tidak Ada</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="ibuMenyusuiKeluarga"
                value={input.ibuMenyusuiKeluarga}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="ADA">Ada</option>
                <option value="TIDAK ADA">Tidak Ada</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectIbubekerja"
                className="block text-sm font-medium text-gray-900"
              >
                Ibu Bekerja dalam Keluarga
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="ibuBekerjaKeluarga"
                value={input.ibuBekerjaKeluarga}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="ADA">Ada</option>
                <option value="TIDAK ADA">Tidak Ada</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="balitaKeluarga"
                value={input.balitaKeluarga}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="LEBIH DARI 2">Lebih dari 2</option>
                <option value="TIDAK ADA BALITA">Tidak Ada Balita</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectbbBayi"
                className="block text-sm font-medium text-gray-900"
              >
                Bayi memiliki Berat Badan Lahir Normal
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="bbBayiNormal"
                value={input.bbBayiNormal}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
                <option value="TIDAK ADA BALITA">Tidak Ada Balita</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="asiBayiEkslusif"
                value={input.asiBayiEkslusif}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
                <option value="TIDAK ADA BALITA">Tidak ada Balita</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectPosyandu"
                className="block text-sm font-medium text-gray-900"
              >
                Bayi diperiksa Setiap Bulan ke Posyandu
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="bayiPosyandu"
                value={input.bayiPosyandu}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
                <option value="TIDAK ADA BALITA">Tidak Ada Balita</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="bayiImunisasi"
                value={input.bayiImunisasi}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
                <option value="TIDAK ADA BALITA">Tidak ada Balita</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectbbtbBayi"
                className="block text-sm font-medium text-gray-900"
              >
                Bayi memiliki Berat Badan dan Tinggi Badan Normal
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="bbTbBayiNormal"
                value={input.bbTbBayiNormal}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
                <option value="TIDAK ADA BALITA">Tidak ada Balita</option>
              </select>
            </div>
          </div>
          <div className="mt-4">
            <label className="block text-sm font-medium text-gray-900">
              Riwayat Penyakit dan Keterlambatan Tumbuh Kembang Bayi (Jika Ada)
            </label>

            <div className="relative mt-1.5">
              <input
                type="text"
                name="riwayatPenyakitBayi"
                value={input.riwayatPenyakitBayi}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
                // placeholder="Please select"
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="anakSekolah"
                value={input.anakSekolah}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="TK/PAUD">TK/PAUD</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="TIDAK ADA ANAK USIA SEKOLAH">
                  Tidak Ada Anak Usia Sekolah
                </option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectAnakTidakSekolah"
                className="block text-sm font-medium text-gray-900"
              >
                Anak Usia Sekolah yang{" "}
                <span className="text-red-800">Tidak Sekolah</span>
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="anakTidakSekolah"
                value={input.anakTidakSekolah}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="TK/PAUD">TK/PAUD</option>
                <option value="SD">SD</option>
                <option value="SMP">SMP</option>
                <option value="SMA">SMA</option>
                <option value="TIDAK ADA ANAK USIA SEKOLAH YANG TIDAK SEKOLAH">
                  Tidak Ada Anak Usia Sekolah yang Tidak Sekolah
                </option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="anakYatimPiatu"
                value={input.anakYatimPiatu}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="LEBIH DARI 2">Lebih dari 2</option>
                <option value="TIDAK ADA ANAK YATIM/PIATU">
                  Tidak ada Anak Yatim/Piatu
                </option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900">
                Orangtua Lanjut Usia (LANSIA)
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="lansia"
                value={input.lansia}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="ADA">Ada</option>
                <option value="TIDAK ADA">Tidak Ada</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="keluargaDifabel"
                value={input.keluargaDifabel}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="ADA">Ada</option>
                <option value="TIDAK ADA">Tidak Ada</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectCacatMental"
                className="block text-sm font-medium text-gray-900"
              >
                Anggota Keluarga dengan Cacat Mental
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="keluargaCacatMental"
                value={input.keluargaCacatMental}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="ADA">Ada</option>
                <option value="TIDAK ADA">Tidak Ada</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="keluargaTidakMendapatkanPengobatan"
                value={input.keluargaTidakMendapatkanPengobatan}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="ADA">Ada</option>
                <option value="TIDAK ADA">Tidak Ada</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectBantuanPemerintah"
                className="block text-sm font-medium text-gray-900"
              >
                Penerima Manfaat/Bantuan Pemerintah
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="bantuanPemerintah"
                value={input.bantuanPemerintah}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-3 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="PKH">PKH</option>
                <option value="BPNT">BPNT</option>
                <option value="KIS">KIS</option>
                <option value="KIP">KIP</option>
                <option value="KARTU CERDAS">KARTU CERDAS</option>
                <option value="RASTRADA">RASTRADA</option>
                <option value="BUKAN PENERIMA MANFAAT/BANTUAN">
                  Bukan Penerima Manfaat/Bantuan
                </option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="keluargaMerokok"
                value={input.keluargaMerokok}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="ADA">Ada</option>
                <option value="TIDAK ADA">Tidak Ada</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectAirBersih"
                className="block text-sm font-medium text-gray-900"
              >
                Sumber Sarana Air Bersih
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="saranaAirBersih"
                value={input.saranaAirBersih}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="PDAM">PDAM</option>
                <option value="SUMUR">Sumur</option>
                <option value="AIR HUJAN">Air Hujan</option>
                <option value="AIR SUNGAI">Air Sungai</option>
              </select>
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
              {/* 
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
              </div> */}

              <select
                name="jambanKeluarga"
                value={input.jambanKeluarga}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectSeptictank"
                className="block text-sm font-medium text-gray-900"
              >
                Memiliki Septictank
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="septicTank"
                value={input.septicTank}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="pembuanganSampah"
                value={input.pembuanganSampah}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectKriteriaRumah"
                className="block text-sm font-medium text-gray-900"
              >
                Kriteria Rumah
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="kriteriaRumah"
                value={input.kriteriaRumah}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="SEHAT LAYAK HUNI">Sehat Layak Huni</option>
                <option value="LAYAK HUNI">Layak Huni</option>
                <option value="TIDAK LAYAK HUNI">Tidak Layak Huni</option>
              </select>
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
              <select
                name="statusRumah"
                value={input.statusRumah}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="MILIK SENDIRI">Milik Sendiri</option>
                <option value="SEWA">Sewa</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectAktivitasKeagamaan"
                className="block text-sm font-medium text-gray-900"
              >
                Mengikuti Aktivitas Keagaaman di Lingkungan Sekitar
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="aktivitasKeagamaan"
                value={input.aktivitasKeagamaan}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
              </select>
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

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="aktivitasSosial"
                value={input.aktivitasSosial}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
              </select>
            </div>
            <div>
              <label
                htmlFor="selectToga"
                className="block text-sm font-medium text-gray-900"
              >
                Memiliki Tanaman Obat Keluarga (TOGA)
              </label>

              {/* <div className="relative mt-1.5">
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
              </div> */}

              <select
                name="memilikiToga"
                value={input.memilikiToga}
                onChange={handleChange}
                className="block w-full px-3 py-2 mt-2 text-sm text-gray-600 bg-white border border-gray-200 rounded-lg file:bg-gray-200 file:text-gray-700 file:text-sm file:px-4 file:py-1 file:border-none file:rounded-full dark:file:bg-gray-800 dark:file:text-gray-200 dark:text-gray-300 placeholder-gray-400/70 dark:placeholder-gray-500 focus:border-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-40 dark:border-gray-600 dark:bg-gray-900 dark:focus:border-blue-300"
              >
                <option value="" disabled>
                  Please select
                </option>
                <option value="YA">Ya</option>
                <option value="TIDAK">Tidak</option>
              </select>
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
              name="jenisUsaha"
              value={input.jenisUsaha}
              onChange={handleChange}
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
              name="pengeluaranBulanan"
              value={input.pengeluaranBulanan}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring uppercase"
              placeholder="Contoh: Rp 1.000.000"
            />
          </div>
          <div className="mt-4">
            <label
              className="block text-sm font-medium text-gray-900"
              htmlFor="pengeluaranBulanan"
            >
              Keterangan
            </label>
            <input
              type="text"
              name="keterangan"
              value={input.keterangan}
              onChange={handleChange}
              className="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-200 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-400 focus:ring-blue-300 focus:ring-opacity-40 dark:focus:border-blue-300 focus:outline-none focus:ring uppercase"
              placeholder="Keterangan"
            />
          </div>

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="px-8 py-2.5 leading-5 text-white transition-colors duration-300 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600"
            >
              Save
            </button>
          </div>
        </form>
      </section>
    </>
  );
}
