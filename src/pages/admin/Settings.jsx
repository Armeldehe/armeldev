import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { MdSettings, MdPerson, MdEmail, MdLock, MdSave, MdCheckCircle } from "react-icons/md";
import api from "../../services/api";

export default function Settings() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const { data } = await api.get("/admin/profile");
        setForm(f => ({ ...f, name: data.data.name, email: data.data.email }));
      } catch (err) {
        console.error("Erreur profil:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (form.password && form.password !== form.confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    setLoading(true);
    setSuccess(false);
    try {
      const updateData = { name: form.name, email: form.email };
      if (form.password) updateData.password = form.password;

      const { data } = await api.put("/admin/profile", updateData);
      localStorage.setItem("adminInfo", JSON.stringify(data.admin));
      setSuccess(true);
      setForm(f => ({ ...f, password: "", confirmPassword: "" }));
      setTimeout(() => setSuccess(false), 3000);
    } catch (err) {
      alert(err.response?.data?.message || "Erreur lors de la mise à jour");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-8">
      <div>
        <h1 className="page-title">Paramètres du compte</h1>
        <p className="text-text-secondary text-sm mt-1">Gérez vos informations de connexion et votre profil.</p>
      </div>

      <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="card">
        <form onSubmit={handleSubmit} className="space-y-6 p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="label flex items-center gap-2"><MdPerson size={18} className="text-primary-light" /> Nom complet</label>
              <input type="text" className="input-field" value={form.name} onChange={e => setForm({...form, name: e.target.value})} required />
            </div>
            <div className="space-y-2">
              <label className="label flex items-center gap-2"><MdEmail size={18} className="text-primary-light" /> Email</label>
              <input type="email" className="input-field" value={form.email} onChange={e => setForm({...form, email: e.target.value})} required />
            </div>
          </div>

          <div className="border-t border-dark-border pt-6 pb-2">
            <h3 className="text-sm font-semibold text-text-primary mb-1">Changer le mot de passe</h3>
            <p className="text-xs text-text-muted">Laissez vide pour conserver votre mot de passe actuel.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <label className="label flex items-center gap-2"><MdLock size={18} className="text-primary-light" /> Nouveau mot de passe</label>
              <input type="password" placeholder="••••••••" className="input-field" value={form.password} onChange={e => setForm({...form, password: e.target.value})} minLength={6} />
            </div>
            <div className="space-y-2">
              <label className="label flex items-center gap-2"><MdLock size={18} className="text-primary-light" /> Confirmez le mot de passe</label>
              <input type="password" placeholder="••••••••" className="input-field" value={form.confirmPassword} onChange={e => setForm({...form, confirmPassword: e.target.value})} minLength={6} />
            </div>
          </div>

          <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-2 text-emerald-400 text-sm h-10">
              {success && (
                <motion.span initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-1">
                  <MdCheckCircle /> Profil mis à jour !
                </motion.span>
              )}
            </div>
            <motion.button type="submit" disabled={loading} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} className="btn-primary min-w-[160px] justify-center">
              {loading ? "Mise à jour..." : <><MdSave size={20} /> Enregistrer</>}
            </motion.button>
          </div>
        </form>
      </motion.div>
    </div>
  );
}
