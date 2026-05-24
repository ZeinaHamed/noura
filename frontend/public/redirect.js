// Handle redirect from 404.html for React Router on GitHub Pages
(function () {
  const redirect = sessionStorage.getItem('redirect');
  if (redirect) {
    sessionStorage.removeItem('redirect');
    window.history.replaceState(null, '', redirect);
  }
})();
