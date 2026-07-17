document.addEventListener("DOMContentLoaded", () => {
    // Kunci Supabase Anda
    const SUPABASE_URL = 'https://ucsfssukcrkmguhizbbj.supabase.co';
    const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVjc2Zzc3VrY3JrbWd1aGl6YmJqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzgzMjkxOTksImV4cCI6MjA5MzkwNTE5OX0.2rSwfgAhzyeSb_ru-6K9hDKSMtFbSK1vgiBpopqM9NY';
    const supabase = window.supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

    const loginForm = document.getElementById('loginForm');
    const btnLogin = document.getElementById('btnLogin');

    loginForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const userVal = document.getElementById('username').value.trim();
        const passVal = document.getElementById('password').value;

        // Efek Loading pada Tombol
        const originalBtnContent = btnLogin.innerHTML;
        btnLogin.innerHTML = '<span class="material-symbols-outlined animate-spin">autorenew</span> Mengotentikasi...';
        btnLogin.disabled = true;
        btnLogin.classList.add('opacity-75');

        try {
            // Mencari user di tabel profil_users
            const { data, error } = await supabase
                .from('profil_users')
                .select('*')
                .eq('username', userVal)
                .eq('password', passVal)
                .single();

            if (error || !data) {
                throw new Error("Username atau Password salah!");
            }

            // Simpan sesi penting ke LocalStorage
            localStorage.setItem('ustadz_username', data.username);
            localStorage.setItem('nama_ustadz', data.nama_lengkap);
            localStorage.setItem('user_role', data.role);
            localStorage.setItem('wa_ustadz', data.no_wa || '');

            // Berhasil! Arahkan ke Dashboard
            window.location.href = 'dashboard.html';

        } catch (err) {
            alert(err.message);
            // Kembalikan tombol seperti semula jika gagal
            btnLogin.innerHTML = originalBtnContent;
            btnLogin.disabled = false;
            btnLogin.classList.remove('opacity-75');
        }
    });
});
