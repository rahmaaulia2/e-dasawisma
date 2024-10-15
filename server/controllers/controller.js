const { Op, where } = require("sequelize");
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
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
  static async getAllUsers(req, res) {
    try {
      const { filterRole, search } = req.query;
      let paramsquery = {
        attributes: {
          exclude: ["password", "createdAt", "updatedAt"],
        },
      };
      if (filterRole && search) {
        paramsquery.where = {
          [Op.and]: [
            { role: filterRole },
            { nama: { [Op.iLike]: `%${search}%` } },
          ],
        };
      } else if (filterRole) {
        paramsquery.where = { role: filterRole };
      } else if (search) {
        paramsquery.where = { nama: { [Op.iLike]: `%${search}%` } };
      }
      const users = await User.findAll(paramsquery);
      res.status(200).json(users);
    } catch (error) {
      console.log(error);
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

  static async addKK(req, res) {
    try {
      const { id } = req.user;
      const findUser = await User.findByPk(id);
      const { KelurahanId, KecamatanId } = findUser;
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
        keterangan,
      } = req.body;
      // const jenisKelamin = dataForm.jenisKelamin
      // const tempatLahir = dataForm.tempatLahir
      // const tanggalLahir = dataForm.tanggalLahir
      const kartuKeluargaName = req.file.originalname; //file
      await DetailKK.create({
        UserId: id,
        KecamatanId,
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
        keterangan,
      });
      res.status(201).json({ message: "Success input dasawisma" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Internal Server Error" });
    }
  }
  static async getAllKK(req, res) {
    try {
      const { id } = req.user;
      const findUser = await User.findByPk(id);
      const { role, rt, rw, KelurahanId, KecamatanId } = findUser;
      console.log(findUser,"ini findUser");
      
      const {
        filterKelurahan,
        filterGender,
        filterStatusPerkawinan,
        filterAgama,
        filterRT,
        filterRW,
        filterPendidikan,
        filterPekerjaan,
        filterPenghasilan,
        filterDokumen,
        filterWus,
        filterPus,
        filterPusKB,
        filterIbuHamil,
        filterIbuMenyusui,
        filterIbuBekerja,
        filterBalita,
        filterBbBayi,
        filterAsiBayi,
        filterBayiPosyandu,
        filterBayiImunisasi,
        filterBbTbBayi,
        filterAnakSekolah,
        filterAnakTidakSekolah,
        filterAnakYatimPiatu,
        filterLansia,
        filterDifabel,
        filterCacatMental,
        filterTidakPengobatan,
        filterBantuanPemerintah,
        filterMerokok,
        filterAirBersih,
        filterJamban,
        filterSeptictank,
        filterPembuanganSampah,
        filterKriteriaRumah,
        filterStatusRumah,
        filterKeagamaan,
        filterSosial,
        filterToga,
        searchByNama,
      } = req.query;
      let paramsquery = {
        attributes: { exclude: ["createdAt", "updatedAt"] },
        where: {},
      };
      const filters = {
        KelurahanId: filterKelurahan,
        jenisKelamin: filterGender,
        statusPerkawinan: filterStatusPerkawinan,
        agama: filterAgama,
        rt: filterRT,
        rw: filterRW,
        pendidikan: filterPendidikan,
        pekerjaan: filterPekerjaan,
        penghasilanSebulan: filterPenghasilan,
        dokumenKependudukan: filterDokumen,
        wusKeluarga: filterWus,
        pusKeluarga: filterPus,
        pusKB: filterPusKB,
        ibuHamilKeluarga: filterIbuHamil,
        ibuMenyusuiKeluarga: filterIbuMenyusui,
        ibuBekerjaKeluarga: filterIbuBekerja,
        balitaKeluarga: filterBalita,
        bbBayiNormal: filterBbBayi,
        asiBayiEkslusif: filterAsiBayi,
        bayiPosyandu: filterBayiPosyandu,
        bayiImunisasi: filterBayiImunisasi,
        bbTbBayiNormal: filterBbTbBayi,
        anakSekolah: filterAnakSekolah,
        anakTidakSekolah: filterAnakTidakSekolah,
        anakYatimPiatu: filterAnakYatimPiatu,
        lansia: filterLansia,
        keluargaDifabel: filterDifabel,
        keluargaCacatMental: filterCacatMental,
        keluargaTidakMendapatkanPengobatan: filterTidakPengobatan,
        bantuanPemerintah: filterBantuanPemerintah,
        keluargaMerokok: filterMerokok,
        saranaAirBersih: filterAirBersih,
        jambanKeluarga: filterJamban,
        septicTank: filterSeptictank,
        pembuanganSampah: filterPembuanganSampah,
        kriteriaRumah: filterKriteriaRumah,
        statusRumah: filterStatusRumah,
        aktivitasKeagamaan: filterKeagamaan,
        aktivitasSosial: filterSosial,
        memilikiToga: filterToga,
      };

      // Add filters to paramsquery.where
      for (const [key, value] of Object.entries(filters)) {
        if (value) {
          paramsquery.where[key] = value;
        }
      }

      // Add search condition
      if (searchByNama) {
        paramsquery.where.namaLengkap = { [Op.iLike]: `%${searchByNama}%` };
      }

      if (role === "kecamatan") {
        paramsquery.where = { KecamatanId: KecamatanId };
      } else if (role === "kelurahan") {
        paramsquery.where = { KelurahanId: KelurahanId };
      } else if (role === "RW") {
        paramsquery.where = { KelurahanId: KelurahanId, rw: rw };
      } else if (role === "RT") {
        paramsquery.where = { KelurahanId: KelurahanId, rt: rt };
      } else if (role === "admin"){
        delete paramsquery.where;
      }

      const kk = await DetailKK.findAll(paramsquery);
      res.status(200).json(kk);
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
        keterangan,
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
          keterangan,
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
