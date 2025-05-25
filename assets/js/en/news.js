// Load Header and Footer
document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    fetch('/en/header.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('header-placeholder').innerHTML = data;                    
        // Add active class to news link
        setTimeout(() => {
        const newsLink = document.getElementById('news-link');
        if (newsLink) {
            newsLink.classList.add('active');
        }
        }, 100);
    });

    // Load Footer
    fetch('/en/footer.html')
    .then(response => response.text())
    .then(data => {
        document.getElementById('footer-container').innerHTML = data;
    });
    // Category filtering
    const filterButtons = document.querySelectorAll('.cat-btn');
    const newsItems = document.querySelectorAll('.news-item');
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
        // Remove active class from all buttons
        filterButtons.forEach(btn => btn.classList.remove('active'));
        // Add active class to current button
        this.classList.add('active');
        const filterValue = this.getAttribute('data-filter');                  
        newsItems.forEach(item => {
            if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
            item.style.display = 'block';
            setTimeout(() => {
                item.style.opacity = '1';
                item.style.transform = 'scale(1)';
            }, 50);
            } else {
                item.style.opacity = '0';
                item.style.transform = 'scale(0.8)';
                setTimeout(() => {
                    item.style.display = 'none';
                    }, 300);
                }
        });
        });
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