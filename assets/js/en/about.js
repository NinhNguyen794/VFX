// Javascript để tải các thành phần header và footer từ file HTML khác
document.addEventListener('DOMContentLoaded', function() {
    // Load header component
    fetch('/en/header.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('header-placeholder').innerHTML = data;
            // Add active class to news link
                setTimeout(() => {
                    const newsLink = document.getElementById('about-link');
                    if (newsLink) {
                        newsLink.classList.add('active');
                    }
                }, 100);
            });
        
    // Load footer component
    fetch('/en/footer.html')
        .then(response => response.text())
        .then(data => {
            document.getElementById('footer-placeholder').innerHTML = data;
        });     
});

function switchLanguage(lang) {
        const currentPath = window.location.pathname;

        // Tách path thành mảng
        const pathParts = currentPath.split('/').filter(p => p !== '');
        
        // Kiểm tra nếu đã có /vi hoặc /en
        if (pathParts[0] === 'vi' || pathParts[0] === 'en') {
            pathParts[0] = lang; // thay đổi ngôn ngữ
        } else {
            pathParts.unshift(lang); // thêm ngôn ngữ vào đầu
        }

        // Chuyển hướng sang URL mới
        const newPath = '/' + pathParts.join('/');
        window.location.href = newPath;
    }