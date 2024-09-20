document.addEventListener('DOMContentLoaded', () => {
    const registerSection = document.getElementById('register-section');
    const loginSection = document.getElementById('login-section');
    const postSection = document.getElementById('post-section');
  
    const showRegister = document.getElementById('show-register');
    const showLogin = document.getElementById('show-login');
  
    const registerForm = document.getElementById('register-form');
    const loginForm = document.getElementById('login-form');
    const postForm = document.getElementById('post-form');
    const logoutBtn = document.getElementById('logout');
  
    let token = localStorage.getItem('token');
  
    // Alternar entre registro e login
    showRegister.addEventListener('click', () => {
      loginSection.classList.remove('active');
      registerSection.classList.add('active');
    });
  
    showLogin.addEventListener('click', () => {
      registerSection.classList.remove('active');
      loginSection.classList.add('active');
    });
  
    // Registrar novo usuário
    registerForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const username = document.getElementById('register-username').value;
      const email = document.getElementById('register-email').value;
      const password = document.getElementById('register-password').value;
  
      try {
        const res = await fetch('http://localhost:5000/api/auth/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ username, email, password })
        });
        if (res.ok) {
          alert('Registrado com sucesso!');
          showLogin.click();
        } else {
          alert('Erro no registro.');
        }
      } catch (err) {
        console.error('Erro:', err);
      }
    });
  
    // Fazer login
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const email = document.getElementById('login-email').value;
      const password = document.getElementById('login-password').value;
  
      try {
        const res = await fetch('http://localhost:5000/api/auth/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ email, password })
        });
        const data = await res.json();
        if (res.ok) {
          token = data.token;
          localStorage.setItem('token', token);
          loginSection.classList.remove('active');
          postSection.classList.add('active');
        } else {
          alert('Erro no login.');
        }
      } catch (err) {
        console.error('Erro:', err);
      }
    });
  
    // Criar novo post
    postForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const title = document.getElementById('post-title').value;
      const content = document.getElementById('post-content').value;
  
      try {
        const res = await fetch('http://localhost:5000/api/posts', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token
          },
          body: JSON.stringify({ title, content })
        });
        if (res.ok) {
          alert('Post criado com sucesso!');
        } else {
          alert('Erro ao criar post.');
        }
      } catch (err) {
        console.error('Erro:', err);
      }
    });
  
    // Fazer logout
    logoutBtn.addEventListener('click', () => {
      localStorage.removeItem('token');
      postSection.classList.remove('active');
      loginSection.classList.add('active');
    });
  
    // Verificar se o usuário já está logado
    if (token) {
      loginSection.classList.remove('active');
      postSection.classList.add('active');
    } else {
      loginSection.classList.add('active');
    }
  });
  