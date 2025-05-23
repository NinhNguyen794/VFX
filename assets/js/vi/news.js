// Load Header and Footer
document.addEventListener('DOMContentLoaded', function() {
    // Load Header
    fetch('/vi/header.html')
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
    fetch('/vi/footer.html')
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

document.querySelectorAll('.cat-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        const category = btn.getAttribute('data-filter');
        news_categories_mb_5(category);
    });
});

function news_categories_mb_5(category = "All") {
    let url = "http://127.0.0.1:8000/news/products_3";
    if (category && category !== "All") {
        url += `?category=${encodeURIComponent(category)}`;
    }

    fetch(url)
        .then(response => {
            if (!response.ok) throw new Error("Không thể tải danh sách sản phẩm");
            return response.json();
        })
        .then(data => {
            const container = document.getElementById("news_categories_mb_5");
            container.innerHTML = '';

            if (data.products.length === 0) {
                container.innerHTML = '<div class="text-muted">Chưa có sản phẩm nào.</div>';
                return;
            }

            const cards = data.products.map(p => `
                <div class="col-md-6 col-lg-4 news-item" data-category="${p.category}">
                    <div class="card h-100">
                        <div class="position-relative overflow-hidden">
                            <img src="${p.image_url}" class="card-img-top news-img" alt="Hình ảnh sản phẩm">
                            <div class="news-overlay">
                                <span class="news-category">${p.category}</span>
                            </div>
                        </div>
                        <div class="card-body">
                            <div class="d-flex align-items-center mb-2">
                                <span class="news-date small"><i class="far fa-calendar-alt me-1"></i>${p.created_at}</span>
                            </div>
                            <h5 class="card-title">${p.name}</h5>
                            <p class="card-text">${p.content.substring(0, 200)}${p.content.length > 200 ? '...' : ''}</p>
                            <a href="#" class="btn-read-more-sm">Đọc tiếp</a>
                        </div>
                    </div>
                </div>
            `).join('');

            container.innerHTML = `<div class="row g-4">${cards}</div>`;
        })
        .catch(err => {
            console.error("Lỗi khi tải danh sách sản phẩm:", err);
            document.getElementById("news_categories_mb_5").innerHTML = 
                '<div class="text-danger">Không thể tải nội dung nổi bật</div>';
        });
}

        // Load mặc định lúc trang load
        news_categories_mb_5("All");
