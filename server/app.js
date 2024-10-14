/**
 * npx sequelize-cli model:generate --name Kecamatan --attributes name:string
 * npx sequelize-cli seed:generate --name seed-Kecamatan
 *
 * npx sequelize-cli model:generate --name Kelurahan --attributes name:string,KecamatanId:integer
 * npx sequelize-cli seed:generate --name seed-Kelurahan
 *
 * npx sequelize-cli model:generate --name User --attributes name:string,email:string,noHp:string,alamat:string,KecamatanId:integer,KelurahanId:integer,role:string,password:string
 * npx sequelize-cli seed:generate --name seed-User
 *
 * npx sequelize-cli model:generate --name DetailKK --attributes UserId:integer,KelurahanId:integer,namaLengkap:string,jenisKelamin:string,tempatLahir:string,tanggalLahir:date,kartuKeluarga:string,noKKKTP:string,statusPerkawinan:string,agama:string,rt:string,rw:string,alamat:string,pendidikan:string,pekerjaan:string,penghasilanSebulan:string,dokumenKependudukan:string,wusKeluarga:string,pusKeluarga:string,pusKB:string,ibuHamilKeluarga:string,ibuMenyusuiKeluarga:string,ibuBekerjaKeluarga:string,balitaKeluarga:string,bbBayiNormal:string,asiBayiEkslusif:string,bayiPosyandu:string,bayiImunisasi:string,bbTbBayiNormal:string,riwayatPenyakitBayi:string,anakSekolah:string,anakTidakSekolah:string,anakYatimPiatu:string,lansia:string,keluargaDifabel:string,keluargaCacatMental:string,keluargaTidakMendapatkanPengobatan:string,bantuanPemerintah:string,keluargaMerokok:string,saranaAirBersih:string,jambanKeluarga:string,septicTank:string,pembuanganSampah:string,kriteriaRumah:string,statusRumah:string,aktivitasKeagamaan:string,aktivitasSosial:string,memilikiToga:string,jenisUsaha:string,pengeluaranBulanan:string,keterangan:string
 */

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}
const express = require("express");
const router = require("./routes");
const cors = require("cors");
const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/", router);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});

module.exports = app;
