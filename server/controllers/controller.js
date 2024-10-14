const { comparePassword } = require("../helper/bcrypt");
const { generateToken } = require("../helper/jwt");
const { User, DetailKK } = require("../models");

class Controller {
  static async login(req, res) {
    try {
      const { nama, password } = req.body;
      const user = await User.findOne({ where: { nama } });
      if (!user) {
        throw { message: "Invalid Username/Password" };
      }
      const isValidPassword = comparePassword(password, user.password);
      if (!isValidPassword) {
        throw { message: "Invalid Username/Password" };
      }
      const access_token = await generateToken(user);
      res.status(200).json({ access_token });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async addUser(req, res) {
    try {
      const {
        nama,
        email,
        noHp,
        alamat,
        KecamatanId,
        KelurahanId,
        role,
        password,
      } = req.body;
      const user = await User.create({
        nama,
        email,
        noHp,
        alamat,
        KecamatanId,
        KelurahanId,
        role,
        password,
      });
      res.status(201).json({ message: "User Created" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!user) {
        throw { message: "User Not Found" };
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      if (error.message === "User Not Found") {
        res.status(404).json({ message: "User Not Found" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async updateUser(req, res) {
    try {
      const {
        nama,
        email,
        noHp,
        alamat,
        KecamatanId,
        KelurahanId,
        role,
        password,
      } = req.body;
      const { userId } = req.params;
      const user = await User.update(
        {
          nama,
          email,
          noHp,
          alamat,
          KecamatanId,
          KelurahanId,
          role,
          password,
        },
        {
          where: { id: userId },
        }
      );
      if (!user) {
        throw { message: "User Not Found" };
      }
      res.status(200).json({ message: "User Updated" });
    } catch (error) {
      console.log(error);
      if (error.message === "User Not Found") {
        res.status(404).json({ message: "User Not Found" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async deleteUser(req, res) {
    try {
      const { userId } = req.params;
      const user = await User.findByPk(userId);
      if (!user) {
        throw { message: "User Not Found" };
      }
      await user.destroy();
      res.status(200).json({ message: "User Deleted" });
    } catch (error) {
      console.log(error);
      if (error.message === "User Not Found") {
        res.status(404).json({ message: "User Not Found" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getProfile(req, res) {
    try {
      const { id } = req.user;
      const user = await User.findByPk(id, {
        attributes: { exclude: ["password", "createdAt", "updatedAt"] },
      });
      if (!user) {
        throw { message: "User Not Found" };
      }
      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async addDetailKK(req, res) {
    try {
      const { id } = req.user;
      const findUser = await User.findByPk(id);
      const KelurahanId = findUser.KelurahanId;
      const {
        namaLengkap,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        noKKKTP,
        statusPerkawinan,
        agama,
        rt,
        rw,
        alamat,
        pendidikan,
        pekerjaan,
        penghasilanSebulan,
        dokumenKependudukan,
        wusKeluarga,
        pusKeluarga,
        pusKB,
        ibuHamilKeluarga,
        ibuMenyusuiKeluarga,
        ibuBekerjaKeluarga,
        balitaKeluarga,
        bbBayiNormal,
        asiBayiEkslusif,
        bayiPosyandu,
        bayiImunisasi,
        bbTbBayiNormal,
        riwayatPenyakitBayi,
        anakSekolah,
        anakTidakSekolah,
        anakYatimPiatu,
        lansia,
        keluargaDifabel,
        keluargaCacatMental,
        keluargaTidakMendapatkanPengobatan,
        bantuanPemerintah,
        keluargaMerokok,
        saranaAirBersih,
        jambanKeluarga,
        septicTank,
        pembuanganSampah,
        kriteriaRumah,
        statusRumah,
        aktivitasKeagamaan,
        aktivitasSosial,
        memilikiToga,
        jenisUsaha,
        pengeluaranBulanan,
        keterangan
      } = req.body;
      // const jenisKelamin = dataForm.jenisKelamin
      // const tempatLahir = dataForm.tempatLahir
      // const tanggalLahir = dataForm.tanggalLahir
      const kartuKeluargaName = req.file.originalname; //file
      await DetailKK.create({
        UserId: id,
        KelurahanId,
        namaLengkap,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        kartuKeluarga: kartuKeluargaName,
        noKKKTP,
        statusPerkawinan,
        agama,
        rt,
        rw,
        alamat,
        pendidikan,
        pekerjaan,
        penghasilanSebulan,
        dokumenKependudukan,
        wusKeluarga,
        pusKeluarga,
        pusKB,
        ibuHamilKeluarga,
        ibuMenyusuiKeluarga,
        ibuBekerjaKeluarga,
        balitaKeluarga,
        bbBayiNormal,
        asiBayiEkslusif,
        bayiPosyandu,
        bayiImunisasi,
        bbTbBayiNormal,
        riwayatPenyakitBayi,
        anakSekolah,
        anakTidakSekolah,
        anakYatimPiatu,
        lansia,
        keluargaDifabel,
        keluargaCacatMental,
        keluargaTidakMendapatkanPengobatan,
        bantuanPemerintah,
        keluargaMerokok,
        saranaAirBersih,
        jambanKeluarga,
        septicTank,
        pembuanganSampah,
        kriteriaRumah,
        statusRumah,
        aktivitasKeagamaan,
        aktivitasSosial,
        memilikiToga,
        jenisUsaha,
        pengeluaranBulanan,
        keterangan
      });
      res.status(201).json({ message: "Success input dasawisma" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getDetailKK(req, res) {
    try {
      const { idKK } = req.params;
      const detailKK = await DetailKK.findByPk(idKK, {
        attributes: { exclude: ["createdAt", "updatedAt"] },
      });
      if (!detailKK) {
        throw { name: "DetailKKNotFound" };
      }
      res.status(200).json(detailKK);
    } catch (error) {
      console.log(error);
      if (error.name === "DetailKKNotFound") {
        res.status(404).json({ message: "Detail KK Not Found" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async updateDetailKK(req, res) {
    try {
      const { idKK } = req.params;
      const {
        namaLengkap,
        jenisKelamin,
        tempatLahir,
        tanggalLahir,
        noKKKTP,
        statusPerkawinan,
        agama,
        rt,
        rw,
        alamat,
        pendidikan,
        pekerjaan,
        penghasilanSebulan,
        dokumenKependudukan,
        wusKeluarga,
        pusKeluarga,
        pusKB,
        ibuHamilKeluarga,
        ibuMenyusuiKeluarga,
        ibuBekerjaKeluarga,
        balitaKeluarga,
        bbBayiNormal,
        asiBayiEkslusif,
        bayiPosyandu,
        bayiImunisasi,
        bbTbBayiNormal,
        riwayatPenyakitBayi,
        anakSekolah,
        anakTidakSekolah,
        anakYatimPiatu,
        lansia,
        keluargaDifabel,
        keluargaCacatMental,
        keluargaTidakMendapatkanPengobatan,
        bantuanPemerintah,
        keluargaMerokok,
        saranaAirBersih,
        jambanKeluarga,
        septicTank,
        pembuanganSampah,
        kriteriaRumah,
        statusRumah,
        aktivitasKeagamaan,
        aktivitasSosial,
        memilikiToga,
        jenisUsaha,
        pengeluaranBulanan,
        keterangan
      } = req.body;
      const kartuKeluargaName = req.file.originalname; //file
      await DetailKK.update(
        {
          namaLengkap,
          jenisKelamin,
          tempatLahir,
          tanggalLahir,
          kartuKeluarga: kartuKeluargaName,
          noKKKTP,
          statusPerkawinan,
          agama,
          rt,
          rw,
          alamat,
          pendidikan,
          pekerjaan,
          penghasilanSebulan,
          dokumenKependudukan,
          wusKeluarga,
          pusKeluarga,
          pusKB,
          ibuHamilKeluarga,
          ibuMenyusuiKeluarga,
          ibuBekerjaKeluarga,
          balitaKeluarga,
          bbBayiNormal,
          asiBayiEkslusif,
          bayiPosyandu,
          bayiImunisasi,
          bbTbBayiNormal,
          riwayatPenyakitBayi,
          anakSekolah,
          anakTidakSekolah,
          anakYatimPiatu,
          lansia,
          keluargaDifabel,
          keluargaCacatMental,
          keluargaTidakMendapatkanPengobatan,
          bantuanPemerintah,
          keluargaMerokok,
          saranaAirBersih,
          jambanKeluarga,
          septicTank,
          pembuanganSampah,
          kriteriaRumah,
          statusRumah,
          aktivitasKeagamaan,
          aktivitasSosial,
          memilikiToga,
          jenisUsaha,
          pengeluaranBulanan,
          keterangan
        },
        {
          where: { id: idKK },
        }
      );
      res.status(200).json({ message: "Detail KK Updated" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async deleteKK(req, res) {
    try {
      const { idKK } = req.params;
      const detailKK = await DetailKK.findByPk(idKK);
      if (!detailKK) {
        throw { name: "kkNotFound" };
      }
      await detailKK.destroy();
      res.status(200).json({ message: "Detail KK Deleted" });
    } catch (error) {
      console.log(error);
      if (error.name === "kkNotFound") {
        res.status(404).json({ message: "Detail KK Not Found" });
      }
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
}

module.exports = Controller;
